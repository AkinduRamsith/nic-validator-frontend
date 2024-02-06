import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Report from "./components/Report";
import Validator from "./components/Validator";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import CreatePassword from "./components/CreatePassword";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const login = () => {
    
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };
  return (
    <Router>
      <Routes>
        {/* Route for Login */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login isAuthenticated={isAuthenticated} login={login} />
            )
          }
        />

        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/fp" element={<ForgotPassword />} />
        {/* <Route path="/createpassword" element={<CreatePassword />} /> */}
        <Route path="/createpassword/:email" element={<CreatePassword />} />
        {/* Routes for Authenticated Users */}
        {isAuthenticated && (
          <>
            <Route
              path="/dashboard"
              element={
                <div>
                  <Navbar isAuthenticated={true} logout={logout} />
                  <Dashboard />
                </div>
              }
            />
            <Route
              path="/reports"
              element={
                <div>
                  <Navbar isAuthenticated={true} logout={logout} />
                  <Report />
                </div>
              }
            />
            <Route
              path="/validator"
              element={
                <div>
                  <Navbar isAuthenticated={true} logout={logout} />
                  <Validator />
                </div>
              }
            />

          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
