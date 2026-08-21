import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spin, Flex } from "antd";

// Eager load primary entry views for instantaneous first paint
import Login from "./Login";
import Studentlogin from "./Studentlogin";
import Lecturerlogin from "./Lecturerlogin";

// Code-split / Lazy-load dashboard subviews for high performance and tiny initial bundle
const Studentdashboard = lazy(() => import("./Studentdashboard"));
const DashboardOverview = lazy(() => import("./DashboardOverview"));
const CourseTable = lazy(() => import("./CourseTable"));
const Academiccalender = lazy(() => import("./Academiccalender"));
const Myprogress = lazy(() => import("./Myprogress"));
const Resultcard = lazy(() => import("./Resultcard"));
const Studycard = lazy(() => import("./Studycard"));
const Teacherdashborad = lazy(() => import("./Teacherdashborad"));
const Teacherdashboardoverveiw = lazy(() => import("./Teacherdashboardoverveiw"));

const LoadingFallback = () => (
  <Flex align="center" justify="center" style={{ minHeight: "60vh" }}>
    <Spin size="large" tip="Loading portal view..." />
  </Flex>
);

// Protected Route Guard
const ProtectedRoute = ({ children, allowedRole }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (allowedRole && role !== allowedRole) {
    return <Navigate to={role === "lecturer" ? "/teacherdashboard" : "/studentdashboard"} replace />;
  }

  return children;
};

function Pagerouting() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Public Authentication Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/studentlogin" element={<Studentlogin />} />
        <Route path="/lecturerlogin" element={<Lecturerlogin />} />
        <Route path="/Lecturerlogin" element={<Lecturerlogin />} />

        {/* Protected Student Portal Routes */}
        <Route
          path="/studentdashboard"
          element={
            <ProtectedRoute allowedRole="student">
              <Studentdashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardOverview />} />
          <Route
            path="mycourse"
            element={<CourseTable title="My Enrolled Courses" useCard={true} pagination={{ pageSize: 8 }} />}
          />
          <Route
            path="coursecatalogue"
            element={<CourseTable title="University Course Catalogue" useCard={true} pagination={{ pageSize: 8 }} />}
          />
          <Route path="academiccalendar" element={<Academiccalender />} />
          <Route path="myprogress" element={<Myprogress />} />
          <Route path="resultcard" element={<Resultcard />} />
          <Route path="studycard" element={<Studycard />} />
        </Route>

        {/* Protected Lecturer / Faculty Portal Routes */}
        <Route
          path="/teacherdashboard"
          element={
            <ProtectedRoute allowedRole="lecturer">
              <Teacherdashborad />
            </ProtectedRoute>
          }
        >
          <Route index element={<Teacherdashboardoverveiw />} />
        </Route>

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default Pagerouting;
