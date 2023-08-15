const express = require("express");
const mongoose = require("mongoose");
const BrandName = require("./schemas/model");
const MyProfile = require("./schemas/createProfile");
const Products = require("./schemas/addProducts");

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

app.post("/createProfile", async (req, res) => {
  const { ownerName, emailId, mobile, storeName, storeAddress } = req.body;
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
    // return res.json(await MyProfile.find());
    res.status(200).json({
      statusCode: 200,
      message: "Profile created successfully.",
      data: myData,
    });
  } catch (err) {
    console.log("error ===> ", err.message);
    res.json(err);
  }
});

app.get("/getProfile", async (req, res) => {
  try {
    const allData = await MyProfile.find();
    return res.json(allData);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/getProfile/:id", async (req, res) => {
  try {
    const data = await MyProfile.findById(req.params.id);
    return res.json(data);
  } catch (err) {
    console.log(err.message);
    res.send("<h1>ID not found</h1>");
  }
});

app.post("/addProducts", async (req, res) => {
  console.log("ADD products BODY ===>", req.body);

  const {
    productImage,
    productName,
    productSize,
    productQuantity,
    productPrice,
    productDescription,
  } = req.body;

  try {
    const myData = new Products({
      productImage,
      productName,
      productSize,
      productQuantity,
      productPrice,
      productDescription,
    });
    await myData.save();
    res.status(200).json({
      statusCode: 200,
      message: "Product added successfully.",
      data: myData,
    });
  } catch (err) {
    console.log("error ===> ", err.message);
    res.json(err);
  }
});


app.get("/getProducts", async (req, res) => {
  try {
    const allData = await Products.find();
    return res.json(allData);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/getProducts/:id", async (req, res) => {
  try {
    const data = await Products.findById(req.params.id);
    return res.json(data);
  } catch (err) {
    console.log(err.message);
    res.send("<h1>ID not found</h1>");
  }
});


app.get("/", (req, res) => {
  res.send("<h1>Hello world!!!</h1>");
});

app.listen(7000, () => console.log("server running"));

// app.listen(7000, "192.168.1.20", () => console.log("server running"));
// THEN WE CAN USE URL LIKE THIS ---->  http://192.168.0.101:7000/getAllBrands
