const bookingData = {
    // Public GitHub에는 실제 문서를 저장하지 않는다.
    // Google Drive에서 '일반 액세스: 제한됨' + 두 사람 계정만 Viewer로 설정한
    // 전용 폴더의 공유 URL을 사용하고 실제 접근 제어는 Google 계정 권한이 담당한다.
    privateDrive: {
        label: "Private Travel Docs",
        folderUrl: "https://drive.google.com/drive/folders/1htJdyYnzYCasaBfZBPGee0RG101-rdo5",
        budgetSheetUrl: "https://docs.google.com/spreadsheets/d/1jqMebaIdWQo-2BgAWOnN7jrzVxkcH60GslbxYiukeHA/edit?usp=drivesdk"
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
                sanghun: {
                    fileName: "20270129_AKL-ICN_SANGHUN_KE.pdf",
                    url: "https://drive.google.com/file/d/1v_T9O0hVY1aE6LJeJA86QGwdHzkoYyaV/view?usp=drivesdk"
                },
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
            document: { fileName: "20270117-20270120_SYD_MERITON_BOOKING.pdf", url: null },
            confirmationUrl: null
        },
        {
            key: "queenstown-lakeview",
            status: "예약 완료",
            mapQuery: "Hampshire Holiday Parks Queenstown Lakeview, 4 Cemetery Road, Queenstown 9300, New Zealand",
            mapLabel: "위치 열기 ↗",
            document: { fileName: "20270120-20270123_ZQN_LAKEVIEW_BOOKING.pdf", url: null },
            confirmationUrl: null
        },
        {
            key: "wanaka-edgewater",
            status: "예약 완료",
            mapQuery: "Edgewater Hotel, 54 Sargood Drive, Wanaka 9305, New Zealand",
            mapLabel: "위치 열기 ↗",
            document: { fileName: "20270123-20270124_WANAKA_EDGEWATER_BOOKING.pdf", url: null },
            confirmationUrl: null
        },
        {
            key: "fairlie-airbnb",
            status: "예약 완료",
            mapQuery: "Fairlie, Canterbury, New Zealand",
            mapLabel: "Fairlie 지역 ↗",
            approximate: true,
            document: { fileName: "20270124-20270125_FAIRLIE_AIRBNB_BOOKING.pdf", url: null },
            confirmationUrl: null
        },
        {
            key: "christchurch-breakfree",
            status: "예약 완료",
            mapQuery: "BreakFree on Cashel Christchurch, 165 Cashel Street, Christchurch 8011, New Zealand",
            mapLabel: "위치 열기 ↗",
            document: { fileName: "20270125-20270126_CHC_BREAKFREE_BOOKING.pdf", url: null },
            confirmationUrl: null
        },
        {
            key: "auckland-hilton",
            status: "예약 완료",
            mapQuery: "Hilton Auckland, 147 Quay Street, Auckland 1010, New Zealand",
            mapLabel: "위치 열기 ↗",
            document: { fileName: "20270126-20270129_AKL_HILTON_BOOKING.pdf", url: null },
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
            document: { fileName: "20270121_MILFORD_BOOKING.pdf", url: null },
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
            document: { fileName: "20270123_ONSEN_BOOKING.pdf", url: null },
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
            document: { fileName: "20270127_ROTORUA_BOOKING.pdf", url: null },
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
            document: { fileName: "20270128_WAIHEKE_BOOKING.pdf", url: null },
            confirmationUrl: null
        }
    ],
    rental: {
        key: "queenstown-christchurch",
        date: "1/22 → 1/25",
        name: "Queenstown → Christchurch",
        pickup: "1/22 14:00 · Queenstown Downtown",
        dropoff: "1/25 15:00 · Christchurch Downtown",
        vehicle: "SUV · Full Coverage / Zero Excess",
        pickupQuery: "Queenstown CBD, New Zealand",
        dropoffQuery: "Christchurch CBD, New Zealand",
        document: { fileName: "20270122-20270125_ZQN-CHC_RENTAL_BOOKING.pdf", url: null }
    }
};
