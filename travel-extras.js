(() => {
    if (typeof tripData === "undefined") return;

    const safe = (value) => (
        typeof escapeHtml === "function" ? escapeHtml(value) : String(value)
    );

    const shortDateToIso = (value) => {
        const match = /^(\d{1,2})\/(\d{1,2})$/.exec(String(value || "").trim());
        if (!match) return null;
        return `2027-${String(Number(match[1])).padStart(2, "0")}-${String(Number(match[2])).padStart(2, "0")}`;
    };

    const firstTime = (value) => String(value || "").split("→")[0].trim();

    const googleNavigationUrl = (place) => {
        if (!place) return "#";
        const destination = `${place.name}, ${place.city}`;
        const params = new URLSearchParams({
            api: "1",
            destination,
            dir_action: "navigate"
        });
        return `https://www.google.com/maps/dir/?${params.toString()}`;
    };

    const enhanceTimelineDirections = () => {
        if (typeof findPlace !== "function") return;

        document.querySelectorAll(".timeline-item[data-schedule-place]").forEach((row) => {
            if (row.querySelector(".timeline-directions")) return;
            const place = findPlace(row.dataset.schedulePlace);
            const content = row.querySelector(".timeline-content");
            if (!place || !content) return;

            const actions = document.createElement("div");
            actions.className = "timeline-directions";
            actions.innerHTML = `
                <a href="${googleNavigationUrl(place)}" target="_blank" rel="noopener noreferrer">
                    길찾기 시작 ↗
                </a>
            `;
            actions.querySelector("a")?.addEventListener("click", (event) => event.stopPropagation());
            content.appendChild(actions);
        });
    };

    const getBookingEvents = () => {
        if (!window.tripClock) return [];
        const events = [];

        const flightDates = ["2027-01-17", "2027-01-20", "2027-01-26", "2027-01-29"];
        tripData.flights.forEach((flight, index) => {
            const dateIso = flightDates[index];
            const time = firstTime(flight.time);
            if (!dateIso || !time) return;
            const meta = typeof bookingData !== "undefined" ? bookingData.flights?.[index] : null;
            const mapQuery = meta?.mapLinks?.[0]?.query || null;
            events.push({
                kind: "FLIGHT",
                dateIso,
                time,
                title: flight.route,
                subtitle: flight.airline,
                mapQuery,
                epochMs: window.tripClock.getScheduleItemEpoch(dateIso, { time })
            });
        });

        if (typeof bookingData !== "undefined") {
            bookingData.tours?.forEach((tour) => {
                const dateIso = shortDateToIso(tour.date);
                if (!dateIso || !tour.time) return;
                events.push({
                    kind: "TOUR",
                    dateIso,
                    time: tour.time,
                    title: tour.name,
                    subtitle: tour.city,
                    mapQuery: tour.mapQuery || null,
                    epochMs: window.tripClock.getScheduleItemEpoch(dateIso, { time: tour.time })
                });
            });
        }

        return events.sort((a, b) => a.epochMs - b.epochMs);
    };

    const getCurrentHotel = (snapshot) => {
        const hotel = tripData.hotels.find((item) => {
            const [startRaw, endRaw] = String(item.dates).split("→").map((value) => value.trim());
            const start = shortDateToIso(startRaw);
            const end = shortDateToIso(endRaw);
            return start && end && snapshot.dateIso >= start && snapshot.dateIso < end;
        });

        if (!hotel) return null;
        const index = tripData.hotels.indexOf(hotel);
        const meta = typeof bookingData !== "undefined" ? bookingData.hotels?.[index] : null;
        return { hotel, meta };
    };

    const mapsSearchUrl = (query) => (
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
    );

    const ensureBookingUpcoming = () => {
        if (!window.tripClock) return;
        const panel = document.querySelector("#bookings-panel");
        const summary = document.querySelector("#booking-summary");
        if (!panel || !summary) return;

        let section = panel.querySelector("#booking-upcoming");
        if (!section) {
            section = document.createElement("section");
            section.id = "booking-upcoming";
            section.className = "booking-upcoming";
            const privacy = document.querySelector("#booking-privacy-note");
            (privacy || summary).insertAdjacentElement("afterend", section);
        }

        const snapshot = window.tripClock.getSnapshot();
        const events = getBookingEvents();
        const upcoming = events.find((event) => event.epochMs >= snapshot.epochMs) || null;
        const currentHotel = getCurrentHotel(snapshot);

        if (!upcoming && !currentHotel) {
            section.hidden = true;
            return;
        }
        section.hidden = false;

        const upcomingHtml = upcoming ? `
            <article class="booking-upcoming__card is-next">
                <span>UP NEXT · ${safe(upcoming.kind)}</span>
                <strong>${safe(upcoming.title)}</strong>
                <small>${safe(upcoming.dateIso.slice(5).replace("-", "/"))} · ${safe(upcoming.time)} · ${safe(upcoming.subtitle)}</small>
                <div class="booking-upcoming__actions">
                    ${upcoming.mapQuery ? `<a href="${mapsSearchUrl(upcoming.mapQuery)}" target="_blank" rel="noopener noreferrer">위치 ↗</a>` : ""}
                    <button type="button" data-scroll-booking-apps>예약 앱</button>
                </div>
            </article>
        ` : "";

        const hotelHtml = currentHotel ? `
            <article class="booking-upcoming__card is-tonight">
                <span>TONIGHT · STAY</span>
                <strong>${safe(currentHotel.hotel.name)}</strong>
                <small>${safe(currentHotel.hotel.dates)} · ${safe(currentHotel.hotel.city)}</small>
                <div class="booking-upcoming__actions">
                    ${currentHotel.meta?.mapQuery ? `<a href="${mapsSearchUrl(currentHotel.meta.mapQuery)}" target="_blank" rel="noopener noreferrer">숙소 위치 ↗</a>` : ""}
                    <button type="button" data-scroll-booking-apps>예약 앱</button>
                </div>
            </article>
        ` : "";

        section.innerHTML = `
            <div class="booking-upcoming__head">
                <div>
                    <p class="section-kicker">TRAVEL WALLET</p>
                    <h3>지금 필요한 예약</h3>
                </div>
                <small>${safe(snapshot.timeShort)} · ${safe(snapshot.zoneLabel)}</small>
            </div>
            <div class="booking-upcoming__grid">${upcomingHtml}${hotelHtml}</div>
        `;

        section.querySelectorAll("[data-scroll-booking-apps]").forEach((button) => {
            button.addEventListener("click", () => {
                document.querySelector("#booking-app-launcher")?.scrollIntoView({ behavior: "smooth", block: "start" });
            });
        });
    };

    const CHECKLIST = [
        { id: "passport", title: "여권", note: "두 사람 여권 실물 · 유효기간 확인" },
        { id: "au-eta", title: "호주 ETA", note: "출국 전 승인 상태 확인" },
        { id: "nzeta", title: "NZeTA", note: "뉴질랜드 입국 준비" },
        { id: "ivl", title: "IVL", note: "납부/처리 상태 확인" },
        { id: "license", title: "렌터카 운전 준비", note: "국내 면허 · 국제운전 관련 서류 확인" },
        { id: "insurance", title: "여행자보험", note: "가입 및 긴급 연락 방법 확인" },
        { id: "esim", title: "eSIM / 로밍", note: "두 사람 통신 준비" },
        { id: "offline", title: "오프라인 준비", note: "Honeymoon 앱 · 필요한 Google Maps 지역 저장" },
        { id: "milford", title: "Milford 예약 최종 확인", note: "집결시간 · 장소 확인" },
        { id: "onsen", title: "Onsen 예약 최종 확인", note: "1/23 08:45 도착 기준" },
        { id: "rotorua", title: "Rotorua 예약 최종 확인", note: "집결시간 · 포함 일정 확인" }
    ];

    const checklistKey = (id) => `honeymoon-prep-${id}`;

    const renderChecklist = () => {
        const panel = document.querySelector("#more-panel");
        if (!panel) return;

        let section = panel.querySelector("#travel-prep-checklist");
        if (!section) {
            section = document.createElement("section");
            section.id = "travel-prep-checklist";
            section.className = "more-section travel-prep-checklist";
            const pwaCard = panel.querySelector("#pwa-install-card");
            const firstMore = panel.querySelector(".more-section");
            if (pwaCard) pwaCard.insertAdjacentElement("afterend", section);
            else if (firstMore) firstMore.insertAdjacentElement("beforebegin", section);
            else panel.appendChild(section);
        }

        const completed = CHECKLIST.filter((item) => localStorage.getItem(checklistKey(item.id)) === "true").length;
        const shouldOpen = !(typeof tripState !== "undefined" && tripState.mode === "during");

        section.innerHTML = `
            <details ${shouldOpen ? "open" : ""}>
                <summary>
                    <div>
                        <p class="section-kicker">BEFORE DEPARTURE</p>
                        <strong>여행 준비 체크리스트</strong>
                    </div>
                    <span>${completed} / ${CHECKLIST.length}</span>
                </summary>
                <div class="travel-prep-list">
                    ${CHECKLIST.map((item) => {
                        const checked = localStorage.getItem(checklistKey(item.id)) === "true";
                        return `
                            <label class="travel-prep-item">
                                <input type="checkbox" data-prep-id="${safe(item.id)}" ${checked ? "checked" : ""}>
                                <span class="travel-prep-check" aria-hidden="true"></span>
                                <span>
                                    <strong>${safe(item.title)}</strong>
                                    <small>${safe(item.note)}</small>
                                </span>
                            </label>
                        `;
                    }).join("")}
                </div>
            </details>
        `;

        section.querySelectorAll("[data-prep-id]").forEach((checkbox) => {
            checkbox.addEventListener("change", () => {
                localStorage.setItem(checklistKey(checkbox.dataset.prepId), String(checkbox.checked));
                renderChecklist();
            });
        });
    };

    const applyTravelMode = () => {
        const active = typeof tripState !== "undefined" && tripState.mode === "during";
        document.documentElement.dataset.travelUi = active ? "active" : "editorial";
    };

    const renderPrivateDriveEntry = () => {
        if (typeof bookingData === "undefined" || !bookingData.privateDrive?.folderUrl) return;
        const panel = document.querySelector("#bookings-panel");
        if (!panel || panel.querySelector("#private-drive-entry")) return;

        const apps = panel.querySelector("#booking-app-launcher");
        const summary = panel.querySelector("#booking-summary");
        const section = document.createElement("section");
        section.id = "private-drive-entry";
        section.className = "private-drive-entry";
        section.innerHTML = `
            <div>
                <p class="section-kicker">PRIVATE DRIVE</p>
                <strong>${safe(bookingData.privateDrive.label || "Private Travel Docs")}</strong>
                <span>Google 계정 권한이 있는 사용자만 문서를 열 수 있습니다.</span>
            </div>
            <a href="${safe(bookingData.privateDrive.folderUrl)}" target="_blank" rel="noopener noreferrer">Drive 문서 열기 ↗</a>
        `;
        (apps || summary)?.insertAdjacentElement("afterend", section);
    };

    const apply = () => {
        applyTravelMode();
        enhanceTimelineDirections();
        ensureBookingUpcoming();
        renderChecklist();
        renderPrivateDriveEntry();
    };

    apply();

    let queued = false;
    const observer = new MutationObserver(() => {
        if (queued) return;
        queued = true;
        requestAnimationFrame(() => {
            queued = false;
            apply();
        });
    });

    [
        document.querySelector("#schedule-panel"),
        document.querySelector("#bookings-panel"),
        document.querySelector("#more-panel")
    ].filter(Boolean).forEach((node) => observer.observe(node, { childList: true, subtree: true }));

    if (!window.tripClock?.isTestMode) {
        window.setInterval(() => {
            applyTravelMode();
            ensureBookingUpcoming();
        }, 60000);
    }
})();
