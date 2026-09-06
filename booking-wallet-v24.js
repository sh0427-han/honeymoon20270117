(() => {
    if (typeof bookingData === "undefined") return;

    const FILTERS = [
        { id: "flights", label: "FLIGHTS", count: bookingData.flights.length, selector: "#flight-list" },
        { id: "stays", label: "STAYS", count: bookingData.hotels.length, selector: "#hotel-list" },
        { id: "tours", label: "TOURS", count: bookingData.tours.length, selector: "#tour-list" },
        { id: "car", label: "CAR", count: bookingData.rental ? 1 : 0, selector: "#rental-list" }
    ];

    const PAYMENT_CURRENCIES = [
        { code: "AUD", country: "Australia", flag: "🇦🇺" },
        { code: "NZD", country: "New Zealand", flag: "🇳🇿" }
    ];

    const PAYMENT_STATUS_LABELS = {
        paid: "결제 완료",
        pay_on_site: "현지 결제",
        partial: "잔금 결제",
        unknown: "결제 확인 필요"
    };

    const PAYMENT_METHOD_LABELS = {
        card: "카드",
        cash: "현금",
        either: "카드/현금",
        unknown: "결제수단 확인 필요"
    };

    let activeFilter = "flights";

    const safe = (value) => (
        typeof escapeHtml === "function" ? escapeHtml(value) : String(value)
    );

    const googleMapsSearchUrl = (query) =>
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

    const isAmount = (value) => typeof value === "number" && Number.isFinite(value);

    const formatMoney = (currency, amount) => {
        if (!isAmount(amount)) return `${currency} —`;
        return `${currency} ${new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount)}`;
    };

    const normalizeDocumentList = (item) => {
        if (Array.isArray(item?.documents)) {
            return item.documents.filter(Boolean);
        }
        if (item?.documents && typeof item.documents === "object") {
            return Object.values(item.documents).filter(Boolean);
        }
        return item?.document ? [item.document] : [];
    };

    const createDriveDocumentAction = (documentMeta) => {
        const label = documentMeta?.label || "예약 내역서";

        if (documentMeta?.url) {
            const link = document.createElement("a");
            link.className = "booking-action booking-drive-document";
            link.href = documentMeta.url;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.textContent = `${label} ↗`;
            link.title = documentMeta.fileName || label;
            return link;
        }

        const button = document.createElement("button");
        button.type = "button";
        button.className = "booking-action booking-drive-document is-pending";
        button.disabled = true;
        button.textContent = label;
        button.title = documentMeta?.fileName
            ? `${documentMeta.fileName} 파일이 업로드되면 연결됩니다.`
            : `${label} 업로드 후 연결됩니다.`;
        return button;
    };

    const syncDriveDocuments = (card, documentMetas) => {
        if (!card) return;

        const documents = (documentMetas || []).filter(Boolean);
        let row = card.querySelector(".booking-actions");
        if (!row) {
            row = document.createElement("div");
            row.className = "booking-actions";
            card.appendChild(row);
        }

        const signature = documents.map((documentMeta) => [
            documentMeta.label || "예약 내역서",
            documentMeta.fileName || "",
            documentMeta.url || "pending"
        ].join(":")).join("|");

        if (row.dataset.driveDocumentsSignature === signature) return;

        row.querySelectorAll(".booking-drive-document").forEach((action) => action.remove());

        documents.forEach((documentMeta) => {
            row.appendChild(createDriveDocumentAction(documentMeta));
        });

        row.dataset.driveDocumentsSignature = signature;
    };

    const syncDriveDocument = (card, documentMeta) => {
        syncDriveDocuments(card, documentMeta ? [documentMeta] : []);
    };

    const syncStayDocuments = () => {
        [...document.querySelectorAll("#hotel-list .booking-card")].forEach((card, index) => {
            syncDriveDocuments(card, normalizeDocumentList(bookingData.hotels[index]));
        });
    };

    const syncTourDocuments = () => {
        [...document.querySelectorAll("#tour-list .booking-tour-card")].forEach((card, index) => {
            syncDriveDocuments(card, normalizeDocumentList(bookingData.tours[index]));
        });
    };

    const renderRental = () => {
        if (!bookingData.rental) return;
        const panel = document.querySelector("#bookings-panel");
        if (!panel) return;

        let list = panel.querySelector("#rental-list");
        if (!list) {
            list = document.createElement("div");
            list.id = "rental-list";
            list.className = "booking-stack booking-rental-stack";
            const tourList = panel.querySelector("#tour-list");
            const hotelList = panel.querySelector("#hotel-list");
            (tourList || hotelList)?.insertAdjacentElement("afterend", list);
        }

        const rental = bookingData.rental;
        list.innerHTML = `
            <h3 class="subsection-title">Rental Car</h3>
            <article class="booking-card booking-rental-card">
                <div class="booking-date">1/22</div>
                <div class="booking-content">
                    <strong>${safe(rental.name)}</strong>
                    <span>${safe(rental.pickup)}</span>
                    <span>${safe(rental.dropoff)}</span>
                    <small>${safe(rental.vehicle)}</small>
                </div>
                <div class="booking-actions">
                    <a class="booking-action" href="${googleMapsSearchUrl(rental.pickupQuery)}" target="_blank" rel="noopener noreferrer">수령 지역 ↗</a>
                    <a class="booking-action" href="${googleMapsSearchUrl(rental.dropoffQuery)}" target="_blank" rel="noopener noreferrer">반납 지역 ↗</a>
                </div>
            </article>
        `;
        syncDriveDocuments(list.querySelector(".booking-rental-card"), normalizeDocumentList(rental));
    };

    const getPaymentEntries = () => {
        const hotelEntries = bookingData.hotels.map((hotel, index) => {
            const itineraryHotel = typeof tripData !== "undefined" ? tripData.hotels?.[index] : null;
            return {
                key: hotel.key,
                category: "STAY",
                date: itineraryHotel?.dates || "숙박",
                name: itineraryHotel?.name || hotel.key,
                payment: hotel.payment
            };
        });

        const tourEntries = bookingData.tours.map((tour) => ({
            key: tour.key,
            category: "TOUR",
            date: tour.date,
            name: tour.name,
            payment: tour.payment
        }));

        const rentalEntries = bookingData.rental ? [{
            key: bookingData.rental.key,
            category: "CAR",
            date: bookingData.rental.date,
            name: bookingData.rental.name,
            payment: bookingData.rental.payment
        }] : [];

        return [...hotelEntries, ...tourEntries, ...rentalEntries]
            .filter((entry) => entry.payment?.currency);
    };

    const isConfirmedLocalPayment = (payment) => (
        ["pay_on_site", "partial"].includes(payment?.status)
        && isAmount(payment?.amountDue)
    );

    const needsPaymentCheck = (payment) => {
        if (!payment) return false;
        if (payment.status === "unknown") return true;
        return ["pay_on_site", "partial"].includes(payment.status)
            && !isAmount(payment.amountDue);
    };

    const getCurrencySummary = (entries, currency) => {
        const currencyEntries = entries.filter(
            (entry) => entry.payment.currency === currency
        );
        const confirmed = currencyEntries.filter(
            (entry) => isConfirmedLocalPayment(entry.payment)
        );
        const total = confirmed.reduce(
            (sum, entry) => sum + entry.payment.amountDue,
            0
        );
        const cashTotal = confirmed
            .filter((entry) => (
                entry.payment.cashRequired || entry.payment.method === "cash"
            ))
            .reduce((sum, entry) => sum + entry.payment.amountDue, 0);
        const checkCount = currencyEntries.filter(
            (entry) => needsPaymentCheck(entry.payment)
        ).length;

        return { currencyEntries, total, cashTotal, checkCount };
    };

    const paymentAmountText = (payment) => {
        if (payment?.status === "paid") {
            return formatMoney(payment.currency, 0);
        }
        if (isConfirmedLocalPayment(payment)) {
            return formatMoney(payment.currency, payment.amountDue);
        }
        if (isAmount(payment?.quotedAmount)) {
            return `견적 ${formatMoney(payment.currency, payment.quotedAmount)}`;
        }
        return `${payment?.currency || ""} 금액 확인 필요`.trim();
    };

    const paymentMetaText = (payment) => {
        const status = PAYMENT_STATUS_LABELS[payment?.status] || "결제 확인 필요";
        const timing = payment?.timing || "시점 확인 필요";
        const method = PAYMENT_METHOD_LABELS[payment?.method] || "결제수단 확인 필요";
        return `${status} · ${timing} · ${method}`;
    };

    const renderPaymentEntry = (entry) => {
        const payment = entry.payment;
        const deposit = payment?.deposit;
        const quoteNotice = isAmount(payment?.quotedAmount)
            && !isConfirmedLocalPayment(payment)
            ? " · 현지결제 확정 전이라 합계 제외"
            : "";
        const note = payment?.note
            ? `<small class="payment-entry-note">${safe(payment.note)}</small>`
            : "";
        const depositRow = isAmount(deposit?.amount) ? `
            <small class="payment-entry-deposit">
                별도 보증금 ${safe(formatMoney(deposit.currency || payment.currency, deposit.amount))}
                · 합계 제외
            </small>
        ` : "";

        return `
            <div class="payment-entry">
                <div class="payment-entry-main">
                    <span class="payment-entry-date">${safe(entry.date)}</span>
                    <strong>${safe(entry.name)}</strong>
                    <small>${safe(entry.category)}</small>
                </div>
                <div class="payment-entry-value">
                    <strong>${safe(paymentAmountText(payment))}</strong>
                    <small>${safe(paymentMetaText(payment))}${safe(quoteNotice)}</small>
                    ${note}
                    ${depositRow}
                </div>
            </div>
        `;
    };

    const renderPaymentStatement = () => {
        const summary = document.querySelector("#booking-summary");
        if (!summary) return;

        const entries = getPaymentEntries();
        let statement = document.querySelector("#payment-statement");
        if (!statement) {
            statement = document.createElement("section");
            statement.id = "payment-statement";
            statement.className = "payment-statement";
            summary.insertAdjacentElement("afterend", statement);
        }

        const currencyCards = PAYMENT_CURRENCIES.map((currencyMeta) => {
            const currencySummary = getCurrencySummary(entries, currencyMeta.code);
            const checkText = currencySummary.checkCount > 0
                ? `확인 필요 ${currencySummary.checkCount}건`
                : "확인 완료";
            const cashText = currencySummary.cashTotal > 0
                ? `현금 ${formatMoney(currencyMeta.code, currencySummary.cashTotal)}`
                : "현금 확정액 없음";

            return `
                <article class="payment-currency-card">
                    <div class="payment-currency-head">
                        <span>${currencyMeta.flag} ${safe(currencyMeta.country)}</span>
                        <small>${currencyMeta.code}</small>
                    </div>
                    <strong>${safe(formatMoney(currencyMeta.code, currencySummary.total))}</strong>
                    <div class="payment-currency-meta">
                        <span>${safe(cashText)}</span>
                        <span>${safe(checkText)}</span>
                    </div>
                </article>
            `;
        }).join("");

        const detailGroups = PAYMENT_CURRENCIES.map((currencyMeta) => {
            const currencySummary = getCurrencySummary(entries, currencyMeta.code);
            if (currencySummary.currencyEntries.length === 0) return "";

            return `
                <section class="payment-detail-group">
                    <div class="payment-detail-heading">
                        <div>
                            <span>${currencyMeta.flag} ${safe(currencyMeta.country)}</span>
                            <strong>${currencyMeta.code}</strong>
                        </div>
                        <strong>${safe(formatMoney(currencyMeta.code, currencySummary.total))}</strong>
                    </div>
                    <div class="payment-entry-list">
                        ${currencySummary.currencyEntries.map(renderPaymentEntry).join("")}
                    </div>
                </section>
            `;
        }).join("");

        statement.innerHTML = `
            <div class="payment-statement-head">
                <div>
                    <span class="payment-eyebrow">LOCAL PAYMENT</span>
                    <h3>현지 결제 예정</h3>
                </div>
                <small>확정된 현지결제만 합산 · 보증금 제외</small>
            </div>
            <div class="payment-currency-grid">
                ${currencyCards}
            </div>
            <details class="payment-details">
                <summary>
                    <span>현지 결제 상세 내역</span>
                    <small>숙소 · 투어 · 렌터카</small>
                </summary>
                <div class="payment-details-body">
                    ${detailGroups}
                </div>
            </details>
        `;
    };

    const createPaymentRow = (payment) => {
        if (!payment?.currency) return null;
        const row = document.createElement("div");
        row.className = `booking-payment booking-payment-${payment.status || "unknown"}`;

        const primary = document.createElement("strong");
        const statusLabel = PAYMENT_STATUS_LABELS[payment.status] || "결제 확인 필요";
        primary.textContent = `${statusLabel} · ${paymentAmountText(payment)}`;

        const secondary = document.createElement("span");
        const method = PAYMENT_METHOD_LABELS[payment.method] || "결제수단 확인 필요";
        secondary.textContent = `${payment.timing || "시점 확인 필요"} · ${method}`;

        row.append(primary, secondary);
        return row;
    };

    const syncPaymentRow = (card, payment) => {
        if (!card) return;
        card.querySelector(".booking-payment")?.remove();
        const row = createPaymentRow(payment);
        if (!row) return;

        const actions = card.querySelector(".booking-actions");
        if (actions) {
            actions.insertAdjacentElement("beforebegin", row);
        } else {
            card.appendChild(row);
        }
    };

    const syncPaymentRows = () => {
        [...document.querySelectorAll("#hotel-list .booking-card")].forEach((card, index) => {
            syncPaymentRow(card, bookingData.hotels[index]?.payment);
        });
        [...document.querySelectorAll("#tour-list .booking-tour-card")].forEach((card, index) => {
            syncPaymentRow(card, bookingData.tours[index]?.payment);
        });
        syncPaymentRow(
            document.querySelector("#rental-list .booking-rental-card"),
            bookingData.rental?.payment
        );
    };

    const clearLegacyFilterState = () => {
        FILTERS.forEach((filter) => {
            const list = document.querySelector(filter.selector);
            if (!list) return;
            list.hidden = false;
            list.removeAttribute("hidden");
            list.classList.remove("booking-filter-visible", "booking-filter-hidden");
            list.style.removeProperty("display");
            list.removeAttribute("aria-hidden");
        });
    };

    const renderFilterControls = () => {
        const summary = document.querySelector("#booking-summary");
        if (!summary) return;

        summary.innerHTML = FILTERS.map((filter) => `
            <button type="button" class="booking-filter-card" data-booking-filter="${filter.id}" aria-controls="${filter.selector.slice(1)}" aria-pressed="false">
                <span>${filter.label}</span>
                <strong>${filter.count}</strong>
            </button>
        `).join("");

        summary.querySelectorAll("[data-booking-filter]").forEach((button) => {
            button.addEventListener("click", (event) => {
                event.preventDefault();
                event.stopPropagation();
                activeFilter = button.dataset.bookingFilter || "flights";
                applyFilter();
            });
        });
    };

    const applyFilter = () => {
        const panel = document.querySelector("#bookings-panel");
        if (!panel) return;
        panel.dataset.bookingFilter = activeFilter;

        document.querySelectorAll("[data-booking-filter]").forEach((button) => {
            const selected = button.dataset.bookingFilter === activeFilter;
            button.classList.toggle("active", selected);
            button.setAttribute("aria-pressed", String(selected));
        });
    };

    const removeBookingStatuses = () => {
        document.querySelectorAll("#bookings-panel .booking-status").forEach((status) => status.remove());
    };

    const moveUtilitiesToBottom = () => {
        const panel = document.querySelector("#bookings-panel");
        if (!panel) return;
        const apps = panel.querySelector("#booking-app-launcher");
        const privateDrive = panel.querySelector("#private-drive-entry");
        if (apps) panel.appendChild(apps);
        if (privateDrive) panel.appendChild(privateDrive);
    };

    const setActiveTabUi = (tabName) => {
        const hero = document.querySelector(".editorial-hero");
        if (hero) hero.hidden = tabName !== "home";
        document.documentElement.dataset.activeTab = tabName;
    };

    document.querySelectorAll(".nav-button[data-tab]").forEach((button) => {
        button.addEventListener("click", () => setActiveTabUi(button.dataset.tab));
    });

    document.querySelectorAll("[data-go-tab]").forEach((button) => {
        button.addEventListener("click", () => setActiveTabUi(button.dataset.goTab));
    });

    renderRental();
    clearLegacyFilterState();
    renderFilterControls();
    renderPaymentStatement();
    syncStayDocuments();
    syncTourDocuments();
    syncPaymentRows();
    removeBookingStatuses();
    moveUtilitiesToBottom();
    applyFilter();

    const activeNav = document.querySelector(".nav-button.active[data-tab]");
    setActiveTabUi(activeNav?.dataset.tab || "home");
})();
