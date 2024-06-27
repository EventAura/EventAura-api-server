import User from "../models/User.js";
import EventModel from "../models/EventModel.js";
import EventRegistrationService from "./classes/EventRegistrationService.js";

const FreeEventRegistration = async (req, res) => {
  const { name, email, phoneNumber, rollNumber, college } = req.body;
  const { id } = req.params;

  try {
    const event = await EventModel.findById(id);
    if (!event) {
      return res.status(404).json({ message: false, error: "Event not found" });
    }

    const user = await User.create({
      name,
      email,
      phoneNumber,
      rollNumber,
      college,
      eventName: event.eventName,
      eventPrice: event.eventPrice,
    });

    const eventRegistrationService = new EventRegistrationService(user, event);
    await eventRegistrationService.generateQRCode();
    await eventRegistrationService.generatePDF();
    await eventRegistrationService.sendEmail();
    res.json({ message: true, id: user._id });
  } catch (error) {
    res.status(500).json({ message: false, error: error.message });
  }
};

export default FreeEventRegistration;
