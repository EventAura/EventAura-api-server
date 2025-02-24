import mongoose from "mongoose";

const HackathonSchema = new mongoose.Schema({
  hackathon_name: String,
  hackathon_dt: { type: mongoose.Schema.Types.Mixed },
  hackathon_host: String,
  hackathon_description: String,
  hackathon_mail_description: String,
  hackathon_details: { type: mongoose.Schema.Types.Mixed },
  hackathon_venue: { type: mongoose.Schema.Types.Mixed },
  hackathon_dead_line: { type: mongoose.Schema.Types.Mixed },
  hackathon_prices: { type: mongoose.Schema.Types.Mixed },
  hackathon_teamsize: Number,
  hackathon_duration: String,
  hackathon_registrated_at: {
    type: Date,
    default: Date.now,
  },
  hackathon_extra: { type: mongoose.Schema.Types.Mixed },
});

const HackathonModel = mongoose.model("Hackthon", HackathonSchema);

export default HackathonModel;
