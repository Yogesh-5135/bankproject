const prefix = "/bankloan/";

export const userMenus = [
  //0 index
  {
    ADMIN: [
      { url: `${prefix}add-employee`, label: "Add Employee" },
      { url: `${prefix}view-employee`, label: "View Employee" },
    ],
    CRM: [
      { url: `${prefix}view-accepted-enquiries`, label: "Accepted Enquiries" },
      { url: `${prefix}view-all-enquiries`, label: "View All Enquiries" },
    ],
    OE: [
      { url: `${prefix}create-cibil`, label: "Check CIBIL" },
      { url: `${prefix}get-submitted-list`, label: "Get Submitted List" }, //here oe verified documents
      { url: `${prefix}get-verified-list`, label: "Get Verified List" },
    ],
    CM: [
      {
        url: `${prefix}view-all-loanapplications`, //credit limit generate,getMonthlyEmi,getIntRate,GetSanctionLetter
        label: "View All LoanApplications",
      },
      {
        url: `${prefix}view-sanction-letter`, //credit limit generate,getMonthlyEmi,getIntRate,GetSanctionLetter
        label: "View Sanction",
      },
    ],
    AH: [
      {
        url: `${prefix}view-all-accepted`, //customer accepted sanction letter
        label: "View All Accepted LoanApplications",
      },
      {
        url: `${prefix}calculate-ledger`,
        label: "Calculate Ledger",
      },
    ],
  },
];
