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
      { url: `${prefix}view-enquiry-feedback`, label: "Feedback Enquiries" },
      { url: `${prefix}view-all-enquiries`, label: "View All Enquiries" },
    ],
    OE: [
      { url: `${prefix}create-cibil`, label: "Check CIBIL" },
      { url: `${prefix}get-verified-list`, label: "Get Verified List" },
    ],
  },
];
