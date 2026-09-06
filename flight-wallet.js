(() => {
    if (typeof bookingData === "undefined") return;

    const createDocumentAction = (label, documentMeta) => {
        if (documentMeta?.url) {
            const link = document.createElement("a");
            link.className = "booking-action flight-ticket-action";
            link.href = documentMeta.url;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.textContent = `${label} ↗`;
            link.title = documentMeta.fileName || label;
            return link;
        }

        const button = document.createElement("button");
        button.type = "button";
        button.className = "booking-action flight-ticket-action is-pending";
        button.disabled = true;
        button.textContent = label;
        button.title = documentMeta?.fileName
            ? `Google Drive에 ${documentMeta.fileName} 파일이 업로드되면 연결됩니다.`
            : "문서 파일 업로드 후 연결됩니다.";
        return button;
    };

    const getFlightDocuments = (meta) => {
        const shared = Array.isArray(meta?.sharedDocuments)
            ? meta.sharedDocuments.filter(Boolean)
            : [];

        // 공용 예약 문서가 있는 Air NZ 노선은 존재하지 않는 승객별 placeholder 대신
        // 실제 공용 문서만 노출한다.
        if (shared.length) {
            return shared.map((documentMeta) => ({
                label: documentMeta.label || "항공 문서",
                documentMeta
            }));
        }

        const actions = [
            { label: "🐶 상훈이 티켓", documentMeta: meta?.tickets?.sanghun },
            { label: "🐶 상훈 영수증", documentMeta: meta?.receipts?.sanghun },
            { label: "🐯 진영이 티켓", documentMeta: meta?.tickets?.jinyeong },
            { label: "🐯 진영 영수증", documentMeta: meta?.receipts?.jinyeong }
        ];

        return actions.filter(({ documentMeta }) => Boolean(documentMeta));
    };

    const enhanceFlightWallet = () => {
        const cards = [...document.querySelectorAll("#flight-list .booking-card")];
        if (!cards.length) return;

        cards.forEach((card, index) => {
            const meta = bookingData.flights[index];
            if (!meta) return;

            let row = card.querySelector(".booking-actions");
            if (!row) {
                row = document.createElement("div");
                row.className = "booking-actions";
                card.appendChild(row);
            }

            const documents = getFlightDocuments(meta);
            const signature = documents.map(({ label, documentMeta }) => [
                label,
                documentMeta?.fileName || "",
                documentMeta?.url || "pending"
            ].join(":")).join("|");

            if (row.dataset.flightWalletSignature === signature) return;

            row.replaceChildren();
            documents.forEach(({ label, documentMeta }) => {
                row.appendChild(createDocumentAction(label, documentMeta));
            });

            row.dataset.flightWalletSignature = signature;
            card.dataset.flightWallet = "true";
        });
    };

    enhanceFlightWallet();

    let queued = false;
    const flightList = document.querySelector("#flight-list");
    if (flightList) {
        const observer = new MutationObserver(() => {
            if (queued) return;
            queued = true;
            requestAnimationFrame(() => {
                queued = false;
                enhanceFlightWallet();
            });
        });
        observer.observe(flightList, { childList: true, subtree: true });
    }
})();
