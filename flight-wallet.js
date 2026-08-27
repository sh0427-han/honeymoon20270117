(() => {
    if (typeof bookingData === "undefined") return;

    const createTicketAction = (label, ticket) => {
        if (ticket?.url) {
            const link = document.createElement("a");
            link.className = "booking-action flight-ticket-action";
            link.href = ticket.url;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.textContent = `${label} ↗`;
            return link;
        }

        const button = document.createElement("button");
        button.type = "button";
        button.className = "booking-action flight-ticket-action is-pending";
        button.disabled = true;
        button.textContent = label;
        button.title = ticket?.fileName
            ? `Google Drive에 ${ticket.fileName} 파일이 업로드되면 연결됩니다.`
            : "티켓 파일 업로드 후 연결됩니다.";
        return button;
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

            const signature = [
                meta.tickets?.sanghun?.url || "pending",
                meta.tickets?.jinyeong?.url || "pending"
            ].join("|");

            if (row.dataset.flightWalletSignature === signature) return;

            row.replaceChildren();
            row.appendChild(createTicketAction("🐶상훈이 티켓", meta.tickets?.sanghun));
            row.appendChild(createTicketAction("🐯진영이 티켓", meta.tickets?.jinyeong));

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
