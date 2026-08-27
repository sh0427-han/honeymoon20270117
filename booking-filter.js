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

    const removeBookingStatuses = () => {
        document.querySelectorAll("#bookings-panel .booking-status").forEach((status) => status.remove());
    };

    const renderFilterControls = () => {
        const summary = document.querySelector("#booking-summary");
        if (!summary) return;

        if (summary.dataset.bookingFilterReady !== "true") {
            summary.innerHTML = FILTERS.map((filter) => `
                <button
                    type="button"
                    class="booking-filter-card"
                    data-booking-filter="${filter.id}"
                    aria-controls="${filter.selector.slice(1)}"
                    aria-pressed="false"
                >
                    <span>${filter.label}</span>
                    <strong>${filter.count}</strong>
                </button>
            `).join("");
            summary.dataset.bookingFilterReady = "true";

            summary.querySelectorAll("[data-booking-filter]").forEach((button) => {
                button.addEventListener("click", () => {
                    activeFilter = button.dataset.bookingFilter || "flights";
                    applyFilter();
                });
            });
        }
    };

    const applyFilter = () => {
        FILTERS.forEach((filter) => {
            const list = document.querySelector(filter.selector);
            if (!list) return;

            // V20의 hidden 속성이 남아 있더라도 새 필터가 항상 복구할 수 있게 한다.
            list.hidden = false;
            list.removeAttribute("hidden");

            const selected = filter.id === activeFilter;
            list.classList.toggle("booking-filter-visible", selected);
            list.classList.toggle("booking-filter-hidden", !selected);
            list.setAttribute("aria-hidden", String(!selected));
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

        if (apps) panel.appendChild(apps);
        if (privateDrive) panel.appendChild(privateDrive);
    };

    const apply = () => {
        renderFilterControls();
        syncStayDocuments();
        syncTourDocuments();
        removeBookingStatuses();
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
