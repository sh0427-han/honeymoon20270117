(() => {
    if (typeof bookingData === "undefined") return;

    const APP_CONFIG = {
        koreanair: {
            label: "대한항공 앱",
            webUrl: "https://www.koreanair.com/",
            androidPackage: "com.koreanair.passenger"
        },
        trip: {
            label: "Trip.com",
            webUrl: "https://www.trip.com/",
            androidPackage: "ctrip.english"
        }
    };

    const isAndroid = () => /Android/i.test(navigator.userAgent);

    const androidIntentUrl = (app) => {
        const url = new URL(app.webUrl);
        const path = `${url.host}${url.pathname}${url.search}`;
        return `intent://${path}#Intent;scheme=https;package=${app.androidPackage};S.browser_fallback_url=${encodeURIComponent(app.webUrl)};end`;
    };

    const openBookingApp = (appId) => {
        const app = APP_CONFIG[appId];
        if (!app) return;
        window.location.href = isAndroid() ? androidIntentUrl(app) : app.webUrl;
    };

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

    const createAppAction = (appId) => {
        const app = APP_CONFIG[appId];
        if (!app) return null;

        const button = document.createElement("button");
        button.type = "button";
        button.className = "booking-action flight-app-action";
        button.textContent = `${app.label} 이동`;
        button.addEventListener("click", () => openBookingApp(appId));
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
                meta.tickets?.jinyeong?.url || "pending",
                meta.bookingApp || ""
            ].join("|");

            if (row.dataset.flightWalletSignature === signature) return;

            row.replaceChildren();
            row.appendChild(createTicketAction("내 티켓", meta.tickets?.sanghun));
            row.appendChild(createTicketAction("여자친구 티켓", meta.tickets?.jinyeong));

            const appAction = createAppAction(meta.bookingApp);
            if (appAction) row.appendChild(appAction);

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
