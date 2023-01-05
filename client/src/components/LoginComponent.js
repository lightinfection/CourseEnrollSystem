import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const LoginComponent = (props) => {
  const navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");
  let { currentUser, setCurrentUser } = props;
  const handleemail = function (e) {
    setEmail(e.target.value);
  };
  const handlepassword = function (e) {
    setPassword(e.target.value);
  };
  const handlelogin = function () {
    AuthService.login(email, password)
      .then(async (res) => {
        if (res.data.success) {
          localStorage.setItem("user", JSON.stringify(res.data));
        }
        setCurrentUser(AuthService.getCurrentUser());
        window.alert("Successfully login");
        navigate("/profile");
      })
      .catch((error) => {
        setMessage(error.response.data);
      });
  };

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div>
        {message && (
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        )}
        <div className="form-group">
          <label htmlFor="username">Email</label>
          <input
            onChange={handleemail}
            type="text"
            className="form-control"
            name="email"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={handlepassword}
            type="password"
            className="form-control"
            name="password"
          />
        </div>
        <br />
        <div className="form-group">
          <button className="btn btn-primary btn-block" onClick={handlelogin}>
            <span>Login</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
