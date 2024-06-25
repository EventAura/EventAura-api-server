import User from "../models/User.js";
import EventModel from "../models/EventModel.js";

const getParticipants = async (req, res) => {
  try {
    const response = await User.find({});
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getParticipantById = async (req, res) => {
  try {
    const response = await User.findById(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getParticipantsByEvent = async (req, res) => {
  try {
    const eventId = await EventModel.findById(req.params.id);
    const users = await User.find({ eventName: eventId.eventName }).sort({
      userRegistrationDate: -1,
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getParticipants, getParticipantById, getParticipantsByEvent };
