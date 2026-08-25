# Honeymoon 2027 — Project Context

> 새 ChatGPT 대화나 새로운 작업 세션에서 프로젝트 맥락을 복구하기 위한 기준 문서다.
> 작업 시작 시 **이 파일을 먼저 읽고, 실제 웹앱 일정 데이터는 `itinerary.js`를 함께 확인**한다.
>
> 마지막 정리 기준: 2026-08-25

---

## 1. 프로젝트 목적

2027년 1월 17일~1월 29일 호주·뉴질랜드 신혼여행을 여행 전 준비와 여행 중 실제 사용을 모두 고려해 하나의 모바일 웹앱으로 관리한다.

핵심 목표:

- 휴대폰에서 날짜별 일정을 빠르게 확인
- 일정 항목을 누르면 아래 지도에서 해당 위치를 강조
- Google Maps로 장소/전체 동선 연결
- 항공, 숙소, 렌터카, 투어, 식당, 쇼핑을 한곳에서 관리
- 확정 예산과 예상 비용 관리
- 가족 선물 체크리스트 관리
- 중요한 결정은 레포 자체에 남겨 새 대화에서도 이어서 작업

Repository: `sh0427-han/honeymoon20270117`

현재 저장소는 **Public**이므로 예약번호, 여권번호, 결제정보 등 민감정보는 커밋하지 않는다.

주요 파일:

```text
index.html
styles.css
itinerary.js
app.js
README.md
PROJECT_CONTEXT.md
DESIGN_SYSTEM.md
```

AI 작업 순서:

1. `PROJECT_CONTEXT.md`
2. `itinerary.js` — 실제 최신 일정의 canonical source
3. 필요 시 `app.js`, `styles.css`, `index.html`
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

결정사항:

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

Mount Cook은 이동 피로를 줄이기 위해 기본안에서는 제외.

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
- Refero Styles에서 좋은 패턴을 참고하되 특정 사이트를 복제하지 않음
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
- 장소별 Google Maps 열기
- 별도 동선 탭에서 날짜별 전체 동선 Google Maps 연결

1/17 DAY MAP은 출국 전 지상 이동을 중심으로:

```text
용인동백 두산위브더제니스
→ 인천국제공항 T2
→ 대한항공 프레스티지 라운지
```

를 표시한다.

---

## 12. 개인정보 원칙

Public repository에는 아래를 저장하지 않는다.

- 여권번호 / 생년월일 등 신원정보
- 항공/호텔 예약번호
- QR / 바코드
- 카드번호 / 결제수단
- 개인 전화번호 / 이메일
- 보험증권 번호

단, 여행 동선 구현을 위해 일반 공개 장소 수준의 출발지/숙소/관광지 위치는 웹앱에 기록할 수 있다.

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
- [ ] 필요 시 offline/PWA 기능 추가

---

## 14. 핵심 원칙

**집에서 출발하는 순간부터 신혼여행 일정으로 관리하고, 공항에는 국제선 출발 3시간 전에 도착해 비즈니스 체크인과 라운지 시간을 충분히 확보한다. 이후 일정은 숙소·항공과 3개 핵심 투어를 유지하면서 이동 피로를 줄이고, 실제 여행 중 휴대폰에서 빠르게 확인할 수 있도록 운영한다.**
