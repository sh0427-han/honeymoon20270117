(() => {
    const SPECIAL_SEGMENTS = {
        "2027-01-17": [
            {
                mode: "ground",
                places: [
                    "용인동백 두산위브더제니스",
                    "인천국제공항 제2여객터미널",
                    "대한항공 프레스티지 라운지(서편)"
                ]
            },
            { mode: "flight", label: "✈ ICN → SYD" },
            {
                mode: "ground",
                places: ["Sydney Airport", "Meriton Suites Campbell Street"]
            }
        ],
        "2027-01-20": [
            {
                mode: "ground",
                places: ["Meriton Suites Campbell Street", "Sydney Airport"]
            },
            { mode: "flight", label: "✈ SYD → ZQN" },
            {
                mode: "ground",
                places: ["Queenstown Airport", "Queenstown Lakeview"]
            }
        ],
        "2027-01-26": [
            {
                mode: "ground",
                places: ["BreakFree on Cashel", "Christchurch Airport"]
            },
            { mode: "flight", label: "✈ CHC → AKL" },
            {
                mode: "ground",
                places: [
                    "Auckland Airport",
                    "Hilton Auckland",
                    "Commercial Bay",
                    "Viaduct Harbour"
                ]
            }
        ],
        "2027-01-28": [
            {
                mode: "ground",
                places: ["Hilton Auckland", "Downtown Ferry Terminal"]
            },
            {
                mode: "ferry",
                label: "⛴ FERRY",
                places: ["Downtown Ferry Terminal", "Waiheke Island", "Downtown Ferry Terminal"]
            },
            {
                mode: "ground",
                places: ["Downtown Ferry Terminal", "Hilton Auckland"]
            }
        ]
    };

    const compactLabels = {
        "용인동백 두산위브더제니스": "집",
        "인천국제공항 제2여객터미널": "인천공항 T2",
        "대한항공 프레스티지 라운지(서편)": "라운지",
        "Meriton Suites Campbell Street": "Meriton",
        "Queenstown Lakeview": "Lakeview",
        "Edgewater Wanaka": "Edgewater",
        "BreakFree on Cashel": "BreakFree",
        "Hilton Auckland": "Hilton",
        "Downtown Ferry Terminal": "Ferry Terminal"
    };

    const getPlan = (date) => {
        if (SPECIAL_SEGMENTS[date]) return SPECIAL_SEGMENTS[date];
        const names = typeof routePlaceNamesByDate !== "undefined"
            ? routePlaceNamesByDate[date] || []
            : [];
        return [{ mode: "ground", places: names }];
    };

    const getDrawableSegments = (date) => getPlan(date)
        .filter((segment) => Array.isArray(segment.places) && segment.places.length > 0);

    const getUniquePlanPlaces = (date) => {
        const seen = new Set();
        const result = [];
        getDrawableSegments(date).forEach((segment) => {
            segment.places.forEach((name) => {
                if (seen.has(name)) return;
                const place = typeof findPlace === "function" ? findPlace(name) : null;
                if (!place) return;
                seen.add(name);
                result.push(place);
            });
        });
        return result;
    };

    const getNumberMap = (date) => {
        const map = new Map();
        getUniquePlanPlaces(date).forEach((place, index) => map.set(place.name, index + 1));
        return map;
    };

    const registerScheduleMappings = () => {
        if (typeof schedulePlaceOverrides === "undefined") return;
        schedulePlaceOverrides["2027-01-17|20:05"] = "Sydney Airport";
        schedulePlaceOverrides["2027-01-17|22:00"] = "Meriton Suites Campbell Street";
    };

    const googleRouteUrl = (names) => {
        if (typeof findPlace !== "function" || typeof googleMapsRouteUrl !== "function") return "#";
        const places = names.map(findPlace).filter(Boolean);
        return googleMapsRouteUrl(places);
    };

    const ensureRouteMarker = (place, number) => {
        if (
            typeof scheduleMap === "undefined" || !scheduleMap ||
            typeof scheduleMarkers === "undefined" ||
            typeof makeScheduleMarkerIcon !== "function" ||
            typeof googleMapsPlaceUrl !== "function" ||
            typeof escapeHtml !== "function" ||
            !window.L || !place
        ) return;

        if (scheduleMarkers.has(place.name)) return;

        const marker = L.marker([place.lat, place.lng], {
            icon: makeScheduleMarkerIcon(number, false)
        }).addTo(scheduleMap);

        marker.bindPopup(`
            <div class="schedule-map-popup">
                <small>${escapeHtml(place.category || "장소")}</small>
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
    };

    const renderRouteOverview = () => {
        if (typeof selectedDate === "undefined" || typeof escapeHtml !== "function") return;
        const block = document.querySelector("#schedule-map-block");
        if (!block) return;

        const plan = getPlan(selectedDate);
        const numberMap = getNumberMap(selectedDate);
        let overview = block.querySelector(".day-route-overview");

        if (overview?.dataset.date === selectedDate) return;
        if (!overview) {
            overview = document.createElement("section");
            overview.className = "day-route-overview";
            block.insertBefore(overview, block.firstChild);
        }

        overview.dataset.date = selectedDate;
        overview.innerHTML = `
            <div class="day-route-overview__head">
                <div>
                    <span>DAY ROUTE</span>
                    <strong>오늘 이동 경로</strong>
                </div>
                <small>번호를 누르면 지도에서 위치를 확인합니다.</small>
            </div>
            <div class="day-route-track">
                ${plan.map((segment) => {
                    if (segment.mode === "flight") {
                        return `<span class="day-route-transfer flight">${escapeHtml(segment.label || "✈ FLIGHT")}</span>`;
                    }

                    const prefix = segment.mode === "ferry"
                        ? `<span class="day-route-transfer ferry">${escapeHtml(segment.label || "⛴ FERRY")}</span>`
                        : "";

                    const stops = (segment.places || []).map((name, index) => {
                        const number = numberMap.get(name) || "·";
                        const label = compactLabels[name] || name;
                        const connector = index < segment.places.length - 1
                            ? `<span class="day-route-connector ${segment.mode === "ferry" ? "ferry" : ""}" aria-hidden="true"></span>`
                            : "";
                        return `
                            <button type="button" class="day-route-stop" data-day-route-place="${escapeHtml(name)}">
                                <span>${number}</span>
                                <strong>${escapeHtml(label)}</strong>
                            </button>
                            ${connector}
                        `;
                    }).join("");

                    return `<div class="day-route-segment ${segment.mode}">${prefix}${stops}</div>`;
                }).join("")}
            </div>
            <div class="day-route-legend">
                <span><i class="ground"></i>지상 이동</span>
                <span><i class="ferry"></i>페리</span>
                <span>✈ 비행 구간은 분리 표시</span>
            </div>
        `;

        overview.querySelectorAll("[data-day-route-place]").forEach((button) => {
            button.addEventListener("click", () => {
                const place = typeof findPlace === "function" ? findPlace(button.dataset.dayRoutePlace) : null;
                if (!place) return;
                selectedSchedulePlaceName = place.name;
                if (typeof updateScheduleTimelineSelection === "function") {
                    updateScheduleTimelineSelection();
                }
                if (typeof focusScheduleMapPlace === "function") {
                    focusScheduleMapPlace(place, true);
                }
            });
        });
    };

    const updateOverallRouteAction = () => {
        if (typeof selectedDate === "undefined") return;
        const block = document.querySelector("#schedule-map-block");
        if (!block) return;
        const link = block.querySelector(".schedule-map-actions .schedule-map-link:not(.secondary)");
        if (!link) return;

        link.hidden = false;
        if (selectedDate === "2027-01-17") {
            link.textContent = "출국 동선 ↗";
            link.href = googleRouteUrl([
                "용인동백 두산위브더제니스",
                "인천국제공항 제2여객터미널",
                "대한항공 프레스티지 라운지(서편)"
            ]);
            return;
        }

        if (["2027-01-20", "2027-01-26", "2027-01-28"].includes(selectedDate)) {
            link.hidden = true;
            return;
        }

        link.textContent = "전체 동선 ↗";
    };

    const applyMapRoute = () => {
        if (
            typeof selectedDate === "undefined" ||
            typeof scheduleMap === "undefined" || !scheduleMap ||
            typeof findPlace !== "function" ||
            !window.L
        ) return;

        if (scheduleMap._honeymoonRouteDate === selectedDate) return;

        const numberMap = getNumberMap(selectedDate);
        const segments = getDrawableSegments(selectedDate);

        getUniquePlanPlaces(selectedDate).forEach((place) => {
            ensureRouteMarker(place, numberMap.get(place.name));
        });

        const layer = L.layerGroup().addTo(scheduleMap);
        segments.forEach((segment) => {
            const coordinates = segment.places
                .map((name) => findPlace(name))
                .filter((place) => place && Number.isFinite(place.lat) && Number.isFinite(place.lng))
                .map((place) => [place.lat, place.lng]);

            if (coordinates.length < 2) return;

            L.polyline(coordinates, {
                color: segment.mode === "ferry" ? "#6d7f90" : "#6f806f",
                weight: 3,
                opacity: 0.82,
                dashArray: segment.mode === "ferry" ? "8 8" : null,
                lineCap: "round",
                lineJoin: "round"
            }).addTo(layer);
        });

        scheduleMap._honeymoonRouteLayer = layer;
        scheduleMap._honeymoonRouteDate = selectedDate;

        const firstGround = segments.find((segment) => segment.mode === "ground");
        const overviewSegments = ["2027-01-17", "2027-01-20", "2027-01-26"].includes(selectedDate)
            ? (firstGround ? [firstGround] : [])
            : segments;

        const bounds = [];
        overviewSegments.forEach((segment) => {
            segment.places.forEach((name) => {
                const place = findPlace(name);
                if (place && Number.isFinite(place.lat) && Number.isFinite(place.lng)) {
                    bounds.push([place.lat, place.lng]);
                }
            });
        });

        if (bounds.length === 1) {
            scheduleMap.setView(bounds[0], 13);
        } else if (bounds.length > 1) {
            scheduleMap.fitBounds(bounds, { padding: [42, 42] });
        }
    };

    const convertHomeMapAction = () => {
        const button = document.querySelector('[data-focus-action="map"]');
        if (!button) return;
        button.dataset.focusAction = "bookings";
        button.textContent = "예약 보기";
    };

    const applyEnhancements = () => {
        registerScheduleMappings();
        convertHomeMapAction();
        renderRouteOverview();
        updateOverallRouteAction();
        window.setTimeout(applyMapRoute, 70);
    };

    registerScheduleMappings();
    convertHomeMapAction();
    applyEnhancements();

    const schedulePanel = document.querySelector("#schedule-panel");
    if (schedulePanel) {
        let scheduled = false;
        const observer = new MutationObserver(() => {
            if (scheduled) return;
            scheduled = true;
            window.requestAnimationFrame(() => {
                scheduled = false;
                applyEnhancements();
            });
        });
        observer.observe(schedulePanel, { childList: true, subtree: true });
    }

    document.addEventListener("click", (event) => {
        if (event.target.closest('[data-tab="schedule"], #date-strip .date-button')) {
            window.setTimeout(applyEnhancements, 140);
        }
    }, true);
})();
