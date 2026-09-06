(() => {
    if (typeof schedulePlaceOverrides !== "undefined") {
        schedulePlaceOverrides["2027-01-21|06:45"] = "Queenstown Lakeview";
        schedulePlaceOverrides["2027-01-21|07:00"] = "Southern Discoveries Queenstown Visitor Centre";
        schedulePlaceOverrides["2027-01-21|19:30"] = "Southern Discoveries Queenstown Visitor Centre";
        delete schedulePlaceOverrides["2027-01-21|20:00"];
    }

    if (typeof routePlaceNamesByDate !== "undefined") {
        routePlaceNamesByDate["2027-01-21"] = [
            "Queenstown Lakeview",
            "Southern Discoveries Queenstown Visitor Centre",
            "Milford Sound",
            "Southern Discoveries Queenstown Visitor Centre",
            "Queenstown Lakeview"
        ];
    }

    if (typeof renderSelectedDay === "function") renderSelectedDay();
    if (typeof renderRoute === "function") renderRoute();
})();
