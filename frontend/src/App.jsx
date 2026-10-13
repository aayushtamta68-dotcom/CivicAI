import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";


import Login from "./pages/Login";
import Register from "./pages/auth/Register";
import VerifyOTP from "./pages/auth/VerifyOTP";


import CitizenLayout from "./layouts/CitizenLayout";
import EmployeeLayout from "./layouts/EmployeeLayout";


// Employee
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import EmployeeComplaintDetails from "./pages/employee/ComplaintDetails";


// Citizen
import CitizenDashboard from "./pages/citizen/CitizenDashboard";
import SubmitComplaint from "./pages/citizen/SubmitComplaint";
import MyComplaints from "./pages/citizen/MyComplaints";
import CitizenComplaintDetails from "./pages/citizen/ComplaintDetails";



function App() {

  return (

    <BrowserRouter>

      <Routes>


        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />


        <Route
          path="/login"
          element={<Login />}
        />


        <Route
          path="/register"
          element={<Register />}
        />


        <Route
          path="/verify-otp"
          element={<VerifyOTP />}
        />



        {/* Citizen Routes */}


        <Route
          path="/citizen/dashboard"
          element={
            <CitizenLayout>
              <CitizenDashboard />
            </CitizenLayout>
          }
        />


        <Route
          path="/citizen/submit"
          element={
            <CitizenLayout>
              <SubmitComplaint />
            </CitizenLayout>
          }
        />


        <Route
          path="/citizen/my-complaints"
          element={
            <CitizenLayout>
              <MyComplaints />
            </CitizenLayout>
          }
        />


        <Route
          path="/citizen/complaints/:id"
          element={
            <CitizenLayout>
              <CitizenComplaintDetails />
            </CitizenLayout>
          }
        />




        {/* Employee Routes */}


        <Route
          path="/employee/dashboard"
          element={
            <EmployeeLayout>
              <EmployeeDashboard />
            </EmployeeLayout>
          }
        />


        <Route
          path="/employee/complaints/:id"
          element={
            <EmployeeLayout>
              <EmployeeComplaintDetails />
            </EmployeeLayout>
          }
        />


      </Routes>

    </BrowserRouter>

  );

}


export default App;