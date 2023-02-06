import React, { useState } from "react";
import CourseService from "../services/course.service";
import { useNavigate } from "react-router-dom";

const EnrollComponent = (props) => {
  let navigate = useNavigate();
  let { currentUser, setCurrentUser } = props;
  let [courseSearch, setcourseSearch] = useState("");
  let [searchResult, setserachResult] = useState(null);
  let [message, setMessage] = useState("");
  const handlelogin = function () {
    navigate("/login");
  };
  const handlecousequery = function (e) {
    setcourseSearch(e.target.value);
  };
  const handlesearch = function () {
    CourseService.searchCoursebyName(courseSearch)
      .then((response) => {
        console.log(response);
        setserachResult(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleenrollment = function (e) {
    console.log(e.target);
    CourseService.enroll(e.target.id, currentUser.user._id)
      .then(() => {
        alert("Enrollment is successful");
        navigate("/course");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <h1>You must login before accessing this page</h1>
          <button className="btn btn-primary btn-lg" onClick={handlelogin}>
            Click button to login
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role !== "student" && (
        <div>
          <h1>Only students can enroll courses</h1>
          <button className="btn btn-primary btn-lg" onClick={handlelogin}>
            Click button to change account
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role === "student" && (
        <div>
          <div className="form-group">
            <label htmlFor="coursename">Search Course</label>
            <input
              name="coursequery"
              id="coursename"
              type={"text"}
              className="form-control"
              onChange={handlecousequery}
            />
            <br />
          </div>
          <button className="btn btn-primary" onClick={handlesearch}>
            Search
          </button>
        </div>
      )}
      {currentUser && searchResult && searchResult.length !== 0 && (
        <div>
          <div className="alert alert-light" role="alert">
            <h3>Here is the searching result.</h3>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "left",
              alignIterms: "left",
            }}
          >
            {searchResult.map((course) => {
              return (
                <div
                  style={{
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    className="card"
                    style={{ width: "18rem" }}
                    key={course._id}
                  >
                    <div className="card-body">
                      <h5 className="card-title">{course.title}</h5>
                      <p className="card-text">{course.description}</p>
                      <p>Student Count: {course.students.length}</p>
                      <p>Price: {course.price}</p>
                      <a
                        href="#"
                        className="card-text btn btn-primary"
                        onClick={handleenrollment}
                        id={course._id}
                      >
                        Enroll
                      </a>
                      <br />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {currentUser && searchResult && searchResult.length === 0 && (
        <div>
          <br />
          <div
            className="alert alert-light"
            role="alert"
            style={{
              display: "flex",
              justifyContent: "center",
              alignIterms: "center",
            }}
          >
            <h3>Here is the searching result.</h3>
          </div>
          <div className="alert alert-info" role="alert">
            <p5>Your searching is not available.</p5>
          </div>
        </div>
      )}
      <br />
      {message && (
        <div className="alert alert-warning" role="alert">
          {message}
        </div>
      )}
    </div>
  );
};

export default EnrollComponent;
