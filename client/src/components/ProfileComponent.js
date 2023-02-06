import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileComponent = (props) => {
  const navigate = useNavigate();
  let { currentUser, setCurrentUser } = props;
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      window.alert("Please login at first!");
    }
  }, []);
  return (
    <div style={{ padding: "3rem" }}>
      {currentUser && (
        <div>
          <h1>Your Profile</h1>
          <header className="jumbotron">
            <h3>
              <strong>{currentUser.user.username}</strong>
            </h3>
            <p>
              <strong>{currentUser.user.email}</strong>
            </p>
            <p>
              <strong>{currentUser.user.role}</strong>
            </p>
          </header>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
