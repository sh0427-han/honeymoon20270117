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

    const forceBookingPanelReflow = () => {
        const panel = document.querySelector("#bookings-panel");
        if (!panel?.classList.contains("active")) return;

        // 모바일 브라우저/PWA에서 자식 display 전환이 즉시 paint되지 않는 경우를 방지한다.
        panel.style.display = "none";
        void panel.offsetHeight;
        panel.style.removeProperty("display");
        void panel.offsetHeight;
    };

    const renderFilterControls = () => {
        const summary = document.querySelector("#booking-summary");
        if (!summary) return;

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
                applyFilter(true);
            });
        });
    };

    const applyFilter = (forceReflow = false) => {
        FILTERS.forEach((filter) => {
            const list = document.querySelector(filter.selector);
            if (!list) return;

            const selected = filter.id === activeFilter;

            // 과거 버전의 hidden/class 상태를 모두 무시하고 inline display를 canonical 상태로 둔다.
            list.hidden = false;
            list.removeAttribute("hidden");
            list.classList.remove("booking-filter-visible", "booking-filter-hidden");
            list.style.setProperty("display", selected ? "grid" : "none", "important");
            list.setAttribute("aria-hidden", String(!selected));
        });

        document.querySelectorAll("[data-booking-filter]").forEach((button) => {
            const selected = button.dataset.bookingFilter === activeFilter;
            button.classList.toggle("active", selected);
            button.setAttribute("aria-pressed", String(selected));
        });

        const panel = document.querySelector("#bookings-panel");
        if (panel) panel.dataset.bookingFilter = activeFilter;

        if (forceReflow) forceBookingPanelReflow();
    };

    const moveUtilitiesToBottom = () => {
        const panel = document.querySelector("#bookings-panel");
        if (!panel) return;

        const apps = panel.querySelector("#booking-app-launcher");
        const privateDrive = panel.querySelector("#private-drive-entry");

        if (apps && privateDrive) {
            if (privateDrive.previousElementSibling !== apps) {
                panel.insertBefore(apps, privateDrive);
            }
            if (privateDrive.nextElementSibling !== null) {
                panel.appendChild(privateDrive);
            }
            return;
        }

        if (apps && apps.nextElementSibling !== null) panel.appendChild(apps);
        if (privateDrive && privateDrive.nextElementSibling !== null) panel.appendChild(privateDrive);
    };

    const initialize = () => {
        renderFilterControls();
        syncStayDocuments();
        syncTourDocuments();
        removeBookingStatuses();
        moveUtilitiesToBottom();
        applyFilter(false);
    };

    // 이 스크립트는 booking 관련 렌더러들보다 마지막에 로드된다.
    // 따라서 MutationObserver로 다시 쓰지 않고 한 번 초기화하여 필터 상태 경쟁을 없앤다.
    initialize();
})();
