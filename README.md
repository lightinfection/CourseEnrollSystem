# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). The client folder includes all react components, while the server folder are consisted of RESTful APIs, MongoDB database query scripts, and authorization parts. Please Install Node.js and React in ahead of usage.

Node.js: https://nodejs.org/en/download/

React: https://github.com/facebook/create-react-app

# Environment setting

The dependecies of client and server are listed in package.json files in respective folders. Install packages by node or yarn.

Please create .env in the server folder, then declare and initialize two variables, "DB_CLUSTER" and "MYSECRET", which are needed when connecting to the MongoDB database and validating JWT token signature.

# Main functions

Feel free to explore this system and all the buttons.

1. Home page and Nav bars:

   <img src="./pic/home.png" width="50%" height="50%">

   Click "Login or Register Now" at home page or "Login" on nav bars as a student or an instructor to log into the system. If you don't have an account, go the the "Register" page to sign up first. You can choose to register an instuctor or a student account during registration.

2. Publish new courses as an instructor:

   <img src="./pic/newpost.png" width="50%" height="50%">

   After logging in by an instructor account, Navbars will present all the functions instructors may use. Go to the "Post Course" page, fill in the forms and submit, then the courses will be successfully published. At the "Course" page you can manage all your available courses.

   <img src="./pic/published.png" width="50%" height="50%">

3. Enroll new courses as a student:

   <img src="./pic/enroll.png" width="50%" height="50%">

   After logging in by a student account, Navbars will present all the functions students may use. Go to the "Enrollment" page, fill in the form and search, then all relevant courses will be listed in the result. At the "Course" page you can see all the courses you have enrolled.

   <img src="./pic/student%20courses.png" width="50%" height="50%">
