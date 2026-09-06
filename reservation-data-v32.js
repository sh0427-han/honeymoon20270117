(() => {
    if (typeof bookingData === "undefined") return;

    const milford = bookingData.tours?.find((tour) => tour.key === "milford");
    if (!milford) return;

    Object.assign(milford, {
        time: "06:45",
        name: "Milford Sound Coach & Nature Cruise",
        city: "Queenstown ↔ Milford Sound",
        status: "예약 완료",
        pickup: "06:45 · Hampshire Holiday Parks Queenstown Lakeview",
        pickupNote: "06:35까지 리셉션 대기 · 택시로 Southern Discoveries Queenstown Visitor Centre 이동",
        coachDeparture: "07:00 · Southern Discoveries Queenstown Visitor Centre",
        returnTime: "19:30 예정",
        returnLocation: "Southern Discoveries Queenstown Visitor Centre",
        returnNote: "공식 상품 일정 기준 · 교통 및 경관 정차 상황에 따라 변동 가능",
        pickupMapQuery: "Hampshire Holiday Parks Queenstown Lakeview, 4 Cemetery Road, Queenstown 9300, New Zealand",
        returnMapQuery: "Southern Discoveries Queenstown Visitor Centre, St Omer Wharf, 110 Beach Street, Queenstown 9300, New Zealand"
    });
})();
