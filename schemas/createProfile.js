const mongoose = require("mongoose");

const MyProfile = mongoose.Schema({
  // profileImage:{
  //    data : Buffer,
  //    contentType:String
  // },
  ownerName: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  storeName: {
    type: String,
    required: true,
  },
  storeAddress: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("myprofile", MyProfile);
