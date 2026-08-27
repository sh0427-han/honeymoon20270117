(() => {
    const bookingApps = [
        {
            id: "koreanair",
            name: "대한항공 My",
            caption: "항공권 · 체크인 · 탑승권",
            webUrl: "https://www.koreanair.com/",
            androidPackage: "com.koreanair.passenger",
            androidStoreUrl: "https://play.google.com/store/apps/details?id=com.koreanair.passenger",
            iosStoreUrl: "https://apps.apple.com/kr/app/id1512918989"
        },
        {
            id: "trip",
            name: "Trip.com",
            caption: "항공 · 숙소 · 투어 예약 확인",
            webUrl: "https://www.trip.com/",
            androidPackage: "ctrip.english",
            androidStoreUrl: "https://play.google.com/store/apps/details?id=ctrip.english",
            iosStoreUrl: "https://apps.apple.com/kr/app/id681752345"
        },
        {
            id: "airbnb",
            name: "Airbnb",
            caption: "숙소 예약 · 여행 일정",
            webUrl: "https://www.airbnb.com/trips",
            androidPackage: "com.airbnb.android",
            androidStoreUrl: "https://play.google.com/store/apps/details?id=com.airbnb.android",
            iosStoreUrl: "https://apps.apple.com/kr/app/id401626263"
        }
    ];

    const isAndroid = () => /Android/i.test(navigator.userAgent);
    const isIOS = () => /iPhone|iPad|iPod/i.test(navigator.userAgent);

    const buildAndroidIntentUrl = (app) => {
        const url = new URL(app.webUrl);
        const path = `${url.host}${url.pathname}${url.search}`;
        return `intent://${path}#Intent;scheme=https;package=${app.androidPackage};S.browser_fallback_url=${encodeURIComponent(app.webUrl)};end`;
    };

    const openApp = (app) => {
        if (isAndroid()) {
            window.location.href = buildAndroidIntentUrl(app);
            return;
        }
        window.location.href = app.webUrl;
    };

    const getStoreUrl = (app) => {
        if (isAndroid()) return app.androidStoreUrl;
        if (isIOS()) return app.iosStoreUrl;
        return app.webUrl;
    };

    const placeLauncherAtBottom = (section) => {
        const panel = document.querySelector("#bookings-panel");
        if (!panel || !section) return;
        const anchor = panel.querySelector("#tour-list")
            || panel.querySelector("#hotel-list")
            || panel.querySelector("#flight-list")
            || panel.querySelector("#booking-summary");
        if (!anchor) return;
        if (anchor.nextElementSibling !== section) {
            anchor.insertAdjacentElement("afterend", section);
        }
    };

    const renderBookingAppLauncher = () => {
        const bookingSummary = document.querySelector("#booking-summary");
        if (!bookingSummary) return;

        let section = document.querySelector("#booking-app-launcher");
        if (!section) {
            section = document.createElement("section");
            section.id = "booking-app-launcher";
            section.className = "booking-app-launcher";
            section.innerHTML = `
                <div class="booking-app-launcher__head">
                    <div>
                        <p class="section-kicker">MY BOOKING APPS</p>
                        <h3>예약 앱 바로가기</h3>
                    </div>
                    <small>개인 예약정보는 앱에서 확인</small>
                </div>
                <div class="booking-app-grid">
                    ${bookingApps.map((app) => `
                        <article class="booking-app-card" data-booking-app="${app.id}">
                            <div class="booking-app-card__copy">
                                <strong>${app.name}</strong>
                                <span>${app.caption}</span>
                            </div>
                            <div class="booking-app-card__actions">
                                <button type="button" class="booking-app-open" data-open-app="${app.id}">앱/웹 열기</button>
                                <a class="booking-app-store" data-store-app="${app.id}" href="${getStoreUrl(app)}" target="_blank" rel="noopener noreferrer">앱 설치/열기 ↗</a>
                            </div>
                        </article>
                    `).join("")}
                </div>
                <p class="booking-app-helper">Android에서는 설치된 앱 실행을 우선 시도합니다. iPhone은 서비스가 Universal Link를 지원하면 앱으로, 그렇지 않으면 공식 웹으로 열립니다.</p>
            `;

            section.querySelectorAll("[data-open-app]").forEach((button) => {
                button.addEventListener("click", () => {
                    const app = bookingApps.find((item) => item.id === button.dataset.openApp);
                    if (app) openApp(app);
                });
            });
        }

        placeLauncherAtBottom(section);
    };

    const updatePublicBookingCopy = () => {
        const note = document.querySelector("#booking-privacy-note");
        if (!note || note.dataset.publicMode === "true") return;

        note.innerHTML = `
            <strong>Booking Wallet</strong>
            <span>Public GitHub에는 민감한 문서를 저장하지 않습니다. 예약정보는 앱에서 확인하고, 여권·확인서 등은 Google Drive의 ‘제한됨’ 폴더를 본인/배우자 계정에만 공유해 연결할 수 있습니다.</span>
        `;
        note.dataset.publicMode = "true";
    };

    const hidePublicDocumentActions = () => {
        document.querySelectorAll(".booking-action--document").forEach((element) => element.remove());
    };

    const apply = () => {
        updatePublicBookingCopy();
        renderBookingAppLauncher();
        hidePublicDocumentActions();
    };

    apply();

    let queued = false;
    const observer = new MutationObserver(() => {
        if (queued) return;
        queued = true;
        requestAnimationFrame(() => {
            queued = false;
            apply();
        });
    });

    const bookingsPanel = document.querySelector("#bookings-panel");
    if (bookingsPanel) observer.observe(bookingsPanel, { childList: true, subtree: true });
})();
