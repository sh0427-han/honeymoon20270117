(() => {
    if (!window.tripClock || typeof tripData === "undefined") return;

    const flattenSchedule = () => tripData.days
        .flatMap((day) => day.items.map((item) => ({
            day,
            item,
            epochMs: window.tripClock.getScheduleItemEpoch(day.date, item)
        })))
        .sort((a, b) => a.epochMs - b.epochMs);

    const allScheduleItems = flattenSchedule();

    const formatRelative = (fromEpoch, toEpoch, sameDay) => {
        const minutes = Math.max(0, Math.round((toEpoch - fromEpoch) / 60000));
        if (!sameDay) return null;
        if (minutes < 1) return "곧 시작";
        if (minutes < 60) return `${minutes}분 후`;
        const hours = Math.floor(minutes / 60);
        const remain = minutes % 60;
        return remain ? `${hours}시간 ${remain}분 후` : `${hours}시간 후`;
    };

    const getCurrentAndNext = (snapshot) => {
        const todayEntries = allScheduleItems.filter((entry) => entry.day.date === snapshot.dateIso);
        const current = [...todayEntries]
            .filter((entry) => entry.epochMs <= snapshot.epochMs)
            .pop() || null;
        const next = allScheduleItems.find((entry) => entry.epochMs > snapshot.epochMs) || null;
        const firstToday = todayEntries[0] || null;
        return { current, next, firstToday };
    };

    const typeLabel = (item) => (
        typeof getTypeLabel === "function" ? getTypeLabel(item.type) : "일정"
    );

    const safe = (value) => (
        typeof escapeHtml === "function" ? escapeHtml(value) : String(value)
    );

    const ensureCard = () => {
        const homePanel = document.querySelector("#home-panel");
        const homeFocus = document.querySelector("#home-focus");
        if (!homePanel || !homeFocus) return null;

        let card = document.querySelector("#travel-now-card");
        if (!card) {
            card = document.createElement("section");
            card.id = "travel-now-card";
            card.className = "travel-now-card";
            homeFocus.insertAdjacentElement("beforebegin", card);
        }
        return card;
    };

    const renderTestBadge = (snapshot) => {
        let badge = document.querySelector("#trip-test-badge");

        if (!snapshot.isTest) {
            badge?.remove();
            return;
        }

        if (!badge) {
            badge = document.createElement("div");
            badge.id = "trip-test-badge";
            badge.className = "trip-test-badge";
            document.body.appendChild(badge);
        }

        badge.textContent = `TEST · ${snapshot.dateIso.replaceAll("-", ".")} ${snapshot.timeShort} · ${snapshot.zoneLabel}`;
    };

    const renderCard = () => {
        const snapshot = window.tripClock.syncAppState();
        renderTestBadge(snapshot);

        // Keep the normal pre-trip/post-trip home clean. Test mode always renders
        // so every travel state can be checked before departure.
        if (!snapshot.isTest && tripState.mode !== "during") {
            document.querySelector("#travel-now-card")?.remove();
            return;
        }

        const card = ensureCard();
        if (!card) return;

        const day = tripData.days.find((item) => item.date === snapshot.dateIso) || null;
        const { current, next, firstToday } = getCurrentAndNext(snapshot);
        const sameDayNext = Boolean(next && next.day.date === snapshot.dateIso);
        const relative = next ? formatRelative(snapshot.epochMs, next.epochMs, sameDayNext) : null;

        let currentTitle = "오늘 일정 시작 전";
        let currentMeta = firstToday
            ? `첫 일정 ${firstToday.item.time} · ${typeLabel(firstToday.item)}`
            : "예정된 일정 없음";

        if (tripState.mode === "before") {
            currentTitle = "여행 시작 전";
            currentMeta = "신혼여행 출발 준비";
        } else if (tripState.mode === "after") {
            currentTitle = "TRIP COMPLETE";
            currentMeta = "신혼여행 일정 완료";
        } else if (current) {
            currentTitle = current.item.title;
            currentMeta = `${current.item.time} · ${typeLabel(current.item)}`;
        }

        const nextTitle = next?.item.title || "오늘 일정 완료";
        const nextMeta = next
            ? `${next.day.label} · ${next.item.time} · ${typeLabel(next.item)}${relative ? ` · ${relative}` : ""}`
            : "남은 일정 없음";

        const heading = day
            ? `${day.label} · ${day.city}`
            : tripState.mode === "before"
                ? "TRIP PREVIEW"
                : "OUR HONEYMOON";

        card.innerHTML = `
            <div class="travel-now-card__head">
                <div>
                    <p class="section-kicker">${snapshot.isTest ? "TEST CLOCK" : "LIVE TRIP"}</p>
                    <h2>${safe(heading)}</h2>
                </div>
                <div class="travel-now-clock">
                    <strong>${safe(snapshot.timeShort)}</strong>
                    <span>${safe(snapshot.zoneLabel)}</span>
                </div>
            </div>

            <div class="travel-now-grid">
                <article class="travel-now-state is-now">
                    <span>NOW</span>
                    <strong>${safe(currentTitle)}</strong>
                    <small>${safe(currentMeta)}</small>
                </article>
                <article class="travel-now-state is-next">
                    <span>NEXT</span>
                    <strong>${safe(nextTitle)}</strong>
                    <small>${safe(nextMeta)}</small>
                </article>
            </div>

            <div class="travel-now-card__foot">
                <button type="button" id="travel-now-open-schedule">${tripState.mode === "during" ? "오늘 일정 보기" : "일정 보기"}</button>
                <small>${safe(snapshot.timeZone)} 기준${snapshot.isTest ? " · URL 테스트 모드" : ""}</small>
            </div>
        `;

        card.querySelector("#travel-now-open-schedule")?.addEventListener("click", () => {
            const targetDate = tripData.days.some((item) => item.date === snapshot.dateIso)
                ? snapshot.dateIso
                : tripState.focusDate;
            selectedDate = targetDate;
            selectedSchedulePlaceName = null;
            renderDateStrips();
            renderSelectedDay();
            activateTab("schedule");
        });
    };

    renderCard();

    if (!window.tripClock.isTestMode) {
        window.setInterval(renderCard, 30000);
    }
})();
