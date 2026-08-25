(() => {
    const escapeHtmlSafe = (value) => String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

    const googleMapsSearchUrl = (query) =>
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

    const hotelMapTargets = [
        {
            query: "Meriton Suites Campbell Street, 6 Campbell Street, Haymarket NSW 2000, Australia",
            label: "지도 ↗"
        },
        {
            query: "Hampshire Holiday Parks Queenstown Lakeview, 4 Cemetery Road, Queenstown 9300, New Zealand",
            label: "지도 ↗"
        },
        {
            query: "Edgewater Hotel, 54 Sargood Drive, Wanaka 9305, New Zealand",
            label: "지도 ↗"
        },
        {
            query: "Fairlie, Canterbury, New Zealand",
            label: "지역 지도 ↗",
            approximate: true
        },
        {
            query: "BreakFree on Cashel Christchurch, 165 Cashel Street, Christchurch 8011, New Zealand",
            label: "지도 ↗"
        },
        {
            query: "Hilton Auckland, 147 Quay Street, Auckland 1010, New Zealand",
            label: "지도 ↗"
        }
    ];

    const enhanceHomeSchedule = () => {
        const focusCard = document.querySelector("#home-focus .focus-card");
        const focusList = focusCard?.querySelector(".focus-list");
        const dateLabel = focusCard?.querySelector(".focus-card__date")?.textContent?.trim();

        if (!focusCard || !focusList || !dateLabel || typeof tripData === "undefined") return;

        const day = tripData.days.find((item) => item.label === dateLabel);
        if (!day) return;

        focusList.innerHTML = day.items.map((item) => `
            <li class="focus-item">
                <time>${escapeHtmlSafe(item.time)}</time>
                <div>
                    <strong>${escapeHtmlSafe(item.title)}</strong>
                    ${item.note ? `<small>${escapeHtmlSafe(item.note)}</small>` : ""}
                </div>
            </li>
        `).join("");

        focusList.classList.add("focus-list--scrollable");

        let scrollHint = focusCard.querySelector(".focus-scroll-hint");
        if (!scrollHint) {
            scrollHint = document.createElement("div");
            scrollHint.className = "focus-scroll-hint";
            focusList.insertAdjacentElement("beforebegin", scrollHint);
        }

        scrollHint.innerHTML = `
            <span>DAY SCHEDULE</span>
            <small>${day.items.length}개 일정 · 카드 안에서 스크롤</small>
        `;
    };

    const addHotelMapLinks = () => {
        const cards = [...document.querySelectorAll("#hotel-list .booking-card")];
        if (cards.length === 0) return;

        cards.forEach((card, index) => {
            if (card.querySelector(".booking-map-link")) return;
            const target = hotelMapTargets[index];
            if (!target) return;

            const link = document.createElement("a");
            link.className = `booking-map-link${target.approximate ? " approximate" : ""}`;
            link.href = googleMapsSearchUrl(target.query);
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.textContent = target.label;
            if (target.approximate) {
                link.title = "Public 레포에는 Fairlie Airbnb의 정확한 개인 숙소 주소를 저장하지 않아 Fairlie 지역 지도를 엽니다.";
            }
            card.appendChild(link);
        });
    };

    const addJourneyMapLinks = () => {
        const stops = [...document.querySelectorAll("#journey-strip .journey-stop")];
        stops.forEach((stop, index) => {
            if (stop.querySelector(".journey-map-link")) return;
            const target = hotelMapTargets[index];
            if (!target) return;

            const link = document.createElement("a");
            link.className = `journey-map-link${target.approximate ? " approximate" : ""}`;
            link.href = googleMapsSearchUrl(target.query);
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.textContent = target.approximate ? "Fairlie 지도 ↗" : "숙소 지도 ↗";
            link.addEventListener("click", (event) => event.stopPropagation());
            stop.appendChild(link);
        });
    };

    const applyEnhancements = () => {
        enhanceHomeSchedule();
        addHotelMapLinks();
        addJourneyMapLinks();
    };

    applyEnhancements();

    // app.js가 향후 일부 영역을 다시 렌더링하더라도 보강 UI를 복원한다.
    const observer = new MutationObserver(() => {
        window.requestAnimationFrame(applyEnhancements);
    });

    [document.querySelector("#home-focus"), document.querySelector("#hotel-list"), document.querySelector("#journey-strip")]
        .filter(Boolean)
        .forEach((node) => observer.observe(node, { childList: true, subtree: true }));
})();
