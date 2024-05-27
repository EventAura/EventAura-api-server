import User from "../models/User.js";

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

export { getParticipants, getParticipantById };
