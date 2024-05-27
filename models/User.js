import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  college: {
    type: String,
    default: null,
    trim: true,
  },
  rollNumber: {
    type: String,
    default: null,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  eventName: {
    type: String,
    required: true,
    trim: true,
  },
  eventPrice: {
    type: String,
    default: "0",
    trim: true,
  },
  userRegistrationDate: {
    type: Date,
    default: Date.now,
  },
  qrCode: {
    type: String,
    default: null,
    trim: true,
  },
  userEntryStatus: {
    type: String,
    default: false,
  },
});

const User = mongoose.model("Participants", UserSchema);
