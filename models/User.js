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
  },
  userEntryStatus: {
    type: String,
    default: false,
  },
  paymentData: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },
  merchantTransactionId: {
    type: String,
    default: null,
  },
  extraQuestions: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },
});

const User = mongoose.model("Participants", UserSchema);

export default User;
