import axios from "axios";
import crypto from "crypto";
import User from "../models/User.js";
import EventModel from "../models/EventModel.js";
import dotenv from "dotenv";
import EventRegistrationService from "./classes/EventRegistrationService.js";

dotenv.config();

const PaidEventRegistration = async (req, res) => {
  try {
    const { name, email, phoneNumber, rollNumber, college } = req.body;
    const { id } = req.params;

    const event = await EventModel.findById(id);
    if (!event) {
      return res.status(404).json({ message: false, error: "Event not found" });
    }

    const merchantTransactionId = `MT${Math.floor(Math.random() * 1000000)}`;
    const key = process.env.KEY;
    const keyIndex = process.env.KEY_INDEX || 1;
    const merchantId = process.env.MERCHAND_ID;
    const amount = event.eventPrice;

    const user = await User.create({
      name,
      email,
      phoneNumber,
      rollNumber,
      college,
      eventName: event.eventName,
      eventPrice: event.eventPrice,
      merchantTransactionId,
    });

    const data = {
      merchantId,
      merchantTransactionId,
      merchantUserId: merchantId,
      amount: parseInt(amount) * 100,
      redirectUrl: `https://tesract-server.onrender.com/api/phone-pay/status/${merchantId}/${merchantTransactionId}/${event._id}`,
      redirectMode: "POST",
      mobileNumber: phoneNumber,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };
    const payload = JSON.stringify(data);
    const payloadMain = Buffer.from(payload).toString("base64");
    const string = payloadMain + "/pg/v1/pay" + key;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256 + "###" + keyIndex;
    const URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay";

    const options = {
      method: "post",
      url: URL,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
      data: {
        request: payloadMain,
      },
    };

    const response = await axios.request(options);
    if (response.data.success) {
      const redirectUrl =
        response.data.data?.instrumentResponse?.redirectInfo?.url;
      if (redirectUrl) {
        res.send(redirectUrl);
      } else {
        res.status(400).json({ message: "Redirect URL not found in response" });
      }
    } else {
      res.status(400).json({ message: "Payment initiation failed" });
    }
  } catch (error) {
    console.error("Error in PaidEventRegistration:", error);
    res.status(500).json({ message: false, error });
  }
};

const PaidEventStatus = async (req, res) => {
  const { merchantId, merchantTransactionId, eventId } = req.params;
  const key = process.env.KEY;
  const keyIndex = process.env.KEY_INDEX || 1;
  try {
    const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + key;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256 + "###" + keyIndex;
    const URL = `https://api-preprod.phonepe.com/apis/hermes/pg/v1/status/{merchantId}/{merchantTransactionId}`;

    const options = {
      method: "get",
      url: URL,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
    };

    const response = await axios.request(options);
    const user = await User.findOne({ merchantTransactionId });
    const event = await EventModel.findById(eventId);
    if (!user) {
      return res.status(404).json({ message: false, error: "User not found" });
    }
    user.paymentData = response.data;
    await user.save();
    res.redirect(`https://tesract.vercel.app/event/${user._id}/success`);
    (async () => {
      try {
        const eventRegistrationService = new EventRegistrationService(
          user,
          event
        );
        await eventRegistrationService.generateQRCode();
        await eventRegistrationService.generatePDF();
        await eventRegistrationService.sendEmail();
      } catch (error) {
        // Log the error, or handle it as required
        res.status(500).json({ message: false, error: error });
      }
    })();

    // res.json(user.paymentData.data.transactionId);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json({
        message: error,
        data: error.response.data,
      });
    } else {
      res.status(500).json({ message: false, error: error });
    }
  }
};

export { PaidEventRegistration, PaidEventStatus };
