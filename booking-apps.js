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

        // iOS에서는 Universal Link/App Link가 등록된 서비스라면 앱으로 열리고,
        // 그렇지 않으면 공식 모바일 웹으로 안전하게 fallback 된다.
        window.location.href = app.webUrl;
    };

    const getStoreUrl = (app) => {
        if (isAndroid()) return app.androidStoreUrl;
        if (isIOS()) return app.iosStoreUrl;
        return app.webUrl;
    };

    const renderBookingAppLauncher = () => {
        const bookingSummary = document.querySelector("#booking-summary");
        if (!bookingSummary || document.querySelector("#booking-app-launcher")) return;

        const section = document.createElement("section");
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

        const privacyNote = document.querySelector("#booking-privacy-note");
        if (privacyNote) {
            privacyNote.insertAdjacentElement("afterend", section);
        } else {
            bookingSummary.insertAdjacentElement("afterend", section);
        }

        section.querySelectorAll("[data-open-app]").forEach((button) => {
            button.addEventListener("click", () => {
                const app = bookingApps.find((item) => item.id === button.dataset.openApp);
                if (app) openApp(app);
            });
        });
    };

    const updatePublicBookingCopy = () => {
        const note = document.querySelector("#booking-privacy-note");
        if (!note || note.dataset.publicMode === "true") return;

        note.innerHTML = `
            <strong>Booking Wallet</strong>
            <span>이 사이트는 Public GitHub Pages로 운영합니다. 예약번호·QR·확인서·개인정보는 저장하지 않고, 필요한 예약정보는 휴대폰 앱에서 확인합니다.</span>
        `;
        note.dataset.publicMode = "true";
    };

    const hideDocumentActions = () => {
        document.querySelectorAll(".booking-action--document").forEach((element) => element.remove());
    };

    const apply = () => {
        updatePublicBookingCopy();
        renderBookingAppLauncher();
        hideDocumentActions();
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
