import mongoose from "mongoose";

const hackathonTeamSchema = new mongoose.Schema({
  team_name: String,
  team_members: { type: mongoose.Schema.Types.Mixed },
  team_qr_code: String,
  hackathon_name: String,
  merchand_transaction_id: String,
  paymentData: { type: mongoose.Schema.Types.Mixed },
  team_entry_status: {
    type: Boolean,
    default: false,
  },
  team_registration_date: {
    type: Date,
    default: Date.now,
  },
  team_extra: { type: mongoose.Schema.Types.Mixed },
});

const HackathonTeamModel = mongoose.model("HackathonTeam", hackathonTeamSchema);

export default HackathonTeamModel;
