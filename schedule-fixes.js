(() => {
    const SYDNEY_HOTEL = "Meriton Suites Campbell Street";

    const registerSydneyHotelScheduleMapping = () => {
        if (typeof schedulePlaceOverrides === "undefined") return;
        schedulePlaceOverrides["2027-01-17|22:00"] = SYDNEY_HOTEL;
    };

    const ensureSydneyHotelMarker = () => {
        if (
            typeof selectedDate === "undefined" ||
            selectedDate !== "2027-01-17" ||
            typeof scheduleMap === "undefined" ||
            !scheduleMap ||
            typeof scheduleMarkers === "undefined" ||
            typeof findPlace !== "function" ||
            typeof makeScheduleMarkerIcon !== "function" ||
            typeof googleMapsPlaceUrl !== "function" ||
            typeof escapeHtml !== "function" ||
            !window.L
        ) {
            return;
        }

        if (scheduleMarkers.has(SYDNEY_HOTEL)) return;

        const place = findPlace(SYDNEY_HOTEL);
        if (!place || !Number.isFinite(place.lat) || !Number.isFinite(place.lng)) return;

        const number = scheduleMarkers.size + 1;
        const isActive = typeof selectedSchedulePlaceName !== "undefined" && selectedSchedulePlaceName === place.name;
        const marker = L.marker([place.lat, place.lng], {
            icon: makeScheduleMarkerIcon(number, isActive)
        }).addTo(scheduleMap);

        marker.bindPopup(`
            <div class="schedule-map-popup">
                <small>${escapeHtml(place.category || "숙소")}</small>
                <strong>${escapeHtml(place.name)}</strong>
                <a href="${googleMapsPlaceUrl(place)}" target="_blank" rel="noopener noreferrer">Google Maps ↗</a>
            </div>
        `);

        marker.on("click", () => {
            selectedSchedulePlaceName = place.name;
            if (typeof updateScheduleTimelineSelection === "function") {
                updateScheduleTimelineSelection();
            }
            if (typeof focusScheduleMapPlace === "function") {
                focusScheduleMapPlace(place, false);
            }
        });

        scheduleMarkers.set(place.name, { marker, number });

        if (isActive && typeof focusScheduleMapPlace === "function") {
            focusScheduleMapPlace(place, false);
        }
    };

    registerSydneyHotelScheduleMapping();

    const schedulePanel = document.querySelector("#schedule-panel");
    if (schedulePanel) {
        const observer = new MutationObserver(() => {
            window.setTimeout(ensureSydneyHotelMarker, 70);
        });
        observer.observe(schedulePanel, { childList: true, subtree: true });
    }

    document.addEventListener("click", (event) => {
        if (event.target.closest('[data-tab="schedule"], #date-strip .date-button')) {
            window.setTimeout(ensureSydneyHotelMarker, 160);
        }
    }, true);

    window.setTimeout(ensureSydneyHotelMarker, 160);
})();
