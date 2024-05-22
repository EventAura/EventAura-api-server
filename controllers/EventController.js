import EventModel from "../models/EventModel.js";

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
    });
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

export { EventPostController, EventGetController, EventGetSingleController };
