import EventModel from "../models/EventModel.js";
import EventMailer from "./utils/EventMailer.js";
import bcrypt from "bcryptjs";

// Events Post Controller
const EventPostController = async (req, res) => {
  try {
    const {
      eventName,
      eventDescription,
      eventVenue,
      eventVenueUrl,
      eventDate,
      eventLastDate,
      eventManagerMail,
      eventManagerPhone,
      eventAdminPassword,
      eventPaymentUpi,
      eventHostedBy,
      eventSpeaker,
      eventPrice,
      eventMailDescription,
    } = req.body;
    const response = await EventModel.create({
      eventName,
      eventDescription,
      eventVenue,
      eventVenueUrl,
      eventDate,
      eventLastDate,
      eventManagerMail,
      eventManagerPhone,
      eventAdminPassword,
      eventPaymentUpi,
      eventHostedBy,
      eventSpeaker,
      eventPrice,
      eventMailDescription,
    });
    const eventMailer = new EventMailer(
      response._id,
      eventName,
      eventManagerMail,
      eventHostedBy,
      eventPaymentUpi,
      eventAdminPassword,
      eventDate
    );
    await eventMailer.sendEmail();
    res.status(201).json({ message: true, data: response });
  } catch (error) {
    res.status(500).json({ message: false });
  }
};

// Events Get (all events) Controller

const EventGetController = async (req, res) => {
  try {
    const response = await EventModel.find();
    res.status(200).json({ message: true, data: response });
  } catch (error) {
    res.status(500).json({ message: false });
  }
};

// Events Get (single event) Controller

const EventGetSingleController = async (req, res) => {
  try {
    const response = await EventModel.findById(req.params.id);
    res.status(200).json({ message: true, data: response });
  } catch (error) {
    res.status(500).json({ message: false });
  }
};

const EventLoginController = async (req, res) => {
  try {
    const id = req.params.id;
    const { username, password } = req.body;

    if (username !== "admin") {
      return res.json({ message: false, error: "Please Check Your Username" });
    }

    const event = await EventModel.findById(id);
    if (!event) {
      return res.json({ message: false, error: "Event not found" });
    }

    const isMatch = await bcrypt.compare(password, event.eventAdminPassword);

    if (!isMatch) {
      return res.json({ message: false, error: "Invalid password" });
    }

    // If the password matches, respond with success
    res.status(200).json({ message: true });
  } catch (error) {
    console.error(`Error during login attempt: ${error.message}`);
    res.status(500).json({ message: false, error: error.message });
  }
};

export {
  EventPostController,
  EventGetController,
  EventGetSingleController,
  EventLoginController,
};
