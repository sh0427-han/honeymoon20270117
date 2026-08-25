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

const scheduleList = document.querySelector("#schedule-list");
const cityFilter = document.querySelector("#city-filter");
const flightList = document.querySelector("#flight-list");
const hotelList = document.querySelector("#hotel-list");
const budgetSummary = document.querySelector("#budget-summary");
const budgetList = document.querySelector("#budget-list");
const shoppingList = document.querySelector("#shopping-list");

const renderCityFilter = () => {
    tripData.cities.forEach((city) => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        cityFilter.appendChild(option);
    });
};

const renderSchedule = (city = "all") => {
    const days = city === "all"
        ? tripData.days
        : tripData.days.filter((day) => day.city === city);

    scheduleList.innerHTML = days.map((day) => {
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

        return `
            <article class="day-card ${day.fixed ? "day-card--fixed" : ""}">
                <div class="day-card__header">
                    <div>
                        <p class="day-date">${escapeHtml(day.label)}</p>
                        <h3>${escapeHtml(day.title)}</h3>
                        <p class="day-city">${escapeHtml(day.city)}</p>
                    </div>
                    <div class="intensity" title="일정 강도">
                        ${Array.from({ length: 5 }, (_, index) => (
                            `<span class="intensity-dot ${index < day.intensity ? "active" : ""}"></span>`
                        )).join("")}
                    </div>
                </div>
                <ul class="timeline">${items}</ul>
            </article>
        `;
    }).join("");
};

const renderFlights = () => {
    flightList.innerHTML = `
        <h3 class="subsection-title">항공</h3>
        ${tripData.flights.map((flight) => `
            <article class="info-card">
                <div class="info-card__top">
                    <span class="info-label">${escapeHtml(flight.date)}</span>
                    <strong>${formatKrw(flight.price)}</strong>
                </div>
                <h4>${escapeHtml(flight.route)}</h4>
                <p>${escapeHtml(flight.time)}</p>
                <p>${escapeHtml(flight.airline)}</p>
            </article>
        `).join("")}
    `;
};

const renderHotels = () => {
    hotelList.innerHTML = `
        <h3 class="subsection-title">숙소</h3>
        ${tripData.hotels.map((hotel) => `
            <article class="info-card">
                <div class="info-card__top">
                    <span class="info-label">${escapeHtml(hotel.city)}</span>
                    <strong>${formatKrw(hotel.price)}</strong>
                </div>
                <h4>${escapeHtml(hotel.name)}</h4>
                <p>${escapeHtml(hotel.dates)}</p>
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

    budgetSummary.innerHTML = `
        <article class="budget-highlight">
            <span>현재 확정</span>
            <strong>${formatKrw(fixedTotal)}</strong>
        </article>
        <article class="budget-highlight budget-highlight--main">
            <span>예상 총액</span>
            <strong>${formatKrw(estimatedTotal)}</strong>
            <small>쇼핑 비용 제외 · 2인 기준</small>
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

let map;
const initializeMap = () => {
    if (map) {
        setTimeout(() => map.invalidateSize(), 50);
        return;
    }

    map = L.map("trip-map", {
        scrollWheelZoom: false
    }).setView([-39.3, 169.5], 4);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    const bounds = [];
    tripData.places.forEach((place) => {
        const query = encodeURIComponent(`${place.name}, ${place.city}`);
        const marker = L.marker([place.lat, place.lng]).addTo(map);
        marker.bindPopup(`
            <div class="map-popup">
                <strong>${escapeHtml(place.name)}</strong>
                <span>${escapeHtml(place.category)} · ${escapeHtml(place.city)}</span>
                <a
                    href="https://www.google.com/maps/search/?api=1&query=${query}"
                    target="_blank"
                    rel="noopener noreferrer"
                >Google Maps에서 열기</a>
            </div>
        `);
        bounds.push([place.lat, place.lng]);
    });

    if (bounds.length > 0) {
        map.fitBounds(bounds, { padding: [30, 30] });
    }
};

const activateTab = (tabName) => {
    document.querySelectorAll(".tab-button").forEach((button) => {
        button.classList.toggle("active", button.dataset.tab === tabName);
    });
    document.querySelectorAll(".tab-panel").forEach((panel) => {
        panel.classList.remove("active");
    });
    document.querySelector(`#${tabName}-panel`).classList.add("active");

    if (tabName === "map") {
        initializeMap();
    }
};

document.querySelectorAll(".tab-button").forEach((button) => {
    button.addEventListener("click", () => activateTab(button.dataset.tab));
});

cityFilter.addEventListener("change", () => renderSchedule(cityFilter.value));

renderCityFilter();
renderSchedule();
renderFlights();
renderHotels();
renderBudget();
renderShopping();
