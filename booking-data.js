const bookingData = {
    // Public GitHub에는 실제 문서를 저장하지 않는다.
    // Google Drive에서 '일반 액세스: 제한됨' + 두 사람 계정만 Viewer로 설정한
    // 전용 폴더의 공유 URL을 folderUrl에 넣으면 예약 탭에 Private Drive 버튼이 나타난다.
    privateDrive: {
        label: "Private Travel Docs",
        folderUrl: "https://drive.google.com/drive/folders/1htJdyYnzYCasaBfZBPGee0RG101-rdo5"
    },
    flights: [
        {
            key: "icn-syd",
            status: "예약 완료",
            tickets: {
                sanghun: { fileName: "20270117_ICN-SYD_SANGHUN_KE.pdf", url: null },
                jinyeong: { fileName: "20270117_ICN-SYD_JINYEONG_KE.pdf", url: null }
            },
            bookingApp: "koreanair",
            confirmationUrl: null
        },
        {
            key: "syd-zqn",
            status: "예약 완료",
            tickets: {
                sanghun: { fileName: "20270120_SYD-ZQN_SANGHUN_NZ.pdf", url: null },
                jinyeong: { fileName: "20270120_SYD-ZQN_JINYEONG_NZ.pdf", url: null }
            },
            bookingApp: "trip",
            confirmationUrl: null
        },
        {
            key: "chc-akl",
            status: "예약 완료",
            tickets: {
                sanghun: { fileName: "20270126_CHC-AKL_SANGHUN_NZ.pdf", url: null },
                jinyeong: { fileName: "20270126_CHC-AKL_JINYEONG_NZ.pdf", url: null }
            },
            bookingApp: "trip",
            confirmationUrl: null
        },
        {
            key: "akl-icn",
            status: "예약 완료",
            tickets: {
                sanghun: { fileName: "20270129_AKL-ICN_SANGHUN_KE.pdf", url: null },
                jinyeong: { fileName: "20270129_AKL-ICN_JINYEONG_KE.pdf", url: null }
            },
            bookingApp: "koreanair",
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
