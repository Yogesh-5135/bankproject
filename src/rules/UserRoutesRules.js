import EmployeeEnrollment from "../pages/employee/EmployeeEnrollment";
import ViewAllEmployees from "../pages/employee/ViewAllEmployees";
import ViewAllEnquiries from "../pages/enquiry/ViewAllEnquiries";
import RegisteredEnquiries from "../pages/enquiry/RegisteredEnquiries";
import FeedbackEnquiries from "../pages/enquiry/FeedbackEnquiries";

export const userRoutes = [
  //0 index
  {
    ADMIN: [
      { path: "add-employee", component: <EmployeeEnrollment /> },
      { path: "view-employee", component: <ViewAllEmployees /> },
      { path: "View-enquiries", component: <ViewAllEnquiries /> },
    ],
    CRM: [
      { path: "view-new-enquiries", component: <RegisteredEnquiries /> },
      { path: "view-enquiry-feedback", component: <FeedbackEnquiries /> },
    ],
    OE: [],
  },
];
