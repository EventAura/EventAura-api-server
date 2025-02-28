import HackathonTeamModel from "../models/HackathonTeamModel";

const getParticipantsByHackathon = async (req, res) => {
  try {
    const { hackathon_id } = req.params;
    const participants = await HackathonTeamModel.find({
      hackathon_name: hackathon_id,
    });
    res.status(200).json({ participants });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const updatePariticipantByHackathon = async (req, res) => {
  try {
    const { hackathon_id } = req.params;
    const { team_id } = req.body;
    const {
      team_name,
      team_members,
      team_qr_code,
      merchand_transaction_id,
      paymentData,
      team_entry_status,
      team_registration_date,
    } = req.body;
    const participant = await HackathonTeamModel.findOneAndUpdate(
      { hackathon_name: hackathon_id, _id: team_id },
      {
        team_name,
        team_members,
        team_qr_code,
        merchand_transaction_id,
        paymentData,
        team_entry_status,
        team_registration_date,
      },
      { new: true }
    );
    res.status(200).json({ participant });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getParticipantStatus = async (req, res) => {
  try {
    const { team_id } = req.params;
    const participant = await HackathonTeamModel.findOne({ _id: team_id });
    res.status(200).json({ participant });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const updateParticipantStatus = async (req, res) => {
  try {
    const { team_id } = req.params;
    const { status } = req.body;
    const participant = await HackathonTeamModel.findOneAndUpdate(
      { _id: team_id },
      { team_entry_status: status },
      { new: true }
    );
    res.status(200).json({ participant });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
