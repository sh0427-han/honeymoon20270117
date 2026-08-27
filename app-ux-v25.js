(() => {
    const homeFocus = document.querySelector("#home-focus");
    if (homeFocus) homeFocus.hidden = true;

    const syncScheduleToCurrentDay = () => {
        if (window.tripClock?.syncAppState) {
            window.tripClock.syncAppState({ force: true });
            return;
        }

        if (typeof getTripState === "function") {
            const state = getTripState();
            if (typeof selectedDate !== "undefined") selectedDate = state.focusDate;
            if (typeof selectedSchedulePlaceName !== "undefined") selectedSchedulePlaceName = null;
            if (typeof renderDateStrips === "function") renderDateStrips();
            if (typeof renderSelectedDay === "function") renderSelectedDay();
        }
    };

    const bindScheduleEntry = (button) => {
        button.addEventListener("click", () => {
            window.setTimeout(syncScheduleToCurrentDay, 0);
        });
    };

    document.querySelectorAll('[data-tab="schedule"], [data-go-tab="schedule"]').forEach(bindScheduleEntry);
})();
