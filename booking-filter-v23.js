(() => {
    if (typeof bookingData === "undefined") return;

    const FILTERS = [
        { id: "flights", label: "FLIGHTS", count: bookingData.flights.length, selector: "#flight-list" },
        { id: "stays", label: "STAYS", count: bookingData.hotels.length, selector: "#hotel-list" },
        { id: "tours", label: "TOURS", count: bookingData.tours.length, selector: "#tour-list" }
    ];

    let activeFilter = "flights";

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

        if (apps && privateDrive) {
            if (privateDrive.previousElementSibling !== apps) panel.insertBefore(apps, privateDrive);
            if (privateDrive.nextElementSibling !== null) panel.appendChild(privateDrive);
            return;
        }

        if (apps && apps.nextElementSibling !== null) panel.appendChild(apps);
        if (privateDrive && privateDrive.nextElementSibling !== null) panel.appendChild(privateDrive);
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
