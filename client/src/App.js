import React, { useState } from "react";
import NavComponent from "./components/NavComponent";
import HomeComponent from "./components/HomeComponent";
import RegisterComponent from "./components/RegisterComponent";
import LoginComponent from "./components/LoginComponent";
import CourseComponent from "./components/CourseComponent";
import { Route, Routes } from "react-router-dom";
import ProfileComponent from "./components/ProfileComponent";
import PostCourseComponent from "./components/PostCourseComponent";
import EnrollComponent from "./components/EnrollComponent";
import AuthService from "./services/auth.service";

const App = () => {
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  console.log(currentUser);
  return (
    <div>
      <NavComponent currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Routes>
        <Route path="/" exact element={<HomeComponent />} />
        <Route path="/register" exact element={<RegisterComponent />} />
        <Route
          path="/login"
          exact
          element={
            <LoginComponent
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          path="/profile"
          exact
          element={
            <ProfileComponent
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          path="/course"
          exact
          element={
            <CourseComponent
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          path="/postcourse"
          exact
          element={
            <PostCourseComponent
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          path="/enrollment"
          exact
          element={
            <EnrollComponent
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
