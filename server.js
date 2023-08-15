const express = require("express");
const mongoose = require("mongoose");
const BrandName = require("./schemas/model");
const MyProfile = require("./schemas/createProfile");

const app = express();
app.use(express.json());
mongoose.set("strictQuery", false);

mongoose
  .connect(
    "mongodb+srv://Testing_1:Testing_1@cluster0.7tj2rdb.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB connected!!!"))
  .catch((err) => console.log(err));

app.post("/addbrands", async (req, res) => {
  console.log("Add brand", req.body);
  const { brandname } = req.body;
  try {
    const newData = new BrandName({ brandname });
    await newData.save();
    return res.json(await BrandName.find());
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/getAllBrands", async (req, res) => {
  try {
    const allData = await BrandName.find();
    return res.json(allData);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/getAllBrands/:id", async (req, res) => {
  try {
    const data = await BrandName.findById(req.params.id);
    return res.json(data);
  } catch (err) {
    console.log(err.message);
    res.send("<h1>ID not found</h1>");
  }
});

app.delete("/deletebrand/:id", async (req, res) => {
  try {
    await BrandName.findByIdAndDelete(req.params.id);
    return res.json(await BrandName.find());
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/createprofile", async (req, res) => {
  const {  ownerName, emailId, mobile, storeName, storeAddress } = req.body;
  console.log("BODY ===>", req.body);
  try {
    // if (!ownerName || !emailId) {
    //   res
    //     .status(400)
    //     .send({ error: "Please provide a owner name and email address." });
    //   return;
    // }
    const myData = new MyProfile({
      ownerName,
      emailId,
      mobile,
      storeName,
      storeAddress,
    });
    await myData.save();
    return res.json(await MyProfile.find());
  } catch (err) {
    console.log("error ===> ",err.message);
    res.json(err);
  }
});

app.get("/getmyprofile", async (req, res) => {
  try {
    const myData = await MyProfile.find();
    return res.json(myData);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/", (req, res) => {
  res.send("<h1>Hello world!!!</h1>");
});
function errorHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    res.json({
      success: 0,
      message: err.message,
    });
  }
}
app.use(errorHandler);
app.listen(7000, () => console.log("server running"));

// app.listen(7000, "192.168.1.20", () => console.log("server running"));
// THEN WE CAN USE URL LIKE THIS ---->  http://192.168.0.101:7000/getAllBrands
