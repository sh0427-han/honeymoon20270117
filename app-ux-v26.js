(() => {
    const TAB_NAMES = ["home", "schedule", "bookings", "more"];

    const syncPanelVisibility = (tabName) => {
        TAB_NAMES.forEach((name) => {
            const panel = document.querySelector(`#${name}-panel`);
            if (!panel) return;
            const active = name === tabName;
            panel.hidden = !active;
            panel.setAttribute("aria-hidden", String(!active));
        });
    };

    const homeFocus = document.querySelector("#home-focus");
    if (homeFocus) homeFocus.hidden = true;

    const handleTabEntry = (tabName) => {
        syncPanelVisibility(tabName);
    };

    document.querySelectorAll(".nav-button[data-tab]").forEach((button) => {
        button.addEventListener("click", () => handleTabEntry(button.dataset.tab));
    });

    document.querySelectorAll("[data-go-tab]").forEach((button) => {
        button.addEventListener("click", () => handleTabEntry(button.dataset.goTab));
    });

    const activeNav = document.querySelector(".nav-button.active[data-tab]");
    syncPanelVisibility(activeNav?.dataset.tab || "home");
})();
