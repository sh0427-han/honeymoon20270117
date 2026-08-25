const tripData = {
    cities: [
        "Sydney",
        "Queenstown",
        "Wanaka",
        "Fairlie",
        "Christchurch",
        "Auckland"
    ],
    days: [
        {
            date: "2027-01-17",
            label: "1/17 (일)",
            city: "Sydney",
            title: "시드니 도착",
            intensity: 1,
            items: [
                {
                    time: "08:00",
                    title: "인천 출발",
                    type: "flight",
                    note: "대한항공 비즈니스"
                },
                {
                    time: "20:05",
                    title: "시드니 도착",
                    type: "flight",
                    note: "입국심사와 수하물 수령 후 호텔 이동"
                },
                {
                    time: "22:00",
                    title: "메리톤 스위트 캠벨 스트리트 체크인",
                    type: "hotel"
                }
            ]
        },
        {
            date: "2027-01-18",
            label: "1/18 (월)",
            city: "Sydney",
            title: "시드니 도심 & 하버",
            intensity: 3,
            items: [
                { time: "09:00", title: "브런치", type: "meal" },
                { time: "10:00", title: "Queen Victoria Building", type: "sightseeing" },
                { time: "12:00", title: "Sydney Fish Market 점심", type: "meal" },
                { time: "14:00", title: "Barangaroo · Darling Harbour 산책", type: "sightseeing" },
                { time: "16:30", title: "The Rocks", type: "sightseeing" },
                { time: "19:30", title: "Sydney Observatory 일몰", type: "sightseeing" }
            ]
        },
        {
            date: "2027-01-19",
            label: "1/19 (화)",
            city: "Sydney",
            title: "본다이 & 오페라하우스",
            intensity: 3,
            items: [
                { time: "10:00", title: "Surry Hills 산책 & 브런치", type: "meal" },
                { time: "12:00", title: "Bondi Beach", type: "sightseeing" },
                { time: "15:30", title: "호텔 복귀 · 샤워 · 휴식", type: "hotel" },
                { time: "17:00", title: "Royal Botanic Garden", type: "sightseeing" },
                { time: "18:30", title: "Sydney Opera House · Circular Quay", type: "sightseeing" },
                { time: "19:30", title: "로맨틱 디너 & 와인", type: "meal" }
            ]
        },
        {
            date: "2027-01-20",
            label: "1/20 (수)",
            city: "Queenstown",
            title: "시드니 → 퀸스타운",
            intensity: 1,
            items: [
                { time: "07:30", title: "호텔 출발 · 시드니 공항 이동", type: "transport" },
                { time: "10:55", title: "시드니 출발", type: "flight" },
                { time: "16:00", title: "퀸스타운 도착", type: "flight" },
                { time: "18:00", title: "숙소 체크인 & Lake Wakatipu 산책", type: "hotel" }
            ]
        },
        {
            date: "2027-01-21",
            label: "1/21 (목)",
            city: "Queenstown",
            title: "밀포드사운드 투어",
            intensity: 5,
            fixed: true,
            items: [
                { time: "05:00", title: "기상", type: "note" },
                { time: "07:00", title: "Milford Sound 투어 출발", type: "tour", fixed: true },
                { time: "20:00", title: "퀸스타운 복귀 · 휴식", type: "hotel" }
            ]
        },
        {
            date: "2027-01-22",
            label: "1/22 (금)",
            city: "Queenstown",
            title: "퀸스타운 휴식 & 렌터카 수령",
            intensity: 2,
            items: [
                { time: "09:30", title: "늦은 기상 & 브런치", type: "meal" },
                { time: "11:30", title: "Skyline Gondola 또는 Queenstown Gardens", type: "sightseeing" },
                { time: "14:00", title: "렌터카 수령", type: "car", note: "Hertz 또는 Avis · SUV · Full Coverage" },
                { time: "18:00", title: "Queenstown 저녁 · 와인", type: "meal" }
            ]
        },
        {
            date: "2027-01-23",
            label: "1/23 (토)",
            city: "Wanaka",
            title: "온센 → 애로우타운 → 와나카",
            intensity: 3,
            items: [
                { time: "08:45", title: "Onsen Hot Pools 도착", type: "tour", fixed: true },
                { time: "09:00", title: "Onsen Hot Pools", type: "tour", fixed: true },
                { time: "10:30", title: "Arrowtown 산책 & 점심", type: "sightseeing" },
                { time: "12:30", title: "Crown Range · Cardrona 경유", type: "drive" },
                { time: "15:00", title: "Edgewater Wanaka 체크인", type: "hotel" },
                { time: "17:00", title: "Lake Wanaka · That Wanaka Tree 산책", type: "sightseeing" }
            ]
        },
        {
            date: "2027-01-24",
            label: "1/24 (일)",
            city: "Fairlie",
            title: "와나카 → 푸카키 → 테카포 → 페얼리",
            intensity: 3,
            items: [
                { time: "09:30", title: "Wanaka 출발", type: "drive" },
                { time: "12:00", title: "Lake Pukaki · 연어 점심", type: "meal" },
                { time: "15:00", title: "Lake Tekapo 도착", type: "sightseeing" },
                { time: "15:30", title: "Church of the Good Shepherd · 호수 산책", type: "sightseeing" },
                { time: "19:00", title: "Fairlie 숙소 이동 & 체크인", type: "hotel" }
            ]
        },
        {
            date: "2027-01-25",
            label: "1/25 (월)",
            city: "Christchurch",
            title: "페얼리 → 크라이스트처치",
            intensity: 2,
            items: [
                { time: "09:30", title: "Fairlie 출발", type: "drive" },
                { time: "10:30", title: "Geraldine 카페", type: "meal" },
                { time: "13:30", title: "Christchurch 도착 · 호텔 짐 보관", type: "hotel" },
                { time: "15:00", title: "렌터카 Downtown 반납", type: "car" },
                { time: "16:00", title: "Riverside Market · Cathedral Square · New Regent Street", type: "sightseeing" }
            ]
        },
        {
            date: "2027-01-26",
            label: "1/26 (화)",
            city: "Auckland",
            title: "크라이스트처치 → 오클랜드",
            intensity: 1,
            items: [
                { time: "09:30", title: "택시로 Christchurch Airport 이동", type: "transport" },
                { time: "12:00", title: "크라이스트처치 출발", type: "flight" },
                { time: "13:25", title: "오클랜드 도착", type: "flight" },
                { time: "15:00", title: "Hilton Auckland 체크인", type: "hotel" },
                { time: "17:00", title: "Commercial Bay 가족 선물 쇼핑", type: "shopping" },
                { time: "19:00", title: "Viaduct Harbour 저녁", type: "meal" }
            ]
        },
        {
            date: "2027-01-27",
            label: "1/27 (수)",
            city: "Auckland",
            title: "로토루아 투어",
            intensity: 5,
            fixed: true,
            items: [
                { time: "07:00", title: "Rotorua 당일 투어 출발", type: "tour", fixed: true },
                { time: "20:00", title: "Auckland 복귀 · 호텔 휴식", type: "hotel" }
            ]
        },
        {
            date: "2027-01-28",
            label: "1/28 (목)",
            city: "Auckland",
            title: "Waiheke Island",
            intensity: 3,
            items: [
                { time: "09:30", title: "Downtown Ferry Terminal", type: "transport" },
                { time: "10:30", title: "Waiheke Island · 와이너리 & 점심", type: "tour" },
                { time: "17:30", title: "Auckland 복귀", type: "transport" },
                { time: "19:00", title: "여행 마지막 저녁", type: "meal" }
            ]
        },
        {
            date: "2027-01-29",
            label: "1/29 (금)",
            city: "Auckland",
            title: "귀국",
            intensity: 1,
            items: [
                { time: "08:00", title: "Hilton Auckland 출발 · 공항 이동", type: "transport" },
                { time: "11:45", title: "오클랜드 출발", type: "flight" },
                { time: "19:40", title: "인천 도착", type: "flight" }
            ]
        }
    ],
    flights: [
        { route: "인천 → 시드니", date: "1/17", time: "08:00 → 20:05", airline: "대한항공 · 비즈니스", price: 4994400 },
        { route: "시드니 → 퀸스타운", date: "1/20", time: "10:55 → 16:00", airline: "Air New Zealand", price: 918400 },
        { route: "크라이스트처치 → 오클랜드", date: "1/26", time: "12:00 → 13:25", airline: "Air New Zealand", price: 246000 },
        { route: "오클랜드 → 인천", date: "1/29", time: "11:45 → 19:40", airline: "대한항공", price: 2003800 }
    ],
    hotels: [
        { city: "Sydney", dates: "1/17 → 1/20", name: "Meriton Suites Campbell Street", price: 811000 },
        { city: "Queenstown", dates: "1/20 → 1/23", name: "Hampshire Holiday Parks Queenstown Lakeview", price: 734799 },
        { city: "Wanaka", dates: "1/23 → 1/24", name: "Edgewater Hotel", price: 483929 },
        { city: "Fairlie", dates: "1/24 → 1/25", name: "Fairlie Airbnb", price: 391259 },
        { city: "Christchurch", dates: "1/25 → 1/26", name: "BreakFree on Cashel Christchurch", price: 105905 },
        { city: "Auckland", dates: "1/26 → 1/29", name: "Hilton Auckland", price: 1461663 }
    ],
    places: [
        { name: "Meriton Suites Campbell Street", city: "Sydney", lat: -33.8797, lng: 151.2056, category: "숙소" },
        { name: "Queen Victoria Building", city: "Sydney", lat: -33.8718, lng: 151.2067, category: "관광" },
        { name: "Sydney Fish Market", city: "Sydney", lat: -33.8732, lng: 151.1923, category: "식사" },
        { name: "Bondi Beach", city: "Sydney", lat: -33.8915, lng: 151.2767, category: "관광" },
        { name: "Sydney Opera House", city: "Sydney", lat: -33.8568, lng: 151.2153, category: "관광" },
        { name: "Queenstown Lakeview", city: "Queenstown", lat: -45.0274, lng: 168.6602, category: "숙소" },
        { name: "Onsen Hot Pools", city: "Queenstown", lat: -44.9876, lng: 168.6795, category: "투어" },
        { name: "Arrowtown", city: "Queenstown", lat: -44.9383, lng: 168.8358, category: "관광" },
        { name: "Edgewater Wanaka", city: "Wanaka", lat: -44.6985, lng: 169.1128, category: "숙소" },
        { name: "That Wanaka Tree", city: "Wanaka", lat: -44.6981, lng: 169.1170, category: "관광" },
        { name: "Lake Pukaki", city: "Fairlie", lat: -44.1720, lng: 170.1314, category: "관광" },
        { name: "Lake Tekapo", city: "Fairlie", lat: -44.0047, lng: 170.4771, category: "관광" },
        { name: "Fairlie", city: "Fairlie", lat: -44.0990, lng: 170.8280, category: "숙소" },
        { name: "BreakFree on Cashel", city: "Christchurch", lat: -43.5331, lng: 172.6383, category: "숙소" },
        { name: "Riverside Market", city: "Christchurch", lat: -43.5320, lng: 172.6334, category: "관광" },
        { name: "Hilton Auckland", city: "Auckland", lat: -36.8405, lng: 174.7656, category: "숙소" },
        { name: "Commercial Bay", city: "Auckland", lat: -36.8444, lng: 174.7671, category: "쇼핑" },
        { name: "Downtown Ferry Terminal", city: "Auckland", lat: -36.8433, lng: 174.7680, category: "교통" },
        { name: "Rotorua", city: "Auckland", lat: -38.1368, lng: 176.2497, category: "투어" },
        { name: "Waiheke Island", city: "Auckland", lat: -36.7974, lng: 175.1082, category: "투어" }
    ],
    budget: [
        { name: "항공권", amount: 8162600, status: "확정" },
        { name: "숙박", amount: 3988555, status: "확정" },
        { name: "렌터카 · Full Coverage · 연료", amount: 1250000, status: "예상", range: "100~150만 원" },
        { name: "식비", amount: 2100000, status: "예상", range: "180~240만 원" },
        { name: "투어 · 액티비티", amount: 1750000, status: "예상", range: "140~210만 원" },
        { name: "대중교통 · 택시", amount: 450000, status: "예상", range: "35~55만 원" },
        { name: "ETA · NZeTA · IVL", amount: 230000, status: "예상" },
        { name: "여행자보험 · eSIM · 예비비", amount: 650000, status: "예상", range: "50~85만 원" }
    ],
    shopping: [
        { item: "UMF 15+ 마누카꿀 250g", target: "양가 부모님", place: "Aotea Gifts · Auckland", priority: "high" },
        { item: "UMF 10+ 마누카꿀", target: "조부모님 / 어른", place: "Auckland", priority: "medium" },
        { item: "Whittaker's Chocolate", target: "형제 · 친척", place: "Woolworths Auckland", priority: "medium" },
        { item: "NZ 스킨케어 / 메리노 제품", target: "형제 · 자매", place: "Aotea Gifts", priority: "medium" },
        { item: "Māori 공예품 / Pounamu", target: "특별 선물", place: "Rotorua · Te Puia", priority: "optional" }
    ]
};
