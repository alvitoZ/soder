const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//menambah 1 data
// const contact1 = new contact({
//   nama: "seele9",
//   noHp: "0812121212",
//   email: "babi@gmail.com",
// });

// //simpan ke collection
// contact1.save().then((res) => {
//   console.log(res);
// });
