# Honeymoon 2027 — Project Context

> 새 ChatGPT 대화나 새로운 작업 세션에서 프로젝트 맥락을 복구하기 위한 기준 문서다.
> 작업 시작 시 **이 파일을 먼저 읽고, 실제 웹앱 일정 데이터는 `itinerary.js`를 함께 확인**한다.
>
> 마지막 정리 기준: 2026-08-27

---

## 1. 프로젝트 목적

2027년 1월 17일~1월 29일 호주·뉴질랜드 신혼여행을 여행 전 준비와 여행 중 실제 사용을 모두 고려해 하나의 모바일 웹앱으로 관리한다.

핵심 목표:

- 휴대폰에서 날짜별 일정을 빠르게 확인
- 일정 항목을 누르면 아래 지도에서 해당 위치를 강조
- Google Maps로 장소/길찾기 연결
- 항공, 숙소, 렌터카, 투어, 식당, 쇼핑을 한곳에서 관리
- 확정 예산과 예상 비용 관리
- 가족 선물 / 출국 준비 체크리스트 관리
- 중요한 결정은 레포 자체에 남겨 새 대화에서도 이어서 작업

Repository: `sh0427-han/honeymoon20270117`

배포 방향은 **Public GitHub repository + GitHub Pages 공유 URL**을 사용한다. Cloudflare Pages/Access 도입안은 사용하지 않는다.

Public 사이트이므로 예약번호, QR/바코드, 예약확인서 원본, 여권정보, 결제정보 등 민감정보는 GitHub에 커밋하지 않는다.

주요 파일:

```text
index.html
styles.css
itinerary.js
app.js
time-context.js
travel-now.js
travel-now.css
schedule-fixes.js
schedule-route.css
travel-extras.js
travel-extras.css
booking-data.js
enhancements.js
enhancements.css
booking-apps.js
booking-apps.css
personalization.css
manifest.webmanifest
service-worker.js
pwa.js
pwa.css
app-icon.svg
README.md
PROJECT_CONTEXT.md
DESIGN_SYSTEM.md
```

AI 작업 순서:

1. `PROJECT_CONTEXT.md`
2. `itinerary.js` — 실제 최신 일정의 canonical source
3. 필요 시 `time-context.js`, `booking-data.js`, `app.js`, `schedule-fixes.js`, `travel-extras.js`, `enhancements.js`, `pwa.js`, CSS, `index.html`
4. 사용자의 최신 요청이 기존 문서와 충돌하면 최신 요청 우선
5. 중요한 일정/예약/예산/렌터카/투어 결정 변경 시 컨텍스트도 갱신

---

## 2. 여행 기본 정보

- 목적: 신혼여행
- 인원: 2명
- 기간: **2027-01-17 ~ 2027-01-29**
- 여행 시작점: **용인동백 두산위브더제니스**
- 주요 국가: 호주, 뉴질랜드

전체 흐름:

```text
용인동백 두산위브더제니스
→ 인천국제공항 T2
→ Sydney
→ Queenstown
→ Wanaka
→ Lake Pukaki / Lake Tekapo / Fairlie
→ Christchurch
→ Auckland
→ 인천
```

출발지 주소:

- 경기도 용인시 기흥구 동백죽전대로 507
- 용인동백두산위브더제니스

---

## 3. 확정 항공권

| 날짜 | 시간 | 구간 | 항공사 | 가격 |
|---|---|---|---|---:|
| 1/17 | 08:00 → 20:05 | 인천 → Sydney | Korean Air, Business | ₩4,994,400 |
| 1/20 | 10:55 → 16:00 | Sydney → Queenstown | Air New Zealand | ₩918,400 |
| 1/26 | 12:00 → 13:25 | Christchurch → Auckland | Air New Zealand | ₩246,000 |
| 1/29 | 11:45 → 19:40 | Auckland → 인천 | Korean Air | ₩2,003,800 |

항공권 총액: **₩8,162,600**

---

## 4. 확정 숙소 — 변경 추천 금지

사용자가 이미 예약을 완료했으므로 숙소 자체를 다른 호텔/지역으로 변경하는 추천은 하지 않는다.

| 날짜 | 지역 | 숙소 | 가격 |
|---|---|---|---:|
| 1/17 → 1/20 | Sydney | Meriton Suites Campbell Street | ₩811,000 |
| 1/20 → 1/23 | Queenstown | Hampshire Holiday Parks Queenstown Lakeview | ₩734,799 |
| 1/23 → 1/24 | Wanaka | Edgewater Hotel | ₩483,929 |
| 1/24 → 1/25 | Fairlie | Airbnb, 페얼리의 별장 | ₩391,259 |
| 1/25 → 1/26 | Christchurch | BreakFree on Cashel Christchurch | ₩105,905 |
| 1/26 → 1/29 | Auckland | Hilton Auckland | ₩1,461,663 |

숙박 총액: **₩3,988,555**

항공 + 숙박 확정금액: **₩12,151,155**

---

## 5. 반드시 유지할 핵심 경험

다음 세 일정은 여행 계획을 수정해도 유지한다.

1. **Milford Sound Tour** — 1/21
2. **Onsen Hot Pools** — 1/23 오전
3. **Rotorua Day Tour** — 1/27

Waiheke Island는 1/28의 강한 추천 일정이지만 위 3개와 같은 절대 고정 조건은 아니다.

---

## 6. 1/17 출국일 운영 — 중요 확정사항

여행은 인천공항에서 시작하는 것이 아니라 **용인동백 두산위브더제니스에서 시작**한다.

현재 일정:

- **03:15** 집 출발
  - 택시/자차 계열 권장
  - 새벽 기준 인천공항 T2까지 약 1시간 20~40분 수준을 예상하고 추가 여유 포함
  - 공항버스 8852 첫차는 08:00 출국 일정에 맞추기 어려우므로 기본안으로 사용하지 않음
- **05:00** 인천국제공항 제2여객터미널 도착
  - 08:00 국제선 출발 **3시간 전 도착 목표**
- **05:10 전후** 대한항공 비즈니스 체크인 / 수하물 위탁
- 이후 보안검색 / 출국심사
- **06:00 전후** 대한항공 프레스티지 라운지 이용
  - 현재 기준 T2 프레스티지 서편 라운지는 04:00부터 운영
  - 아침식사와 휴식을 포함해 약 1시간 이상 여유 있게 이용하는 계획
- **07:20** 탑승구 이동 / 탑승 준비
- **08:00** 인천 출발
- **20:05** Sydney 도착
- 약 **22:00** Meriton Suites Campbell Street 체크인

2027년 실제 출국 직전에는 대한항공 터미널, 체크인 카운터, 라운지 위치/운영시간을 다시 확인한다.

---

## 7. 날짜별 일정 요약

### 1/18 — Sydney CBD & Harbour
- 브런치
- Queen Victoria Building
- Sydney Fish Market 점심
- Barangaroo / Darling Harbour
- The Rocks
- Sydney Observatory 일몰
- Paddy's Market은 현재 월/화 휴무 문제로 제외
- Sydney University는 동선 효율상 우선 제외
- Opera House는 1/19에 집중

### 1/19 — Surry Hills / Bondi / Opera House
- Surry Hills 산책 + 브런치
- Bondi Beach
- 호텔 휴식
- Royal Botanic Garden
- Sydney Opera House / Circular Quay
- 로맨틱 디너 + 와인

### 1/20 — Sydney → Queenstown
- 오전 호텔 → Sydney Airport
- 10:55 출발
- 16:00 Queenstown 도착
- 숙소 체크인
- Lake Wakatipu / Queenstown 시내 가벼운 산책

### 1/21 — Milford Sound
- 하루 전체 Milford Sound
- 다른 관광 추가하지 않음

### 1/22 — Queenstown 휴식 + 렌터카
- 늦은 기상 / 브런치
- Skyline Gondola 또는 Queenstown Gardens 중 하나
- 오후 렌터카 수령
- Queenstown 시내 / 저녁

### 1/23 — Onsen → Arrowtown → Wanaka

```text
Queenstown
→ Onsen Hot Pools
→ Arrowtown
→ Crown Range / Cardrona
→ Wanaka
```

- 08:45 Onsen 도착
- 09:00 Onsen
- Arrowtown 산책 / 점심
- Crown Range / Cardrona
- Edgewater Wanaka 체크인
- Lake Wanaka / That Wanaka Tree

### 1/24 — Wanaka → Pukaki → Tekapo → Fairlie
- Wanaka 출발
- Lake Pukaki / 연어 점심
- Lake Tekapo
- Church of the Good Shepherd
- Fairlie 이동
- Mount Cook은 이동 피로를 줄이기 위해 기본안에서는 제외

### 1/25 — Fairlie → Christchurch
- Fairlie 출발
- Geraldine
- Christchurch 도착
- BreakFree on Cashel
- 렌터카 Downtown 반납 기본안
- Riverside Market / Cathedral Square / New Regent Street

### 1/26 — Christchurch → Auckland
- 호텔 → Christchurch Airport
- 12:00 출발
- 13:25 Auckland 도착
- Hilton Auckland
- Commercial Bay 가족 선물 쇼핑
- Viaduct Harbour 저녁

### 1/27 — Rotorua Day Tour
- Auckland ↔ Rotorua 하루 전체
- Hobbiton / Te Puia 포함 여부는 실제 상품 선택 전
- 복귀 후 다른 일정 추가하지 않음

### 1/28 — Waiheke Island
- Downtown Ferry Terminal
- Waiheke Island
- 와이너리 2~3곳 + 점심
- Auckland 복귀
- 여행 마지막 저녁

### 1/29 — 귀국
- Hilton Auckland → Auckland Airport
- 11:45 출발
- 19:40 인천 도착

---

## 8. 렌터카 현재 결정 상태

조건:

- Queenstown → Christchurch 편도
- SUV
- Full Coverage / Zero Excess 수준 보험
- 한국차 있으면 선호, 필수 아님
- 후보는 **Hertz vs Avis**
- 1/22 Queenstown 수령

현재 웹 일정 기본안:

- 1/22 Queenstown Downtown 수령
- 1/25 Christchurch Downtown 반납

최종 예약 전 비교:

A. 1/22 Queenstown CBD → 1/25 Christchurch Downtown

B. 1/22 Queenstown CBD → 1/26 Christchurch Airport

B가 약 5~7만 원 정도만 비싸면 편의성 때문에 공항 반납도 고려. 10만 원 이상 차이가 크면 Downtown 반납 우선.

아직 업체/실결제금액 미확정.

---

## 9. 가족 선물 전략

짐을 줄이기 위해 **가족 선물 70~80%는 Auckland에서 구매**.

- 부모님: UMF 10+~15+ Manuka Honey 250g
- 조부모/어른: UMF 10+ 또는 lozenges
- 형제/자매: NZ skincare / merino
- 친척/다수: Whittaker's / biscuits
- Rotorua: 마음에 드는 Māori craft / authentic pounamu만 예외적으로 구매

주요 Auckland 후보:

- Aotea Gifts / Commercial Bay
- Woolworths Auckland City

---

## 10. 예산 기준

확정:

- 항공: ₩8,162,600
- 숙박: ₩3,988,555
- 합계: **₩12,151,155**

현재 2인 전체 가이드:

- 현실적 예상: 약 ₩17.4M ~ ₩19.7M
- 운영 목표: 약 ₩18.5M
- 여유 포함: 약 ₩20M

추가 항목:

- 렌터카 / 보험 / one-way fee / 연료
- Milford / Onsen / Rotorua / Waiheke
- 식비
- 현지 교통
- ETA / NZeTA / IVL
- 여행자보험 / eSIM
- 가족 선물
- 용인 → 인천공항 출국일 택시 또는 자차 관련 비용

---

## 11. 웹앱 UX / 디자인 방향

현재 디자인은 `DESIGN_SYSTEM.md`를 기준으로 한다.

방향:

- 사진 사용하지 않음 — 속도 우선
- Premium editorial hero + practical mobile travel app
- warm paper / ink / sage / sky / peach / selected yellow
- 큰 에디토리얼 타이포 + 얇은 1px 선 + 적은 그림자
- floating pill bottom navigation

일정 UX:

- 날짜 가로 선택
- 선택 날짜 한 개의 일정만 표시
- 지도 위치가 있는 일정에는 `지도` 표시
- 일정 행을 누르면 아래 DAY MAP에서 해당 위치 강조
- 선택 위치는 지도에서 강조 마커
- 일정의 지도 가능한 장소에 `길찾기 시작 ↗` 제공
  - Google Maps URL에 목적지만 전달해 현재 위치에서 목적지까지 길찾기
  - 별도 Directions API key는 사용하지 않음
- 별도 `동선` 탭은 제거하고 일정 탭의 DAY MAP에 통합
- DAY MAP 위 `DAY ROUTE`에서 번호 마커 순서로 하루 이동 흐름을 한눈에 확인
- 지도에는 지상 이동 경로선을 표시하고 항공/페리 같은 구간은 분리해서 표현
- 홈의 NEXT/TODAY 일정 카드는 해당 날짜 전체 일정을 카드 내부 스크롤로 확인

시간대 / TODAY / 테스트 모드:

- 브라우저 기기 시간대에만 의존하지 않고 여행 구간별 IANA timezone을 사용
- 출국 전/귀국 후: `Asia/Seoul`
- Sydney 구간: `Australia/Sydney`
- Queenstown 이후 New Zealand 구간: `Pacific/Auckland`
- 1/17, 1/20, 1/29처럼 하루에 시간대가 섞이는 날짜는 각 일정 항목별 timezone을 별도로 계산
- 실제 현재시각을 기준으로 `TODAY` 날짜와 홈 `NOW / NEXT` 상태를 계산
- 여행 중 홈 상단에 현재 일정과 다음 일정을 빠르게 보여주는 `LIVE TRIP` 카드 표시
- URL 테스트 우선순위: `?datetime=YYYY-MM-DDTHH:MM` > `?date=YYYY-MM-DD` > 실제 현재시각
- `?date=`만 지정하면 해당 날짜 12:00 기준으로 테스트
- 테스트 모드에서는 화면 우측 상단에 `TEST · 날짜 시간 · timezone` 배지 표시
- 실제 모드에서는 NOW/NEXT와 현재 예약 상태를 주기적으로 갱신

대표 테스트 예:

```text
?datetime=2027-01-17T06:00  → KST 출국 준비
?datetime=2027-01-20T10:55  → Sydney 출발 시각
?datetime=2027-01-23T09:30  → NZ Onsen 이후 / Arrowtown 전
?datetime=2027-01-29T19:40  → KST 인천 도착
?date=2027-01-23             → 1/23 12:00 NZ 기준
```

Travel Mode / 실전 UI:

- 여행 기간(`tripState.mode === during`)에는 큰 editorial hero를 자동 축소
- 여행 중에는 상단 이름 영역 + LIVE TRIP(NOW/NEXT)을 우선하고 목적지 대형 타이포는 숨김
- 여행 전/후에는 기존 editorial hero 유지
- 예약 탭 상단에 `TRAVEL WALLET` 영역을 추가해 시간 기준 `UP NEXT` 항공/투어를 자동 표시
- 현재 숙박 중인 호텔이 있으면 `TONIGHT · STAY` 카드 표시
- `더보기` 탭에 출국 준비 체크리스트 추가
  - 여권, ETA, NZeTA, IVL, 렌터카 운전 준비, 보험, eSIM, 오프라인 준비, 주요 투어 확인
  - 체크 상태는 브라우저 `localStorage`에만 저장
  - 여행 중에는 기본적으로 접힌 상태로 표시

PWA / 오프라인 운영:

- `manifest.webmanifest` + `service-worker.js`를 사용해 홈 화면 설치 가능한 PWA로 운영
- 설치 시 standalone 모드로 실행해 브라우저 주소창 없이 앱처럼 사용
- Android/Chromium에서 설치 이벤트가 제공되면 `더보기` 탭에 `앱 설치` 버튼 표시
- iPhone/iPad에서는 Safari `공유 → 홈 화면에 추가` 안내 표시
- 앱 셸과 일정 데이터(`itinerary.js`), 예약 구조, NOW/NEXT, Travel Extras, 스타일/스크립트를 사전 캐시
- 인터넷이 끊겨도 홈/일정/예약 구조/예산/가족 선물/출국 준비 체크리스트는 다시 열 수 있도록 함
- 오프라인이면 화면 상단에 `OFFLINE` 배지를 표시
- 지도 타일, Google Maps, Google Drive, 대한항공/Trip.com/Airbnb 같은 외부 앱·웹 연결은 인터넷 필요
- Service Worker navigation은 network-first, 앱 정적 파일은 stale-while-revalidate 사용
- 새 배포 시 Service Worker cache version을 올려 오래된 앱 셸을 정리

1/17 DAY MAP은 출국 전 지상 이동을 중심으로:

```text
용인동백 두산위브더제니스
→ 인천국제공항 T2
→ 대한항공 프레스티지 라운지
```

를 기본 전체 동선으로 유지하되, Sydney Airport / Meriton 숙소 일정도 개별 위치 확인이 가능하다.

예약 UX:

- 예약 탭은 가격표가 아니라 여행 중 바로 사용하는 **Booking Wallet** 역할
- 항공 / 숙소 / 투어를 구분해 표시
- 예약 카드에는 가격을 표시하지 않음
- 위치는 Google Maps로 연결
- 예약 탭 상단에 `대한항공 My`, `Trip.com`, `Airbnb` 앱 바로가기 제공
- Android는 설치 앱 실행을 우선 시도하고 실패하면 공식 웹으로 fallback
- iPhone은 Universal Link가 지원되면 앱으로 열리고, 그렇지 않으면 공식 웹으로 이동
- Airbnb `/trips` 링크는 예약 목록 접근용으로 사용

Google Drive Private Docs 구조:

- Public GitHub에는 여권/예약확인서/보험증권 등 실제 민감 문서 파일을 저장하지 않음
- 민감 문서는 사용자의 Google Drive 전용 폴더에 저장 가능
- 전용 폴더의 **일반 액세스는 `제한됨(Restricted)`**으로 유지
- 권한은 본인 Google 계정 + 배우자 Google 계정만 `Viewer` 수준으로 부여하는 것을 기본안으로 함
- Public GitHub에는 Drive 문서 자체가 아니라 **제한 공유 폴더 URL 한 개만** 연결하는 구조를 우선 사용
- `booking-data.js`의 `privateDrive.folderUrl`이 `null`이면 UI 미표시
- 제한된 폴더 URL을 입력하면 예약 탭에 `PRIVATE DRIVE · Drive 문서 열기` 버튼 자동 표시
- URL 자체는 Public HTML/JS에서 볼 수 있으므로 링크를 비밀값으로 간주하지 않음. 실제 접근 제어는 Google 계정 권한이 담당
- 상위 폴더가 넓게 공유되어 있지 않은 독립 전용 폴더를 권장
- 실제 연결 전 시크릿 브라우저/권한 없는 Google 계정으로 접근 차단 검증
- 여권 등 핵심 문서는 필요 시 Google Drive 앱에서 개별적으로 `오프라인 사용` 설정하여 네트워크 장애 대비

---

## 12. 개인정보 원칙

Public repository / GitHub Pages에는 아래를 직접 저장하지 않는다.

- 여권번호 / 생년월일 등 신원정보
- 항공/호텔/투어 예약번호
- QR / 바코드 / 탑승권 이미지
- 예약확인서 원본 PDF 또는 캡처 이미지
- 카드번호 / 결제수단
- 개인 전화번호 / 이메일
- 보험증권 번호

예약 상세정보는 로그인된 휴대폰 앱 또는 권한 제한된 Google Drive에서 확인한다.

Google Drive 링크를 Public GitHub Pages에 배치하는 경우에도 **Drive 링크 자체는 공개된다고 가정**한다. 따라서 `링크가 있는 모든 사용자` 공유는 사용하지 않고, 반드시 `제한됨` + 허용 계정만 사용한다.

`robots.txt`는 검색엔진 노출을 줄이는 보조 수단일 뿐이며 보안 기능으로 간주하지 않는다. URL을 아는 사람은 Public GitHub Pages에 접근할 수 있다고 가정한다.

---

## 13. 현재 TODO

- [ ] Hertz vs Avis 실제 견적 비교 / 확정
- [ ] Christchurch Downtown vs Airport 반납 결정
- [ ] Milford Sound 실제 투어 업체 예약
- [ ] Onsen 예약 정보 반영
- [ ] Rotorua 상품 확정
- [ ] Waiheke 방식 확정
- [ ] 주요 저녁 식당 확정
- [ ] 가족 선물 수량/예산 확정
- [ ] ETA / NZeTA / IVL 준비
- [ ] 여행 직전 1/17 대한항공 T2 / 라운지 운영시간 재확인
- [ ] 여행 직전 용인 → 인천공항 예상 교통시간 재확인
- [ ] 실제 Android/iPhone에서 대한항공 My / Trip.com / Airbnb 앱 버튼 동작 확인
- [ ] 실제 모바일에서 `?datetime=` 기준 NOW/NEXT 및 여행 구간별 timezone 표시 확인
- [x] PWA + offline app shell 구현
- [x] 일정별 현재 위치 → 목적지 길찾기 버튼 구현
- [x] Booking UP NEXT / TONIGHT 구현
- [x] 여행 기간 자동 Travel Mode 구현
- [x] 출국 준비 체크리스트 구현
- [ ] 실제 Android/iPhone에서 홈 화면 설치 및 비행기 모드 오프라인 재실행 확인
- [ ] Google Drive에 Private Travel Docs 전용 폴더 생성
- [ ] Drive 폴더를 본인/배우자 계정만 Viewer로 공유하고 `일반 액세스: 제한됨` 확인
- [ ] 권한 없는 계정/시크릿 모드에서 Drive 접근 차단 검증
- [ ] 검증 후 `bookingData.privateDrive.folderUrl`에 실제 제한 공유 폴더 URL 반영
- [ ] 핵심 문서를 Drive 앱에서 오프라인 사용 가능하게 저장할지 결정

---

## 14. 핵심 원칙

**집에서 출발하는 순간부터 신혼여행 일정으로 관리하고, 공항에는 국제선 출발 3시간 전에 도착해 비즈니스 체크인과 라운지 시간을 충분히 확보한다. 이후 일정은 숙소·항공과 3개 핵심 투어를 유지하면서 이동 피로를 줄이고, 실제 여행 중 휴대폰에서 5~10초 안에 NOW/NEXT·다음 목적지·예약을 확인할 수 있도록 운영한다. Public GitHub Pages에는 민감한 문서를 직접 저장하지 않고, 예약 앱 또는 본인/배우자 계정만 접근 가능한 Google Drive Restricted 폴더로 분리한다. 일정 핵심 정보는 PWA 캐시에 보관해 통신이 불안정해도 다시 열 수 있게 하고, 지도/Drive/외부 서비스는 온라인 기능으로 분리한다.**
