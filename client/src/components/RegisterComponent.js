import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const RegisterComponent = () => {
  const navigate = useNavigate();
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("");
  let [message, setMessage] = useState("");
  const handleusername = function (e) {
    setUsername(e.target.value);
  };
  const handleemail = function (e) {
    setEmail(e.target.value);
  };
  const handlepassword = function (e) {
    setPassword(e.target.value);
  };
  const handlerole = function (e) {
    setRole(e.target.value);
  };
  const handleresgister = function () {
    AuthService.register(username, email, password, role)
      .then(() => {
        window.alert(
          "Register successfully. Redirecting you to the login page"
        );
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      });
  };

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div>
        {message && <div className="alert alert-danger">{message}</div>}
        <div>
          <label htmlFor="username">Username</label>
          <input
            onChange={handleusername}
            type="text"
            className="form-control"
            name="username"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="email">Email</label>
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
          <label htmlFor="password">Role</label>
          <input
            onChange={handlerole}
            type="text"
            className="form-control"
            name="role"
          />
        </div>
        <br />
        <button onClick={handleresgister} className="btn btn-primary">
          <span>Register</span>
        </button>
      </div>
    </div>
  );
};

export default RegisterComponent;
