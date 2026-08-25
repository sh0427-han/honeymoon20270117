const bookingData = {
    flights: [
        {
            key: "icn-syd",
            status: "예약 완료",
            mapLinks: [
                { label: "인천공항 T2 ↗", query: "Incheon International Airport Terminal 2, Incheon, South Korea" },
                { label: "Sydney Airport ↗", query: "Sydney Airport International Terminal, Sydney NSW, Australia" }
            ],
            confirmationUrl: null
        },
        {
            key: "syd-zqn",
            status: "예약 완료",
            mapLinks: [
                { label: "Sydney Airport ↗", query: "Sydney Airport International Terminal, Sydney NSW, Australia" },
                { label: "Queenstown Airport ↗", query: "Queenstown Airport, Queenstown, New Zealand" }
            ],
            confirmationUrl: null
        },
        {
            key: "chc-akl",
            status: "예약 완료",
            mapLinks: [
                { label: "Christchurch Airport ↗", query: "Christchurch Airport, Christchurch, New Zealand" },
                { label: "Auckland Airport ↗", query: "Auckland Airport, Auckland, New Zealand" }
            ],
            confirmationUrl: null
        },
        {
            key: "akl-icn",
            status: "예약 완료",
            mapLinks: [
                { label: "Auckland Airport ↗", query: "Auckland Airport International Terminal, Auckland, New Zealand" },
                { label: "인천공항 T2 ↗", query: "Incheon International Airport Terminal 2, Incheon, South Korea" }
            ],
            confirmationUrl: null
        }
    ],
    hotels: [
        {
            key: "sydney-meriton",
            status: "예약 완료",
            mapQuery: "Meriton Suites Campbell Street, 6 Campbell Street, Haymarket NSW 2000, Australia",
            mapLabel: "위치 열기 ↗",
            confirmationUrl: null
        },
        {
            key: "queenstown-lakeview",
            status: "예약 완료",
            mapQuery: "Hampshire Holiday Parks Queenstown Lakeview, 4 Cemetery Road, Queenstown 9300, New Zealand",
            mapLabel: "위치 열기 ↗",
            confirmationUrl: null
        },
        {
            key: "wanaka-edgewater",
            status: "예약 완료",
            mapQuery: "Edgewater Hotel, 54 Sargood Drive, Wanaka 9305, New Zealand",
            mapLabel: "위치 열기 ↗",
            confirmationUrl: null
        },
        {
            key: "fairlie-airbnb",
            status: "예약 완료",
            mapQuery: "Fairlie, Canterbury, New Zealand",
            mapLabel: "Fairlie 지역 ↗",
            approximate: true,
            confirmationUrl: null
        },
        {
            key: "christchurch-breakfree",
            status: "예약 완료",
            mapQuery: "BreakFree on Cashel Christchurch, 165 Cashel Street, Christchurch 8011, New Zealand",
            mapLabel: "위치 열기 ↗",
            confirmationUrl: null
        },
        {
            key: "auckland-hilton",
            status: "예약 완료",
            mapQuery: "Hilton Auckland, 147 Quay Street, Auckland 1010, New Zealand",
            mapLabel: "위치 열기 ↗",
            confirmationUrl: null
        }
    ],
    tours: [
        {
            key: "milford",
            date: "1/21",
            time: "07:00",
            name: "Milford Sound Tour",
            city: "Queenstown ↔ Milford Sound",
            status: "예약 정보 미입력",
            mapQuery: "Milford Sound Visitor Terminal, Milford Sound, New Zealand",
            confirmationUrl: null
        },
        {
            key: "onsen",
            date: "1/23",
            time: "09:00",
            name: "Onsen Hot Pools",
            city: "Queenstown",
            status: "예약 정보 미입력",
            mapQuery: "Onsen Hot Pools, 160 Arthurs Point Road, Queenstown, New Zealand",
            confirmationUrl: null
        },
        {
            key: "rotorua",
            date: "1/27",
            time: "07:00",
            name: "Rotorua Day Tour",
            city: "Auckland ↔ Rotorua",
            status: "예약 정보 미입력",
            mapQuery: "Rotorua, New Zealand",
            confirmationUrl: null
        },
        {
            key: "waiheke",
            date: "1/28",
            time: "09:30",
            name: "Waiheke Island",
            city: "Auckland ↔ Waiheke Island",
            status: "일정 후보 · 예약 정보 미입력",
            mapQuery: "Waiheke Island, Auckland, New Zealand",
            confirmationUrl: null
        }
    ]
};
