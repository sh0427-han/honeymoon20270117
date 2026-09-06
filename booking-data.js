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
                sanghun: {
                    fileName: "20270117_ICN-SYD_SANGHUN_KE.pdf",
                    url: "https://drive.google.com/file/d/1cnM_LaEuXyYzoeWMqGg81I1XYHGjVaDe/view?usp=drivesdk"
                },
                jinyeong: {
                    fileName: "20270117_ICN-SYD_JINYEONG_KE.pdf",
                    url: "https://drive.google.com/file/d/1FaZ4qMyI-Xt2sBxGIfOhNt_sa-RLOeLt/view?usp=drivesdk"
                }
            },
            receipts: {
                sanghun: {
                    fileName: "20270117_ICN-SYD_SANGHUN_KE_RECEIPT.pdf",
                    url: "https://drive.google.com/file/d/1Bmq81T9DaaqIR2jRxRbUz11Y4Z27ZfWb/view?usp=drivesdk"
                },
                jinyeong: {
                    fileName: "20270117_ICN-SYD_JINYEONG_KE_RECEIPT.pdf",
                    url: "https://drive.google.com/file/d/1Fid2PleXFRBuoshCig85UU2QxaqW3eti/view?usp=drivesdk"
                }
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
            sharedDocuments: [
                {
                    label: "영문 일정표",
                    fileName: "20270120_SYD-ZQN_ITINERARY_EN.pdf",
                    url: "https://drive.google.com/file/d/1IR6Ozl55ls2ebvVuOZxmBPjUNaOKwz-v/view?usp=drivesdk"
                }
            ],
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
            sharedDocuments: [
                {
                    label: "e-Ticket · 한/영",
                    fileName: "20270126_CHC-AKL_ETICKET_KO-EN.pdf",
                    url: "https://drive.google.com/file/d/1bKGnXLRjkqKBIMt3o3kr6s0VTM8UoQA-/view?usp=drivesdk"
                },
                {
                    label: "영문 일정표",
                    fileName: "20270126_CHC-AKL_ITINERARY_EN.pdf",
                    url: "https://drive.google.com/file/d/1wBdBC7HTlMJOiVqqwTUJPDzcIvJwRWbQ/view?usp=drivesdk"
                }
            ],
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
            payment: {
                status: "pay_on_site",
                currency: "AUD",
                amountDue: 795,
                timing: "호텔 결제",
                method: "unknown",
                cashRequired: false,
                note: "체크인 바우처 기준 Pay at Hotel"
            },
            documents: [
                {
                    label: "예약서 · 한글",
                    fileName: "20270117-20270120_SYD_MERITON_VOUCHER_KO.pdf",
                    url: "https://drive.google.com/file/d/1B5ltNceWtWs91bThRhlURuVA1rZUE0q_/view?usp=drivesdk"
                },
                {
                    label: "예약서 · 영문",
                    fileName: "20270117-20270120_SYD_MERITON_VOUCHER_EN.pdf",
                    url: "https://drive.google.com/file/d/1WjnJAF1xCHET3CdOuFxIiniH4IfmVAf2/view?usp=drivesdk"
                }
            ],
            confirmationUrl: null
        },
        {
            key: "queenstown-lakeview",
            status: "예약 완료",
            mapQuery: "Hampshire Holiday Parks Queenstown Lakeview, 4 Cemetery Road, Queenstown 9300, New Zealand",
            mapLabel: "위치 열기 ↗",
            payment: {
                status: "paid",
                currency: "NZD",
                amountDue: 0,
                timing: "온라인 사전 결제 완료",
                method: "card",
                cashRequired: false
            },
            documents: [
                {
                    label: "예약서 · 한글",
                    fileName: "20270120-20270123_ZQN_LAKEVIEW_VOUCHER_KO.pdf",
                    url: "https://drive.google.com/file/d/1Bvm_HFFTHWUniiMwplguafi2hp3kStbO/view?usp=drivesdk"
                },
                {
                    label: "예약서 · 영문",
                    fileName: "20270120-20270123_ZQN_LAKEVIEW_VOUCHER_EN.pdf",
                    url: "https://drive.google.com/file/d/16maT_ReU66KhP-nB9W2PWARBnGtNOuxa/view?usp=drivesdk"
                },
                {
                    label: "영수증",
                    fileName: "20270120-20270123_ZQN_LAKEVIEW_RECEIPT.pdf",
                    url: "https://drive.google.com/file/d/1qRnzQDynrmiE4yHl0wM5ge1_m-_vskhp/view?usp=drivesdk"
                }
            ],
            confirmationUrl: null
        },
        {
            key: "wanaka-edgewater",
            status: "예약 완료",
            mapQuery: "Edgewater Hotel, 54 Sargood Drive, Wanaka 9305, New Zealand",
            mapLabel: "위치 열기 ↗",
            payment: {
                status: "paid",
                currency: "NZD",
                amountDue: 0,
                timing: "온라인 사전 결제 완료",
                method: "card",
                cashRequired: false
            },
            documents: [
                {
                    label: "예약서 · 한글",
                    fileName: "20270123-20270124_WANAKA_EDGEWATER_VOUCHER_KO.pdf",
                    url: "https://drive.google.com/file/d/1RsFEI0RViuZ-HwItX6IZWnKNSmP_RC7E/view?usp=drivesdk"
                },
                {
                    label: "예약서 · 영문",
                    fileName: "20270123-20270124_WANAKA_EDGEWATER_VOUCHER_EN.pdf",
                    url: "https://drive.google.com/file/d/1Qf8rSKy4yi9m1slL4BDfsD7a8Kl6HV2o/view?usp=drivesdk"
                },
                {
                    label: "영수증",
                    fileName: "20270123-20270124_WANAKA_EDGEWATER_RECEIPT.pdf",
                    url: "https://drive.google.com/file/d/1dJqNnFX8AyPS03zObrIYF8oHH23sm4I3/view?usp=drivesdk"
                }
            ],
            confirmationUrl: null
        },
        {
            key: "fairlie-airbnb",
            status: "예약 완료",
            mapQuery: "Fairlie, Canterbury, New Zealand",
            mapLabel: "Fairlie 지역 ↗",
            approximate: true,
            payment: {
                status: "unknown",
                currency: "NZD",
                amountDue: null,
                timing: "결제 시점 확인 필요",
                method: "unknown",
                cashRequired: false
            },
            documents: [
                {
                    label: "예약 내역서",
                    fileName: "20270124-20270125_FAIRLIE_AIRBNB_BOOKING.pdf",
                    url: null
                }
            ],
            confirmationUrl: null
        },
        {
            key: "christchurch-breakfree",
            status: "예약 완료",
            mapQuery: "BreakFree on Cashel Christchurch, 165 Cashel Street, Christchurch 8011, New Zealand",
            mapLabel: "위치 열기 ↗",
            payment: {
                status: "paid",
                currency: "NZD",
                amountDue: 0,
                timing: "온라인 사전 결제 완료",
                method: "card",
                cashRequired: false
            },
            documents: [
                {
                    label: "예약서 · 한글",
                    fileName: "20270125-20270126_CHC_BREAKFREE_VOUCHER_KO.pdf",
                    url: "https://drive.google.com/file/d/1mfQLwES1Q0xaFbTvP0VSIFmEusXMszhv/view?usp=drivesdk"
                },
                {
                    label: "예약서 · 영문",
                    fileName: "20270125-20270126_CHC_BREAKFREE_VOUCHER_EN.pdf",
                    url: "https://drive.google.com/file/d/1nCvaQeQg4mzSSOyNjUIr2PRBNjnx-l8Z/view?usp=drivesdk"
                },
                {
                    label: "영수증",
                    fileName: "20270125-20270126_CHC_BREAKFREE_RECEIPT.pdf",
                    url: "https://drive.google.com/file/d/1V_f3mqMReLfCEcwz3t6K9vydw_Afmh7d/view?usp=drivesdk"
                }
            ],
            confirmationUrl: null
        },
        {
            key: "auckland-hilton",
            status: "예약 완료",
            mapQuery: "Hilton Auckland, 147 Quay Street, Auckland 1010, New Zealand",
            mapLabel: "위치 열기 ↗",
            payment: {
                status: "paid",
                currency: "NZD",
                amountDue: 0,
                timing: "온라인 사전 결제 완료",
                method: "card",
                cashRequired: false
            },
            documents: [
                {
                    label: "예약서 · 한글",
                    fileName: "20270126-20270129_AKL_HILTON_VOUCHER_KO.pdf",
                    url: "https://drive.google.com/file/d/1uEEwPAr8Kpe3DdMNhzACJlCMWmUqiuG1/view?usp=drivesdk"
                },
                {
                    label: "예약서 · 영문",
                    fileName: "20270126-20270129_AKL_HILTON_VOUCHER_EN.pdf",
                    url: "https://drive.google.com/file/d/1u3v-23r1vuP5t1-JcWdPm50QhE8PYhoP/view?usp=drivesdk"
                },
                {
                    label: "영수증",
                    fileName: "20270126-20270129_AKL_HILTON_RECEIPT.pdf",
                    url: "https://drive.google.com/file/d/1vXE76yPUiNOKhPWl5uk_qQsaM8FViwNn/view?usp=drivesdk"
                }
            ],
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
            payment: {
                status: "unknown",
                currency: "NZD",
                amountDue: null,
                timing: "결제 시점 확인 필요",
                method: "unknown",
                cashRequired: false
            },
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
            payment: {
                status: "unknown",
                currency: "NZD",
                amountDue: null,
                timing: "결제 시점 확인 필요",
                method: "unknown",
                cashRequired: false
            },
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
            payment: {
                status: "unknown",
                currency: "NZD",
                amountDue: null,
                timing: "결제 시점 확인 필요",
                method: "unknown",
                cashRequired: false
            },
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
            payment: {
                status: "unknown",
                currency: "NZD",
                amountDue: null,
                timing: "예약 시 확인 필요",
                method: "unknown",
                cashRequired: false
            },
            document: { fileName: "20270128_WAIHEKE_BOOKING.pdf", url: null },
            confirmationUrl: null
        }
    ],
    rental: {
        key: "queenstown-christchurch",
        date: "1/22 → 1/25",
        name: "Queenstown → Christchurch",
        pickup: "1/22 15:00 · Queenstown Downtown",
        dropoff: "1/25 17:00 · Christchurch Downtown",
        vehicle: "Hertz · SUV · Full Coverage / Zero Excess",
        pickupQuery: "Queenstown CBD, New Zealand",
        dropoffQuery: "Christchurch CBD, New Zealand",
        payment: {
            status: "unknown",
            currency: "NZD",
            amountDue: null,
            quotedAmount: 746.93,
            timing: "결제 시점 확인 필요",
            method: "unknown",
            cashRequired: false,
            note: "Hertz 예상 견적 · 현지 결제 여부 확인 후 합계에 반영"
        },
        document: { fileName: "20270122-20270125_ZQN-CHC_RENTAL_BOOKING.pdf", url: null }
    }
};
