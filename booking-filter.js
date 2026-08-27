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
            ? `Google Drive에 ${documentMeta.fileName} 파일이 업로드되면 연결됩니다.`
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

    const renderFilterControls = () => {
        const summary = document.querySelector("#booking-summary");
        if (!summary) return;

        if (summary.dataset.bookingFilterReady !== "true") {
            summary.innerHTML = FILTERS.map((filter) => `
                <button type="button" class="booking-filter-card" data-booking-filter="${filter.id}" aria-pressed="false">
                    <span>${filter.label}</span>
                    <strong>${filter.count}</strong>
                    <small>보기</small>
                </button>
            `).join("");
            summary.dataset.bookingFilterReady = "true";

            summary.querySelectorAll("[data-booking-filter]").forEach((button) => {
                button.addEventListener("click", () => {
                    activeFilter = button.dataset.bookingFilter;
                    applyFilter();
                });
            });
        }
    };

    const applyFilter = () => {
        FILTERS.forEach((filter) => {
            const list = document.querySelector(filter.selector);
            if (list) list.hidden = filter.id !== activeFilter;
        });

        document.querySelectorAll("[data-booking-filter]").forEach((button) => {
            const selected = button.dataset.bookingFilter === activeFilter;
            button.classList.toggle("active", selected);
            button.setAttribute("aria-pressed", String(selected));
        });

        const panel = document.querySelector("#bookings-panel");
        if (panel) panel.dataset.bookingFilter = activeFilter;
    };

    const moveUtilitiesToBottom = () => {
        const panel = document.querySelector("#bookings-panel");
        if (!panel) return;

        const apps = panel.querySelector("#booking-app-launcher");
        const privateDrive = panel.querySelector("#private-drive-entry");

        if (apps && privateDrive) {
            if (apps.nextElementSibling !== privateDrive) panel.insertBefore(apps, privateDrive);
            if (privateDrive.nextElementSibling !== null) panel.appendChild(privateDrive);
            return;
        }

        if (apps && apps.nextElementSibling !== null) panel.appendChild(apps);
        if (privateDrive && privateDrive.nextElementSibling !== null) panel.appendChild(privateDrive);
    };

    const apply = () => {
        renderFilterControls();
        syncStayDocuments();
        syncTourDocuments();
        applyFilter();
        moveUtilitiesToBottom();
    };

    apply();

    let queued = false;
    const panel = document.querySelector("#bookings-panel");
    if (panel) {
        const observer = new MutationObserver(() => {
            if (queued) return;
            queued = true;
            requestAnimationFrame(() => {
                queued = false;
                apply();
            });
        });
        observer.observe(panel, { childList: true, subtree: true });
    }
})();
