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
  }, [currentUser, coursedata]);
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
          <div className="alert alert-light" role="alert">
            <h3>Here are all of your courses available in the system.</h3>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "left",
              alignIterms: "left",
            }}
          >
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
                      <p className="card-text">
                        Student Count: {course.students.length}
                      </p>
                      <p className="card-text">Price:{course.price}</p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "left",
                          alignIterms: "left",
                        }}
                      >
                        <a
                          className="card-text btn btn-primary"
                          style={{ margin: "0 8px 0 -5px" }}
                          onClick={() => {
                            let myWindow = window.open(
                              "",
                              "Course Description",
                              "width=600px,height=200px,statusbar=0"
                            );
                            myWindow.document.write(
                              "<title>Course Description</title>" +
                                "<h1>Course Description</h1>" +
                                "<p>" +
                                course.description +
                                "</p>"
                            );
                            myWindow.focus();
                          }}
                        >
                          See Course
                        </a>
                        {currentUser &&
                          currentUser.user.role === "instructor" && (
                            <a
                              className="card-text btn btn-primary"
                              onClick={() => {
                                CourseServeice.closeCoursebyName(
                                  course._id,
                                  currentUser.user._id
                                )
                                  .then((new_course) => {
                                    alert("The course has been closed");
                                    setCoursedata(new_course.data);
                                  })
                                  .catch((err) => {
                                    console.log(err);
                                  });
                              }}
                            >
                              Delete
                            </a>
                          )}
                      </div>
                      <br />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseComponent;
