import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Auth/Login";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import DashBoardPage from "../Pages/Dashboard/DashBoardPage";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Users from "../Pages/Dashboard/Users";
import Notifications from "../Pages/Dashboard/Notifications";
import ContentManagement from "../Pages/Dashboard/ContentManagement";
import Interest from "../Pages/Dashboard/ContentManagment/Interest";
import Prompts from "../Pages/Dashboard/ContentManagment/Prompts";
import PrivateRouting from "./PrivateRouting";
import Notification from "../Pages/Dashboard/Notification";
import ReportUser from "../Pages/Dashboard/ReportUser/ReportUser";
import ReportUserDetails from "../Pages/Dashboard/ReportUser/ReportUserDetails";
import ReportUserPage from "../Pages/Dashboard/ReportUser/ReportUserPage";
import Setting from "../Pages/Dashboard/Settingpages/Setting";
import PrivacyandPolicy from "../Pages/Dashboard/Settingpages/Privacy&Policy";
import TermsandConditions from "../Pages/Dashboard/Settingpages/Terms&Conditions";
import Language from "../Pages/Dashboard/ContentManagment/Language";
import Religion from "../Pages/Dashboard/ContentManagment/Religion";
import ContactUs from "../Pages/Dashboard/ContactUs";

const CombineRoutes = () => {
  const RoutesData = [
    {
      path: "/",
      element: (
        <PrivateRouting>
          {" "}
          <DashBoardPage />
        </PrivateRouting>
      ),
      type: 1,
      childRoutes: [
        { path: "", element: <Dashboard /> },
        { path: "/users", element: <Users /> },
        {
          path: "/content-management/",
          element: <ContentManagement />,
          childRoutes: [
            { path: "", element: <Interest /> },
            { path: "prompts", element: <Prompts /> },
            { path: "language", element: <Language /> },
            { path: "religion", element: <Religion /> },
          ],
        },
        {
          path: "/setting/",
          element: <Setting />,
          childRoutes: [
            { path: "", element: <TermsandConditions /> },
            { path: "privacy&policy", element: <PrivacyandPolicy /> },
          ],
        },
        {
          path: "/report-user/",
          element: <ReportUserPage />,
          childRoutes: [
            { path: "", element: <ReportUser /> },
            { path: "user-details", element: <ReportUserDetails /> },
          ],
        },
        { path: "/notifications", element: <Notification /> },
        { path: "/contactus", element: <ContactUs /> },
      ],
    },
    {
      path: "/login",
      element: <Login />,
      childRoutes: [],
    },
    {
      path: "/forgotpassword",
      element: <ForgotPassword />,
      childRoutes: [],
    },
  ];
  return (
    <Routes>
      {RoutesData.map((firstchild, index) => (
        <Route key={index} path={firstchild.path} element={firstchild.element}>
          {firstchild?.childRoutes?.map((secondchild, childIndex) => (
            <Route
              key={childIndex}
              path={secondchild.path}
              element={secondchild.element}
            >
              {secondchild?.childRoutes?.map((thirdchild, childIndex) => (
                <Route
                  key={childIndex}
                  path={thirdchild.path}
                  element={thirdchild.element}
                />
              ))}
            </Route>
          ))}
        </Route>
      ))}
    </Routes>
  );
};

export default CombineRoutes;
