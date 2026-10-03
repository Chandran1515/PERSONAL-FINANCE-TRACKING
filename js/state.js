/* ==========================================================================
   WealthRise - State Management & Storage Engine
   ========================================================================== */

const STORAGE_KEY = 'wealthrise_financial_store_v20';

// Supported Currencies Configuration
const CURRENCIES = {
  USD: { symbol: '$', code: 'USD', name: 'US Dollar ($)' },
  EUR: { symbol: '€', code: 'EUR', name: 'Euro (€)' },
  GBP: { symbol: '£', code: 'GBP', name: 'British Pound (£)' },
  INR: { symbol: '₹', code: 'INR', name: 'Indian Rupee (₹)' },
  JPY: { symbol: '¥', code: 'JPY', name: 'Japanese Yen (¥)' },
  CAD: { symbol: 'C$', code: 'CAD', name: 'Canadian Dollar (C$)' },
  AUD: { symbol: 'A$', code: 'AUD', name: 'Australian Dollar (A$)' }
};

// Default Realistic Sample Data for Initial Load (Formatted in INR ₹)
const DEFAULT_DATA = {
  currency: 'INR',
  userMonthlySalary: 50000,
  clientCashTotal: 60000,
  theme: 'dark',
  transactions: [
  {
    "id": "tx-fed-4144",
    "date": "2026-10-02",
    "description": "UPIOUT/175653590757/cred.club@axisb/payment /5413",
    "amount": 1190.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4145",
    "date": "2026-10-02",
    "description": "UPIOUT/175737023215/cred.club@axisb/payment /5413",
    "amount": 3080.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4146",
    "date": "2026-10-02",
    "description": "UPIOUT/175831774672/cred.club@axisb/payment /5413",
    "amount": 6576.18,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4139",
    "date": "2026-09-29",
    "description": "UPIOUT/160844016993/patelvikramkumar670@okhd/0000",
    "amount": 1139.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4140",
    "date": "2026-09-29",
    "description": "UPIOUT/180723090942/cred.club@axisb/payment /5413",
    "amount": 6160.75,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4141",
    "date": "2026-09-29",
    "description": "UPIOUT/185700291640/paytmqr6vwktv@ptys/NO RE/5812",
    "amount": 300.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4142",
    "date": "2026-09-29",
    "description": "UPIOUT/211439913828/9686294513@okbizaxis/NO /5411",
    "amount": 202.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4143",
    "date": "2026-09-29",
    "description": "UPIOUT/223034569487/9060474717@ybl/NO",
    "amount": 98.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4138",
    "date": "2026-09-28",
    "description": "UPIOUT/663723123267/6366248713@ptyes/Paid vi/0000",
    "amount": 10.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-client-cash-1",
    "date": "2026-09-28",
    "description": "Client Cash Payment - Interior Design Consulting",
    "amount": 25000.0,
    "type": "income",
    "category": "Client Cash Income",
    "method": "Cash",
    "note": "Direct cash received from client"
  },
  {
    "id": "tx-fed-4137",
    "date": "2026-09-26",
    "description": "SBINT:27-06-2026 to 25-09-2026[77770114732577]",
    "amount": 204.0,
    "type": "income",
    "category": "Freelance / Client",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-idfcb-4274",
    "date": "2026-09-25",
    "description": "UPI/DR/626879815146/ request",
    "amount": 242.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-fed-4136",
    "date": "2026-09-22",
    "description": "UPIOUT/663101080410/9886900160@ibl/Paid via /0000",
    "amount": 1250.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4135",
    "date": "2026-09-20",
    "description": "UPIOUT/662920799992/BHARATPE.9T0W0G1M2J28367/5",
    "amount": 95.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4134",
    "date": "2026-09-19",
    "description": "UPIOUT/112436432495/addmoney@idfcbank/NO",
    "amount": 1000.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-idfcb-4273",
    "date": "2026-09-19",
    "description": "AddMoney/20262620291852/112436432495/ request",
    "amount": 1000.0,
    "type": "income",
    "category": "Freelance",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-fed-4133",
    "date": "2026-09-17",
    "description": "UPIOUT/185639279746/addmoney@idfcbank/NO",
    "amount": 18000.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-idfcb-4272",
    "date": "2026-09-17",
    "description": "AddMoney/20262600273583/185639279746/ request",
    "amount": 18000.0,
    "type": "income",
    "category": "Freelance",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-fed-4132",
    "date": "2026-09-16",
    "description": "UPIOUT/662514087464/paytmqr6vwktv@ptys/Paid /5812",
    "amount": 90.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-client-cash-2",
    "date": "2026-09-15",
    "description": "Client Cash Payment - Architectural Project Fee",
    "amount": 35000.0,
    "type": "income",
    "category": "Client Cash Income",
    "method": "Cash",
    "note": "Direct cash received from client"
  },
  {
    "id": "tx-idfcb-4271",
    "date": "2026-09-13",
    "description": "UPI/DR/625653675307/ request",
    "amount": 264.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-idfcb-4270",
    "date": "2026-09-12",
    "description": "UPI/IFT/625552288637/ request",
    "amount": 48.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-fed-4131",
    "date": "2026-09-06",
    "description": "UPI IN/661532823030/megalai1975@okaxis/UPI/0000",
    "amount": 1000.0,
    "type": "income",
    "category": "Freelance / Client",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-idfcb-4269",
    "date": "2026-09-06",
    "description": "UPI/DR/624939021194/ request",
    "amount": 144.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-idfcb-4268",
    "date": "2026-09-05",
    "description": "UPI/DR/110609515171/ request",
    "amount": 200.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-fed-4128",
    "date": "2026-09-03",
    "description": "UPIOUT/045827419132/cred.club@axisb/payment /5413",
    "amount": 24626.09,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4129",
    "date": "2026-09-03",
    "description": "UPIOUT/045918575350/cred.club@axisb/payment /5413",
    "amount": 9112.34,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4130",
    "date": "2026-09-03",
    "description": "UPIOUT/045946955939/cred.club@axisb/payment /5413",
    "amount": 8990.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4127",
    "date": "2026-09-02",
    "description": "NFT/PAYPAL PAYMENTS/CITIN26725584413/CITI",
    "amount": 91005.16,
    "type": "income",
    "category": "Salary",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-idfcb-4267",
    "date": "2026-08-31",
    "description": "MONTHLY INTEREST request",
    "amount": 9.0,
    "type": "income",
    "category": "Freelance",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-idfcb-4266",
    "date": "2026-08-22",
    "description": "UPI/DR/110497409325/ BARB/7899423/na",
    "amount": 60.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-idfcb-4265",
    "date": "2026-08-17",
    "description": "YOGESHA /UNBA/ UPI/DR/201152615407/",
    "amount": 95.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-fed-4123",
    "date": "2026-08-12",
    "description": "UPIOUT/112210988439/setuverify@citibank/Grow/7413",
    "amount": 1.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4124",
    "date": "2026-08-12",
    "description": "UPI IN/622499589867/setuverify@citibank/2ed3/0000",
    "amount": 1.0,
    "type": "income",
    "category": "Freelance / Client",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4125",
    "date": "2026-08-12",
    "description": "FT IMPS/IFO/622411214542/IDFB0080155/Sent via Jupi",
    "amount": 5000.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4126",
    "date": "2026-08-12",
    "description": "FT IMPS/IFO/622411214968/IDFB0080155/Sent via Jupi",
    "amount": 71000.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-idfcb-4258",
    "date": "2026-08-12",
    "description": "BROKENTU/CITI/setuver/ UPI/DR/112547321377/",
    "amount": 1.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-idfcb-4259",
    "date": "2026-08-12",
    "description": "GROWW IN/HDFC/ UPI/DR/113052721898/",
    "amount": 100.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-idfcb-4260",
    "date": "2026-08-12",
    "description": "SCHANDRAN/ IMPS/622411214542/",
    "amount": 5000.0,
    "type": "transfer",
    "category": "Self Transfer",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-idfcb-4261",
    "date": "2026-08-12",
    "description": "SCHANDRAN/ IMPS/622411214968/",
    "amount": 71000.0,
    "type": "transfer",
    "category": "Self Transfer",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-idfcb-4262",
    "date": "2026-08-12",
    "description": "BROKENTU/CITI/setuver/ UPI/DR/115440924387/",
    "amount": 1.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-idfcb-4263",
    "date": "2026-08-12",
    "description": "APIBANKING/ IMPS/622426027125/",
    "amount": 1.0,
    "type": "expense",
    "category": "Bank Transfer",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-idfcb-4264",
    "date": "2026-08-12",
    "description": "GROWW IN/HDFC/ UPI/DR/120443737632/",
    "amount": 65000.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-fed-4122",
    "date": "2026-08-11",
    "description": "UPIOUT/658908110876/yespay.bizsbiz131676@yes/5651",
    "amount": 630.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4121",
    "date": "2026-08-09",
    "description": "UPIOUT/658731736972/bsnl.billdesk@hdfcbank/P/4900",
    "amount": 439.0,
    "type": "expense",
    "category": "Utilities",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4120",
    "date": "2026-08-08",
    "description": "UPIOUT/658600493374/6361156388-3@axl/Paid vi/0000",
    "amount": 5080.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4115",
    "date": "2026-08-05",
    "description": "UPIOUT/658315996119/kannanchungs123@oksbi/Pa/0000",
    "amount": 150.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4116",
    "date": "2026-08-05",
    "description": "NFT/PAYPAL PAYMENTS/CITIN26711117619/CITI",
    "amount": 155601.29,
    "type": "income",
    "category": "Salary",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4117",
    "date": "2026-08-05",
    "description": "UPIOUT/658305076946/cred.club@axisb/payment /5413",
    "amount": 9010.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4118",
    "date": "2026-08-05",
    "description": "UPIOUT/378961662176/addmoney@idfcbank/Sent v/5413",
    "amount": 49000.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4119",
    "date": "2026-08-05",
    "description": "UPIOUT/379021632176/addmoney@idfcbank/Sent v/5413",
    "amount": 16000.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-idfcb-4256",
    "date": "2026-08-05",
    "description": "AddMoney/20262179677464/378961662176/ FDRL0007777/2577/",
    "amount": 49000.0,
    "type": "income",
    "category": "Freelance",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-idfcb-4257",
    "date": "2026-08-05",
    "description": "AddMoney/20262179677477/379021632176/ UPI",
    "amount": 16000.0,
    "type": "income",
    "category": "Freelance",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-fed-4105",
    "date": "2026-08-04",
    "description": "FT IMPS/IFI/621607093309/Mr S CHANDRAN/IMPSTXN",
    "amount": 6000.0,
    "type": "transfer",
    "category": "Self Transfer",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4106",
    "date": "2026-08-04",
    "description": "UPIOUT/658213812485/cred.club@axisb/payment /5413",
    "amount": 10000.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4107",
    "date": "2026-08-04",
    "description": "UPI IN/954283462166/8526590200@jupiteraxis/A/0000",
    "amount": 2500.0,
    "type": "income",
    "category": "Freelance / Client",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4108",
    "date": "2026-08-04",
    "description": "UPIOUT/658213816474/cred.club@axisb/payment /5413",
    "amount": 2500.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4109",
    "date": "2026-08-04",
    "description": "UPIOUT/658201839881/mariappanmr-1@okaxis/Pai/0000",
    "amount": 20.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4110",
    "date": "2026-08-04",
    "description": "UPIOUT/658226858167/pakkirannavi123@fbl/Paid/5812",
    "amount": 80.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4111",
    "date": "2026-08-04",
    "description": "UPI IN/311757875151/7010602610@ptyes/Sent us/0000",
    "amount": 65000.0,
    "type": "income",
    "category": "Freelance / Client",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4112",
    "date": "2026-08-04",
    "description": "UPIOUT/658220929593/cred.club@axisb/payment /5413",
    "amount": 35966.52,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4113",
    "date": "2026-08-04",
    "description": "UPIOUT/658231918369/cred.club@axisb/payment /5413",
    "amount": 28451.56,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4114",
    "date": "2026-08-04",
    "description": "UPIOUT/658206962292/rocketraja7604@okicici/P/0000",
    "amount": 130.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-idfcb-4255",
    "date": "2026-08-04",
    "description": "OPM/621607093309/S IMPS-",
    "amount": 6000.0,
    "type": "expense",
    "category": "Bank Transfer",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-fed-4104",
    "date": "2026-08-03",
    "description": "UPIOUT/658117669012/kumaranstore456@fbl/Paid/5099",
    "amount": 58.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4101",
    "date": "2026-08-01",
    "description": "UPIOUT/657924222364/dheivamdheivam813@okicic/0000",
    "amount": 200.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4102",
    "date": "2026-08-01",
    "description": "UPIOUT/657911238575/varnikkalingam@oksbi/Pai/0000",
    "amount": 40.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4103",
    "date": "2026-08-01",
    "description": "UPIOUT/657922237356/mathavanmisai-1@okhdfcba/0000",
    "amount": 82.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4100",
    "date": "2026-07-31",
    "description": "UPIOUT/657811190082/rs0902919@okaxis/Paid vi/0000",
    "amount": 200.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-idfcb-4254",
    "date": "2026-07-31",
    "description": "MONTHLY INTEREST ATMBANGA",
    "amount": 4.0,
    "type": "income",
    "category": "Freelance",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-fed-4098",
    "date": "2026-07-27",
    "description": "UPIOUT/657409526125/bharatpe907720192420@yes/4215",
    "amount": 615.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4099",
    "date": "2026-07-27",
    "description": "UPIOUT/657414547009/9880783311@ptyes/Paid vi/0000",
    "amount": 8755.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-idfcb-4253",
    "date": "2026-07-27",
    "description": "DEPOSIT/5630/ ATM/CASH",
    "amount": 6000.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-fed-4094",
    "date": "2026-07-26",
    "description": "UPIOUT/657319412943/cred.club@axisb/payment /5413",
    "amount": 100028.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4095",
    "date": "2026-07-26",
    "description": "UPIOUT/657300419568/cred.club@axisb/payment /5413",
    "amount": 5070.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4096",
    "date": "2026-07-26",
    "description": "UPIOUT/657321424958/cred.club@axisb/payment /5413",
    "amount": 2566.11,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4097",
    "date": "2026-07-26",
    "description": "UPIOUT/657323435689/cred.club@axisb/payment /5413",
    "amount": 1630.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4091",
    "date": "2026-07-23",
    "description": "UPIOUT/657018035496/paytmqr6vwktv@ptys/Paid /5812",
    "amount": 140.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4092",
    "date": "2026-07-23",
    "description": "UPIOUT/657030037586/7892423519@kotak/Paid vi/0000",
    "amount": 122.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4093",
    "date": "2026-07-23",
    "description": "UPIOUT/657001061234/9538988515@ikwik/Paid vi/0000",
    "amount": 90.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4088",
    "date": "2026-07-22",
    "description": "UPI IN/103705943718/groww.balance@hdfcbank/U/0000",
    "amount": 50000.0,
    "type": "income",
    "category": "Freelance / Client",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4089",
    "date": "2026-07-22",
    "description": "UPI IN/715158492036/8526590200@jupiteraxis/A/0000",
    "amount": 73500.0,
    "type": "income",
    "category": "Freelance / Client",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4090",
    "date": "2026-07-22",
    "description": "FT IMPS/IFI/620311433977/Mr S CHANDRAN/IMPSTXN",
    "amount": 200.0,
    "type": "transfer",
    "category": "Self Transfer",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-idfcb-4252",
    "date": "2026-07-22",
    "description": "OPM/620311433977/S IMPS-",
    "amount": 200.0,
    "type": "expense",
    "category": "Bank Transfer",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-fed-4086",
    "date": "2026-07-16",
    "description": "UPIOUT/656300032435/7904318196@upi/Paid via /0000",
    "amount": 150.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4087",
    "date": "2026-07-16",
    "description": "UPIOUT/656312083920/addmoney@idfcbank/Paid v/5413",
    "amount": 20000.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-idfcb-4249",
    "date": "2026-07-16",
    "description": "AddMoney/20261979385714/656312083920/ UPIIntent",
    "amount": 20000.0,
    "type": "income",
    "category": "Freelance",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-idfcb-4250",
    "date": "2026-07-16",
    "description": "AddMoney/20261979385867/619770091752/ SELF",
    "amount": 1000.0,
    "type": "transfer",
    "category": "Self Transfer",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-idfcb-4251",
    "date": "2026-07-16",
    "description": "AddMoney/20261979385879/619701373288/ UPI",
    "amount": 2500.0,
    "type": "income",
    "category": "Freelance",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-fed-4083",
    "date": "2026-07-13",
    "description": "UPIOUT/656003620035/cbdttin@hdfcbank/UPIINTE/9311",
    "amount": 680.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4084",
    "date": "2026-07-13",
    "description": "UPIOUT/619466324333/groww.brk@validhdfc/Paid/6211",
    "amount": 50000.0,
    "type": "expense",
    "category": "Investments",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4085",
    "date": "2026-07-13",
    "description": "UPIOUT/656010651047/7904318196@upi/Paid via /0000",
    "amount": 50.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4082",
    "date": "2026-07-12",
    "description": "FT IMPS/IFI/619309999098/IDfy/3ddd20cda56f7520",
    "amount": 1.0,
    "type": "income",
    "category": "Freelance / Client",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4080",
    "date": "2026-07-09",
    "description": "UPIOUT/655613017840/7904318196@upi/Paid via /0000",
    "amount": 200.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4081",
    "date": "2026-07-09",
    "description": "FT IMPS/IFI/619012672732/GROWW INVEST TECH",
    "amount": 41000.0,
    "type": "income",
    "category": "Freelance / Client",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4078",
    "date": "2026-07-06",
    "description": "UPIOUT/655333714275/groww.brk@validhdfc/Paid/6211",
    "amount": 41000.0,
    "type": "expense",
    "category": "Investments",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4079",
    "date": "2026-07-06",
    "description": "UPIOUT/655302656912/paytmqr6vwktv@ptys/Paid /5812",
    "amount": 135.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4077",
    "date": "2026-07-04",
    "description": "UPIOUT/655108334741/basayyamrutunjaya1987-1@/0000",
    "amount": 10.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4074",
    "date": "2026-07-03",
    "description": "UPIOUT/655029165932/7904318196@upi/Paid via /0000",
    "amount": 900.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4075",
    "date": "2026-07-03",
    "description": "UPIOUT/655003162021/7904318196@upi/Paid via /0000",
    "amount": 150.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4076",
    "date": "2026-07-03",
    "description": "NFT/GR0WW INVEST TE/AXNH261841040285/AXIS BANK",
    "amount": 6.68,
    "type": "income",
    "category": "Freelance / Client",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4071",
    "date": "2026-07-02",
    "description": "NFT/PAYPAL PAYMENTS/CITIN26693849657/CITI",
    "amount": 85080.32,
    "type": "income",
    "category": "Salary",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4072",
    "date": "2026-07-02",
    "description": "UPIOUT/654905017296/cred.club@axisb/payment /5413",
    "amount": 13644.56,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4073",
    "date": "2026-07-02",
    "description": "UPIOUT/654916027338/cred.club@axisb/payment /5413",
    "amount": 9031.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4070",
    "date": "2026-06-30",
    "description": "ACHCR/TML DIV 30062026/00000000000004932916/FIO/:",
    "amount": 20.0,
    "type": "income",
    "category": "Freelance / Client",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-idfcb-4248",
    "date": "2026-06-30",
    "description": "MONTHLY INTEREST FDRL0007777/2577/",
    "amount": 97.0,
    "type": "income",
    "category": "Freelance",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-fed-4068",
    "date": "2026-06-29",
    "description": "UPIOUT/654630389724/cred.club@axisb/payment /5413",
    "amount": 23422.97,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4069",
    "date": "2026-06-29",
    "description": "UPIOUT/654613393176/cred.club@axisb/payment /5413",
    "amount": 2650.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4067",
    "date": "2026-06-28",
    "description": "UPIOUT/654531273808/bharatpe.9b0w0u7z6x25051/5451",
    "amount": 150.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4066",
    "date": "2026-06-27",
    "description": "SBINT:28-03-2026 to 26-06-2026[77770114732577]",
    "amount": 133.0,
    "type": "income",
    "category": "Freelance / Client",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4064",
    "date": "2026-06-23",
    "description": "FT IMPS/IFI/617409466210/S CHANDRAN/IMPSTXN",
    "amount": 48600.0,
    "type": "transfer",
    "category": "Self Transfer",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4065",
    "date": "2026-06-23",
    "description": "UPIOUT/654013540484/groww.brk@validhdfc/Paid/6211",
    "amount": 48600.0,
    "type": "expense",
    "category": "Investments",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-idfcb-4247",
    "date": "2026-06-23",
    "description": "OPM/617409466210/S IMPS-",
    "amount": 48600.0,
    "type": "expense",
    "category": "Bank Transfer",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-fed-4061",
    "date": "2026-06-21",
    "description": "UPIOUT/653816288798/bsaibaba.8800@okicici/Pa/0000",
    "amount": 1000.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4062",
    "date": "2026-06-21",
    "description": "UPIOUT/653806359559/jennylimz@axl/Paid via C/0000",
    "amount": 70.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4063",
    "date": "2026-06-21",
    "description": "UPIOUT/653826367009/paytmqr6vwktv@ptys/Paid /5812",
    "amount": 130.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4059",
    "date": "2026-06-19",
    "description": "FT IMPS/IFI/617009520748/S CHANDRAN/IMPSTXN",
    "amount": 50000.0,
    "type": "transfer",
    "category": "Self Transfer",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4060",
    "date": "2026-06-19",
    "description": "UPIOUT/653609956300/groww.brk@validhdfc/Paid/6211",
    "amount": 50000.0,
    "type": "expense",
    "category": "Investments",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-idfcb-4245",
    "date": "2026-06-19",
    "description": "OPM/617009520748/S IMPS-",
    "amount": 50000.0,
    "type": "expense",
    "category": "Bank Transfer",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-idfcb-4246",
    "date": "2026-06-19",
    "description": "GROWW IN/HDFC/ UPI/DR/093419890844/",
    "amount": 50000.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-fed-4058",
    "date": "2026-06-15",
    "description": "UPIOUT/653229443638/gpay-12195997106@okbizax/5912",
    "amount": 100.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4057",
    "date": "2026-06-14",
    "description": "UPI IN/616577415742/7904053633@idfcfirst/Pay/0000",
    "amount": 3000.0,
    "type": "income",
    "category": "Freelance / Client",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4056",
    "date": "2026-06-12",
    "description": "UPIOUT/652908050809/paytmqr6vwktv@ptys/Paid /5812",
    "amount": 200.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4055",
    "date": "2026-06-10",
    "description": "UPIOUT/652710771174/8660250621@axl/Paid via /0000",
    "amount": 100.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4054",
    "date": "2026-06-07",
    "description": "UPIOUT/652410241094/cred.club@axisb/payment /5413",
    "amount": 9050.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4053",
    "date": "2026-06-06",
    "description": "UPIOUT/652321071873/9591537041@axl/Paid via /0000",
    "amount": 150.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4051",
    "date": "2026-06-05",
    "description": "UPIOUT/736059331566/addmoney@idfcbank/Sent v/5413",
    "amount": 49000.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4052",
    "date": "2026-06-05",
    "description": "UPIOUT/736285251566/addmoney@idfcbank/Sent v/5413",
    "amount": 39000.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-idfcb-4243",
    "date": "2026-06-05",
    "description": "AddMoney/20261568840673/736059331566/ UPI",
    "amount": 49000.0,
    "type": "income",
    "category": "Freelance",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-idfcb-4244",
    "date": "2026-06-05",
    "description": "AddMoney/20261568840696/736285251566/ UPI",
    "amount": 39000.0,
    "type": "income",
    "category": "Freelance",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-fed-4049",
    "date": "2026-06-04",
    "description": "UPIOUT/525882371556/addmoney@idfcbank/Sent v/5413",
    "amount": 100.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4050",
    "date": "2026-06-04",
    "description": "NFT/PAYPAL PAYMENTS/CITIN26679506024/CITI",
    "amount": 91505.85,
    "type": "income",
    "category": "Salary",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-idfcb-4242",
    "date": "2026-06-04",
    "description": "AddMoney/20261558823417/525882371556/ CREDIT",
    "amount": 100.0,
    "type": "income",
    "category": "Freelance",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-fed-4048",
    "date": "2026-06-03",
    "description": "UPI IN/313052991546/8526590200@jupiteraxis/A/0000",
    "amount": 38000.0,
    "type": "income",
    "category": "Freelance / Client",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4044",
    "date": "2026-05-31",
    "description": "UPIOUT/651727009452/gopal51675@okaxis/Paid v/0000",
    "amount": 60.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4045",
    "date": "2026-05-31",
    "description": "UPIOUT/651722022554/manjunathnmanju@sbi/Paid/0000",
    "amount": 200.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4046",
    "date": "2026-05-31",
    "description": "UPIOUT/651731030742/cred.club@axisb/payment /5413",
    "amount": 19355.18,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4047",
    "date": "2026-05-31",
    "description": "UPIOUT/576789141516/addmoney@idfcbank/Sent v/5413",
    "amount": 1500.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-idfcb-4240",
    "date": "2026-05-31",
    "description": "AddMoney/20261518735758/576789141516/ KVBL/6385142/Design",
    "amount": 1500.0,
    "type": "income",
    "category": "Freelance",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-idfcb-4241",
    "date": "2026-05-31",
    "description": "MONTHLY INTEREST payment",
    "amount": 4.0,
    "type": "income",
    "category": "Freelance",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-fed-4043",
    "date": "2026-05-30",
    "description": "UPIOUT/651600926653/credpay.jio@axisb/paymen/4900",
    "amount": 19.0,
    "type": "expense",
    "category": "Utilities",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4042",
    "date": "2026-05-27",
    "description": "UPIOUT/651305471038/gpay-12190533686@okbizax/5912",
    "amount": 13.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4041",
    "date": "2026-05-24",
    "description": "UPIOUT/651016949624/7899421955@ybl/Paid via /0000",
    "amount": 10.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4040",
    "date": "2026-05-21",
    "description": "UPIOUT/650727481963/cred.club@axisb/payment /5413",
    "amount": 433.53,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4038",
    "date": "2026-05-18",
    "description": "UPIOUT/650409041062/cred.club@axisb/payment /5413",
    "amount": 1423.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4039",
    "date": "2026-05-18",
    "description": "UPIOUT/650428045704/gpay-12190533686@okbizax/5912",
    "amount": 15.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4036",
    "date": "2026-05-11",
    "description": "UPIOUT/649721997781/6361156388-3@axl/Paid vi/0000",
    "amount": 120.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4037",
    "date": "2026-05-11",
    "description": "UPIOUT/649710099672/paytmqr6vwktv@ptys/Paid /5812",
    "amount": 90.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4034",
    "date": "2026-05-10",
    "description": "UPIOUT/649613900031/credpay.jio@axisb/paymen/4900",
    "amount": 29.0,
    "type": "expense",
    "category": "Utilities",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4035",
    "date": "2026-05-10",
    "description": "UPIOUT/649608930006/740484409@ybl/Paid via C/0000",
    "amount": 10.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4029",
    "date": "2026-05-05",
    "description": "UPIOUT/709107691256/7904318196@upi/Sent via /0000",
    "amount": 100.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4030",
    "date": "2026-05-05",
    "description": "UPIOUT/709252501256/7904318196@upi/Sent via /0000",
    "amount": 1900.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4031",
    "date": "2026-05-05",
    "description": "UPIOUT/709670581256/addmoney@idfcbank/Sent v/5413",
    "amount": 20000.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4032",
    "date": "2026-05-05",
    "description": "UPIOUT/709707231256/addmoney@idfcbank/Sent v/5413",
    "amount": 30000.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4033",
    "date": "2026-05-05",
    "description": "UPIOUT/649102081181/q888465100@ybl/Paid via /5814",
    "amount": 20.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-idfcb-4238",
    "date": "2026-05-05",
    "description": "AddMoney/20261258434951/709670581256/ payment",
    "amount": 20000.0,
    "type": "income",
    "category": "Freelance",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-idfcb-4239",
    "date": "2026-05-05",
    "description": "AddMoney/20261258434956/709707231256/ UPI",
    "amount": 30000.0,
    "type": "income",
    "category": "Freelance",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-fed-4024",
    "date": "2026-05-04",
    "description": "NFT/PAYPAL PAYMENTS/CITIN26663762364/CITI",
    "amount": 156947.96,
    "type": "income",
    "category": "Salary",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4025",
    "date": "2026-05-04",
    "description": "UPIOUT/649028921841/BHARATPE.90064667923@fbp/58",
    "amount": 40.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4026",
    "date": "2026-05-04",
    "description": "UPIOUT/649000960926/cred.club@axisb/payment /5413",
    "amount": 44799.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4027",
    "date": "2026-05-04",
    "description": "UPIOUT/649022976246/cred.club@axisb/payment /5413",
    "amount": 30052.33,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4028",
    "date": "2026-05-04",
    "description": "UPIOUT/649006966188/cred.club@axisb/payment /5413",
    "amount": 8339.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4022",
    "date": "2026-05-01",
    "description": "UPIOUT/648716272026/cred.club@axisb/payment /5413",
    "amount": 1879.98,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4023",
    "date": "2026-05-01",
    "description": "UPIOUT/648703284862/paytmqr6k7u51@ptys/Paid /5411",
    "amount": 15.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-idfcb-4237",
    "date": "2026-04-30",
    "description": "MONTHLY SAVINGS payment",
    "amount": 9.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-fed-4021",
    "date": "2026-04-27",
    "description": "UPIOUT/648320574429/9366701410@kotak811/Paid/0000",
    "amount": 106.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4019",
    "date": "2026-04-26",
    "description": "UPIOUT/648200470946/pradeepvce@okaxis/Paid v/0000",
    "amount": 56.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4020",
    "date": "2026-04-26",
    "description": "UPIOUT/648209544451/paytm.d92705698@pty/Paid/5812",
    "amount": 105.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-idfcb-4235",
    "date": "2026-04-26",
    "description": "UPI/CR/611695339773/C req",
    "amount": 10000.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-idfcb-4236",
    "date": "2026-04-26",
    "description": "UPI/CR/611695595040/C Rohin/SBIN/8526590/UPI",
    "amount": 500.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-fed-4017",
    "date": "2026-04-22",
    "description": "UPIOUT/647811858763/suryanar@kbl/Paid via CR/7407",
    "amount": 65.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4018",
    "date": "2026-04-22",
    "description": "UPIOUT/647814852057/9164777986@axisb/Paid vi/0000",
    "amount": 102.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4015",
    "date": "2026-04-08",
    "description": "UPIOUT/646418537364/mugam1963@oksbi/Paid via/0000",
    "amount": 8000.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4016",
    "date": "2026-04-08",
    "description": "UPIOUT/646414562590/cred.club@axisb/payment /5413",
    "amount": 1026.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4013",
    "date": "2026-04-07",
    "description": "UPIOUT/646313353879/9901915231-2@ibl/Paid vi/0000",
    "amount": 61.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4014",
    "date": "2026-04-07",
    "description": "UPIOUT/646322427330/thblrgen-1@okaxis/Paid v/0000",
    "amount": 31000.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4008",
    "date": "2026-04-06",
    "description": "NFT/PAYPAL PAYMENTS/CITIN26648193881/CITI",
    "amount": 83843.38,
    "type": "income",
    "category": "Salary",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4009",
    "date": "2026-04-06",
    "description": "UPIOUT/646219278402/addmoney@idfcbank/Paid v/5413",
    "amount": 32000.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4010",
    "date": "2026-04-06",
    "description": "UPIOUT/646206289314/addmoney@idfcbank/Paid v/5413",
    "amount": 3000.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4011",
    "date": "2026-04-06",
    "description": "UPIOUT/646219281746/megalai1975@okaxis/Paid /0000",
    "amount": 3000.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4012",
    "date": "2026-04-06",
    "description": "UPIOUT/646220331752/8870602962@ibl/Paid via /0000",
    "amount": 50.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-idfcb-4233",
    "date": "2026-04-06",
    "description": "AddMoney/20260968078374/646219278402/ payment",
    "amount": 32000.0,
    "type": "income",
    "category": "Freelance",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-idfcb-4234",
    "date": "2026-04-06",
    "description": "AddMoney/20260968078478/646206289314/ SBIN/9442439/UPI",
    "amount": 3000.0,
    "type": "income",
    "category": "Freelance",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-fed-4005",
    "date": "2026-04-05",
    "description": "UPI IN/300218383096/7010602610@ptyes/Sent us/0000",
    "amount": 12000.0,
    "type": "income",
    "category": "Freelance / Client",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4006",
    "date": "2026-04-05",
    "description": "UPIOUT/646109125048/cred.club@axisb/payment /5413",
    "amount": 5883.83,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4007",
    "date": "2026-04-05",
    "description": "UPIOUT/646117135232/cred.club@axisb/payment /5413",
    "amount": 5446.46,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-idfcb-4232",
    "date": "2026-03-31",
    "description": "MONTHLY SAVINGS payment",
    "amount": 17.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-fed-4004",
    "date": "2026-03-28",
    "description": "SBINT:27-12-2025 to 27-03-2026[77770114732577]",
    "amount": 53.0,
    "type": "income",
    "category": "Freelance / Client",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-idfcb-4228",
    "date": "2026-03-26",
    "description": "UPI/DR/608557109720/C FDRL0007777/2577/",
    "amount": 200.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-idfcb-4229",
    "date": "2026-03-26",
    "description": "UPI/REV/608557109720/ Rohin/rohinis/Pay req",
    "amount": 200.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-idfcb-4230",
    "date": "2026-03-26",
    "description": "UPI/DR/608557110251/C rohinis/Reversa",
    "amount": 200.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-idfcb-4231",
    "date": "2026-03-26",
    "description": "UPI/REV/608557110251/ Rohin/rohinis/Pay req",
    "amount": 200.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-fed-4002",
    "date": "2026-03-25",
    "description": "FT IMPS/IFI/608408480700/Mr S CHANDRAN/IMPSTXN",
    "amount": 300.0,
    "type": "transfer",
    "category": "Self Transfer",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4003",
    "date": "2026-03-25",
    "description": "UPIOUT/645003044976/snabbit.payu@axisbank/UP/7349",
    "amount": 189.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-idfcb-4227",
    "date": "2026-03-25",
    "description": "OPM/608408480700/S IMPS-",
    "amount": 300.0,
    "type": "expense",
    "category": "Bank Transfer",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-fed-4000",
    "date": "2026-03-21",
    "description": "NFT/Mr. S CHANDRAN/IDFB608072851371/IDFC",
    "amount": 3000.0,
    "type": "transfer",
    "category": "Self Transfer",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-4001",
    "date": "2026-03-21",
    "description": "UPIOUT/278958560806/bavibabitha@oksbi/Sent v/0000",
    "amount": 3000.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-idfcb-4224",
    "date": "2026-03-21",
    "description": "UPI/CR/608069068598/C REMA",
    "amount": 5000.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-idfcb-4225",
    "date": "2026-03-21",
    "description": "UPI/DR/608047081715/ Rohin/SBIN/8526590/UPI",
    "amount": 3000.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-idfcb-4226",
    "date": "2026-03-21",
    "description": "IDFB608072851371/S NEFT/",
    "amount": 3000.0,
    "type": "expense",
    "category": "Bank Transfer",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-fed-3999",
    "date": "2026-03-18",
    "description": "UPIOUT/710130090776/addmoney@idfcbank/Sent v/5413",
    "amount": 8000.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-idfcb-4223",
    "date": "2026-03-18",
    "description": "AddMoney/20260777829993/710130090776/ NO REMA",
    "amount": 8000.0,
    "type": "income",
    "category": "Freelance",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-fed-3998",
    "date": "2026-03-15",
    "description": "UPI IN/398956895898/7010602610@ptyes/Sent us/0000",
    "amount": 8000.0,
    "type": "income",
    "category": "Freelance / Client",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-3996",
    "date": "2026-03-09",
    "description": "NFT/HDFC ERGO GENER/HDFCH00855176006/HDFC",
    "amount": 2249.0,
    "type": "income",
    "category": "Freelance / Client",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-3997",
    "date": "2026-03-09",
    "description": "UPIOUT/643428533240/addmoney@idfcbank/Paid v/5413",
    "amount": 2250.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-idfcb-4221",
    "date": "2026-03-09",
    "description": "BHARATH / UPI/DR/092158396732/",
    "amount": 195.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-idfcb-4222",
    "date": "2026-03-09",
    "description": "AddMoney/20260687736018/643428533240/ NO REMA",
    "amount": 2250.0,
    "type": "income",
    "category": "Freelance",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-fed-3995",
    "date": "2026-03-06",
    "description": "FT IMPS/IFI/606591697499/RZPX PRIVATE LIMITED/Payo",
    "amount": 1.0,
    "type": "income",
    "category": "Freelance / Client",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-3991",
    "date": "2026-03-05",
    "description": "NFT/PAYPAL PAYMENTS/CITIN26632196725/CITI",
    "amount": 92271.88,
    "type": "income",
    "category": "Salary",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-3992",
    "date": "2026-03-05",
    "description": "UPIOUT/643027813557/cred.club@axisb/payment /5413",
    "amount": 22718.2,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-3993",
    "date": "2026-03-05",
    "description": "UPIOUT/643029810444/cred.club@axisb/payment /5413",
    "amount": 12801.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-3994",
    "date": "2026-03-05",
    "description": "UPIOUT/643024822673/addmoney@idfcbank/Paid v/5413",
    "amount": 56960.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-idfcb-4220",
    "date": "2026-03-05",
    "description": "AddMoney/20260647687778/643024822673/ KKBK/8088882/NO REMA",
    "amount": 56960.0,
    "type": "income",
    "category": "Freelance",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-fed-3990",
    "date": "2026-03-03",
    "description": "UPIOUT/642817468198/gpay-12190533686@okbizax/5912",
    "amount": 7.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-idfcb-4219",
    "date": "2026-03-02",
    "description": "MANOJKUM/ UPI/CR/101717410696/",
    "amount": 2500.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-fed-3988",
    "date": "2026-03-01",
    "description": "UPI IN/119357234585/catherinhrbr@okhdfcbank//0000",
    "amount": 5000.0,
    "type": "income",
    "category": "Freelance / Client",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-3989",
    "date": "2026-03-01",
    "description": "UPIOUT/642617150894/addmoney@idfcbank/Paid v/5413",
    "amount": 5000.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-idfcb-4216",
    "date": "2026-03-01",
    "description": "DEPOSIT/3758/ ATM/CASH",
    "amount": 5000.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-idfcb-4217",
    "date": "2026-03-01",
    "description": "DEPOSIT/3764/ ATM/CASH",
    "amount": 14500.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-idfcb-4218",
    "date": "2026-03-01",
    "description": "AddMoney/20260607625656/642617150894/ Date No",
    "amount": 5000.0,
    "type": "income",
    "category": "Freelance",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-idfcb-4215",
    "date": "2026-02-28",
    "description": "MONTHLY SAVINGS SBIN/9649241/NO REMA",
    "amount": 33.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-idfcb-4214",
    "date": "2026-02-22",
    "description": "ATM/CASH REMA",
    "amount": 25500.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-fed-3987",
    "date": "2026-02-21",
    "description": "UPIOUT/641818637449/9071129662kotak@ybl/Paid/0000",
    "amount": 80.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-idfcb-4213",
    "date": "2026-02-16",
    "description": "MANOJKUM/ UPI/DR/193800225610/",
    "amount": 2500.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-fed-3986",
    "date": "2026-02-14",
    "description": "UPIOUT/641112504973/9071129662kotak@ybl/Paid/0000",
    "amount": 80.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-3985",
    "date": "2026-02-13",
    "description": "UPIOUT/641022362336/hhaseena786786-1@oksbi/P/0000",
    "amount": 120.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-idfcb-4211",
    "date": "2026-02-12",
    "description": "UPI/DR/604388665389/C EKART/UTIB/ekart@a/na",
    "amount": 500.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-idfcb-4212",
    "date": "2026-02-12",
    "description": "UPI/REV/604388665389/ Rohin/rohinis/Pay req",
    "amount": 500.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-fed-3984",
    "date": "2026-02-11",
    "description": "UPI REFUND RRC 102637796497",
    "amount": 499.0,
    "type": "income",
    "category": "Freelance / Client",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-idfcb-4210",
    "date": "2026-02-10",
    "description": "UPI/DR/109165044348/ NO REMA",
    "amount": 132.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-fed-3983",
    "date": "2026-02-05",
    "description": "FT IMPS/IFO/603608683486/IDFB0080155/Sent via Jupi",
    "amount": 152496.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-idfcb-4209",
    "date": "2026-02-05",
    "description": "SCHANDRAN/ IMPS/603608683486/",
    "amount": 152496.0,
    "type": "transfer",
    "category": "Self Transfer",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-fed-3981",
    "date": "2026-02-04",
    "description": "NFT/PAYPAL PAYMENTS/CITIN26617440063/CITI",
    "amount": 152932.62,
    "type": "income",
    "category": "Salary",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-3982",
    "date": "2026-02-04",
    "description": "UPIOUT/102637796497/novidigitalentautopay.rz/5815",
    "amount": 499.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-3979",
    "date": "2026-02-02",
    "description": "UPI IN/396544450201/7010602610@ptyes/Sent us/0000",
    "amount": 25000.0,
    "type": "income",
    "category": "Freelance / Client",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-3980",
    "date": "2026-02-02",
    "description": "UPIOUT/639908528912/cred.club@axisb/payment /5413",
    "amount": 24998.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-idfcb-4208",
    "date": "2026-02-01",
    "description": "DEPOSIT/1229/ ATM/CASH",
    "amount": 34500.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-idfcb-4207",
    "date": "2026-01-31",
    "description": "MONTHLY SAVINGS req",
    "amount": 13.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-idfcb-4206",
    "date": "2026-01-27",
    "description": "CASH DEPOSIT BY SELF UTIB/9626292/NO REMA",
    "amount": 10000.0,
    "type": "transfer",
    "category": "Self Transfer",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-idfcb-4205",
    "date": "2026-01-26",
    "description": "UPI/DR/135059519772/ NO REMA",
    "amount": 29.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-idfcb-4204",
    "date": "2026-01-24",
    "description": "UPI/DR/602465834985/G NO REMA",
    "amount": 350.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-idfcb-4203",
    "date": "2026-01-20",
    "description": "UPI/DR/602063340459/Mr IN/601911444651/8033273000/11:52:57",
    "amount": 50.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-idfcb-4202",
    "date": "2026-01-19",
    "description": "DEPOSIT/0339/ ATM/CASH",
    "amount": 16000.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-fed-3974",
    "date": "2026-01-18",
    "description": "FT IMPS/IFI/601811307005/Mr S CHANDRAN/IMPSTXN",
    "amount": 1000.0,
    "type": "transfer",
    "category": "Self Transfer",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-3975",
    "date": "2026-01-18",
    "description": "UPIOUT/638417095669/7845254904@fam/Paid via /0000",
    "amount": 1500.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-3976",
    "date": "2026-01-18",
    "description": "FT IMPS/IFI/601811324504/Mr S CHANDRAN/IMPSTXN",
    "amount": 1146.0,
    "type": "transfer",
    "category": "Self Transfer",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-3977",
    "date": "2026-01-18",
    "description": "UPI IN/601843373413/8526590200ck-4@oksbi/UPI/0000",
    "amount": 100.0,
    "type": "income",
    "category": "Freelance / Client",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-fed-3978",
    "date": "2026-01-18",
    "description": "UPIOUT/638418105463/7022021157-2@ybl/Paid vi/0000",
    "amount": 1770.0,
    "type": "expense",
    "category": "Shopping",
    "method": "Bank Transfer",
    "note": "Federal Bank (Jupiter)"
  },
  {
    "id": "tx-idfcb-4200",
    "date": "2026-01-18",
    "description": "OPM/601811307005/S IMPS-",
    "amount": 1000.0,
    "type": "expense",
    "category": "Bank Transfer",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  },
  {
    "id": "tx-idfcb-4201",
    "date": "2026-01-18",
    "description": "OPM/601811324504/S IMPS-",
    "amount": 1146.0,
    "type": "expense",
    "category": "Bank Transfer",
    "method": "Bank Transfer",
    "note": "IDFC Savings Account"
  }
],
  budgets: [
    { category: 'Housing', cap: 40000, period: 'Monthly' },
    { category: 'Food & Groceries', cap: 20000, period: 'Monthly' },
    { category: 'Transportation', cap: 10000, period: 'Monthly' },
    { category: 'Entertainment', cap: 12000, period: 'Monthly' },
    { category: 'Utilities', cap: 6000, period: 'Monthly' },
    { category: 'Subscriptions', cap: 3000, period: 'Monthly' },
    { category: 'Shopping', cap: 15000, period: 'Monthly' }
  ],
  goals: [],
  investments: [],
  subscriptions: []
};

// Global State Class
class Store {
  constructor() {
    this.data = this.loadState();
  }

    loadState() {
    try {
      // Force clear all previous storage keys to eliminate any residual demo data
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith('wealthrise_')) {
          localStorage.removeItem(k);
        }
      }
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Check if parsed state has any lingering demo investments or goals
        const hasDemoInvestments = parsed.investments && parsed.investments.some(i => i.name && (i.name.includes('Nifty') || i.name.includes('Reliance')));
        const hasDemoGoals = parsed.goals && parsed.goals.some(g => g.title && g.title.includes('Emergency'));
        if (!hasDemoInvestments && !hasDemoGoals && Array.isArray(parsed.transactions)) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to load state from localStorage', e);
    }
    const fresh = JSON.parse(JSON.stringify(DEFAULT_DATA));
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh)); } catch(e) {}
    return fresh;
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error('Failed to save state to localStorage', e);
    }
  }

  resetToDefault() {
    this.data = JSON.parse(JSON.stringify(DEFAULT_DATA));
    this.saveState();
  }

  getCurrencySymbol() {
    return CURRENCIES[this.data.currency]?.symbol || '₹';
  }

  formatMoney(amount) {
    const sym = this.getCurrencySymbol();
    const isINR = this.data.currency === 'INR';
    const locale = isINR ? 'en-IN' : undefined;

    const formatted = Math.abs(amount).toLocaleString(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return `${amount < 0 ? '-' : ''}${sym}${formatted}`;
  }

  // Transaction Helpers
  addTransaction(tx) {
    tx.id = 'tx-' + Date.now();
    this.data.transactions.unshift(tx);
    this.saveState();
    return tx;
  }

  deleteTransaction(id) {
    this.data.transactions = this.data.transactions.filter(t => t.id !== id);
    this.saveState();
  }

  // Budget Helpers
  setBudget(category, cap) {
    const idx = this.data.budgets.findIndex(b => b.category === category);
    if (idx >= 0) {
      this.data.budgets[idx].cap = parseFloat(cap);
    } else {
      this.data.budgets.push({ category, cap: parseFloat(cap), period: 'Monthly' });
    }
    this.saveState();
  }

  // Goal Helpers
  addGoalDeposit(goalId, amount) {
    const goal = this.data.goals.find(g => g.id === goalId);
    if (goal) {
      goal.currentAmount += parseFloat(amount);
      this.addTransaction({
        date: new Date().toISOString().split('T')[0],
        description: `Deposit to Goal: ${goal.title}`,
        amount: parseFloat(amount),
        type: 'investment',
        category: 'Savings Goal',
        method: 'Bank Transfer',
        note: 'Savings allocation'
      });
      this.saveState();
    }
  }

  addGoal(goal) {
    goal.id = 'goal-' + Date.now();
    this.data.goals.push(goal);
    this.saveState();
  }

  // Investment Helpers
  addInvestment(inv) {
    inv.id = 'inv-' + Date.now();
    this.data.investments.push(inv);
    this.saveState();
  }

  deleteInvestment(id) {
    this.data.investments = this.data.investments.filter(i => i.id !== id);
    this.saveState();
  }

  // Subscription Helpers
  addSubscription(sub) {
    sub.id = 'sub-' + Date.now();
    this.data.subscriptions.push(sub);
    this.saveState();
  }

  deleteSubscription(id) {
    this.data.subscriptions = this.data.subscriptions.filter(s => s.id !== id);
    this.saveState();
  }

  // Financial Metrics Calculations
  getTotals() {
    const income = this.data.transactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);

    const expense = this.data.transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);

    const clientCash = this.data.transactions
      .filter(t => t.type === 'income' && (t.category === 'Client Cash Income' || t.method === 'Cash'))
      .reduce((acc, t) => acc + t.amount, 0);

    const salaryIncome = this.data.transactions
      .filter(t => t.type === 'income' && (t.category === 'Salary' || (t.description && t.description.toUpperCase().includes('PAYPAL'))))
      .reduce((acc, t) => acc + t.amount, 0);

    const selfTransfers = this.data.transactions
      .filter(t => t.type === 'transfer').length;

    const investments = this.data.investments
      .reduce((acc, i) => acc + (i.currentPrice * i.quantity), 0);

    const savingsGoalTotal = this.data.goals
      .reduce((acc, g) => acc + g.currentAmount, 0);

    const netWorth = investments + savingsGoalTotal + (income - expense);
    const savingsRate = income > 0 ? (((income - expense) / income) * 100).toFixed(1) : 0;

    return {
      income,
      expense,
      clientCash,
      salaryIncome,
      selfTransfers,
      cashflow: income - expense,
      investments,
      netWorth,
      savingsRate
    };
  }
}

const store = new Store();
