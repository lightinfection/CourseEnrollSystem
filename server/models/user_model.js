const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    requried: true,
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    requried: true,
    minLength: 6,
    maxLength: 100,
  },
  password: {
    type: String,
    requried: true,
    minLength: 8,
    maxLength: 1024,
  },
  role: {
    type: String,
    enum: ["student", "instructor"],
    requried: true,
  },
  data: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.isstudent = function () {
  if (userSchema.role === "student") return true;
  else return false;
};

userSchema.methods.isinstructor = function () {
  if (userSchema.role === "instructor") return true;
  else return false;
};

userSchema.methods.isadmin = function () {
  if (userSchema.role === "admin") return true;
  else return false;
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    let hashedpassword = await bcrypt.hash(this.password, 10);
    this.password = hashedpassword;
    next();
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err)
      return (cb) => {
        cb(err, isMatch);
      };
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", userSchema);
