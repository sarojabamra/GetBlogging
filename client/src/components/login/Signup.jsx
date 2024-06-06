import React, { useState, useContext } from "react";
import "./Login.css";
import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
import { useNavigate } from "react-router-dom";

const signupInitialValues = {
  name: "",
  username: "",
  password: "",
};

const loginInitialValues = {
  username: "",
  password: "",
};

const Signup = ({ isUserAuthenticated, isUserAdmin }) => {
  const [loginPage, setLoginPage] = useState("signup");
  const [signup, setSignup] = useState(signupInitialValues);
  const [error, setError] = useState("");
  const [signin, setSignin] = useState(loginInitialValues);

  const { setAccount } = useContext(DataContext);
  const navigate = useNavigate();

  const toggleSignUp = () => {
    setLoginPage("signup");
  };

  const toggleSignIn = () => {
    setLoginPage("signin");
  };

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const onValueChange = (e) => {
    setSignin({ ...signin, [e.target.name]: e.target.value });
  };

  const signupUser = async () => {
    let response = await API.userSignup(signup);
    if (response.isSuccess) {
      setError("");
      setSignup(signupInitialValues);
      setLoginPage("signin");
    } else {
      setError("Something went wrong. Please try again later.");
    }
  };

  const signinUser = async () => {
    let response = await API.userSignin(signin);

    if (response.isSuccess) {
      setError("");

      sessionStorage.setItem(
        "accessToken",
        `Bearer ${response.data.accessToken}`
      );
      sessionStorage.setItem(
        "refreshToken",
        `Bearer ${response.data.refreshToken}`
      );

      setAccount({
        username: response.data.username,
        name: response.data.name,
      });

      isUserAuthenticated(true);

      if (response.data.isAdmin) {
        isUserAdmin(true);
      }

      navigate("/");
    } else {
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <>
      <div className="bg">
        {loginPage === "signin" ? (
          <div className="container">
            <div className="signin">
              <h1>Sign In</h1>

              <input
                placeholder="Enter Username"
                value={signin.username}
                type="text"
                onChange={(e) => onValueChange(e)}
                name="username"
              />

              <input
                placeholder="Enter Password"
                value={signin.password}
                type="password"
                onChange={(e) => onValueChange(e)}
                name="password"
              />
              {error && <p className="error">{error}</p>}
              <button onClick={() => signinUser()}>Sign In</button>
              <div className="toggle">
                <p>
                  Don't have an Account?{" "}
                  <span onClick={() => toggleSignUp()}>Sign Up</span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="container">
            <div className="signup">
              <h1>Sign Up</h1>

              <input
                placeholder="Enter Name"
                type="text"
                onChange={(e) => onInputChange(e)}
                name="name"
              />

              <input
                placeholder="Enter Username"
                type="text"
                onChange={(e) => onInputChange(e)}
                name="username"
              />

              <input
                placeholder="Enter Password"
                type="password"
                onChange={(e) => onInputChange(e)}
                name="password"
              />
              {error && <p className="error">{error}</p>}
              <button onClick={() => signupUser()}>Sign Up</button>
              <div className="toggle">
                <p>
                  Already have an Account?{" "}
                  <span onClick={() => toggleSignIn()}>Sign In</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Signup;
