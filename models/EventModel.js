import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  eventDescription: {
    type: String,
    required: true,
  },
  eventVenue: {
    type: String,
    required: true,
  },
  eventVenueUrl: {
    type: String,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  eventPrice: {
    type: [String],
    required: true,
  },
  eventLastDate: {
    type: Date,
    required: true,
  },
  eventCreatedDate: {
    type: Date,
    default: Date.now(),
    required: true,
  },

  eventStaus: {
    type: Boolean,
    default: true,
  },
  eventManagerMail: {
    type: String,
    required: true,
  },
  eventManagerPhone: {
    type: String,
    required: true,
  },
  eventAdminPassword: {
    type: String,
    required: true,
  },
  eventPaymentUpi: {
    type: String,
  },
  eventHostedBy: {
    type: String,
    required: true,
  },
  eventSpeaker: {
    type: String,
    required: true,
  },
  eventMailDescription:{
    type: String,
    required: true,
  }
});

const EventModel = mongoose.model("Events", EventSchema);

export default EventModel;
