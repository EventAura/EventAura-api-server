import EventModel from "../models/EventModel.js";
import EventMailer from "./utils/EventMailer.js";
import bcrypt from "bcryptjs";

// Events Post Controller
// const EventPostController = async (req, res) => {
//   try {
//     const {
//       eventName,
//       eventDescription,
//       eventVenue,
//       eventVenueUrl,
//       eventDate,
//       eventLastDate,
//       eventManagerMail,
//       eventManagerPhone,
//       // eventAdminPassword,
//       eventPaymentUpi,
//       eventHostedBy,
//       eventSpeaker,
//       eventPrice,
//       eventMailDescription,
//       eventRegistrationLimit,
//       eventQuestions,
//       clerkId
//     } = req.body;
//     console.log(req.body);

//       let response;
//       try{
//         const response = await EventModel.create({
//           eventName,
//           eventDescription,
//           eventVenue,
//           eventVenueUrl,
//           eventDate,
//           eventLastDate,
//           eventManagerMail,
//           eventManagerPhone,
//           // eventAdminPassword,
//           eventPaymentUpi,
//           eventHostedBy,
//           eventSpeaker,
//           eventPrice,
//           eventMailDescription,
//           eventRegistrationLimit,
//           eventQuestions,
//           clerkId
//         });

//       } catch(err){
//         console.log(err);
//       }

     
//     const eventMailer = new EventMailer(
//       response._id,
//       eventName,
//       eventManagerMail,
//       eventHostedBy,
//       eventPaymentUpi,
//       // eventAdminPassword,
//       eventDate
//     );
//     await eventMailer.sendEmail();
//     // res.status(201).json({ message: true, data: response });
//     res.json({ message: true, data: response });
//   } catch (error) {
//     res.status(500).json({ message: false });
//   }
// };



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
      eventPaymentUpi,
      eventHostedBy,
      eventSpeaker,
      eventPrice,
      eventMailDescription,
      eventRegistrationLimit,
      eventQuestions,
      clerkId,
    } = req.body;

    console.log(req.body);

    let response; // Declare response outside the try block
    try {
      response = await EventModel.create({
        eventName,
        eventDescription,
        eventVenue,
        eventVenueUrl,
        eventDate,
        eventLastDate,
        eventManagerMail,
        eventManagerPhone,
        eventPaymentUpi,
        eventHostedBy,
        eventSpeaker,
        eventPrice,
        eventMailDescription,
        eventRegistrationLimit,
        eventQuestions,
        clerkId,
      });
    } catch (err) {
      console.error("Error saving event to database:", err.message);
      return res.status(500).json({ message: false, error: "Database error" });
    }

    const eventMailer = new EventMailer(
      response._id,
      eventName,
      eventManagerMail,
      eventHostedBy,
      eventPaymentUpi,
      123456,
      eventDate
    );

    try {
      await eventMailer.sendEmail();
    } catch (err) {
      console.error("Error sending email:", err.message);
      return res.status(500).json({ message: false, error: "Email sending error" });
    }

    res.status(201).json({ message: true, data: response });
  } catch (error) {
    console.error("Unexpected error:", error.message);
    res.status(500).json({ message: false, error: "Internal server error" });
  }
};





// Events Get (all events) Controller

const EventGetController = async (req, res) => {
  try {
    const response = await EventModel.find().sort({ eventCreatedDate: -1 });
    res.status(200).json({ message: true, data: response });
  } catch (error) {
    res.status(500).json({ message: false });
  }
};

const EventGetClerkController = async (req, res) => {
  const { clerkId } = req.params; // Extract clerkId from route parameters
  console.log("Clerk ID:", clerkId);

  try {
    // Pass an object to the `find()` method to filter by clerkId
    const events = await EventModel.find({ clerkId }); 
    if (events.length === 0) {
      return res.status(404).json({ success: false, message: "No events found for this clerkId" });
    }
    res.status(200).json({ success: true, data: events });
  } catch (error) {
    console.error("Error fetching events:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch events" });
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

const EventLoginController = async (req, res) => {
  try {
    const id = req.params.id;
    const { username, password } = req.body;

    if (username !== "admin") {
      return res.json({ message: false, error: "Please Check Your Username" });
    }

    const event = await EventModel.findById(id);
    if (!event) {
      return res.json({ message: false, error: "Event not found" });
    }

    const isMatch = await bcrypt.compare(password, event.eventAdminPassword);

    if (!isMatch) {
      return res.json({ message: false, error: "Invalid password" });
    }

    // If the password matches, respond with success
    res.status(200).json({ message: true });
  } catch (error) {
    console.error(`Error during login attempt: ${error.message}`);
    res.status(500).json({ message: false, error: error.message });
  }
};

const EventGetClerkSingleController = async (req, res) => {
  try {
    const { clerkId, eventId } = req.params;
    const event = await EventModel.findOne({ clerkId, _id: eventId });

    if (!event) {
      return res.status(404).json({ message: false, error: "Event not found" });
    }

    res.status(200).json({ message: true, data: event });
  } catch (error) {
    console.error(`Error fetching event: ${error.message}`);
    res.status(500).json({ message: false, error: error.message });
  }
};




// Events Patch (update event) Controller
const EventPatchController = async (req, res) => {
  try {
    const { id } = req.params; // Get the event ID from the route parameters
    const updates = req.body; // Get the fields to update from the request body

    const updatedEvent = await EventModel.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true } // Return the updated document and validate the updates
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: false, error: "Event not found" });
    }

    res.status(200).json({ message: true, data: updatedEvent });
  } catch (error) {
    console.error(`Error updating event: ${error.message}`);
    res.status(500).json({ message: false, error: error.message });
  }
};

export {
  EventPostController,
  EventGetController,
  EventGetSingleController,
  EventLoginController,
  EventPatchController,
  EventGetClerkController,
  EventGetClerkSingleController,
};
