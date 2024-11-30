let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let userData = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    avatar: { type: String, default: "" },  
    bio: { type: String, default: "" },
    role: {
      type: String,
      enum: ["admin", "author", "reader"],
      default: "reader",
    },
  },
  { timestamps: true }
);

let USER = mongoose.model("user", userData);
module.exports = USER;
