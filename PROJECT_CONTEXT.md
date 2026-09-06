# Honeymoon 2027 — Project Context

> 새 ChatGPT 대화나 작업 세션에서 프로젝트 맥락을 복구하기 위한 기준 문서다.
> 작업 시작 시 **이 파일을 먼저 읽고, 실제 웹앱 일정 데이터는 `itinerary.js`를 함께 확인**한다.
> 사용자의 최신 요청이 이 문서와 충돌하면 최신 요청이 우선한다.
>
> 마지막 정리 기준: 2026-09-06 · V30

---

## 1. 프로젝트 목적 / 운영 원칙

- 여행 기간: **2027-01-17 ~ 2027-01-29**
- 인원: 2명
- 흐름: Korea → Sydney → Queenstown → Wanaka → Fairlie → Christchurch → Auckland → Korea
- Repository: `sh0427-han/honeymoon20270117`
- 배포: **Public GitHub repository + GitHub Pages**
- 사이트: `https://sh0427-han.github.io/honeymoon20270117/`
- `itinerary.js`: 실제 웹앱 일정 canonical source
- `booking-data.js`: 예약 문서 / 현지 결제 / Drive 링크 canonical source
- `PROJECT_CONTEXT.md`: 확정사항 / 의사결정 / TODO 요약
- 예약번호, QR/바코드, 여권정보, 카드번호, 보험증권 번호, 예약확인서 PDF 원본 등 민감정보는 Public GitHub에 저장하지 않는다.
- 실제 민감 문서는 Restricted Google Drive에서 관리하고 Public JS에는 파일명/Drive URL 정도만 둔다.

---

## 2. 확정 항공

| 날짜 | 시간 | 구간 | 항공사 | 가격 |
|---|---|---|---|---:|
| 1/17 | 08:00 → 20:05 | ICN → SYD | Korean Air Business | ₩4,994,400 |
| 1/20 | 10:55 → 16:00 | SYD → ZQN | Air New Zealand | ₩918,400 |
| 1/26 | 12:00 → 13:25 | CHC → AKL | Air New Zealand | ₩246,000 |
| 1/29 | 11:45 → 19:40 | AKL → ICN | Korean Air | ₩2,003,800 |

항공 총액: **₩8,162,600**

### 항공 문서 UI

항공 영수증은 웹앱에서 제외하고 실제 탑승용/예약용 티켓 문서만 노출한다.

- 1/17 ICN→SYD
  - `🐶 상훈이 티켓`
  - `🐯 진영이 티켓`
- 1/20 SYD→ZQN
  - 두 사람 예약내역이 한 PDF에 있어 `🐶상훈이 / 🐯진영이 티켓` 1개
- 1/26 CHC→AKL
  - 한/영 통합 e-Ticket 1개만 사용하고 `🐶상훈이 / 🐯진영이 티켓`으로 표시
  - 별도 영문 일정표는 웹앱에서 제외
- 1/29 AKL→ICN
  - `🐶 상훈이 티켓`
  - `🐯 진영이 티켓`

현재 항공 문서는 **6 / 6 연결** 상태다.

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

### 숙박 문서 UI

숙소 카드에는 가능한 경우 다음 문서를 각각 연결한다.

- `예약서 · 한글`
- `예약서 · 영문`
- `영수증`

현재 연결 상태:

- Meriton: 한글 바우처 + 영문 바우처
- Queenstown Lakeview: 한글 바우처 + 영문 바우처 + 영수증
- Edgewater: 한글 바우처 + 영문 바우처 + 영수증
- Fairlie Airbnb: 문서 미연결
- BreakFree: 한글 바우처 + 영문 바우처 + 영수증
- Hilton Auckland: 한글 바우처 + 영문 바우처 + 영수증

현재 숙박 문서는 **14 / 15 연결** 상태다.

---

## 4. 핵심 경험

고정:

1. **Milford Sound Tour** — 1/21
2. **Onsen Hot Pools** — 1/23 오전
3. **Rotorua Day Tour** — 1/27

선호:

- Waiheke Island — 1/28

---

## 5. 날짜별 일정 요약

- 1/17 Korea → Sydney
- 1/18 Sydney CBD / Fish Market / Barangaroo / The Rocks / Observatory
- 1/19 Surry Hills / Bondi / Botanic Garden / Opera House
- 1/20 Sydney → Queenstown
- 1/21 Milford Sound 하루 전체
- 1/22 Queenstown 휴식 + **15:00 Hertz 렌터카 수령**
- 1/23 Onsen → Arrowtown → Crown Range / Cardrona → Wanaka
- 1/24 Wanaka → Pukaki → Tekapo → Fairlie
- 1/25 Fairlie → Geraldine → Christchurch + **15:00 Hertz 렌터카 반납**
- 1/26 Christchurch → Auckland
- 1/27 Rotorua Day Tour
- 1/28 Waiheke Island
- 1/29 Auckland → Incheon

세부 시간과 실제 장소/지도 좌표는 반드시 `itinerary.js`를 기준으로 한다.

### 1/25 Christchurch 일정

확정 반납시간이 15:00이므로 현재 일정은 다음 순서다.

- 09:30 Fairlie 출발
- 10:30 Geraldine 카페
- 13:30 Christchurch 도착 · BreakFree에 짐 보관
- 15:00 Hertz Christchurch Downtown 렌터카 반납
- 15:30 이후 Riverside Market / Cathedral Square / New Regent Street

---

## 6. Hertz 렌터카 — 확정 예약

예약확약서 기준 확정사항:

- 업체: **Hertz**
- 편도: Queenstown Downtown → Christchurch Downtown
- 수령: **2027-01-22 15:00**
- 반납: **2027-01-25 15:00**
- 수령 영업소: Queenstown Downtown
  - 1-7 Earl Street, St Peter's Close, Queenstown
- 반납 영업소: Christchurch Downtown
  - Unit 4, 150 Kilmore St, Christchurch 8011
- 차량: **Compact SUV (Group G0 / CFAR)**
- 예시 차량: **Kia Seltos 또는 동급**
- 무제한 km
- 예약 문서상 차량손실 면책 프로그램 포함
- 편도 렌탈 확정
- 예상 총 임차비용: **NZD 560.21**
- 결제: **후지불 / 현지 카운터 결제**
- 기본요금 NZD 487.14 + 세금 NZD 73.07 = NZD 560.21
- 신용카드 surcharge가 적용될 수 있음
- 보증금 / 추가 카드 pre-authorisation이 발생할 수 있음
- 차량 손상, 연료, 통행료, 현지 추가 옵션 등은 별도 가능

기존 NZD 746.93 견적과 17:00 반납 정보는 폐기한다.

`Full Coverage / Zero Excess`라는 임의 표현도 제거하고, 실제 예약서에 명시된 **차량손실 면책 프로그램 포함**만 사용한다.

### 렌터카 문서

Drive 폴더:

- `04_Rental`
- Folder ID: `1KeQX7oLUDsNSisgn2h5tXwU0dSYmpcjD`

파일:

`20270122-20270125_ZQN-CHC_HERTZ_BOOKING.pdf`

웹앱 CAR 카드에서 `예약 확약서` 버튼으로 연결한다.

현재 렌터카 문서는 **1 / 1 연결** 상태다.

---

## 7. Google Drive Private Docs

루트 폴더:

- 이름: `honeymoon270117`
- ID: `1htJdyYnzYCasaBfZBPGee0RG101-rdo5`

구조:

```text
honeymoon270117
├─ 01_Flights
├─ 02_Stays
├─ 03_Tours
├─ 04_Rental
└─ Honeymoon Budget 2027
```

운영 원칙:

- Google Drive 일반 액세스 `Restricted` 유지
- 본인 + 배우자 계정만 접근 허용
- Public GitHub에는 PDF 원본 저장 금지
- Drive URL 자체는 공개된다고 가정
- 여행 전 핵심 문서는 Drive 앱에서 오프라인 사용 설정 권장

파일명 규칙:

- 항공 승객별 티켓: `YYYYMMDD_ORIGIN-DEST_PASSENGER_AIRLINECODE.pdf`
- 항공 공용 문서: `YYYYMMDD_ORIGIN-DEST_ITINERARY_EN.pdf` 또는 `..._ETICKET_KO-EN.pdf`
- 숙박: `YYYYMMDD-YYYYMMDD_LOCATION_PROPERTY_VOUCHER_KO/EN.pdf`, `..._RECEIPT.pdf`
- 렌터카: `YYYYMMDD-YYYYMMDD_ORIGIN-DEST_HERTZ_BOOKING.pdf`

---

## 8. 예약 탭 / 현지 결제 Wallet

상단 필터:

`FLIGHTS / STAYS / TOURS / CAR`

현지 결제 Wallet은 여행 중 앞으로 결제해야 할 AUD / NZD 금액을 빠르게 보는 용도다.

현재 확정 현지 결제:

- Meriton Suites Campbell Street: **AUD 795 · Pay at Hotel**
- Hertz: **NZD 560.21 · 차량 수령 시 현지 카운터 결제**

선결제 완료:

- Queenstown Lakeview
- Edgewater Hotel
- BreakFree on Cashel
- Hilton Auckland

확인 필요:

- Fairlie Airbnb 결제 시점
- 미확정 투어 결제

Wallet 합계 원칙:

- `pay_on_site / partial` + 확정된 `amountDue`만 합산
- `paid`는 현지 결제 합계 제외
- 보증금 / pre-authorisation은 합계 제외
- 현금 필요액은 `cashRequired=true` 또는 `method=cash`만 합산

---

## 9. 더보기 탭 / 문서 현황

`준비 / 문서 / 긴급 / 선물`

문서 연결 기준:

- 항공: **6 / 6**
- 숙박: **14 / 15**
- 투어: **0 / 4**
- 렌터카: **1 / 1**
- 전체: **21 / 26**

문서 탭에서:

- `여행 예산 Sheet 열기`
- `Private Drive 열기`

긴급 연락처:

- Australia emergency: `000`
- New Zealand emergency: `111`
- Korea Consular Call Center: `+82-2-3210-0404`

---

## 10. 예산 관리

전체 여행 예산 canonical source는 Google Sheet **`Honeymoon Budget 2027`**이다.

- 운영 목표: ₩18,500,000
- 여유 상한: ₩20,000,000
- 확정 항공+숙박: ₩12,151,155

웹앱 Wallet과 Google Sheet 역할을 분리한다.

- Google Sheet: 전체 여행 예산 / 실제 지출
- 웹앱 예약 탭: 여행 중 앞으로 결제해야 할 현지 통화 금액

Hertz는 기존 추정 견적 NZD 746.93이 아니라 **확정 예약서 기준 NZD 560.21 현지 후지불**로 관리한다.

---

## 11. PWA / Offline

- `manifest.webmanifest` + `service-worker.js`
- 현재 cache version: **`honeymoon-v30`**
- 앱 shell / itinerary / booking UI / 더보기 UI는 캐시
- 지도 / Google Maps / Google Drive / 외부 예약 앱은 인터넷 필요

---

## 12. 보안 원칙

Public repository / GitHub Pages에는 직접 저장하지 않는다:

- 여권번호 / 생년월일 등 신원정보
- 항공/호텔/투어/렌터카 예약번호
- QR / 바코드 / 탑승권 이미지
- 예약확인서 PDF 원본
- 카드번호 / 실제 카드 식별정보
- 개인 전화번호 / 이메일
- 보험증권 번호

Drive 링크를 Public JS에 둘 경우 URL은 누구나 볼 수 있다고 가정한다. 파일 접근은 반드시 Google Drive `Restricted` 권한으로 제어한다.

---

## 13. 현재 TODO

- [ ] Hertz 보증금 / pre-authorisation의 실제 승인 금액을 수령 전 최종 확인
- [ ] Hertz 추가 운전자 필요 여부 확인
- [ ] Hertz 카드 surcharge 실제 적용 여부 확인
- [ ] Fairlie Airbnb 예약 문서 / 결제 시점 확인 및 Drive 연결
- [ ] Milford Sound 실제 상품/예약/결제정보 반영
- [ ] Onsen 예약 정보/문서/결제정보 반영
- [ ] Rotorua 상품/결제정보 확정
- [ ] Waiheke 방식 확정
- [ ] AUD / NZD 현금이 실제 필요한 항목 확인 후 `cashRequired` 입력
- [ ] 주요 저녁 식당 확정
- [ ] 가족 선물 수량/예산 확정
- [ ] ETA / NZeTA / IVL 준비
- [ ] 여행자보험 / eSIM 준비
- [ ] Google Drive를 본인/배우자 계정만 접근하도록 최종 검증
- [ ] 핵심 Drive 문서 오프라인 저장
- [ ] 실제 Android/iPhone PWA/필터/티켓/현지 결제 상세 동작 확인
- [ ] 여행 직전 대한항공 T2/라운지 운영시간 재확인
- [ ] 여행 직전 용인→인천공항 교통시간 재확인

---

## 14. 핵심 원칙

**숙소·항공과 핵심 경험은 유지하면서 이동 피로를 줄이고, 여행 중 휴대폰에서 일정·예약·문서·현지 결제·긴급정보를 빠르게 확인할 수 있게 운영한다. 일정은 `itinerary.js`, 전체 예산은 Google Sheet, 예약/현지 결제 메타데이터는 `booking-data.js`, 민감 예약 문서는 Restricted Google Drive를 각각 canonical source로 사용한다.**
