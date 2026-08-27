(() => {
    if (typeof bookingData === "undefined") return;

    const FILTERS = [
        { id: "flights", label: "FLIGHTS", count: bookingData.flights.length, selector: "#flight-list" },
        { id: "stays", label: "STAYS", count: bookingData.hotels.length, selector: "#hotel-list" },
        { id: "tours", label: "TOURS", count: bookingData.tours.length, selector: "#tour-list" },
        { id: "car", label: "CAR", count: bookingData.rental ? 1 : 0, selector: "#rental-list" }
    ];

    let activeFilter = "flights";

    const safe = (value) => (
        typeof escapeHtml === "function" ? escapeHtml(value) : String(value)
    );

    const googleMapsSearchUrl = (query) =>
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

    const createDriveDocumentAction = (documentMeta) => {
        if (documentMeta?.url) {
            const link = document.createElement("a");
            link.className = "booking-action booking-drive-document";
            link.href = documentMeta.url;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.textContent = "예약 내역서 ↗";
            return link;
        }

        const button = document.createElement("button");
        button.type = "button";
        button.className = "booking-action booking-drive-document is-pending";
        button.disabled = true;
        button.textContent = "예약 내역서";
        button.title = documentMeta?.fileName
            ? `${documentMeta.fileName} 파일이 업로드되면 연결됩니다.`
            : "예약 내역서 업로드 후 연결됩니다.";
        return button;
    };

    const syncDriveDocument = (card, documentMeta) => {
        if (!card || !documentMeta) return;
        let row = card.querySelector(".booking-actions");
        if (!row) {
            row = document.createElement("div");
            row.className = "booking-actions";
            card.appendChild(row);
        }

        const signature = `${documentMeta.fileName || ""}|${documentMeta.url || "pending"}`;
        const current = row.querySelector(".booking-drive-document");
        if (current?.dataset.documentSignature === signature) return;
        current?.remove();

        const action = createDriveDocumentAction(documentMeta);
        action.dataset.documentSignature = signature;
        row.appendChild(action);
    };

    const syncStayDocuments = () => {
        [...document.querySelectorAll("#hotel-list .booking-card")].forEach((card, index) => {
            syncDriveDocument(card, bookingData.hotels[index]?.document);
        });
    };

    const syncTourDocuments = () => {
        [...document.querySelectorAll("#tour-list .booking-tour-card")].forEach((card, index) => {
            syncDriveDocument(card, bookingData.tours[index]?.document);
        });
    };

    const renderRental = () => {
        if (!bookingData.rental) return;
        const panel = document.querySelector("#bookings-panel");
        if (!panel) return;

        let list = panel.querySelector("#rental-list");
        if (!list) {
            list = document.createElement("div");
            list.id = "rental-list";
            list.className = "booking-stack booking-rental-stack";
            const tourList = panel.querySelector("#tour-list");
            const hotelList = panel.querySelector("#hotel-list");
            (tourList || hotelList)?.insertAdjacentElement("afterend", list);
        }

        const rental = bookingData.rental;
        list.innerHTML = `
            <h3 class="subsection-title">Rental Car</h3>
            <article class="booking-card booking-rental-card">
                <div class="booking-date">1/22</div>
                <div class="booking-content">
                    <strong>${safe(rental.name)}</strong>
                    <span>${safe(rental.pickup)}</span>
                    <span>${safe(rental.dropoff)}</span>
                    <small>${safe(rental.vehicle)}</small>
                </div>
                <div class="booking-actions">
                    <a class="booking-action" href="${googleMapsSearchUrl(rental.pickupQuery)}" target="_blank" rel="noopener noreferrer">수령 지역 ↗</a>
                    <a class="booking-action" href="${googleMapsSearchUrl(rental.dropoffQuery)}" target="_blank" rel="noopener noreferrer">반납 지역 ↗</a>
                </div>
            </article>
        `;
        syncDriveDocument(list.querySelector(".booking-rental-card"), rental.document);
    };

    const clearLegacyFilterState = () => {
        FILTERS.forEach((filter) => {
            const list = document.querySelector(filter.selector);
            if (!list) return;
            list.hidden = false;
            list.removeAttribute("hidden");
            list.classList.remove("booking-filter-visible", "booking-filter-hidden");
            list.style.removeProperty("display");
            list.removeAttribute("aria-hidden");
        });
    };

    const renderFilterControls = () => {
        const summary = document.querySelector("#booking-summary");
        if (!summary) return;

        summary.innerHTML = FILTERS.map((filter) => `
            <button type="button" class="booking-filter-card" data-booking-filter="${filter.id}" aria-controls="${filter.selector.slice(1)}" aria-pressed="false">
                <span>${filter.label}</span>
                <strong>${filter.count}</strong>
            </button>
        `).join("");

        summary.querySelectorAll("[data-booking-filter]").forEach((button) => {
            button.addEventListener("click", (event) => {
                event.preventDefault();
                event.stopPropagation();
                activeFilter = button.dataset.bookingFilter || "flights";
                applyFilter();
            });
        });
    };

    const applyFilter = () => {
        const panel = document.querySelector("#bookings-panel");
        if (!panel) return;
        panel.dataset.bookingFilter = activeFilter;

        document.querySelectorAll("[data-booking-filter]").forEach((button) => {
            const selected = button.dataset.bookingFilter === activeFilter;
            button.classList.toggle("active", selected);
            button.setAttribute("aria-pressed", String(selected));
        });
    };

    const removeBookingStatuses = () => {
        document.querySelectorAll("#bookings-panel .booking-status").forEach((status) => status.remove());
    };

    const moveUtilitiesToBottom = () => {
        const panel = document.querySelector("#bookings-panel");
        if (!panel) return;
        const apps = panel.querySelector("#booking-app-launcher");
        const privateDrive = panel.querySelector("#private-drive-entry");
        if (apps) panel.appendChild(apps);
        if (privateDrive) panel.appendChild(privateDrive);
    };

    const setActiveTabUi = (tabName) => {
        const hero = document.querySelector(".editorial-hero");
        if (hero) hero.hidden = tabName !== "home";
        document.documentElement.dataset.activeTab = tabName;
    };

    document.querySelectorAll(".nav-button[data-tab]").forEach((button) => {
        button.addEventListener("click", () => setActiveTabUi(button.dataset.tab));
    });

    document.querySelectorAll("[data-go-tab]").forEach((button) => {
        button.addEventListener("click", () => setActiveTabUi(button.dataset.goTab));
    });

    renderRental();
    clearLegacyFilterState();
    renderFilterControls();
    syncStayDocuments();
    syncTourDocuments();
    removeBookingStatuses();
    moveUtilitiesToBottom();
    applyFilter();

    const activeNav = document.querySelector(".nav-button.active[data-tab]");
    setActiveTabUi(activeNav?.dataset.tab || "home");
})();
