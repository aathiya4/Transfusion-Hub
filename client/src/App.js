import { Routes, Route } from "react-router-dom";
import HomePage from "./views/HomePage";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import PublicRoute from "./components/Routes/PublicRoute";
import Donor from "./views/Donor";
import Hospitals from "./views/Hospitals";
import OrganisationPage from "./views/OrganisationPage";
import AboutPage from "./views/AboutPage";
import ContactPage from "./views/ContactPage";
import Analytics from "./views/Analytics";
import DonorList from "./views/Admin/DonorList";
import HospitalList from "./views/Admin/HospitalList";
import OrgList from "./views/Admin/OrgList";
import AdminHome from "./views/Admin/AdminHome";


function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donor-list"
          element={
            <ProtectedRoute>
              <DonorList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hospital-list"
          element={
            <ProtectedRoute>
              <HospitalList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/org-list"
          element={
            <ProtectedRoute>
              <OrgList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/hospital"
          element={
            <ProtectedRoute>
              <Hospitals />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/consumer"
          element={
            <ProtectedRoute>
              <Consumer />
            </ProtectedRoute>
          }
        /> */}
        {/* <Route
          path="/donation"
          element={
            <ProtectedRoute>
              <Donation />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/organisation"
          element={
            <ProtectedRoute>
              <OrganisationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donor"
          element={
            <ProtectedRoute>
              <Donor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <AboutPage/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <ContactPage/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        
      </Routes>
    </>
  );
}

export default App;
