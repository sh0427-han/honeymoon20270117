# Honeymoon 2027 — Project Context

> 새 ChatGPT 대화나 작업 세션에서 프로젝트 맥락을 복구하기 위한 기준 문서다.
> 작업 시작 시 **이 파일을 먼저 읽고, 실제 웹앱 일정 데이터는 `itinerary.js`를 함께 확인**한다.
> 사용자의 최신 요청이 이 문서와 충돌하면 최신 요청이 우선한다.
>
> 마지막 정리 기준: 2026-08-27 · V25

---

## 1. 프로젝트 목적 / 운영 원칙

- 여행 기간: **2027-01-17 ~ 2027-01-29**
- 인원: 2명
- 흐름: Korea → Sydney → Queenstown → Wanaka → Fairlie → Christchurch → Auckland → Korea
- Repository: `sh0427-han/honeymoon20270117`
- 배포: **Public GitHub repository + GitHub Pages**
- 사이트: `https://sh0427-han.github.io/honeymoon20270117/`
- `itinerary.js`가 실제 웹앱 일정의 canonical source다.
- 예약번호, QR/바코드, 여권정보, 결제정보, 보험증권 번호, 예약확인서 원본 등 민감정보는 Public GitHub에 저장하지 않는다.
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
- 1/22 Queenstown 휴식 + 렌터카 수령
- 1/23 Onsen → Arrowtown → Crown Range / Cardrona → Wanaka
- 1/24 Wanaka → Pukaki → Tekapo → Fairlie
- 1/25 Fairlie → Geraldine → Christchurch + 렌터카 반납 기본안
- 1/26 Christchurch → Auckland
- 1/27 Rotorua Day Tour
- 1/28 Waiheke Island
- 1/29 Auckland → Incheon

세부 시간과 실제 장소/지도 좌표는 반드시 `itinerary.js`를 기준으로 한다.

---

## 7. 렌터카 현재 상태

조건:

- Queenstown → Christchurch 편도
- SUV
- Full Coverage / Zero Excess 수준 보험
- Hertz vs Avis 비교
- 한국차 선호는 optional

현재 웹앱 기본안:

- 1/22 14:00 Queenstown Downtown 수령
- 1/25 15:00 Christchurch Downtown 반납

대안:

- 1/26 Christchurch Airport 반납
- 공항 반납이 약 5~7만 원 수준 추가면 편의성 때문에 고려
- 10만 원 이상 차이면 Downtown 반납 우선

아직 업체/금액 미확정.

예약 탭에는 `CAR` 필터가 있고 현재 기본안만 표시한다. 예약 내역서 파일명 기본값:

`20270122-20270125_ZQN-CHC_RENTAL_BOOKING.pdf`

---

## 8. 예산 관리 — V25 변경

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

항공 티켓 파일명:

`YYYYMMDD_ORIGIN-DEST_PASSENGER_AIRLINECODE.pdf`

예:

- `20270129_AKL-ICN_SANGHUN_KE.pdf`
- `20270129_AKL-ICN_JINYEONG_KE.pdf`

숙박/투어는 `booking-data.js`에 정의된 파일명을 기준으로 매칭한다.

---

## 10. 예약 탭 UX — 현재 V25

상단 필터는 가로 4개:

`FLIGHTS / STAYS / TOURS / CAR`

- 필터는 `bookings-panel[data-booking-filter]` 값 + CSS로 목록만 전환한다.
- 예약 패널 자체를 JS로 `display:none` 처리하지 않는다.
- `예약 완료 / 예약 미정` 상태 배지는 화면에서 제거했다.
- 문서 버튼 활성/비활성으로 연결 여부를 판단한다.
- 항공 카드에는 좌우 2개 티켓 버튼:
  - `🐶상훈이 티켓`
  - `🐯진영이 티켓`
- 숙박/투어/렌터카에는 `예약 내역서` 버튼 제공
- 예약 앱 바로가기는 각 카드에서 제거하고 예약 탭 최하단에 별도 launcher로 유지
- Private Drive도 예약 탭 하단에 유지

현재 테스트 연결:

- 1/29 AKL→ICN 상훈 티켓만 Drive 연결 완료

---

## 11. 더보기 탭 UX — 현재 V25

상단 필터는 가로 4개:

`준비 / 문서 / 긴급 / 선물`

### 준비

- PWA 설치/오프라인 카드
- 출국 준비 체크리스트
- 체크 상태는 browser `localStorage`

### 문서

- 예약 문서 연결 현황 자동 계산
  - 항공권: 8개
  - 숙박: 6개
  - 투어: 4개
  - 렌터카: 1개
  - 총 19개 기준
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

## 12. 홈 / 일정 UX — V25 변경

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
- 현재 cache version: `honeymoon-v25`
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
- 카드번호 / 결제수단
- 개인 전화번호 / 이메일
- 보험증권 번호

Drive 링크를 Public JS에 둘 경우 URL은 누구나 볼 수 있다고 가정한다. 파일 접근은 반드시 Google Drive `Restricted` 권한으로 제어한다.
`robots.txt`는 보안 기능이 아니다.

---

## 15. 현재 TODO

- [ ] Hertz vs Avis 실제 견적 비교 / 확정
- [ ] Christchurch Downtown vs Airport 반납 최종 결정
- [ ] Milford Sound 실제 상품/예약 반영
- [ ] Onsen 예약 정보/문서 반영
- [ ] Rotorua 상품 확정
- [ ] Waiheke 방식 확정
- [ ] 주요 저녁 식당 확정
- [ ] 가족 선물 수량/예산 확정
- [ ] ETA / NZeTA / IVL 준비
- [ ] 여행자보험 / eSIM 준비
- [ ] Drive `01_Flights / 02_Stays / 03_Tours` 문서 업로드 및 URL 연결
- [ ] 렌터카 확정 시 `04_Rental` 문서 연결
- [ ] Google Drive를 본인/배우자 계정만 접근하도록 최종 검증
- [ ] 권한 없는 계정/시크릿 모드 Drive 접근 차단 확인
- [ ] 핵심 Drive 문서 오프라인 저장
- [ ] 실제 Android/iPhone PWA/필터/티켓 버튼 동작 확인
- [ ] 여행 직전 대한항공 T2/라운지 운영시간 재확인
- [ ] 여행 직전 용인→인천공항 교통시간 재확인

---

## 16. 핵심 원칙

**숙소·항공과 핵심 경험은 유지하면서 이동 피로를 줄이고, 여행 중 휴대폰에서 일정·예약·문서·긴급정보를 빠르게 확인할 수 있게 운영한다. 일정은 `itinerary.js`, 예산은 Google Sheet, 민감 예약 문서는 Restricted Google Drive를 각각 canonical source로 사용한다.**
