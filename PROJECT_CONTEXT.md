# Honeymoon 2027 — Project Context

> 이 문서는 새 ChatGPT 대화나 새로운 작업 세션에서도 이 프로젝트의 맥락을 빠르게 복구하기 위한 기준 문서다.
> 작업을 시작할 때 **이 파일을 먼저 읽고, 실제 화면에 반영된 최신 데이터는 `itinerary.js`를 함께 확인**한다.
>
> 마지막 정리 기준: 2026-08-25

---

## 1. 프로젝트 목적

2027년 1월 17일~1월 29일 호주·뉴질랜드 신혼여행을 여행 전 준비와 여행 중 실제 사용을 모두 고려해 하나의 모바일 웹페이지로 관리한다.

주요 목표:

- 휴대폰에서 날짜별 일정을 빠르게 확인
- 항공, 숙소, 렌터카, 투어, 식당, 쇼핑 정보를 한곳에 정리
- 지도에서 주요 장소와 이동 동선을 확인
- 확정 예산과 예상 추가 비용을 관리
- 가족 선물 쇼핑 목록 관리
- 향후 일정 수정 시 HTML을 직접 수정하지 않고 `itinerary.js` 중심으로 관리

이 프로젝트는 단순 여행 소개 페이지가 아니라 **실제 여행 중 사용하는 itinerary web app**을 목표로 한다.

---

## 2. 저장소 / 기술 구조

Repository: `sh0427-han/honeymoon20270117`

현재 저장소는 **Public**이다. 따라서 민감정보를 절대 커밋하지 않는다.

현재 파일 구조:

```text
honeymoon20270117/
├── index.html
├── styles.css
├── itinerary.js
├── app.js
├── README.md
└── PROJECT_CONTEXT.md
```

역할:

- `index.html`: 페이지 shell / section 구조
- `styles.css`: 모바일 우선 반응형 UI
- `itinerary.js`: 여행 일정, 항공, 숙소, 장소, 예산 등 핵심 데이터
- `app.js`: 일정 렌더링, 필터, 지도, 예산, 선물 체크리스트 등 동작
- `README.md`: 프로젝트 사용법과 진입점
- `PROJECT_CONTEXT.md`: 장기 프로젝트 맥락 및 의사결정 기록

### AI 작업 시 권장 순서

1. `PROJECT_CONTEXT.md` 읽기
2. `itinerary.js` 읽기 — 실제 코드상의 최신 일정 확인
3. 필요 시 `index.html`, `app.js`, `styles.css` 확인
4. 사용자의 최신 요청을 기존 확정사항보다 우선하여 반영
5. 변경 후 이 문서에서 의미 있는 의사결정이 바뀌었다면 함께 업데이트

---

## 3. 여행 기본 정보

- 여행 목적: 신혼여행
- 여행 인원: 2명
- 기간: **2027-01-17 ~ 2027-01-29**
- 주요 국가: 호주, 뉴질랜드
- 주요 도시/지역:
  - Sydney
  - Queenstown
  - Wanaka
  - Lake Pukaki / Lake Tekapo / Fairlie
  - Christchurch
  - Auckland
  - Rotorua 당일투어
  - Waiheke Island 당일여행

전체 흐름:

```text
인천
→ Sydney
→ Queenstown
→ Wanaka
→ Lake Pukaki / Lake Tekapo / Fairlie
→ Christchurch
→ Auckland
→ 인천
```

---

## 4. 변경하면 안 되는 고정 조건

### 4.1 숙소는 모두 예약 완료 — 고정

사용자는 숙소를 이미 예약했으므로 **숙소 자체를 다른 호텔/지역으로 변경하는 추천은 하지 않는다.**

| 날짜 | 지역 | 숙소 | 가격 |
|---|---|---|---:|
| 1/17 → 1/20 | Sydney | Meriton Suites Campbell Street | ₩811,000 |
| 1/20 → 1/23 | Queenstown | Hampshire Holiday Parks Queenstown Lakeview | ₩734,799 |
| 1/23 → 1/24 | Wanaka | Edgewater Hotel | ₩483,929 |
| 1/24 → 1/25 | Fairlie | Airbnb, 페얼리의 별장 | ₩391,259 |
| 1/25 → 1/26 | Christchurch | BreakFree on Cashel Christchurch | ₩105,905 |
| 1/26 → 1/29 | Auckland | Hilton Auckland | ₩1,461,663 |

숙박 총액: **₩3,988,555**

### 4.2 반드시 포함할 고정 투어/활동

다음 3개는 여행 계획을 수정하더라도 반드시 유지한다.

1. **Milford Sound Tour** — 1/21
2. **Onsen Hot Pools** — 1/23 오전, 현재 일정상 09:00 기준
3. **Rotorua Day Tour** — 1/27

Waiheke Island는 1/28의 강한 추천 일정이나, 위 세 항목과 동일한 절대 고정 조건으로 정해진 것은 아니다.

---

## 5. 확정 항공권

| 날짜 | 시간 | 구간 | 항공사 | 가격 |
|---|---|---|---|---:|
| 1/17 | 08:00 → 20:05 | 인천 → Sydney | Korean Air, Business | ₩4,994,400 |
| 1/20 | 10:55 → 16:00 | Sydney → Queenstown | Air New Zealand | ₩918,400 |
| 1/26 | 12:00 → 13:25 | Christchurch → Auckland | Air New Zealand | ₩246,000 |
| 1/29 | 11:45 → 19:40 | Auckland → 인천 | Korean Air | ₩2,003,800 |

항공권 총액: **₩8,162,600**

항공 + 숙박 확정금액: **₩12,151,155**

예약번호, 여권번호, 결제정보 등은 Public repository에 저장하지 않는다.

---

## 6. 현재 기준 날짜별 추천 일정

실제 화면 데이터는 `itinerary.js`가 canonical source다. 아래 내용은 전체 의도와 결정사항 요약이다.

### 1/17 — Sydney 도착

- 08:00 인천 출발
- 20:05 Sydney 도착
- 입국심사 / 수하물 / 호텔 이동
- 약 22:00 Meriton Suites Campbell Street 체크인
- 도착일에는 별도 관광을 넣지 않고 휴식

### 1/18 — Sydney CBD & Harbour

현재 추천:

- 브런치
- Queen Victoria Building
- Sydney Fish Market에서 점심
- Barangaroo / Darling Harbour
- The Rocks
- Sydney Observatory 일몰

변경 결정:

- Paddy's Market은 월/화 휴무 문제로 기존 일정에서 제외
- Sydney University는 동선 대비 만족도가 낮아 우선 제외
- Opera House 일정은 1/19에 집중

### 1/19 — Surry Hills / Bondi / Opera House

- Surry Hills 산책 + 브런치
- Bondi Beach
- 호텔 복귀 / 샤워 / 휴식
- Royal Botanic Garden
- Sydney Opera House / Circular Quay
- 신혼여행 로맨틱 디너 + 와인

### 1/20 — Sydney → Queenstown

- 오전 호텔 → Sydney Airport
- 10:55 출발
- 16:00 Queenstown 도착
- 숙소 체크인
- Lake Wakatipu / Queenstown 시내 가벼운 산책

### 1/21 — Milford Sound

**고정 일정**

- 약 05:00 기상
- 약 07:00 투어 출발
- 하루 전체를 Milford Sound에 사용
- 약 20:00 Queenstown 복귀 후 휴식

이날 다른 관광을 추가하지 않는다.

### 1/22 — Queenstown 휴식 + 렌터카

전날 Milford Sound 때문에 의도적으로 여유롭게 구성한다.

- 늦은 기상 / 브런치
- Skyline Gondola 또는 Queenstown Gardens 중 하나
- 오후 렌터카 수령
- Queenstown 시내 / Lake Wakatipu
- 저녁 + 와인

### 1/23 — Onsen → Arrowtown → Wanaka

현재 가장 권장되는 남섬 로드트립 동선:

```text
Queenstown
→ Onsen Hot Pools
→ Arrowtown
→ Crown Range / Cardrona
→ Wanaka
```

- 08:45 Onsen 도착 권장
- 09:00 Onsen Hot Pools — **고정**
- 이후 Arrowtown 산책 / 점심
- Crown Range / Cardrona 경유
- 오후 Edgewater Wanaka 체크인
- Lake Wanaka / That Wanaka Tree 도보 산책

### 1/24 — Wanaka → Pukaki → Tekapo → Fairlie

현재 추천:

- 오전 Wanaka 출발
- Lake Pukaki
- 연어 점심
- Lake Tekapo
- Church of the Good Shepherd
- 오후/저녁 Fairlie 숙소 이동

Mount Cook은 현 일정에서는 일부러 넣지 않는 방향이다. 이유는 이동일을 지나치게 무겁게 만들지 않기 위해서다.

숙소는 Fairlie로 고정이므로 Tekapo 숙박으로 변경 추천하지 않는다.

### 1/25 — Fairlie → Christchurch

현재 추천:

- Fairlie 출발
- Geraldine에서 카페/가벼운 휴식
- Christchurch 도착
- BreakFree on Cashel에 짐 보관/체크인
- 렌터카 Christchurch Downtown 반납
- Riverside Market
- Cathedral Square
- New Regent Street

BreakFree on Cashel은 CBD에 있으므로 렌터카 반납 후 도보 관광이 가능하다.

### 1/26 — Christchurch → Auckland

현재 추천:

- 렌터카를 전날 시내에서 반납했다면 호텔에서 택시/셔틀로 Christchurch Airport 이동
- 12:00 Christchurch 출발
- 13:25 Auckland 도착
- Hilton Auckland 체크인
- Commercial Bay / Quay Street 주변에서 가족 선물 쇼핑
- Viaduct Harbour 저녁

이날은 다음날 Rotorua 장거리 투어를 위해 관광 강도를 낮춘다.

### 1/27 — Rotorua Day Tour

**고정 일정**

- Auckland에서 Rotorua 당일 투어
- 투어 상품에 따라 Hobbiton / Te Puia 포함 여부는 아직 최종 확정 전
- 장시간 투어이므로 복귀 후 다른 일정 추가하지 않음

### 1/28 — Waiheke Island

현재 강력 추천 일정:

- Downtown Ferry Terminal
- Waiheke Island
- 와이너리 2~3곳 수준
- 점심
- Auckland 복귀
- 여행 마지막 저녁

Hilton Auckland와 Ferry Terminal 접근성이 좋아 이 날짜에 배치한 상태.

### 1/29 — 귀국

- 오전 Hilton Auckland 출발
- Auckland Airport 이동
- 11:45 인천행 출발
- 19:40 인천 도착

출국일에 쇼핑이나 관광을 추가하지 않는다.

---

## 7. 렌터카 — 현재 결정 상태

사용자 조건:

- Queenstown → Christchurch 편도 렌트
- **SUV 필수**
- **Full Coverage / Zero Excess 수준 보험 필수**
- 한국차가 있으면 선호하지만 필수는 아님
- 1/22 Queenstown에서 수령 예정
- 후보 업체는 현재 **Hertz와 Avis만 비교**

### Hertz

선호 포인트:

- Queenstown Downtown 수령 가능
- Kia Sportage AWD or similar 차량군 존재
- SuperCover / Super Damage Waiver 계열로 excess $0 수준 구성 가능
- Christchurch Downtown / Airport 모두 반납 가능

### Avis

선호 포인트:

- Queenstown City 수령 가능
- Hyundai Kona / Santa Fe or similar 차량군 존재
- Zero Excess 선택 가능
- Christchurch City / Airport 반납 가능

### 현재 기본안

현재 웹 일정에는:

- **1/22 Queenstown Downtown 수령**
- **1/25 Christchurch Downtown 반납**

으로 기록되어 있다.

이유:

- BreakFree on Cashel이 Christchurch CBD에 있어 1/25 이후 차량 필요성이 낮음
- 1/26 호텔 → 공항은 택시 또는 외부 shuttle 이용 가능

하지만 실제 예약 시 다음 두 견적을 다시 비교한다.

A. 1/22 Queenstown CBD → 1/25 Christchurch Downtown

B. 1/22 Queenstown CBD → 1/26 Christchurch Airport

B가 A보다 약 5~7만 원 수준만 비싸다면 편의성 때문에 공항 반납도 고려할 수 있다. 반대로 10만 원 이상 차이가 크다면 1/25 Downtown 반납 우선.

**아직 Hertz/Avis 최종 예약 업체 및 실제 결제금액은 확정되지 않았다.**

---

## 8. Christchurch 숙소 → 공항 이동

숙소: BreakFree on Cashel Christchurch

현재 판단:

- 호텔 자체 무료 공항셔틀은 없는 것으로 확인
- Christchurch Airport까지 약 10km / 차량 약 15~20분 수준
- 택시가 가장 편리한 선택
- Super Shuttle 등 외부 door-to-door shuttle도 이용 가능
- 신혼여행 + 캐리어를 고려하면 택시를 우선 추천

현재 일정상 1/26 약 09:30 전후 호텔 출발을 임시값으로 사용하고 있다.

---

## 9. 가족 선물 쇼핑 전략

짐을 줄이기 위해 **가족 선물의 70~80%는 마지막 Auckland에서 구매**하는 전략.

### 주요 쇼핑 지역

Hilton Auckland 기준 Quay Street / Commercial Bay 주변.

주요 후보:

- Aotea Gifts, Commercial Bay: Manuka honey, NZ skincare, merino, premium gifts
- Woolworths Auckland City: Whittaker's, 간식 등 대량 구매

### 추천 선물

양가 부모님:

- UMF 10+~15+ Manuka Honey, 250g 정도
- 필요 시 작은 NZ 기념품 추가

형제/자매:

- NZ skincare
- merino 관련 제품

친척/다수 선물:

- Whittaker's chocolate
- NZ biscuits
- Manuka lozenges

Rotorua의 Te Puia 방문 상품이라면:

- Māori craft
- authentic pounamu / greenstone

도 후보. Pounamu는 authentic NZ / Ngāi Tahu provenance 확인 권장.

Sydney에서는 여행 초반 짐 부담 때문에 선물을 대량 구매하지 않는 방향.

---

## 10. 예산 기준

### 확정

- 항공: **₩8,162,600**
- 숙박: **₩3,988,555**
- 확정 합계: **₩12,151,155**

### 아직 추가되는 항목

- SUV 렌터카
- Full Coverage insurance
- Queenstown → Christchurch one-way fee
- fuel
- Milford Sound
- Onsen Hot Pools
- Rotorua tour
- Waiheke
- 식비
- 현지 대중교통 / 택시
- Australia ETA
- NZeTA + IVL
- 여행자보험 / eSIM
- 가족 선물 / 쇼핑

### 현재 예산 가이드

기존 계산 기준 2인 총액:

- 현실적 예상 범위: **약 ₩17.4M ~ ₩19.7M**
- 운영 목표 예산: **약 ₩18.5M**
- 여유 포함 최대 예산 감각: **약 ₩20M**

쇼핑/선물 규모에 따라 상단을 넘어갈 수 있다.

예산은 실제 렌터카 및 투어 예약 후 반드시 다시 계산한다.

---

## 11. 웹앱 UX 방향

현재/향후 목표:

### 핵심 화면

1. Today / 오늘 일정
2. 전체 일정
3. 지도
4. 항공 / 숙소 / 예약 요약
5. 예산
6. 가족 선물 / 쇼핑 리스트

### 원하는 모바일 경험

- 390px 전후 휴대폰 화면 우선
- 날짜별 카드
- 날짜 좌우 스와이프 또는 빠른 날짜 선택
- 현재 날짜에 해당하는 일정 자동 강조
- 장소 클릭 시 Google Maps 열기
- 일정 type별 아이콘/스타일
  - flight
  - hotel
  - meal
  - sightseeing
  - tour
  - drive / car
  - shopping
- fixed tour는 다른 일정과 시각적으로 구분
- 여행 중 수정하기 쉬운 데이터 중심 구조

### 향후 넣을 가치가 큰 기능

- D-day countdown
- 오늘 일정 자동 선택
- 장소별 Google Maps directions 버튼
- 날짜별 route visualization
- 확정/예약 필요/후보 상태 표시
- 식당 후보와 예약 여부
- 투어 예약 상태
- 렌터카 최종 차량/업체/수령·반납 위치
- 실결제 예산 vs 예상 예산
- 간단한 offline/PWA 지원
- 가족 선물 체크리스트 localStorage 유지

---

## 12. 데이터 및 변경 원칙

### Canonical data

실제 웹화면에 사용되는 일정은 `itinerary.js`가 기준이다.

`PROJECT_CONTEXT.md`는 의도와 의사결정을 설명하기 위한 문서이므로 두 파일에 차이가 있다면:

1. 사용자의 가장 최근 명시적 요청
2. `itinerary.js`의 최신 구현 상태
3. 이 문서의 설명

순서로 판단한다.

### 확정 / 후보 구분

- 숙소: 확정 / 변경 금지
- 항공: 확정
- Milford Sound: 일정 필수
- Onsen: 일정 필수
- Rotorua: 일정 필수
- 렌터카 업체: Hertz vs Avis, 미확정
- 렌터카 반납일: 현재 1/25 Downtown 기본안, 최종 견적에 따라 변경 가능
- Waiheke: 현재 추천안
- 식당: 대부분 후보 또는 추천 단계
- 가족 선물: category 전략만 정해짐, 구체 제품 구매 전

### 개인정보

이 repository가 Public인 동안 아래는 절대 기록하지 않는다.

- 여권번호
- 생년월일 등 신원정보
- 항공/호텔 booking reference
- 카드번호/결제수단
- 개인 전화번호
- 이메일 주소
- 상세 여행자 개인정보
- 보험증권 번호

필요한 경우 private/local note로 별도 관리한다.

---

## 13. 새 ChatGPT 대화에서 사용할 요청 예시

새 대화에서 아래처럼 말하면 맥락 복구가 쉽다.

> GitHub `sh0427-han/honeymoon20270117` 레포의 `PROJECT_CONTEXT.md`와 `itinerary.js`를 먼저 읽고 신혼여행 프로젝트를 이어서 작업해줘.

또는:

> honeymoon20270117 프로젝트 이어서 하자. 레포 컨텍스트 파일부터 확인해줘.

AI는 기존 내용을 추측해서 재구성하기보다 반드시 repository의 최신 파일을 먼저 확인하는 것이 좋다.

---

## 14. 현재 남은 주요 의사결정 / TODO

- [ ] Hertz vs Avis 실제 2027-01-22 견적 비교 및 업체 확정
- [ ] 1/25 Christchurch Downtown vs 1/26 Airport 반납 최종 결정
- [ ] Milford Sound 실제 투어 업체 / 예약 시간 확정
- [ ] Onsen 예약 확정 정보 반영
- [ ] Rotorua 투어 상품 확정: Rotorua 중심인지, Hobbiton / Te Puia 포함인지
- [ ] Waiheke 투어/와이너리 방식 확정
- [ ] Sydney / Queenstown / Auckland 주요 저녁 식당 확정
- [ ] 가족 선물 수량 및 예산 확정
- [ ] ETA / NZeTA / IVL 준비 상태 관리
- [ ] GitHub Pages 배포 활성화/확인
- [ ] 웹앱 UI 개선: D-day, today view, route map, 예약상태

---

## 15. 프로젝트 핵심 원칙 한 줄 요약

**숙소·항공과 3개 고정 투어는 유지하고, 이동 피로를 줄이면서 신혼여행다운 여유를 확보하며, 마지막 Auckland에서 쇼핑을 집중하고, 모든 정보를 모바일 웹앱에서 빠르게 볼 수 있도록 관리한다.**
