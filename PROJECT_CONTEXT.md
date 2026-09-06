# Honeymoon 2027 — Project Context

> 새 ChatGPT 대화나 작업 세션에서 프로젝트 맥락을 복구하기 위한 기준 문서다.
> 작업 시작 시 **이 파일을 먼저 읽고, 실제 웹앱 일정 데이터는 `itinerary.js`를 함께 확인**한다.
> 사용자의 최신 요청이 이 문서와 충돌하면 최신 요청이 우선한다.
>
> 마지막 정리 기준: 2026-09-06 · V28

---

## 1. 프로젝트 목적 / 운영 원칙

- 여행 기간: **2027-01-17 ~ 2027-01-29**
- 인원: 2명
- 흐름: Korea → Sydney → Queenstown → Wanaka → Fairlie → Christchurch → Auckland → Korea
- Repository: `sh0427-han/honeymoon20270117`
- 배포: **Public GitHub repository + GitHub Pages**
- 사이트: `https://sh0427-han.github.io/honeymoon20270117/`
- `itinerary.js`가 실제 웹앱 일정의 canonical source다.
- 예약/문서/현지 결제 메타데이터는 `booking-data.js`에서 관리한다.
- 예약번호, QR/바코드, 여권정보, 카드번호, 보험증권 번호, 예약확인서 원본 등 민감정보는 Public GitHub에 저장하지 않는다.
- 실제 민감 문서는 제한된 Google Drive에서 관리하고, Public JS에는 파일명/Drive URL 정도만 연결한다.

주요 현재 파일:

```text
index.html
styles.css
itinerary.js
app.js
time-context.js
schedule-fixes.js
schedule-route.css
travel-now.js
travel-now.css
travel-extras.js
travel-extras.css
booking-data.js
booking-apps.js
booking-apps.css
flight-wallet.js
flight-wallet.css
booking-wallet-v24.js
booking-wallet-v24.css
more-hub-v25.js
more-hub-v25.css
app-ux-v25.js
app-ux-v25.css
app-ux-v26.js
service-worker.js
pwa.js
pwa.css
PROJECT_CONTEXT.md
```

---

## 2. 확정 항공

| 날짜 | 시간 | 구간 | 항공사 | 가격 |
|---|---|---|---|---:|
| 1/17 | 08:00 → 20:05 | ICN → SYD | Korean Air Business | ₩4,994,400 |
| 1/20 | 10:55 → 16:00 | SYD → ZQN | Air New Zealand | ₩918,400 |
| 1/26 | 12:00 → 13:25 | CHC → AKL | Air New Zealand | ₩246,000 |
| 1/29 | 11:45 → 19:40 | AKL → ICN | Korean Air | ₩2,003,800 |

항공 총액: **₩8,162,600**

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

---

## 4. 유지할 핵심 경험

고정:

1. **Milford Sound Tour** — 1/21
2. **Onsen Hot Pools** — 1/23 오전
3. **Rotorua Day Tour** — 1/27

선호:

- Waiheke Island — 1/28

---

## 5. 1/17 출국일 핵심

- 03:15 용인 출발
- 05:00 인천공항 T2 도착 목표
- 05:10 대한항공 비즈니스 체크인 / 수하물
- 06:00 프레스티지 라운지
- 07:20 탑승구 이동
- 08:00 ICN 출발
- 20:05 SYD 도착
- 약 22:00 Meriton 체크인

2027년 출국 직전 터미널·체크인 카운터·라운지 운영시간·용인→공항 교통시간은 재확인한다.

---

## 6. 날짜별 일정 요약

- 1/18 Sydney CBD / Fish Market / Barangaroo / The Rocks / Observatory
- 1/19 Surry Hills / Bondi / Botanic Garden / Opera House
- 1/20 Sydney → Queenstown
- 1/21 Milford Sound 하루 전체
- 1/22 Queenstown 휴식 + **15:00 Hertz 렌터카 수령**
- 1/23 Onsen → Arrowtown → Crown Range / Cardrona → Wanaka
- 1/24 Wanaka → Pukaki → Tekapo → Fairlie
- 1/25 Fairlie → Geraldine → Christchurch + **17:00 렌터카 반납**
- 1/26 Christchurch → Auckland
- 1/27 Rotorua Day Tour
- 1/28 Waiheke Island
- 1/29 Auckland → Incheon

세부 시간과 실제 장소/지도 좌표는 반드시 `itinerary.js`를 기준으로 한다.

---

## 7. 렌터카 현재 상태

현재 선택 방향:

- 업체: **Hertz**
- Queenstown → Christchurch 편도
- SUV
- Full Coverage / Zero Excess 수준 보험
- 1/22 **15:00 Queenstown Downtown 수령**
- 1/25 **17:00 Christchurch Downtown 반납**
- 현재 표시 견적: **NZD 746.93**

주의:

- NZD 746.93은 현재 Hertz 화면의 예상 견적이며 최종 결제금액으로 확정하지 않는다.
- 선결제인지 현지결제인지 아직 확인되지 않았으므로 `booking-data.js`에서는 `payment.status = "unknown"`으로 둔다.
- 결제 시점이 확인되기 전까지 NZD 746.93은 `quotedAmount`로만 표시하고 **현지 결제 총액에는 포함하지 않는다**.
- 실제 예약 시 추가 운전자, 보험, one-way fee, 보증금/pre-authorisation 등 최종 조건을 다시 확인한다.

예약 내역서 파일명 기본값:

`20270122-20270125_ZQN-CHC_RENTAL_BOOKING.pdf`

---

## 8. 예산 관리

웹앱 `더보기`의 예산 UI는 제거했다.

예산은 Google Drive의 native Google Sheet **`Honeymoon Budget 2027`**에서 단일 관리한다.

Google Sheet:

`https://docs.google.com/spreadsheets/d/1jqMebaIdWQo-2BgAWOnN7jrzVxkcH60GslbxYiukeHA/edit`

구성:

- `Summary`
  - 운영 목표 ₩18,500,000
  - 여유 상한 ₩20,000,000
  - 확정 항공+숙박 ₩12,151,155
  - 현재 실제 지출 / 목표 대비 잔여
  - 카테고리별 예산·실제·잔여 자동 집계
- `Expenses`
  - 날짜 / 카테고리 / 항목 / 예산(KRW) / 실제(KRW) / 통화 / 결제·예약 / 메모
  - 확정 항공 4건 + 숙박 6건 선입력
  - 렌터카·투어·식비·현지교통·입국준비·보험/eSIM·선물 등을 계속 추가

웹앱에서는 `더보기 → 문서 → 여행 예산 Sheet 열기`로 접근한다.
`booking-data.js > privateDrive.budgetSheetUrl`이 링크의 source다.

예산 Sheet와 웹앱의 현지 결제 내역은 역할을 분리한다.

- Google Sheet: 전체 여행 예산 / 실제 지출 canonical source
- 웹앱 예약 탭: 여행 중 앞으로 결제해야 할 **AUD / NZD 현지 결제액**을 빠르게 확인하는 Wallet

---

## 9. Google Drive Private Docs

루트 폴더:

- 이름: `honeymoon270117`
- ID: `1htJdyYnzYCasaBfZBPGee0RG101-rdo5`
- URL: `https://drive.google.com/drive/folders/1htJdyYnzYCasaBfZBPGee0RG101-rdo5`

문서 폴더 기준:

```text
honeymoon270117
├─ 01_Flights
├─ 02_Stays
├─ 03_Tours
└─ 04_Rental       # 렌터카 문서 추가 시 권장
```

권장 원칙:

- Google Drive 일반 액세스는 `Restricted` 유지
- 본인 + 배우자 계정만 접근 허용
- Public GitHub에는 PDF 원본을 저장하지 않음
- Drive URL 자체는 공개된다고 가정하고, 실제 접근제어는 Google 계정 권한이 담당
- 중요 문서는 여행 전 Drive 앱에서 오프라인 사용 설정 권장

### 항공 문서 파일명

승객별 e-Ticket:

`YYYYMMDD_ORIGIN-DEST_PASSENGER_AIRLINECODE.pdf`

승객별 영수증:

`YYYYMMDD_ORIGIN-DEST_PASSENGER_AIRLINECODE_RECEIPT.pdf`

공용 일정표 / e-Ticket:

- `YYYYMMDD_ORIGIN-DEST_ITINERARY_EN.pdf`
- `YYYYMMDD_ORIGIN-DEST_ETICKET_KO-EN.pdf`

### 숙박 문서 파일명

- `YYYYMMDD-YYYYMMDD_LOCATION_PROPERTY_VOUCHER_KO.pdf`
- `YYYYMMDD-YYYYMMDD_LOCATION_PROPERTY_VOUCHER_EN.pdf`
- `YYYYMMDD-YYYYMMDD_LOCATION_PROPERTY_RECEIPT.pdf`

현재 `02_Stays` 연결 상태:

- Meriton: 한글 바우처 + 영문 바우처
- Queenstown Lakeview: 한글 바우처 + 영문 바우처 + 영수증
- Edgewater: 한글 바우처 + 영문 바우처 + 영수증
- Fairlie Airbnb: 문서 미연결
- BreakFree: 한글 바우처 + 영문 바우처 + 영수증
- Hilton Auckland: 한글 바우처 + 영문 바우처 + 영수증

---

## 10. 예약 탭 UX — 현재 V28

상단 필터는 가로 4개:

`FLIGHTS / STAYS / TOURS / CAR`

- 필터는 `bookings-panel[data-booking-filter]` 값 + CSS로 목록만 전환한다.
- 예약 패널 자체를 JS로 `display:none` 처리하지 않는다.
- `예약 완료 / 예약 미정` 상태 배지는 화면에서 제거했다.
- 문서 버튼 활성/비활성으로 연결 여부를 판단한다.
- 예약 앱 바로가기는 각 카드에서 제거하고 예약 탭 최하단에 별도 launcher로 유지
- Private Drive도 예약 탭 하단에 유지

### 항공 문서 UI — V28

노선별 실제 존재 문서만 표시한다.

- 1/17 ICN→SYD:
  - `🐶 상훈이 티켓`
  - `🐶 상훈 영수증`
  - `🐯 진영이 티켓`
  - `🐯 진영 영수증`
- 1/20 SYD→ZQN:
  - `영문 일정표`
- 1/26 CHC→AKL:
  - `e-Ticket · 한/영`
  - `영문 일정표`
- 1/29 AKL→ICN:
  - `🐶 상훈이 티켓` 연결
  - `🐯 진영이 티켓` 미연결

Air New Zealand처럼 두 사람 정보가 한 PDF에 있는 경우 승객별 placeholder를 중복 표시하지 않고 공용 문서 버튼만 노출한다.

### 숙박 문서 UI — V28

숙소 카드의 기존 단일 `예약 내역서` 구조를 다중 문서 구조로 확장했다.

- `예약서 · 한글`
- `예약서 · 영문`
- `영수증`

실제 존재하는 문서만 연결하고, 아직 문서가 없는 Fairlie Airbnb만 비활성 `예약 내역서` 버튼을 유지한다.

### 현지 결제 Wallet — V28

예약 필터 바로 아래에 **`현지 결제 예정`** 내역서를 표시한다.

상단 요약:

- Australia / `AUD`
- New Zealand / `NZD`
- 통화별 확정 현지 결제 총액
- 통화별 확정 현금 필요액
- `확인 필요 N건`

상세 내역:

- 숙소 / 투어 / 렌터카 항목을 날짜별로 표시
- 결제 상태 / 금액 / 결제 시점 / 결제 방식 표시
- Hertz처럼 금액만 견적인 경우 `견적 NZD 746.93` 형태로 표시하되 합계에서 제외
- 보증금 / 카드 pre-authorisation은 실제 현지 결제 합계에서 제외

숙소 문서로 확인된 현재 결제 상태:

- Meriton Suites Campbell Street: **Pay at Hotel · AUD 795**
- Queenstown Lakeview: 온라인 사전 결제 완료
- Edgewater Hotel: 온라인 사전 결제 완료
- BreakFree on Cashel: 온라인 사전 결제 완료
- Hilton Auckland: 온라인 사전 결제 완료
- Fairlie Airbnb: 결제 시점 확인 필요

`booking-data.js > payment` 구조:

```js
payment: {
    status: "paid" | "pay_on_site" | "partial" | "unknown",
    currency: "AUD" | "NZD",
    amountDue: 0,
    quotedAmount: 0,        // 필요할 때만
    timing: "체크인 시",
    method: "card" | "cash" | "either" | "unknown",
    cashRequired: false,
    deposit: { ... }        // 필요할 때만, 합계 제외
}
```

합계 원칙:

- `status = pay_on_site / partial`이면서 `amountDue`가 숫자로 확정된 항목만 합산
- `paid`는 현지 결제 합계에서 제외
- `unknown`은 금액이 있어도 `quotedAmount` 참고값만 표시하고 합계 제외
- 보증금 / pre-authorisation은 합계 제외
- 환전 판단용 `현금 필요액`은 `cashRequired = true` 또는 `method = cash`인 확정 현지 결제액만 합산

---

## 11. 더보기 탭 UX

상단 필터는 가로 4개:

`준비 / 문서 / 긴급 / 선물`

### 준비

- PWA 설치/오프라인 카드
- 출국 준비 체크리스트
- 체크 상태는 browser `localStorage`

### 문서

예약 문서 연결 현황은 `booking-data.js`의 실제 문서 구조를 기준으로 자동 계산한다.

현재 기준:

- 항공: **8 / 9 연결**
- 숙박: **14 / 15 연결**
- 투어: **0 / 4 연결**
- 렌터카: **0 / 1 연결**
- 전체: **22 / 29 연결**

Air NZ 공용 PDF는 승객별 placeholder를 별도 문서로 중복 카운트하지 않는다.

- `Private Drive 열기`
- `여행 예산 Sheet 열기`

### 긴급

Public GitHub에 넣어도 되는 공개 기관 번호만 표시:

- Australia emergency: `000`
- New Zealand emergency: `111`
- Korea Consular Call Center: `+82-2-3210-0404`

가족 개인번호, 보험증권 번호 등은 넣지 않는다.

### 선물

- 기존 가족 선물 체크리스트 유지

---

## 12. 홈 / 일정 UX

### 홈

- 큰 editorial Hero는 **홈에서만 표시**
- 일정/예약/더보기에서는 Hero를 숨기고 콘텐츠부터 바로 시작
- 기존 `NEXT TRIP` focus card는 화면에서 제거
- 홈 quick actions:
  - 일정
  - 예약
  - 더보기
- 숙박 동선은 유지

### 일정

`일정` 탭을 누를 때마다 여행 시각 기준 focus date를 다시 계산한다.

- 여행 전 → 1/17
- 여행 중 → 현재 여행지 시간 기준 오늘 날짜
- 여행 후 → 1/29
- `?date=` / `?datetime=` 테스트 모드 → 해당 테스트 날짜

`time-context.js`의 timezone-aware clock을 사용한다.

Timezone:

- Korea: `Asia/Seoul`
- Sydney: `Australia/Sydney`
- New Zealand: `Pacific/Auckland`

---

## 13. PWA / Offline

- `manifest.webmanifest` + `service-worker.js`
- 현재 cache version: **`honeymoon-v28`**
- 앱 shell / itinerary / booking UI / 더보기 UI는 캐시
- 지도 / Google Maps / Google Drive / 외부 예약 앱은 인터넷 필요
- Android/Chromium: 설치 이벤트 시 앱 설치 버튼
- iOS: Safari 공유 → 홈 화면에 추가 안내

---

## 14. 보안 원칙

Public repository / GitHub Pages에는 직접 저장하지 않는다:

- 여권번호 / 생년월일 등 신원정보
- 항공/호텔/투어/렌터카 예약번호
- QR / 바코드 / 탑승권 이미지
- 예약확인서 PDF 원본
- 카드번호 / 실제 카드 식별정보
- 개인 전화번호 / 이메일
- 보험증권 번호

현지 결제 Wallet에는 금액/통화/결제 시점/일반적인 결제방식(`card`, `cash`)만 저장할 수 있다. 실제 카드번호나 민감 결제정보는 저장하지 않는다.

Drive 링크를 Public JS에 둘 경우 URL은 누구나 볼 수 있다고 가정한다. 파일 접근은 반드시 Google Drive `Restricted` 권한으로 제어한다.
`robots.txt`는 보안 기능이 아니다.

---

## 15. 현재 TODO

- [ ] Hertz 실제 예약 완료 후 최종 금액 / 선결제·현지결제 여부 확인
- [ ] Hertz 보증금 / pre-authorisation / 추가 운전자 / one-way fee 최종 확인
- [ ] Fairlie Airbnb 예약 문서 / 결제 시점 확인 및 Drive 연결
- [ ] 1/29 AKL→ICN 진영 e-Ticket Drive 연결
- [ ] 1/20 SYD→ZQN 추가 e-Ticket/영수증이 있다면 Drive 연결
- [ ] Milford Sound 실제 상품/예약/결제정보 반영
- [ ] Onsen 예약 정보/문서/결제정보 반영
- [ ] Rotorua 상품/결제정보 확정
- [ ] Waiheke 방식 확정
- [ ] AUD / NZD 현금이 실제 필요한 항목 확인 후 `cashRequired` 입력
- [ ] 주요 저녁 식당 확정
- [ ] 가족 선물 수량/예산 확정
- [ ] ETA / NZeTA / IVL 준비
- [ ] 여행자보험 / eSIM 준비
- [ ] 렌터카 확정 시 `04_Rental` 문서 연결
- [ ] Google Drive를 본인/배우자 계정만 접근하도록 최종 검증
- [ ] 권한 없는 계정/시크릿 모드 Drive 접근 차단 확인
- [ ] 핵심 Drive 문서 오프라인 저장
- [ ] 실제 Android/iPhone PWA/필터/티켓/현지 결제 상세 동작 확인
- [ ] 여행 직전 대한항공 T2/라운지 운영시간 재확인
- [ ] 여행 직전 용인→인천공항 교통시간 재확인

---

## 16. 핵심 원칙

**숙소·항공과 핵심 경험은 유지하면서 이동 피로를 줄이고, 여행 중 휴대폰에서 일정·예약·문서·현지 결제·긴급정보를 빠르게 확인할 수 있게 운영한다. 일정은 `itinerary.js`, 전체 예산은 Google Sheet, 예약/현지 결제 메타데이터는 `booking-data.js`, 민감 예약 문서는 Restricted Google Drive를 각각 canonical source로 사용한다.**
