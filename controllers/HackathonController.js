import HackathonModel from "../models/HackathonModel.js";

const hackathonsGetController = async (req, res) => {
  try {
    const response = await HackathonModel.find().sort({ eventCreatedDate: -1 });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

const hackathonGetSingleController = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await HackathonModel.findById(id);
    console.log(error);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const hackathonPostController = async (req, res) => {
  try {
    const {
      hackathon_name,
      hackathon_dt,
      hackathon_host,
      hackathon_description,
      hackathon_mail_description,
      hackathon_details,
      hackathon_venue,
      hackathon_dead_line,
      hackathon_prices,
      hackathon_teamsize,
      hackathon_duration,
      hackathon_extra,
    } = req.body;

    const response = await HackathonModel.create({
      hackathon_name,
      hackathon_dt,
      hackathon_host,
      hackathon_description,
      hackathon_mail_description,
      hackathon_details,
      hackathon_venue,
      hackathon_dead_line,
      hackathon_prices,
      hackathon_teamsize,
      hackathon_duration,
      hackathon_extra,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

const hackathonUpdateController = async (req, res) => {
  const { id } = req.params;
  try {
    const {
      hackathon_name,
      hackathon_dt,
      hackathon_host,
      hackathon_description,
      hackathon_mail_description,
      hackathon_details,
      hackathon_venue,
      hackathon_dead_line,
      hackathon_prices,
      hackathon_teamsize,
      hackathon_duration,
      hackathon_extra,
    } = req.body;
    const response = await HackathonModel.findByIdAndUpdate(id, {
      hackathon_name,
      hackathon_dt,
      hackathon_host,
      hackathon_description,
      hackathon_mail_description,
      hackathon_details,
      hackathon_venue,
      hackathon_dead_line,
      hackathon_prices,
      hackathon_teamsize,
      hackathon_duration,
      hackathon_extra,
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

const hackathonDeleteController = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await HackathonModel.findByIdAndDelete(id);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export {
  hackathonsGetController,
  hackathonPostController,
  hackathonUpdateController,
  hackathonDeleteController,
  hackathonGetSingleController,
};
