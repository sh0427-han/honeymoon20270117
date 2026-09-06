(() => {
    const forcePassengerTicketStack = () => {
        const cards = [...document.querySelectorAll("#flight-list .booking-card")];
        if (!cards.length) return;

        cards.forEach((card, index) => {
            if (![0, 3].includes(index)) return;

            const row = card.querySelector(".booking-actions");
            const tickets = row ? [...row.querySelectorAll(".flight-ticket-action")] : [];
            if (!row || tickets.length < 2) return;

            card.dataset.passengerTicketsStacked = "true";
            row.dataset.passengerTicketStack = "v35";

            row.style.setProperty("display", "flex", "important");
            row.style.setProperty("flex-direction", "column", "important");
            row.style.setProperty("flex-wrap", "nowrap", "important");
            row.style.setProperty("align-items", "stretch", "important");
            row.style.setProperty("width", "100%", "important");
            row.style.setProperty("max-width", "100%", "important");
            row.style.setProperty("overflow-x", "hidden", "important");
            row.style.setProperty("overflow-y", "visible", "important");
            row.style.setProperty("gap", "8px", "important");

            tickets.forEach((ticket) => {
                ticket.style.setProperty("display", "flex", "important");
                ticket.style.setProperty("width", "100%", "important");
                ticket.style.setProperty("max-width", "100%", "important");
                ticket.style.setProperty("min-width", "0", "important");
                ticket.style.setProperty("flex", "0 0 auto", "important");
                ticket.style.setProperty("box-sizing", "border-box", "important");
                ticket.style.setProperty("justify-content", "center", "important");
                ticket.style.setProperty("white-space", "normal", "important");
            });
        });

        document.documentElement.dataset.flightStack = "v35";
    };

    forcePassengerTicketStack();
    window.requestAnimationFrame(forcePassengerTicketStack);
    window.setTimeout(forcePassengerTicketStack, 100);
    window.setTimeout(forcePassengerTicketStack, 500);

    const flightList = document.querySelector("#flight-list");
    if (flightList) {
        let queued = false;
        const observer = new MutationObserver(() => {
            if (queued) return;
            queued = true;
            window.requestAnimationFrame(() => {
                queued = false;
                forcePassengerTicketStack();
            });
        });
        observer.observe(flightList, { childList: true, subtree: true });
    }

    document.addEventListener("click", (event) => {
        if (event.target.closest('[data-booking-filter="flights"], [data-tab="bookings"], [data-go-tab="bookings"]')) {
            window.setTimeout(forcePassengerTicketStack, 0);
            window.setTimeout(forcePassengerTicketStack, 120);
        }
    }, true);
})();
