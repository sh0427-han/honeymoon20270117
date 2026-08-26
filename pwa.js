(() => {
    let deferredInstallPrompt = null;

    const isStandalone = () => (
        window.matchMedia?.("(display-mode: standalone)").matches
        || window.navigator.standalone === true
    );

    const isIos = () => /iphone|ipad|ipod/i.test(navigator.userAgent)
        || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    const isSafari = () => /safari/i.test(navigator.userAgent)
        && !/crios|fxios|edgios|chrome|android/i.test(navigator.userAgent);

    const registerServiceWorker = async () => {
        if (!("serviceWorker" in navigator)) return;
        try {
            await navigator.serviceWorker.register("./service-worker.js", { scope: "./" });
        } catch (error) {
            console.warn("Service worker registration failed:", error);
        }
    };

    const ensureNetworkBadge = () => {
        let badge = document.querySelector("#network-status-badge");
        if (!badge) {
            badge = document.createElement("div");
            badge.id = "network-status-badge";
            badge.className = "network-status-badge";
            badge.setAttribute("role", "status");
            badge.setAttribute("aria-live", "polite");
            document.body.appendChild(badge);
        }
        return badge;
    };

    const updateNetworkStatus = () => {
        const badge = ensureNetworkBadge();
        const offline = !navigator.onLine;
        badge.classList.toggle("is-offline", offline);
        badge.hidden = !offline;
        badge.innerHTML = offline
            ? "<strong>OFFLINE</strong><span>일정은 사용 가능 · 지도/외부 앱은 인터넷 필요</span>"
            : "";
        document.documentElement.dataset.network = offline ? "offline" : "online";
    };

    const getInstallCopy = () => {
        if (isStandalone()) {
            return {
                kicker: "INSTALLED",
                title: "홈 화면 앱으로 사용 중",
                body: "일정 데이터는 오프라인에서도 열립니다. 지도와 Google Maps, 예약 앱 연결은 인터넷이 필요합니다.",
                action: null
            };
        }

        if (isIos()) {
            return {
                kicker: "ADD TO HOME SCREEN",
                title: "iPhone 홈 화면에 추가",
                body: isSafari()
                    ? "Safari 하단 공유 버튼 → ‘홈 화면에 추가’를 선택하면 앱처럼 실행할 수 있습니다."
                    : "iPhone에서는 Safari로 이 페이지를 연 뒤 공유 → ‘홈 화면에 추가’를 선택하세요.",
                action: null
            };
        }

        if (deferredInstallPrompt) {
            return {
                kicker: "INSTALL APP",
                title: "신혼여행 앱으로 설치",
                body: "홈 화면에서 바로 열고, 통신이 불안정해도 일정과 예약 구조를 확인할 수 있습니다.",
                action: "install"
            };
        }

        return {
            kicker: "OFFLINE READY",
            title: "일정 오프라인 사용 준비",
            body: "한 번 온라인에서 열어두면 일정·예약 구조·선물 체크리스트를 캐시해 오프라인에서도 다시 열 수 있습니다.",
            action: null
        };
    };

    const renderInstallCard = () => {
        const morePanel = document.querySelector("#more-panel");
        if (!morePanel) return;

        let card = morePanel.querySelector("#pwa-install-card");
        if (!card) {
            card = document.createElement("section");
            card.id = "pwa-install-card";
            card.className = "pwa-install-card";
            const heading = morePanel.querySelector(".section-heading");
            heading?.insertAdjacentElement("afterend", card);
        }

        const copy = getInstallCopy();
        card.innerHTML = `
            <div class="pwa-install-card__icon" aria-hidden="true">S&amp;J</div>
            <div class="pwa-install-card__content">
                <p>${copy.kicker}</p>
                <strong>${copy.title}</strong>
                <span>${copy.body}</span>
            </div>
            ${copy.action === "install" ? '<button type="button" id="pwa-install-button">앱 설치</button>' : ""}
        `;

        card.querySelector("#pwa-install-button")?.addEventListener("click", async () => {
            if (!deferredInstallPrompt) return;
            deferredInstallPrompt.prompt();
            try {
                await deferredInstallPrompt.userChoice;
            } finally {
                deferredInstallPrompt = null;
                renderInstallCard();
            }
        });
    };

    window.addEventListener("beforeinstallprompt", (event) => {
        event.preventDefault();
        deferredInstallPrompt = event;
        renderInstallCard();
    });

    window.addEventListener("appinstalled", () => {
        deferredInstallPrompt = null;
        renderInstallCard();
    });

    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);

    document.addEventListener("click", (event) => {
        if (event.target.closest('[data-tab="more"], [data-go-tab="more"]')) {
            window.setTimeout(renderInstallCard, 40);
        }
    }, true);

    registerServiceWorker();
    updateNetworkStatus();
    renderInstallCard();
})();
