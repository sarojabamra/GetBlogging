import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home/Home";
import { useState } from "react";

import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";
import DataProvider from "./context/DataProvider";
import Signup from "./components/login/Signup";
import Blogs from "./components/blogs/Blogs";
import Compose from "./components/compose/Compose";
import IndividualBlog from "./components/IndividualBlog/IndividualBlog";
import Edit from "./components/compose/Edit";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import SetAdminPage from "./components/setAdmin/SetAdminPage";

function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);
  const [isAdmin, isUserAdmin] = useState(false);

  const PrivateRoute = ({ isAuthenticated, children }) => {
    return isAuthenticated ? children : <Navigate to="/signin" />;
  };

  const AdminRoute = ({ isAdmin, children }) => {
    return isAdmin ? children : <Navigate to="/blogs" />;
  };

  console.log(isAdmin);

  return (
    <div>
      <DataProvider>
        <BrowserRouter>
          <Navbar isAuthenticated={isAuthenticated} isAdmin={isAdmin} />

          <Routes>
            <Route
              path="/"
              element={<Home isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/signin"
              element={
                <Login
                  isUserAuthenticated={isUserAuthenticated}
                  isUserAdmin={isUserAdmin}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <Signup
                  isUserAuthenticated={isUserAuthenticated}
                  isUserAdmin={isUserAdmin}
                />
              }
            />
            <Route
              path="/blogs"
              element={<Blogs isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/compose"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Compose />
                </PrivateRoute>
              }
            />
            <Route
              path="/details/:id"
              element={<IndividualBlog isAuthenticated={isAuthenticated} />}
            />
            <Route path="/edit/:id" element={<Edit />} />
            <Route
              path="/admin"
              element={
                <AdminRoute isAdmin={isAdmin}>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route path="/setadmin" element={<SetAdminPage />} />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </div>
  );
}

export default App;
