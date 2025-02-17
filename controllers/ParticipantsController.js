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

//get participants  eventId
const getParticipantsByClerkEvent = async (req, res) => {
  try {
    console.log(req.params.eventId);
    const  eventId  =  await EventModel.findById(req.params.eventId);
    const users = await User.find({ eventName: eventId.eventName }).sort({
      userRegistrationDate: -1,
    });
    res.status(200).json(users);
    
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}



const getUserEntryStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ userEntryStatus: user.userEntryStatus, user: user });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};


const updateUserEntryStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.userEntryStatus = "true";
    await user.save();
    res.status(200).json({ message: "User entry status updated to true" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getParticipants,
  getParticipantById,
  getParticipantsByEvent,
  getUserEntryStatus,
  updateUserEntryStatus,
  getParticipantsByClerkEvent
};
