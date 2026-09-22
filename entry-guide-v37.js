(() => {
    const panel = document.querySelector("#more-panel");
    if (!panel) return;

    const OFFICIAL = {
        auIpc: "https://www.abf.gov.au/crossing/Pages/incoming-passenger-card.aspx",
        auIpcSample: "https://www.abf.gov.au/crossing/files/ipc-sample-english.pdf",
        nztd: "https://www.travellerdeclaration.govt.nz/",
        nztdGuide: "https://www.travellerdeclaration.govt.nz/completing-your-declaration/",
        nztdApp: "https://www.travellerdeclaration.govt.nz/nztd-app/"
    };

    const safe = (value) => (
        typeof escapeHtml === "function" ? escapeHtml(value) : String(value)
    );

    const renderFieldRows = (rows) => rows.map((row) => {
        const value = row.value
            ? `<strong class="entry-field-value">${safe(row.value)}</strong>`
            : `<strong class="entry-field-value private">개인정보 · 현장에서 직접 입력</strong>`;
        return `
            <div class="entry-field-row">
                <div>
                    <span class="entry-field-label">${safe(row.label)}</span>
                    ${value}
                </div>
                <p>${safe(row.note)}</p>
            </div>
        `;
    }).join("");

    const renderQuestionRows = (rows) => rows.map((row, index) => `
        <div class="entry-question-row">
            <span class="entry-question-number">${index + 1}</span>
            <div>
                <strong>${safe(row.title)}</strong>
                <p>${safe(row.note)}</p>
            </div>
        </div>
    `).join("");

    const ipcFront = [
        {
            label: "Family / surname",
            value: "",
            note: "각자 여권의 성(Surname)을 영문 그대로 작성합니다."
        },
        {
            label: "Given names",
            value: "",
            note: "각자 여권의 Given names를 순서와 철자 그대로 작성합니다."
        },
        {
            label: "Passport number",
            value: "",
            note: "여권번호는 이 공개 웹사이트에 저장하지 않습니다. 실물 여권을 보고 직접 적습니다."
        },
        {
            label: "Flight number",
            value: "KE 401",
            note: "2027-01-17 인천(ICN) → 시드니(SYD) 대한항공 편명입니다. 출발 당일 탑승권에서 최종 확인합니다."
        },
        {
            label: "Intended address in Australia",
            value: "6 CAMPBELL STREET, HAYMARKET",
            note: "첫 숙소 Meriton Suites Campbell Street의 주소입니다."
        },
        {
            label: "State",
            value: "NSW",
            note: "시드니가 속한 New South Wales의 약어입니다."
        },
        {
            label: "Live in Australia next 12 months?",
            value: "NO",
            note: "신혼여행 단기 방문 일정이므로 NO입니다."
        },
        {
            label: "Tuberculosis / criminal convictions",
            value: "",
            note: "개인의 실제 사실관계에 따라 정확하게 답합니다. 임의로 NO를 선택하면 안 됩니다."
        },
        {
            label: "Signature / Date",
            value: "각자 서명 · 17 / 01 / 2027",
            note: "카드 작성자가 직접 서명하고, 도착일 기준 날짜를 일/월/연도 순서로 적습니다."
        }
    ];

    const ipcBack = [
        {
            label: "Country where you boarded",
            value: "REPUBLIC OF KOREA",
            note: "KE401을 인천에서 바로 탑승하므로 대한민국을 적습니다."
        },
        {
            label: "Usual occupation",
            value: "",
            note: "본인의 실제 직업을 영어로 적습니다. 예: AI ENGINEER, TEACHER."
        },
        {
            label: "Nationality as shown on passport",
            value: "",
            note: "여권의 국적 표기를 그대로 적습니다."
        },
        {
            label: "Date of birth",
            value: "",
            note: "각자 여권의 생년월일을 Day / Month / Year 순서로 작성합니다."
        },
        {
            label: "Contact details in Australia",
            value: "6 CAMPBELL STREET, HAYMARKET NSW 2000",
            note: "호텔 주소를 연락처로 사용할 수 있습니다. 본인 이메일/전화번호를 적는 경우 실제 정보대로 작성합니다."
        },
        {
            label: "Emergency contact",
            value: "",
            note: "한국의 가족 또는 지인 1명의 영문 이름과 연락처를 적습니다. 공개 사이트에는 저장하지 않습니다."
        },
        {
            label: "A / B / C",
            value: "B · VISITOR OR TEMPORARY ENTRANT",
            note: "관광객이므로 B에 표시합니다."
        },
        {
            label: "Intended length of stay",
            value: "3 DAYS",
            note: "1/17 시드니 입국 → 1/20 뉴질랜드 출국 일정 기준입니다."
        },
        {
            label: "Country of residence",
            value: "REPUBLIC OF KOREA",
            note: "평소 거주 국가를 적습니다."
        },
        {
            label: "Main reason for travel",
            value: "HOLIDAY · 7",
            note: "신혼여행이므로 Holiday에 표시합니다."
        }
    ];

    const ipcQuestions = [
        {
            title: "규제·금지 가능 물품",
            note: "의약품, 스테로이드, 무기류 등 해당 물품이 있다면 YES. 처방약도 종류에 따라 신고 대상일 수 있어 애매하면 YES로 신고합니다."
        },
        {
            title: "주류·담배 허용량 초과",
            note: "주류 2,250mL 초과 또는 담배 25개비 / 담배제품 25g 초과 여부를 실제 소지량으로 확인합니다."
        },
        {
            title: "해외·면세 구매품 AUD 900 초과",
            note: "선물을 포함한 해당 구매품의 합계가 AUD 900을 넘는지 확인합니다."
        },
        {
            title: "사업·상업용 물품",
            note: "업무용 샘플이나 판매 목적 물품이 있으면 YES."
        },
        {
            title: "현금 AUD 10,000 이상",
            note: "호주달러 또는 이에 상당하는 외화 현금을 합산해 판단합니다."
        },
        {
            title: "육류·생선·달걀·유제품·과일·채소",
            note: "기내식에서 남은 음식, 간식 등도 포함될 수 있습니다. 가지고 입국한다면 신고합니다."
        },
        {
            title: "곡물·씨앗·견과·식물·약초·목제품",
            note: "식품이나 천연 재료 제품이 있으면 실제 내용물을 확인합니다."
        },
        {
            title: "동물·동물성 제품·벌 제품",
            note: "꿀·벌 제품, 조개류, 동물성 기념품 등이 포함됩니다."
        },
        {
            title: "흙 또는 흙이 묻은 신발·장비",
            note: "야외활동에 사용한 신발이나 장비에 흙이 묻어 있다면 신고합니다."
        },
        {
            title: "최근 30일 농장·야생지·담수 지역 접촉",
            note: "농장, 야생지역, 민물 호수·하천 등에 다녀왔다면 실제 일정에 맞게 답합니다."
        },
        {
            title: "최근 6일 아프리카·중남미·카리브 방문",
            note: "현재 확정 일정만으로는 해당하지 않지만, 실제 여행 직전 다른 국가를 방문했다면 그 이력을 기준으로 답합니다."
        }
    ];

    const nzFields = [
        {
            label: "제출 가능 시점",
            value: "1/19 10:55 AEDT 이후",
            note: "시드니에서 체류 후 1/20 10:55 뉴질랜드행 항공편을 타므로, 시드니 출발 24시간 전부터 제출할 수 있습니다."
        },
        {
            label: "Flight number",
            value: "NZ 234",
            note: "2027-01-20 Sydney → Queenstown Air New Zealand 편명입니다. 출발 당일 탑승권에서 최종 확인합니다."
        },
        {
            label: "Overseas port / airport boarded",
            value: "SYDNEY, AUSTRALIA",
            note: "뉴질랜드행 항공기를 실제로 탑승하는 해외 공항입니다."
        },
        {
            label: "Passport / name / date of birth",
            value: "",
            note: "각자 여권을 스캔하거나 여권 그대로 입력합니다. 공개 사이트에는 여권정보를 저장하지 않습니다."
        },
        {
            label: "Nationality / country of birth",
            value: "",
            note: "각자의 여권 및 실제 출생국 정보대로 입력합니다."
        },
        {
            label: "Occupation or job",
            value: "",
            note: "본인의 실제 직업을 영어로 입력합니다. 예: AI ENGINEER, TEACHER."
        },
        {
            label: "First address in New Zealand",
            value: "4 CEMETERY ROAD, QUEENSTOWN 9300, NEW ZEALAND",
            note: "첫 뉴질랜드 숙소 Hampshire Holiday Parks Queenstown Lakeview 주소입니다."
        },
        {
            label: "Email / phone",
            value: "",
            note: "각자 실제 연락 가능한 이메일과 전화번호를 입력합니다."
        },
        {
            label: "Length of stay",
            value: "9 DAYS",
            note: "1/20 퀸스타운 입국 → 1/29 오클랜드 출국 일정 기준입니다."
        },
        {
            label: "Main reason",
            value: "HOLIDAY / VACATION",
            note: "신혼여행 관광 목적입니다."
        },
        {
            label: "Country lived in for 12+ months",
            value: "REPUBLIC OF KOREA",
            note: "현재 실제 장기 거주 국가가 다르다면 실제 정보를 우선합니다."
        },
        {
            label: "Travel history · past 30 days",
            value: "REPUBLIC OF KOREA · AUSTRALIA",
            note: "현재 확정 일정만 기준한 예시입니다. 입국 전 30일 안에 다른 국가 방문이 있다면 반드시 추가합니다."
        },
        {
            label: "Do you know contents of baggage?",
            value: "YES",
            note: "본인 수하물의 내용물을 알고 있어야 합니다. 다른 사람의 물건을 대신 운반한다면 해당 질문에도 정확하게 신고합니다."
        }
    ];

    const nzBiosecurity = [
        {
            title: "모든 음식",
            note: "조리·미조리·신선·보존·포장·건조 식품 모두 포함됩니다. 라면, 과자, 육포, 김, 한약·건강식품 등 식품을 가지고 있다면 먼저 신고 대상으로 생각하는 편이 안전합니다."
        },
        {
            title: "동물 또는 동물성 제품",
            note: "육류, 유제품, 생선, 꿀·벌 제품, 달걀, 깃털, 조개, 가죽·뼈, 곤충 등이 포함됩니다."
        },
        {
            title: "식물 또는 식물성 제품",
            note: "과일, 꽃, 씨앗, 구근, 목재, 나뭇잎, 견과, 채소, 균류, 대나무·짚 등이 포함됩니다."
        },
        {
            title: "흙·물·동식물과 접촉한 장비",
            note: "낚시·수상스포츠·원예·양봉 등에 사용한 장비나 의류를 확인합니다."
        },
        {
            title: "사용한 야외활동 장비·신발",
            note: "등산화, 캠핑·하이킹·골프·스포츠 장비 등 야외에서 사용한 물품이 포함됩니다. 깨끗하게 세척하고 해당하면 신고합니다."
        },
        {
            title: "최근 30일 야생지·농장·동물 접촉",
            note: "뉴질랜드 밖에서 야생지역 방문, 농장·동물·동식물 가공 시설 접촉이 있었다면 실제 경험대로 답합니다."
        }
    ];

    const nzCustoms = [
        {
            title: "의약품",
            note: "3개월 초과 분량 또는 본인에게 처방되지 않은 약품인지 확인합니다."
        },
        {
            title: "규제·금지 물품",
            note: "무기류, 불법·통제 약물, 멸종위기 동식물 제품 등의 소지 여부를 확인합니다."
        },
        {
            title: "주류",
            note: "증류주 1.125L 이하 병 3병 및 와인·맥주 4.5L 기준을 초과하는지 확인합니다."
        },
        {
            title: "담배",
            note: "50개비 또는 담배제품 50g 기준을 초과하는지 확인합니다."
        },
        {
            title: "해외·면세 구매품",
            note: "선물을 포함해 총 가치가 NZD 700을 초과하는지 확인합니다."
        },
        {
            title: "사업용·타인 대신 운반하는 물품",
            note: "상업용 또는 다른 사람을 대신해 운반하는 물품이라면 신고합니다."
        },
        {
            title: "현금 NZD 10,000 이상",
            note: "외화 상당액과 여행자수표·은행환어음 등 신고 대상 수단을 포함해 확인합니다."
        }
    ];

    const existing = panel.querySelector("#entry-declaration-guide");
    if (existing) existing.remove();

    const section = document.createElement("section");
    section.id = "entry-declaration-guide";
    section.className = "more-section entry-declaration-guide";
    section.dataset.moreSection = "entry";

    section.innerHTML = `
        <div class="subsection-heading">
            <h3>입국 신고 작성 가이드</h3>
            <span>기내 · 출발 24시간 전</span>
        </div>

        <div class="entry-privacy-note">
            <strong>개인정보는 이 사이트에 저장하지 않음</strong>
            <span>여권번호 · 생년월일 · 개인 연락처 · 긴급연락처는 현장에서 실물 여권과 본인 정보를 보고 직접 입력합니다.</span>
        </div>

        <article class="entry-guide-card">
            <div class="entry-guide-card__head">
                <div>
                    <p class="section-kicker">AUSTRALIA · 17 JAN</p>
                    <h4>Incoming Passenger Card · IPC</h4>
                    <span>KE401 기내에서 종이 카드 배포 시 · 영어 · 파란색/검은색 펜</span>
                </div>
                <span class="entry-timing-badge">기내 작성</span>
            </div>

            <div class="entry-route-facts">
                <div><span>FLIGHT</span><strong>KE 401</strong></div>
                <div><span>STAY</span><strong>3 DAYS</strong></div>
                <div><span>ADDRESS</span><strong>HAYMARKET · NSW</strong></div>
            </div>

            <details open>
                <summary>앞면 · 신원 / 숙소 / 신고</summary>
                <div class="entry-field-list">${renderFieldRows(ipcFront)}</div>
            </details>

            <details>
                <summary>뒷면 · 방문 목적 / 체류 정보</summary>
                <div class="entry-field-list">${renderFieldRows(ipcBack)}</div>
            </details>

            <details>
                <summary>앞면 YES / NO 11개 질문 읽는 법</summary>
                <div class="entry-alert">
                    <strong>NO를 미리 정해두지 않습니다.</strong>
                    <span>실제 짐과 최근 방문 이력을 기준으로 답하고, 호주 IPC 자체도 “확실하지 않으면 YES”로 표시하도록 안내합니다.</span>
                </div>
                <div class="entry-question-list">${renderQuestionRows(ipcQuestions)}</div>
            </details>

            <div class="entry-official-links">
                <a href="${OFFICIAL.auIpc}" target="_blank" rel="noopener noreferrer">ABF 공식 안내 ↗</a>
                <a href="${OFFICIAL.auIpcSample}" target="_blank" rel="noopener noreferrer">공식 IPC 샘플 ↗</a>
            </div>
        </article>

        <article class="entry-guide-card">
            <div class="entry-guide-card__head">
                <div>
                    <p class="section-kicker">NEW ZEALAND · 20 JAN</p>
                    <h4>New Zealand Traveller Declaration · NZTD</h4>
                    <span>1/19 10:55 AEDT부터 제출 가능 · 두 사람 각각 · 앱 권장</span>
                </div>
                <span class="entry-timing-badge">24H 전</span>
            </div>

            <div class="entry-route-facts">
                <div><span>FLIGHT</span><strong>NZ 234</strong></div>
                <div><span>STAY</span><strong>9 DAYS</strong></div>
                <div><span>FIRST STAY</span><strong>QUEENSTOWN</strong></div>
            </div>

            <div class="entry-alert">
                <strong>앱 화면은 한국어로 볼 수 있지만 답변은 영어로 입력</strong>
                <span>상훈·진영 각각 별도의 declaration이 필요합니다. 앱에서는 프로필과 동일한 여행정보를 복사해 두 사람 신고를 쉽게 작성할 수 있습니다.</span>
            </div>

            <details open>
                <summary>여행정보 · 우리 일정 기준 입력값</summary>
                <div class="entry-field-list">${renderFieldRows(nzFields)}</div>
            </details>

            <details>
                <summary>Biosecurity · 음식 / 신발 / 야외장비</summary>
                <div class="entry-alert warning">
                    <strong>뉴질랜드는 생물보안 신고를 특히 엄격하게 봅니다.</strong>
                    <span>먹을 것 또는 사용한 야외장비가 있거나 판단이 애매하면 숨기지 말고 신고합니다. 신고 자체가 반입 금지를 뜻하는 것은 아닙니다.</span>
                </div>
                <div class="entry-question-list">${renderQuestionRows(nzBiosecurity)}</div>
            </details>

            <details>
                <summary>Customs · 약 / 술 / 담배 / 현금 / 구매품</summary>
                <div class="entry-question-list">${renderQuestionRows(nzCustoms)}</div>
            </details>

            <details>
                <summary>NZeTA / Immigration에서 헷갈리는 부분</summary>
                <div class="entry-immigration-note">
                    <strong>NZeTA는 비자(Visa)가 아닙니다.</strong>
                    <p>두 사람은 한국 여권의 비자면제 방문객으로 NZeTA를 가지고 여행합니다. 디지털 NZTD에서 NZeTA 정보를 묻는 항목은 승인된 NZeTA 기준으로 답합니다.</p>
                    <p>화면에 “visa on arrival” 관련 선택지가 표시되면, NZeTA 여행자는 뉴질랜드 도착 시 입국허가를 받고 visitor visa가 부여되는 구조입니다. 질문 문구를 읽고 현재 보유한 NZeTA를 별도의 기존 Visa로 잘못 표시하지 않습니다.</p>
                    <p>의료 목적 방문, 범죄·추방 이력 등 개인 사실관계 질문은 반드시 실제 사실대로 답합니다.</p>
                </div>
            </details>

            <div class="entry-submit-check">
                <strong>제출 후</strong>
                <span>Reference number 이메일 확인 → 내용 변경 시 다시 Submit → 출력은 필요 없음 → 여권에 연결되어 입국심사에서 확인됩니다.</span>
            </div>

            <div class="entry-official-links">
                <a href="${OFFICIAL.nztd}" target="_blank" rel="noopener noreferrer">NZTD 공식 작성 ↗</a>
                <a href="${OFFICIAL.nztdGuide}" target="_blank" rel="noopener noreferrer">공식 작성 가이드 ↗</a>
                <a href="${OFFICIAL.nztdApp}" target="_blank" rel="noopener noreferrer">공식 앱 안내 ↗</a>
            </div>
        </article>

        <p class="entry-source-note">
            2026-09-22 호주 ABF · New Zealand Traveller Declaration · Immigration New Zealand 공식 안내 기준.
            2027-01 출발 직전 질문·허용량·디지털 전환 여부를 공식 페이지에서 다시 확인합니다.
        </p>
    `;

    const docsSection = panel.querySelector("#booking-doc-status");
    if (docsSection) {
        docsSection.insertAdjacentElement("beforebegin", section);
    } else {
        panel.appendChild(section);
    }
})();
