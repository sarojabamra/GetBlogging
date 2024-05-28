import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);

  return (
    <div>
      <DataProvider>
        <BrowserRouter>
          <Navbar isAuthenticated={isAuthenticated} />

          <Routes>
            <Route
              path="/"
              element={<Home isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/signin"
              element={<Login isUserAuthenticated={isUserAuthenticated} />}
            />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/blogs"
              element={<Blogs isAuthenticated={isAuthenticated} />}
            />
            <Route path="/compose" element={<Compose />} />
            <Route
              path="/details/:id"
              element={<IndividualBlog isAuthenticated={isAuthenticated} />}
            />
            <Route path="/edit/:id" element={<Edit />} />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </div>
  );
}

export default App;
