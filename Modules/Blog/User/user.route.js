var express = require("express");
var USER = require("./user.model");
var router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/Users/Avtar");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage: storage });

/* GET home page. */
router.post(
  "/signup",
  upload.single("avatar"),
  async function (req, res, next) {
    try {
      let { username, email, password, avatar, bio, role } = req.body;
      avatar = req.file.filename;
      let dataCreate = await USER.create({
        username,
        email,
        password,
        avatar,
        bio,
        role,
      });
      res.status(201).json({
        status: "Success",
        messgae: "user signup successfull",
        data: dataCreate,
      });
    } catch (error) {
      res.status(404).json({
        status: "Fail",
        message: error.message,
      });
    }
  }
);

module.exports = router;
