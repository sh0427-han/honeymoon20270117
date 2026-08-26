(() => {
    const NativeDate = window.Date;
    const params = new URLSearchParams(window.location.search);

    const ZONES = {
        seoul: "Asia/Seoul",
        sydney: "Australia/Sydney",
        nz: "Pacific/Auckland"
    };

    const ZONE_LABELS = {
        [ZONES.seoul]: "KST",
        [ZONES.sydney]: "SYD",
        [ZONES.nz]: "NZ"
    };

    // Flight / arrival boundaries expressed as real instants.
    const SYDNEY_PHASE_START = NativeDate.parse("2027-01-16T23:00:00Z"); // 1/17 08:00 KST
    const NZ_PHASE_START = NativeDate.parse("2027-01-19T23:55:00Z");     // 1/20 10:55 AEDT
    const SEOUL_RETURN = NativeDate.parse("2027-01-29T10:40:00Z");       // 1/29 19:40 KST

    const DATE_RE = /^(\d{4})-(\d{2})-(\d{2})$/;
    const DATETIME_RE = /^(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/;

    const isValidDateIso = (value) => {
        const match = DATE_RE.exec(value || "");
        if (!match) return false;
        const year = Number(match[1]);
        const month = Number(match[2]);
        const day = Number(match[3]);
        const date = new NativeDate(NativeDate.UTC(year, month - 1, day));
        return date.getUTCFullYear() === year
            && date.getUTCMonth() === month - 1
            && date.getUTCDate() === day;
    };

    const isValidTime = (hour, minute, second = 0) => (
        Number.isInteger(hour) && hour >= 0 && hour <= 23
        && Number.isInteger(minute) && minute >= 0 && minute <= 59
        && Number.isInteger(second) && second >= 0 && second <= 59
    );

    const formatPartsInZone = (epochMs, timeZone) => {
        const parts = new Intl.DateTimeFormat("en-CA", {
            timeZone,
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hourCycle: "h23"
        }).formatToParts(new NativeDate(epochMs));

        return Object.fromEntries(
            parts
                .filter((part) => part.type !== "literal")
                .map((part) => [part.type, part.value])
        );
    };

    // Convert a calendar time in an IANA timezone into a real instant without relying
    // on the phone's configured timezone. Two correction passes handle DST offsets.
    const zonedLocalToEpoch = (dateIso, time, timeZone) => {
        const [year, month, day] = dateIso.split("-").map(Number);
        const [hour, minute, second = 0] = time.split(":").map(Number);
        const desiredUtc = NativeDate.UTC(year, month - 1, day, hour, minute, second);
        let guess = desiredUtc;

        for (let i = 0; i < 3; i += 1) {
            const observed = formatPartsInZone(guess, timeZone);
            const observedUtc = NativeDate.UTC(
                Number(observed.year),
                Number(observed.month) - 1,
                Number(observed.day),
                Number(observed.hour),
                Number(observed.minute),
                Number(observed.second)
            );
            const correction = desiredUtc - observedUtc;
            guess += correction;
            if (correction === 0) break;
        }

        return guess;
    };

    const timeToMinutes = (time) => {
        const [hour, minute] = time.split(":").map(Number);
        return hour * 60 + minute;
    };

    const zoneForRealInstant = (epochMs) => {
        if (epochMs < SYDNEY_PHASE_START) return ZONES.seoul;
        if (epochMs < NZ_PHASE_START) return ZONES.sydney;
        if (epochMs < SEOUL_RETURN) return ZONES.nz;
        return ZONES.seoul;
    };

    // URL test values are interpreted as itinerary-local clock values. Exact
    // departure times remain in the departure timezone; the following clock values
    // use the destination phase.
    const zoneForTestLocal = (dateIso, time) => {
        if (dateIso < "2027-01-17") return ZONES.seoul;
        if (dateIso > "2027-01-29") return ZONES.seoul;

        if (dateIso === "2027-01-17") {
            return timeToMinutes(time) <= timeToMinutes("08:00") ? ZONES.seoul : ZONES.sydney;
        }
        if (dateIso <= "2027-01-19") return ZONES.sydney;

        if (dateIso === "2027-01-20") {
            return timeToMinutes(time) <= timeToMinutes("10:55") ? ZONES.sydney : ZONES.nz;
        }
        if (dateIso <= "2027-01-28") return ZONES.nz;

        // On the return day, displayed itinerary times stay in NZ time until the
        // final 19:40 arrival entry, which is Seoul local time.
        if (dateIso === "2027-01-29") {
            return timeToMinutes(time) >= timeToMinutes("19:40") ? ZONES.seoul : ZONES.nz;
        }

        return ZONES.seoul;
    };

    const zoneForScheduleItem = (dateIso, time) => {
        if (dateIso === "2027-01-17") {
            return timeToMinutes(time) <= timeToMinutes("08:00") ? ZONES.seoul : ZONES.sydney;
        }
        if (dateIso <= "2027-01-19") return ZONES.sydney;
        if (dateIso === "2027-01-20") {
            return timeToMinutes(time) <= timeToMinutes("10:55") ? ZONES.sydney : ZONES.nz;
        }
        if (dateIso <= "2027-01-28") return ZONES.nz;
        if (dateIso === "2027-01-29") {
            return time === "19:40" ? ZONES.seoul : ZONES.nz;
        }
        return ZONES.seoul;
    };

    const parseTestInput = () => {
        const datetimeValue = params.get("datetime");
        const dateValue = params.get("date");

        if (datetimeValue) {
            const match = DATETIME_RE.exec(datetimeValue);
            if (match && isValidDateIso(match[1])) {
                const hour = Number(match[2]);
                const minute = Number(match[3]);
                const second = Number(match[4] || 0);
                if (isValidTime(hour, minute, second)) {
                    const time = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`;
                    return { dateIso: match[1], time, kind: "datetime" };
                }
            }
        }

        if (dateValue && isValidDateIso(dateValue)) {
            return { dateIso: dateValue, time: "12:00:00", kind: "date" };
        }

        return null;
    };

    const testInput = parseTestInput();

    const snapshotFromEpoch = (epochMs, timeZone, extra = {}) => {
        const parts = formatPartsInZone(epochMs, timeZone);
        const dateIso = `${parts.year}-${parts.month}-${parts.day}`;
        const time = `${parts.hour}:${parts.minute}:${parts.second}`;
        return {
            epochMs,
            dateIso,
            time,
            timeShort: `${parts.hour}:${parts.minute}`,
            minutes: Number(parts.hour) * 60 + Number(parts.minute),
            timeZone,
            zoneLabel: ZONE_LABELS[timeZone] || timeZone,
            ...extra
        };
    };

    const createSnapshot = () => {
        if (testInput) {
            const timeZone = zoneForTestLocal(testInput.dateIso, testInput.time);
            const epochMs = zonedLocalToEpoch(testInput.dateIso, testInput.time, timeZone);
            return snapshotFromEpoch(epochMs, timeZone, {
                isTest: true,
                testKind: testInput.kind,
                requestedDateIso: testInput.dateIso,
                requestedTime: testInput.time.slice(0, 5)
            });
        }

        const epochMs = NativeDate.now();
        const timeZone = zoneForRealInstant(epochMs);
        return snapshotFromEpoch(epochMs, timeZone, { isTest: false, testKind: null });
    };

    const buildTripState = (snapshot) => {
        const todayIso = snapshot.dateIso;

        if (todayIso < TRIP_START) {
            return {
                mode: "before",
                focusDate: TRIP_START,
                label: "NEXT TRIP",
                countdown: diffDays(todayIso, TRIP_START)
            };
        }

        if (todayIso <= TRIP_END) {
            const hasToday = tripData.days.some((day) => day.date === todayIso);
            return {
                mode: "during",
                focusDate: hasToday ? todayIso : TRIP_START,
                label: "TODAY",
                countdown: 0
            };
        }

        return {
            mode: "after",
            focusDate: TRIP_END,
            label: "TRIP COMPLETE",
            countdown: 0
        };
    };

    let lastSyncedDate = null;

    const syncAppState = ({ force = false } = {}) => {
        const snapshot = createSnapshot();
        const nextState = buildTripState(snapshot);
        const stateChanged = force
            || lastSyncedDate !== snapshot.dateIso
            || tripState.mode !== nextState.mode
            || tripState.focusDate !== nextState.focusDate;

        Object.assign(tripState, nextState);
        document.documentElement.dataset.tripMode = nextState.mode;
        document.documentElement.dataset.tripTimezone = snapshot.zoneLabel;
        document.documentElement.dataset.clockMode = snapshot.isTest ? "test" : "live";

        if (stateChanged) {
            selectedDate = nextState.focusDate;
            selectedSchedulePlaceName = null;
            renderCountdown();
            renderHomeFocus();
            renderDateStrips();
            renderSelectedDay();
            renderRoute();
            lastSyncedDate = snapshot.dateIso;
        }

        return snapshot;
    };

    window.tripClock = {
        zones: ZONES,
        getSnapshot: createSnapshot,
        syncAppState,
        getScheduleItemTimeZone: zoneForScheduleItem,
        getScheduleItemEpoch(dateIso, item) {
            const timeZone = zoneForScheduleItem(dateIso, item.time);
            return zonedLocalToEpoch(dateIso, `${item.time}:00`, timeZone);
        },
        zoneLabel(timeZone) {
            return ZONE_LABELS[timeZone] || timeZone;
        },
        isTestMode: Boolean(testInput)
    };

    // Correct the app's initial device-local trip state before the rest of the
    // enhancement scripts run. No URL parameter means the real itinerary clock.
    syncAppState({ force: true });
})();
