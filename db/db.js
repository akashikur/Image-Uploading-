const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://akashikur011:Katana12@cluster0.rtag8mv.mongodb.net/Image_example"
  )
  .then(() => {
    console.log("MONGODB CONNECTED");
  })
  .catch((e) => {
    console.log("failed to connect", e);
  });
