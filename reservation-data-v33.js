(() => {
    if (typeof bookingData === "undefined") return;

    const fairlie = bookingData.hotels?.find((hotel) => hotel.key === "fairlie-airbnb");
    if (!fairlie) return;

    fairlie.payment = {
        status: "paid",
        currency: "KRW",
        amountDue: 0,
        timing: "사전 결제 완료",
        method: "card",
        cashRequired: false,
        note: "Airbnb 영수증 기준 ₩391,259 결제 완료"
    };

    fairlie.documents = [
        {
            label: "예약·결제 확인서",
            fileName: "20270124-20270125_FAIRLIE_AIRBNB_RECEIPT.pdf",
            url: "https://drive.google.com/file/d/1eBK9Wt5nEiahcaqTFg_fZ_DJ5z8Z9sC_/view?usp=drivesdk"
        }
    ];
})();
