const TRIP_START = "2027-01-17";
const TRIP_END = "2027-01-29";

const formatKrw = (value) => `${new Intl.NumberFormat("ko-KR").format(value)}원`;

const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const getTypeLabel = (type) => {
    const labels = {
        flight: "항공",
        hotel: "숙소",
        meal: "식사",
        sightseeing: "관광",
        transport: "이동",
        tour: "투어",
        car: "렌터카",
        drive: "드라이브",
        shopping: "쇼핑",
        note: "메모"
    };
    return labels[type] || "일정";
};

const toLocalIso = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

const isoToUtcMs = (iso) => {
    const [year, month, day] = iso.split("-").map(Number);
    return Date.UTC(year, month - 1, day);
};

const diffDays = (fromIso, toIso) => Math.round(
    (isoToUtcMs(toIso) - isoToUtcMs(fromIso)) / 86400000
);

const getTripState = () => {
    const todayIso = toLocalIso(new Date());

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

const tripState = getTripState();
let selectedDate = tripState.focusDate;
let mapMode = "day";
let map = null;

const countdownValue = document.querySelector("#countdown-value");
const countdownCaption = document.querySelector("#countdown-caption");
const homeFocus = document.querySelector("#home-focus");
const journeyStrip = document.querySelector("#journey-strip");
const fixedHighlights = document.querySelector("#fixed-highlights");
const dateStrip = document.querySelector("#date-strip");
const selectedDay = document.querySelector("#selected-day");
const mapDayLabel = document.querySelector("#map-day-label");
const mapFallback = document.querySelector("#map-fallback");
const flightList = document.querySelector("#flight-list");
const hotelList = document.querySelector("#hotel-list");
const bookingSummary = document.querySelector("#booking-summary");
const budgetSummary = document.querySelector("#budget-summary");
const budgetList = document.querySelector("#budget-list");
const shoppingList = document.querySelector("#shopping-list");

const supplementalPlaces = [
    {
        name: "Sydney Observatory",
        city: "Sydney",
        lat: -33.8599,
        lng: 151.2049,
        category: "관광"
    },
    {
        name: "The Rocks",
        city: "Sydney",
        lat: -33.8599,
        lng: 151.2090,
        category: "관광"
    },
    {
        name: "Royal Botanic Garden Sydney",
        city: "Sydney",
        lat: -33.8642,
        lng: 151.2166,
        category: "관광"
    },
    {
        name: "Milford Sound",
        city: "Queenstown",
        lat: -44.6711,
        lng: 167.9263,
        category: "투어"
    },
    {
        name: "Church of the Good Shepherd",
        city: "Fairlie",
        lat: -44.0031,
        lng: 170.4822,
        category: "관광"
    },
    {
        name: "Geraldine",
        city: "Christchurch",
        lat: -44.0902,
        lng: 171.2446,
        category: "경유"
    },
    {
        name: "Cathedral Square",
        city: "Christchurch",
        lat: -43.5309,
        lng: 172.6365,
        category: "관광"
    },
    {
        name: "Christchurch Airport",
        city: "Christchurch",
        lat: -43.4894,
        lng: 172.5322,
        category: "공항"
    },
    {
        name: "Auckland Airport",
        city: "Auckland",
        lat: -37.0082,
        lng: 174.7850,
        category: "공항"
    }
];

const allPlaces = [...tripData.places, ...supplementalPlaces];

const routePlaceNamesByDate = {
    "2027-01-17": ["Meriton Suites Campbell Street"],
    "2027-01-18": [
        "Queen Victoria Building",
        "Sydney Fish Market",
        "The Rocks",
        "Sydney Observatory"
    ],
    "2027-01-19": [
        "Bondi Beach",
        "Royal Botanic Garden Sydney",
        "Sydney Opera House"
    ],
    "2027-01-20": ["Queenstown Lakeview"],
    "2027-01-21": ["Queenstown Lakeview", "Milford Sound", "Queenstown Lakeview"],
    "2027-01-22": ["Queenstown Lakeview"],
    "2027-01-23": [
        "Queenstown Lakeview",
        "Onsen Hot Pools",
        "Arrowtown",
        "Edgewater Wanaka",
        "That Wanaka Tree"
    ],
    "2027-01-24": [
        "Edgewater Wanaka",
        "Lake Pukaki",
        "Lake Tekapo",
        "Church of the Good Shepherd",
        "Fairlie"
    ],
    "2027-01-25": [
        "Fairlie",
        "Geraldine",
        "BreakFree on Cashel",
        "Riverside Market",
        "Cathedral Square"
    ],
    "2027-01-26": [
        "BreakFree on Cashel",
        "Christchurch Airport",
        "Hilton Auckland",
        "Commercial Bay"
    ],
    "2027-01-27": ["Hilton Auckland", "Rotorua", "Hilton Auckland"],
    "2027-01-28": [
        "Hilton Auckland",
        "Downtown Ferry Terminal",
        "Waiheke Island",
        "Hilton Auckland"
    ],
    "2027-01-29": ["Hilton Auckland", "Auckland Airport"]
};

const getDay = (date) => tripData.days.find((day) => day.date === date);

const findPlace = (name) => allPlaces.find((place) => place.name === name);

const getRoutePlaces = (date) => (routePlaceNamesByDate[date] || [])
    .map(findPlace)
    .filter(Boolean);

const renderCountdown = () => {
    if (tripState.mode === "before") {
        countdownValue.textContent = tripState.countdown === 0
            ? "D-DAY"
            : `D-${tripState.countdown}`;
        countdownCaption.textContent = "until departure";
        return;
    }

    if (tripState.mode === "during") {
        countdownValue.textContent = "ON TRIP";
        countdownCaption.textContent = "honeymoon days";
        return;
    }

    countdownValue.textContent = "MEMORIES";
    countdownCaption.textContent = "trip complete";
};

const renderHomeFocus = () => {
    const day = getDay(tripState.focusDate) || tripData.days[0];
    const visibleItems = day.items.slice(0, 5);

    homeFocus.innerHTML = `
        <article class="focus-card">
            <div class="focus-card__top">
                <div>
                    <p class="focus-card__label">${escapeHtml(tripState.label)}</p>
                    <h2>${escapeHtml(day.title)}</h2>
                    <p class="focus-card__city">${escapeHtml(day.city)}</p>
                </div>
                <span class="focus-card__date">${escapeHtml(day.label)}</span>
            </div>
            <ul class="focus-list">
                ${visibleItems.map((item) => `
                    <li class="focus-item">
                        <time>${escapeHtml(item.time)}</time>
                        <div>
                            <strong>${escapeHtml(item.title)}</strong>
                            ${item.note ? `<small>${escapeHtml(item.note)}</small>` : ""}
                        </div>
                    </li>
                `).join("")}
            </ul>
            <div class="focus-card__actions">
                <button type="button" class="primary-button" data-focus-action="schedule">
                    일정 자세히
                </button>
                <button type="button" class="secondary-button" data-focus-action="map">
                    동선 지도
                </button>
            </div>
        </article>
    `;

    document.querySelectorAll("[data-focus-action]").forEach((button) => {
        button.addEventListener("click", () => {
            selectedDate = day.date;
            renderDateStrip();
            renderSelectedDay();
            activateTab(button.dataset.focusAction);
        });
    });
};

const renderJourney = () => {
    journeyStrip.innerHTML = tripData.hotels.map((hotel, index) => `
        <article class="journey-stop">
            <span>${String(index + 1).padStart(2, "0")}</span>
            <strong>${escapeHtml(hotel.city)}</strong>
            <small>${escapeHtml(hotel.dates)}</small>
        </article>
    `).join("");
};

const renderFixedHighlights = () => {
    const highlights = [];

    tripData.days.forEach((day) => {
        day.items
            .filter((item) => item.fixed && item.type === "tour")
            .filter((item) => !item.title.endsWith("도착"))
            .forEach((item) => highlights.push({
                date: day.label,
                title: item.title,
                city: day.city
            }));
    });

    fixedHighlights.innerHTML = highlights.map((item) => `
        <article class="highlight-card">
            <span>${escapeHtml(item.date)}</span>
            <strong>${escapeHtml(item.title)}</strong>
            <small>${escapeHtml(item.city)}</small>
        </article>
    `).join("");
};

const renderDateStrip = () => {
    const weekdayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    dateStrip.innerHTML = tripData.days.map((day) => {
        const date = new Date(`${day.date}T00:00:00`);
        const dayNumber = Number(day.date.slice(-2));
        const weekday = weekdayNames[date.getDay()];
        const shortCity = day.city.slice(0, 3).toUpperCase();

        return `
            <button
                type="button"
                class="date-button ${day.date === selectedDate ? "active" : ""}"
                data-date="${day.date}"
                aria-label="${escapeHtml(day.label)} ${escapeHtml(day.title)}"
            >
                <span>${weekday}</span>
                <strong>${dayNumber}</strong>
                <small>${escapeHtml(shortCity)}</small>
            </button>
        `;
    }).join("");

    document.querySelectorAll(".date-button").forEach((button) => {
        button.addEventListener("click", () => {
            selectedDate = button.dataset.date;
            renderDateStrip();
            renderSelectedDay();
            if (mapMode === "day" && document.querySelector("#map-panel").classList.contains("active")) {
                renderMap();
            }
        });
    });

    requestAnimationFrame(() => {
        document.querySelector(`.date-button[data-date="${selectedDate}"]`)
            ?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    });
};

const renderSelectedDay = () => {
    const day = getDay(selectedDate) || tripData.days[0];
    const items = day.items.map((item) => `
        <li class="timeline-item">
            <div class="timeline-time">${escapeHtml(item.time)}</div>
            <div class="timeline-content">
                <div class="timeline-meta">
                    <span class="type-badge type-${escapeHtml(item.type)}">
                        ${getTypeLabel(item.type)}
                    </span>
                    ${item.fixed ? '<span class="fixed-badge">고정</span>' : ""}
                </div>
                <strong>${escapeHtml(item.title)}</strong>
                ${item.note ? `<p>${escapeHtml(item.note)}</p>` : ""}
            </div>
        </li>
    `).join("");

    selectedDay.innerHTML = `
        <article class="day-detail">
            <div class="day-detail__header">
                <div>
                    <p class="section-kicker">${escapeHtml(day.label)}</p>
                    <h3>${escapeHtml(day.title)}</h3>
                    <p class="day-detail__city">${escapeHtml(day.city)}</p>
                </div>
                <div class="intensity" title="일정 강도 ${day.intensity}/5">
                    ${Array.from({ length: 5 }, (_, index) => (
                        `<span class="intensity-dot ${index < day.intensity ? "active" : ""}"></span>`
                    )).join("")}
                </div>
            </div>
            <ul class="timeline">${items}</ul>
        </article>
    `;
};

const googleMapsUrl = (place) => {
    const query = encodeURIComponent(`${place.lat},${place.lng}`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
};

const renderMapFallback = (places) => {
    if (places.length === 0) {
        mapFallback.innerHTML = '<p class="helper-text">표시할 장소가 아직 없습니다.</p>';
        return;
    }

    mapFallback.innerHTML = places.map((place, index) => `
        <a
            class="place-link"
            href="${googleMapsUrl(place)}"
            target="_blank"
            rel="noopener noreferrer"
        >
            <span>${mapMode === "day" ? `${index + 1}. ` : ""}${escapeHtml(place.name)}</span>
            <small>Maps ↗</small>
        </a>
    `).join("");
};

const getMapPlaces = () => {
    if (mapMode === "all") {
        return tripData.places;
    }
    return getRoutePlaces(selectedDate);
};

const renderMap = () => {
    const mapContainer = document.querySelector("#trip-map");
    const day = getDay(selectedDate);
    const places = getMapPlaces();

    mapDayLabel.textContent = mapMode === "all"
        ? "전체 여행의 주요 장소"
        : `${day?.label || ""} · ${day?.title || ""} · 선은 방문 순서를 나타냅니다.`;

    renderMapFallback(places);

    if (map) {
        map.remove();
        map = null;
    }

    mapContainer.classList.remove("map-error");
    mapContainer.innerHTML = "";

    if (!window.L) {
        mapContainer.classList.add("map-error");
        mapContainer.textContent = "지도를 불러오지 못했습니다. 아래 Google Maps 장소 버튼을 이용해주세요.";
        return;
    }

    if (places.length === 0) {
        mapContainer.classList.add("map-error");
        mapContainer.textContent = "이 날짜의 지도 장소는 아직 등록되지 않았습니다.";
        return;
    }

    try {
        map = L.map("trip-map", {
            scrollWheelZoom: false,
            zoomControl: true
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: "&copy; OpenStreetMap contributors"
        }).addTo(map);

        const bounds = [];

        places.forEach((place, index) => {
            const markerHtml = mapMode === "day"
                ? `<div class="number-marker">${index + 1}</div>`
                : '<div class="number-marker all"></div>';

            const icon = L.divIcon({
                className: "",
                html: markerHtml,
                iconSize: mapMode === "day" ? [30, 30] : [24, 24],
                iconAnchor: mapMode === "day" ? [15, 15] : [12, 12]
            });

            L.marker([place.lat, place.lng], { icon })
                .addTo(map)
                .bindPopup(`
                    <div class="map-popup">
                        <strong>${escapeHtml(place.name)}</strong>
                        <span>${escapeHtml(place.category)} · ${escapeHtml(place.city)}</span>
                        <a href="${googleMapsUrl(place)}" target="_blank" rel="noopener noreferrer">
                            Google Maps에서 열기
                        </a>
                    </div>
                `);

            bounds.push([place.lat, place.lng]);
        });

        if (mapMode === "day" && places.length >= 2) {
            L.polyline(bounds, {
                color: "#5f4635",
                weight: 2,
                opacity: 0.55,
                dashArray: "6 8"
            }).addTo(map);
        }

        if (bounds.length === 1) {
            map.setView(bounds[0], 13);
        } else {
            map.fitBounds(bounds, { padding: [35, 35] });
        }

        setTimeout(() => map?.invalidateSize(), 80);
    } catch (error) {
        console.error("Map initialization failed:", error);
        mapContainer.classList.add("map-error");
        mapContainer.textContent = "지도를 표시하는 중 오류가 발생했습니다. 아래 Google Maps 장소 버튼을 이용해주세요.";
    }
};

const renderBookings = () => {
    const flightTotal = tripData.flights.reduce((sum, item) => sum + item.price, 0);
    const hotelTotal = tripData.hotels.reduce((sum, item) => sum + item.price, 0);

    bookingSummary.innerHTML = `
        <article class="booking-stat">
            <span>FLIGHTS</span>
            <strong>${tripData.flights.length}</strong>
        </article>
        <article class="booking-stat">
            <span>STAYS</span>
            <strong>${tripData.hotels.length}</strong>
        </article>
        <article class="booking-stat">
            <span>CONFIRMED</span>
            <strong>${formatKrw(flightTotal + hotelTotal)}</strong>
        </article>
    `;

    flightList.innerHTML = `
        <h3 class="subsection-title">Flights</h3>
        ${tripData.flights.map((flight) => `
            <article class="booking-card">
                <div class="booking-date">${escapeHtml(flight.date)}</div>
                <div class="booking-content">
                    <strong>${escapeHtml(flight.route)}</strong>
                    <span>${escapeHtml(flight.time)}</span>
                    <small>${escapeHtml(flight.airline)}</small>
                </div>
                <div class="booking-price">${formatKrw(flight.price)}</div>
            </article>
        `).join("")}
    `;

    hotelList.innerHTML = `
        <h3 class="subsection-title">Stays</h3>
        ${tripData.hotels.map((hotel) => `
            <article class="booking-card">
                <div class="booking-date">${escapeHtml(hotel.city.slice(0, 3).toUpperCase())}</div>
                <div class="booking-content">
                    <strong>${escapeHtml(hotel.name)}</strong>
                    <span>${escapeHtml(hotel.dates)}</span>
                    <small>${escapeHtml(hotel.city)}</small>
                </div>
                <div class="booking-price">${formatKrw(hotel.price)}</div>
            </article>
        `).join("")}
    `;
};

const renderBudget = () => {
    const fixedTotal = tripData.budget
        .filter((item) => item.status === "확정")
        .reduce((sum, item) => sum + item.amount, 0);
    const estimatedTotal = tripData.budget.reduce(
        (sum, item) => sum + item.amount,
        0
    );
    const remaining = estimatedTotal - fixedTotal;

    budgetSummary.innerHTML = `
        <article class="budget-highlight">
            <span>현재 확정</span>
            <strong>${formatKrw(fixedTotal)}</strong>
        </article>
        <article class="budget-highlight main">
            <span>예상 총액</span>
            <strong>${formatKrw(estimatedTotal)}</strong>
            <small>쇼핑 제외</small>
        </article>
        <article class="budget-highlight">
            <span>추가 예상</span>
            <strong>${formatKrw(remaining)}</strong>
        </article>
    `;

    budgetList.innerHTML = tripData.budget.map((item) => `
        <div class="budget-row">
            <div>
                <strong>${escapeHtml(item.name)}</strong>
                <span class="status status-${item.status === "확정" ? "fixed" : "estimate"}">
                    ${escapeHtml(item.status)}
                </span>
                ${item.range ? `<p>${escapeHtml(item.range)}</p>` : ""}
            </div>
            <strong>${formatKrw(item.amount)}</strong>
        </div>
    `).join("");
};

const renderShopping = () => {
    shoppingList.innerHTML = tripData.shopping.map((gift, index) => `
        <label class="shopping-item">
            <input type="checkbox" data-gift-id="${index}">
            <span class="shopping-check"></span>
            <span class="shopping-content">
                <strong>${escapeHtml(gift.item)}</strong>
                <span>${escapeHtml(gift.target)}</span>
                <small>${escapeHtml(gift.place)}</small>
            </span>
        </label>
    `).join("");

    document.querySelectorAll("[data-gift-id]").forEach((checkbox) => {
        const storageKey = `honeymoon-gift-${checkbox.dataset.giftId}`;
        checkbox.checked = localStorage.getItem(storageKey) === "true";
        checkbox.addEventListener("change", () => {
            localStorage.setItem(storageKey, checkbox.checked);
        });
    });
};

const activateTab = (tabName) => {
    document.querySelectorAll(".nav-button").forEach((button) => {
        button.classList.toggle("active", button.dataset.tab === tabName);
    });

    document.querySelectorAll(".tab-panel").forEach((panel) => {
        panel.classList.remove("active");
    });

    document.querySelector(`#${tabName}-panel`)?.classList.add("active");

    if (tabName === "schedule") {
        renderDateStrip();
        renderSelectedDay();
    }

    if (tabName === "map") {
        setTimeout(renderMap, 40);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
};

document.querySelectorAll(".nav-button").forEach((button) => {
    button.addEventListener("click", () => activateTab(button.dataset.tab));
});

document.querySelectorAll("[data-go-tab]").forEach((button) => {
    button.addEventListener("click", () => activateTab(button.dataset.goTab));
});

document.querySelector("#jump-today").addEventListener("click", () => {
    selectedDate = tripState.focusDate;
    renderDateStrip();
    renderSelectedDay();
});

document.querySelectorAll(".map-mode").forEach((button) => {
    button.addEventListener("click", () => {
        mapMode = button.dataset.mapMode;
        document.querySelectorAll(".map-mode").forEach((item) => {
            item.classList.toggle("active", item === button);
        });
        renderMap();
    });
});

renderCountdown();
renderHomeFocus();
renderJourney();
renderFixedHighlights();
renderDateStrip();
renderSelectedDay();
renderBookings();
renderBudget();
renderShopping();
