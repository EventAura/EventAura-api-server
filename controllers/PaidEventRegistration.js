import axios from "axios";
import crypto from "crypto";
import User from "../models/User.js";
import EventModel from "../models/EventModel.js";
import dotenv from "dotenv";
import EventRegistrationService from "./classes/EventRegistrationService.js";

dotenv.config();

const PaidEventRegistration = async (req, res) => {
  try {
    const { name, email, phoneNumber, rollNumber, college, extraQuestions } =
      req.body;
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
      extraQuestions,
    });

    const data = {
      merchantId,
      merchantTransactionId,
      merchantUserId: merchantId,
      amount: parseInt(amount) * 100,
      redirectUrl: `https://api.eventaura.tech/api/phone-pay/status/${merchantId}/${merchantTransactionId}/${event._id}`,
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
  const { merchantTransactionId, eventId } = req.params;

  const key = process.env.KEY; // Production key
  const keyIndex = process.env.KEY_INDEX || 1; // Production key index
  const merchantId = process.env.MERCHAND_ID; // Production Merchant ID
  console.log(merchantTransactionId, eventId, key, keyIndex, merchantId);
  try {
    // Construct the string to hash
    const stringToHash =
      `/pg/v1/status/${merchantId}/${merchantTransactionId}` + key;

    // Generate the SHA-256 hash
    const sha256 = crypto
      .createHash("sha256")
      .update(stringToHash)
      .digest("hex");

    // Create the checksum
    const checksum = sha256 + "###" + keyIndex;

    // Define the URL for the status check
    const URL = `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchantId}/${merchantTransactionId}`;

    // Configure the request options
    const options = {
      method: "get",
      url: URL,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": merchantId,
      },
    };

    // Make the request
    const response = await axios.request(options);

    // Handle the response
    const user = await User.findOne({ merchantTransactionId });
    const event = await EventModel.findById(eventId);
    if (!user) {
      return res.status(404).json({ message: false, error: "User not found" });
    }

    user.paymentData = response.data;
    await user.save();
    res.redirect(`https://eventaura.tech/event/${user._id}/success`);

    // Additional processing (optional)
    if (response.data.data.responseCode === "SUCCESS") {
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
          if (!res.headersSent) {
            return res
              .status(500)
              .json({ message: false, error: error.message });
          }
        }
      })();
    }
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json({
        message: error.message,
        data: error.response.data,
      });
    } else {
      res.status(500).json({ message: false, error: error.message });
    }
  }
};

export { PaidEventRegistration, PaidEventStatus };
