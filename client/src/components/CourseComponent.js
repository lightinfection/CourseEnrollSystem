import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseServeice from "../services/course.service";

const CourseComponent = (props) => {
  let navigate = useNavigate();
  let { currentUser, setCurrentUser } = props;
  let [coursedata, setCoursedata] = useState(null);
  const handlelogin = function () {
    navigate("/login");
  };
  useEffect(() => {
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
    } else {
      _id = "";
    }
    if (currentUser.user.role === "instructor") {
      CourseServeice.get(_id)
        .then((course) => {
          console.log(course);
          setCoursedata(course.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (currentUser.user.role === "student") {
      CourseServeice.getEnrolledCourses(_id)
        .then((courses) => {
          setCoursedata(courses.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
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
      {currentUser && currentUser.user.role === "instructor" && (
        <div>
          <h1>WELCOME TO INSTRUCTORS' COURSE PAGE</h1>
        </div>
      )}
      {currentUser && currentUser.user.role === "student" && (
        <div>
          <h1>WELCOME TO STUDENTS' COURSE PAGE</h1>
        </div>
      )}
      {currentUser && coursedata && coursedata.length != 0 && (
        <div>
          <div
            className="alert alert-light"
            role="alert"
            style={{
              display: "flex",
              justifyContent: "center",
              alignIterms: "center",
            }}
          >
            <h3>Here are all of your courses available in the system.</h3>
          </div>
          {coursedata.map((course) => {
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
                    <p>Price:{course.price}</p>
                    <a href="#" className="card-text btn btn-primary">
                      See Course
                    </a>
                    <br />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CourseComponent;
