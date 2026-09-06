# Honeymoon 2027 — Project Context

> 새 ChatGPT 대화나 작업 세션에서 프로젝트 맥락을 복구하기 위한 기준 문서다.
> 작업 시작 시 **이 파일을 먼저 읽고, 실제 웹앱 일정 데이터는 `itinerary.js`를 함께 확인**한다.
> 사용자의 최신 요청이 이 문서와 충돌하면 최신 요청이 우선한다.
>
> 마지막 정리 기준: 2026-09-06 · V33

---

## 1. 프로젝트 목적 / 운영 원칙

- 여행 기간: **2027-01-17 ~ 2027-01-29**
- 인원: 2명
- 흐름: Korea → Sydney → Queenstown → Wanaka → Fairlie → Christchurch → Auckland → Korea
- Repository: `sh0427-han/honeymoon20270117`
- 배포: Public GitHub repository + GitHub Pages
- 사이트: `https://sh0427-han.github.io/honeymoon20270117/`
- `itinerary.js`: 실제 웹앱 일정 canonical source
- `booking-data.js`: 예약 문서 / 현지 결제 / Drive 링크 기본 데이터
- `reservation-data-v32.js`: Milford 예약 세부정보 보강
- `reservation-data-v33.js`: Fairlie Airbnb 문서/결제 상태 보강
- `PROJECT_CONTEXT.md`: 확정사항 / 의사결정 / TODO 요약
- 민감한 예약번호, QR/바코드, 카드/여권/개인 연락처 등은 Public GitHub에 저장하지 않는다.
- 실제 예약확인서 원본은 Restricted Google Drive에서 관리한다.

---

## 2. 확정 항공

| 날짜 | 시간 | 구간 | 항공사 | 가격 |
|---|---|---|---|---:|
| 1/17 | 08:00 → 20:05 | ICN → SYD | Korean Air Business | ₩4,994,400 |
| 1/20 | 10:55 → 16:00 | SYD → ZQN | Air New Zealand | ₩918,400 |
| 1/26 | 12:00 → 13:25 | CHC → AKL | Air New Zealand | ₩246,000 |
| 1/29 | 11:45 → 19:40 | AKL → ICN | Korean Air | ₩2,003,800 |

항공 총액: **₩8,162,600**

항공 영수증은 웹앱에서 제외하고 티켓 문서만 노출한다.

- 1/17 ICN→SYD: 상훈 / 진영 티켓 각각 연결
- 1/20 SYD→ZQN: 두 사람 공용 티켓 1개
- 1/26 CHC→AKL: 한/영 통합 공용 티켓 1개
- 1/29 AKL→ICN: 상훈 / 진영 티켓 각각 연결
- 현재 항공 문서: **6 / 6 연결**
- V33부터 개별 승객 티켓 2개가 있는 노선은 **상훈이 티켓 / 진영이 티켓을 위아래 세로 배치**한다. 모바일에서 우측 스크롤로 확인하지 않도록 한다.

---

## 3. 확정 숙소 — 변경 추천 금지

| 날짜 | 지역 | 숙소 | 가격 |
|---|---|---|---:|
| 1/17 → 1/20 | Sydney | Meriton Suites Campbell Street | ₩811,000 |
| 1/20 → 1/23 | Queenstown | Hampshire Holiday Parks Queenstown Lakeview | ₩734,799 |
| 1/23 → 1/24 | Wanaka | Edgewater Hotel | ₩483,929 |
| 1/24 → 1/25 | Fairlie | Airbnb | ₩391,259 |
| 1/25 → 1/26 | Christchurch | BreakFree on Cashel | ₩105,905 |
| 1/26 → 1/29 | Auckland | Hilton Auckland | ₩1,461,663 |

숙박 총액: **₩3,988,555**

항공 + 숙박 확정금액: **₩12,151,155**

현재 숙박 문서:

- Meriton: 한글 + 영문 바우처
- Queenstown Lakeview: 한글 + 영문 바우처 + 영수증
- Edgewater: 한글 + 영문 바우처 + 영수증
- Fairlie Airbnb: **예약·결제 확인서 연결** (`20270124-20270125_FAIRLIE_AIRBNB_RECEIPT.pdf`)
- BreakFree: 한글 + 영문 바우처 + 영수증
- Hilton Auckland: 한글 + 영문 바우처 + 영수증
- 현재 숙박 문서: **15 / 15 연결**

### Fairlie Airbnb — 최신 문서 기준

- 숙박: **2027-01-24 → 2027-01-25 · Fairlie 1박**
- 결제: **₩391,259 선결제 완료**
- 결제 문서는 `02_Stays/20270124-20270125_FAIRLIE_AIRBNB_RECEIPT.pdf`
- 웹앱에서는 `예약·결제 확인서`로 연결한다.
- Public GitHub에는 Airbnb 확인 코드, 예약번호 등 민감정보를 저장하지 않는다.
- **중요 확인사항:** Airbnb 문서에는 예약 인원이 `게스트 1명`으로 표기되어 있으므로 실제 투숙 인원 2명 등록 가능 여부를 여행 전 확인한다.

---

## 4. 핵심 경험 / 투어

고정:

1. **Milford Sound Coach & Nature Cruise — Southern Discoveries** — 1/21 · 예약 완료
2. **Onsen Hot Pools** — 1/23 오전
3. **Rotorua Day Tour** — 1/27

선호:

- Waiheke Island — 1/28

### Milford Sound — 최신 예약 기준

예약확인서 + Southern Discoveries 공식 상품 시간표 기준으로 운영한다.

- 날짜: **2027-01-21**
- 상품: **Milford Sound Coach & Nature Cruise ex Queenstown**
- 성인 2명
- **06:35** Hampshire Holiday Parks Queenstown Lakeview 리셉션 대기
- **06:45** 숙소에서 택시 픽업
- 택시 이동 → **Southern Discoveries Queenstown Visitor Centre**
  - St Omer Wharf, **110 Beach Street, Queenstown 9300**
- **07:00** Queenstown Visitor Centre에서 코치 출발 — Southern Discoveries 공식 상품 일정 기준
- Milford Road 이동 + Nature Cruise
- **To Kai Lunch 2인 포함**
- 한국어 포함 Multi-Language Coach Commentary 앱 사용 가능 · 이어폰 필요
- **19:30 예정** Southern Discoveries Queenstown Visitor Centre 복귀 — 공식 상품 일정 기준
- 19:30은 예약확인서 본문이 아니라 Southern Discoveries 공식 Coach & Nature Cruise 시간표의 Queenstown return time이다.
- 교통량, Milford Road 경관 정차 및 당일 운영상황에 따라 복귀 시간은 변동될 수 있다.
- 복귀 후 숙소 이동은 별도 일정으로 둔다.

Drive 문서:

`03_Tours/20270121_MILFORD_SOUTHERN_DISCOVERIES_BOOKING.pdf`

웹앱 TOUR 카드:

- 픽업 06:45 · Hampshire Holiday Parks Queenstown Lakeview
- 코치 출발 07:00 · Southern Discoveries Queenstown Visitor Centre
- 복귀 19:30 예정 · Southern Discoveries Queenstown Visitor Centre
- `픽업 위치 / 복귀 위치 / Milford 위치 / 예약 확약서` 액션을 한 줄로 표시

Milford 결제 완료 여부/최종 결제금액은 예약확인서만으로 확정하지 않는다.

---

## 5. 날짜별 일정 요약

- 1/17 Korea → Sydney
- 1/18 Sydney CBD / Fish Market / Barangaroo / The Rocks / Observatory
- 1/19 Surry Hills / Bondi / Botanic Garden / Opera House
- 1/20 Sydney → Queenstown
- 1/21 **06:35 리셉션 대기 → 06:45 숙소 픽업 → 07:00 Visitor Centre 코치 출발 → Milford Sound Nature Cruise → 19:30 Visitor Centre 복귀 예정 → 숙소 이동**
- 1/22 Queenstown 휴식 + **15:00 Hertz 렌터카 수령**
- 1/23 Onsen → Arrowtown → Crown Range / Cardrona → Wanaka
- 1/24 Wanaka → Pukaki → Tekapo → Fairlie
- 1/25 Fairlie → Geraldine → Christchurch + **15:00 Hertz 렌터카 반납**
- 1/26 Christchurch → Auckland
- 1/27 Rotorua Day Tour
- 1/28 Waiheke Island
- 1/29 Auckland → Incheon

세부 일정의 기준은 `itinerary.js`다.

### Google Schedule Sheet

- 파일: **Honeymoon Schedule 2027**
- Spreadsheet ID: `1sNmM1HXMUhMctdZoIdkswjvXpug7-hBR7R-MRiSgvro`
- 시트: `시트1`

1/21 열 최신 반영:

- 05시: 기상 · 투어 준비
- 06시: `06:35 Hampshire Holiday Parks Queenstown 리셉션 대기 / 06:45 숙소 픽업 → Southern Discoveries Queenstown Visitor Centre`
- 07시: `07:00 Southern Discoveries Queenstown Visitor Centre 출발 / 110 Beach Street → Milford Road / Nature Cruise + To Kai Lunch`
- 19시: `19:30 Southern Discoveries Queenstown Visitor Centre 복귀 예정 / 이후 숙소 이동`
- 기존 20:00 확정 복귀 문구는 삭제

---

## 6. Hertz 렌터카 — 확정 예약

- 업체: **Hertz**
- Queenstown Downtown → Christchurch Downtown 편도
- 수령: **2027-01-22 15:00**
- 반납: **2027-01-25 15:00**
- 차량: **Compact SUV (Group G0 / CFAR)** · Kia Seltos 또는 동급
- 무제한 km
- 예약 문서상 차량손실 면책 프로그램 포함
- 예상 총 임차비용: **NZD 560.21**
- 결제: **후지불 / 현지 카운터 결제**
- 기본요금 NZD 487.14 + 세금 NZD 73.07
- 보증금 / 추가 카드 pre-authorisation / 카드 surcharge / 연료·통행료·현지 추가옵션은 별도 가능

기존 NZD 746.93 견적, 17:00 반납, `Full Coverage / Zero Excess` 표현은 폐기한다.

Drive:

`04_Rental/20270122-20270125_ZQN-CHC_HERTZ_BOOKING.pdf`

현재 렌터카 문서: **1 / 1 연결**

`itinerary.js` 예산 항목에서도 `Full Coverage` 문구를 제거하고 `예약금액 + 연료/부대비용`으로 표현한다.

---

## 7. Google Drive Private Docs

루트: `honeymoon270117`

```text
honeymoon270117
├─ 01_Flights
├─ 02_Stays
├─ 03_Tours
├─ 04_Rental
└─ Honeymoon Budget 2027
```

운영 원칙:

- 일반 액세스 `Restricted`
- 본인 + 배우자 계정만 접근 허용
- Public GitHub에는 PDF 원본 저장 금지
- 여행 전 핵심 문서는 Drive 앱 오프라인 사용 설정 권장

파일명 규칙:

- 항공 승객별 티켓: `YYYYMMDD_ORIGIN-DEST_PASSENGER_AIRLINECODE.pdf`
- 항공 공용 문서: `YYYYMMDD_ORIGIN-DEST_ITINERARY_EN.pdf` 또는 `..._ETICKET_KO-EN.pdf`
- 숙박: `YYYYMMDD-YYYYMMDD_LOCATION_PROPERTY_VOUCHER_KO/EN.pdf`, `..._RECEIPT.pdf`
- 투어: `YYYYMMDD_ACTIVITY_OPERATOR_BOOKING.pdf`
- 렌터카: `YYYYMMDD-YYYYMMDD_ORIGIN-DEST_HERTZ_BOOKING.pdf`

---

## 8. 예약 탭 / 현지 결제 UI — V33

상단 필터: `FLIGHTS / STAYS / TOURS / CAR`

### 카드 레이아웃

- CAR를 선택하면 렌터카 카드가 다른 탭과 동일하게 필터/현지결제 영역 바로 아래로 올라온다.
- 카드 상단: 날짜/구간 + 예약명
- **현지에서 실제 결제가 필요한 항목만** 오른쪽에 작은 `현지결제 필요 · 금액` 배지를 표시한다.
- `결제 완료` 배지는 표시하지 않는다.
- 결제 미확정 투어도 카드에 긴 결제 설명을 표시하지 않는다.
- 위치 / 예약서 / 티켓 등 액션은 카드 아래에서 한 줄 가로 정렬한다.
- 화면 폭이 좁으면 액션 행만 가로 스크롤한다.
- 단, FLIGHTS에서 상훈/진영 **개별 승객 티켓은 가로 스크롤 대신 위아래 세로 배치**한다.

현재 카드에 표시되는 현지결제 배지:

- Meriton Suites Campbell Street: **현지결제 필요 · AUD 795**
- Hertz: **현지결제 필요 · NZD 560.21**

Fairlie Airbnb는 ₩391,259 선결제 완료이므로 현지결제 배지를 표시하지 않는다.

### V32/V33 관련 파일

- `reservation-data-v32.js`: Milford 픽업/출발/복귀 데이터 보강
- `schedule-map-v32.js`: 1/21 지도 위치 보정
- `booking-layout-v32.js`: CAR 위치 / 현지결제 배지 / Milford 카드 액션 정리
- `booking-layout-v32.css`: 카드 및 액션 한 줄 레이아웃
- `reservation-data-v33.js`: Fairlie Airbnb 문서 + 선결제 완료 상태 반영
- `flight-wallet.css`: 항공 개별 승객 티켓 세로 배치

---

## 9. 더보기 탭 / 문서 현황

현재 문서 연결 기준:

- 항공: **6 / 6**
- 숙박: **15 / 15**
- 투어: **1 / 4**
- 렌터카: **1 / 1**
- 전체: **23 / 26**

---

## 10. 예산 관리

전체 여행 예산 canonical source는 Google Sheet **Honeymoon Budget 2027**이다.

- 운영 목표: ₩18,500,000
- 여유 상한: ₩20,000,000
- 확정 항공+숙박: ₩12,151,155

역할 분리:

- Google Sheet: 전체 여행 예산 / 실제 지출
- 웹앱 예약 탭: 앞으로 현지에서 결제해야 할 AUD/NZD 금액

---

## 11. PWA / Offline

- `manifest.webmanifest` + `service-worker.js`
- 현재 cache version: **`honeymoon-v33`**
- `index.html`의 주요 자체 자산 query string도 **V33**로 갱신
- `reservation-data-v33.js`도 APP_SHELL에 포함
- 지도 / Google Maps / Google Drive / 외부 예약 앱은 인터넷 필요

---

## 12. 보안 원칙

Public repository / GitHub Pages에는 직접 저장하지 않는다:

- 여권번호 / 생년월일 등 신원정보
- 항공/호텔/투어/렌터카 예약번호
- Airbnb 확인 코드
- QR / 바코드 / 탑승권 이미지
- 예약확인서 PDF 원본
- 카드번호 / 실제 카드 식별정보
- 개인 전화번호 / 이메일
- 보험증권 번호

Drive 링크가 Public JS에 있어도 실제 파일 접근은 Google Drive `Restricted` 권한으로 제어한다.

---

## 13. 현재 TODO

- [ ] **Fairlie Airbnb 실제 투숙 인원 2명 등록 가능 여부 확인 — 현재 문서에는 게스트 1명으로 표시**
- [ ] Milford Sound 결제 완료 여부/최종 결제금액 확인
- [ ] 여행 직전 Southern Discoveries 06:45 숙소 픽업 및 07:00/19:30 공식 시간표 재확인
- [ ] Southern Discoveries Multi-Language Commentary 앱 및 이어폰 준비
- [ ] Hertz 보증금 / pre-authorisation 실제 승인 금액 확인
- [ ] Hertz 추가 운전자 필요 여부 / 카드 surcharge 적용 여부 확인
- [ ] Onsen 예약 정보/문서/결제정보 반영
- [ ] Rotorua 상품/결제정보 확정
- [ ] Waiheke 방식 확정
- [ ] AUD / NZD 현금이 실제 필요한 항목 확인
- [ ] 주요 저녁 식당 확정
- [ ] 가족 선물 수량/예산 확정
- [ ] ETA / NZeTA / IVL 준비
- [ ] 여행자보험 / eSIM 준비
- [ ] Drive를 본인/배우자 계정만 접근하도록 최종 검증
- [ ] 핵심 Drive 문서 오프라인 저장
- [ ] 실제 Android/iPhone에서 V33 항공 티켓 세로 배치 / 예약 카드 / PWA 갱신 확인
- [ ] 여행 직전 대한항공 T2/라운지 운영시간 재확인
- [ ] 여행 직전 용인→인천공항 교통시간 재확인

---

## 14. 핵심 원칙

**숙소·항공과 핵심 경험은 유지하면서 이동 피로를 줄이고, 여행 중 휴대폰에서 일정·예약·문서·현지 결제·긴급정보를 빠르게 확인할 수 있게 운영한다. 일정은 `itinerary.js`, 상세 일정 보조표는 `Honeymoon Schedule 2027`, 전체 예산은 `Honeymoon Budget 2027`, 예약 기본 데이터는 `booking-data.js`, 최신 예약 보강은 버전별 데이터 파일, 민감 예약 문서는 Restricted Google Drive를 기준으로 사용한다.**