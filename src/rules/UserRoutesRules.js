import EmployeeEnrollment from "../pages/employee/EmployeeEnrollment";
import ViewAllEmployees from "../pages/employee/ViewAllEmployees";
import ViewAllEnquiries from "../pages/enquiry/ViewAllEnquiries";
import AcceptedEnquiries from "../pages/enquiry/AcceptedEnquiries";
import CreateCibil from "../pages/Cibil/CreateCibil";
import GetVerifiedList from "../pages/Cibil/GetVerifiedList";
import EditEmployeeForm from "../pages/employee/EditEmployeeForm";
import GetSubmittedList from "../pages/Cibil/GetSubmittedList";
import ViewAllLoanApplications from "../pages/sanction/ViewAllLoanApplications";

export const userRoutes = [
  //0 index
  {
    ADMIN: [
      { path: "add-employee", component: <EmployeeEnrollment /> },
      { path: "edit-employee/:empID", component: <EditEmployeeForm /> },
      { path: "view-employee", component: <ViewAllEmployees /> },
    ],
    CRM: [
      { path: "view-accepted-enquiries", component: <AcceptedEnquiries /> },
      { path: "View-all-enquiries", component: <ViewAllEnquiries /> },
    ],
    OE: [
      { path: "create-cibil", component: <CreateCibil /> },
      { path: "get-submitted-list", component: <GetSubmittedList /> },
      { path: "get-verified-list", component: <GetVerifiedList /> },
    ],

    CM: [
      {
        path: "view-all-loanapplications",
        component: <ViewAllLoanApplications />,
      },
    ],

    AH: [
      {
        path: "view-all-loanapplications",
        component: <ViewAllLoanApplications />,
      },
    ],
  },
];
