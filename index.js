const express = require("express");
const User = require("./module/User");
require("dotenv").config();
const db = require("./db/db");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.static("./public"));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage });

app.post("/upload-profile", upload.single("profile"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  const { name, email, password } = req.body;

  try {
    const userObj = await User.create({
      name: name,
      email: email,
      password: password,
      profile: process.env.SERVER_URL + req.file.filename,
    });
    return res.status(200).send({
      message: "File uploaded successfully",
      data: userObj,
    });
  } catch (error) {
    return res.status(400).send("No file uploaded.");
  }
});

app.get("/my-profile", async (req, res) => {
  try {
    const userobj = await User.find();
    return res.status(200).send({
      message: "File uploaded successfully",
      data: userobj,
    });
  } catch (error) {
    return res.status(400).send("No file uploaded.");
  }
});

app.get("/my-profile", async (req, res) => {
  try {
    const userobj = await User.find();
    return res.status(200).send({
      message: "File uploaded successfully",
      data: userobj,
    });
  } catch (error) {
    return res.status(400).send("No file uploaded.");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
