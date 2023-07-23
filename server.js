const express = require("express");
const mongoose = require("mongoose");
const BrandName = require("./model");
const ProfileImage = require("./profileModel");
const PaymentSchema = require("./paymentSchema");
const MyProfile = require("./schemas/createProfile");

const app = express();
app.use(express.json());
app.use("/profile", express.static("./upload/images"));
const multer = require("multer");
const path = require("path");
// const crypto = require("crypto");
// const axios = require("axios");
// const ccavenue = require("ccavenue");

// storage engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({
  storage: storage,
});
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

app.post("/uploadImage", upload.single("profileImage"), async (req, res) => {
  const image = `http://localhost:7000/profileImage/${req.file.filename}`;
  try {
    const newData = new ProfileImage({
      name: req.body.name,
      image: {
        data: image,
        contentType: "image/png",
      },
    });
    await newData.save();
    res.json("Image stored to DB");
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/getProfileImage", async (req, res) => {
  try {
    const data = await ProfileImage.find();
    return res.json(data);
  } catch (err) {
    console.log(err.message);
    res.send("<h1>Data not found</h1>");
  }
});

app.post("/myprofile", async (req, res) => {
  const { userName, emailId, mobile, address } = req.body;
  try {
    const myData = new MyProfile({ userName, emailId, mobile, address });
    await myData.save();
    return res.json({
      success: true,
      message: "Data saved successfully",
      status: 200,
    });
  } catch (err) {
    console.log(err.message);
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

// app.post("/payment", async (req, res) => {
//   const accessCode = "AVXK04KF96AO77KXOA";
//   const merchantId = "1734948";
//   const workingKey = "8BA43748372E15B465A78C3E2F2BE2DC";

//   const formData = {
//     command: "initiateTransaction",
//     access_code: accessCode,
//     merchant_id: merchantId,
//     working_key:workingKey,
//     order_id: req.body.order_id,
//     amount: req.body.amount,
//     redirect_url: "<your-redirect-url>",
//     cancel_url: "<your-cancel-url>",
//     billing_name: req.body.billing_name,
//     billing_address: req.body.billing_address,
//     billing_city: req.body.billing_city,
//     billing_state: req.body.billing_state,
//     billing_zip: req.body.billing_zip,
//     billing_country: req.body.billing_country,
//     billing_tel: req.body.billing_tel,
//     billing_email: req.body.billing_email,
//     delivery_name: req.body.delivery_name,
//     delivery_address: req.body.delivery_address,
//     delivery_city: req.body.delivery_city,
//     delivery_state: req.body.delivery_state,
//     delivery_zip: req.body.delivery_zip,
//     delivery_country: req.body.delivery_country,
//     delivery_tel: req.body.delivery_tel,
//     merchant_param1: req.body.merchant_param1,
//     merchant_param2: req.body.merchant_param2,
//     merchant_param3: req.body.merchant_param3,
//     merchant_param4: req.body.merchant_param4,
//   };

//   const encryptedData = crypto
//     .createHash("sha256")
//     .update(
//       workingKey +
//         "|" +
//         formData.amount +
//         "|" +
//         formData.order_id +
//         "|" +
//         formData.redirect_url +
//         "|" +
//         formData.billing_email +
//         "|" +
//         formData.merchant_id
//     )
//     .digest("hex");

//   formData.checksum = encryptedData;

//   axios
//     .post(
//       "https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction",
//        formData
//     )
//     .then((result) => {
//       console.log("RESULT ===> ", result.data);
//     })
//     .catch((err) => {
//       console.log("error ==> ", err);
//     });
// });

// app.post("/payment", function (req, res) {
//   const paymentData = req.body;
//   ccavenue.setMerchant("1734948");
//   ccavenue.setWorkingKey("8BA43748372E15B465A78C3E2F2BE2DC");
//   ccavenue.setOrderId("123456");
//   ccavenue.setRedirectUrl("http://example.com");
//   ccavenue.setOrderAmount("100.00");

//   var param = {
//     billing_cust_address: "Bangalore",
//     billing_cust_name: "Nitish Kumar",
//   };
//   ccavenue.setOtherParams(param);

//   ccavenue.makePayment(paymentData, function (err, data) {
//     if (err) {
//       console.error("error", err);
//       res.status(500).send("Payment request failed");
//     } else {
//       console.log("URL ---> ", data.redirect_url);
//       // Return the payment gateway URL to the React Native application
//       res.send(data.redirect_url);
//     }
//   });
// });

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
app.listen(7000,()=>console.log('server running'))

// app.listen(7000, "192.168.1.4", () => console.log("server running"));
// THEN WE CAN USE URL LIKE THIS ---->  http://192.168.0.101:7000/getAllBrands
