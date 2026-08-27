(() => {
    const hero = document.querySelector(".editorial-hero");
    if (!hero) return;

    const setActiveTabUi = (tabName) => {
        const isHome = tabName === "home";
        hero.hidden = !isHome;
        document.documentElement.dataset.activeTab = tabName;
    };

    document.querySelectorAll(".nav-button[data-tab]").forEach((button) => {
        button.addEventListener("click", () => setActiveTabUi(button.dataset.tab));
    });

    document.querySelectorAll("[data-go-tab]").forEach((button) => {
        button.addEventListener("click", () => setActiveTabUi(button.dataset.goTab));
    });

    const activeNav = document.querySelector(".nav-button.active[data-tab]");
    setActiveTabUi(activeNav?.dataset.tab || "home");
})();
