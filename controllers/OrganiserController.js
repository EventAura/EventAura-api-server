import Organiser from "../models/Organisers.js";
// import { Webhook } from "svix";


// const createOrganiser = async (req, res) => {
//     try {
//         const { clerkId, email, firstName, lastName } = req.body;
    
//         const newOrganiser = new Organiser({
//         clerkId,
//         email,
//         firstName,
//         lastName,
//         });
    
//         await newOrganiser.save();
    
//         res.status(201).json(newOrganiser);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
//     };


// export { createOrganiser };


import { Webhook } from "svix"; // Import Svix Webhook
import Organiser from "../models/Organisers.js";


// Controller for handling Clerk webhooks
export const handleClerkWebhook = async (req, res) => {
  const svix = new Webhook();
  const secret = process.env.CLERK_WEBHOOK_SECRET; // Your Clerk webhook secret

  try {
    // Verify and decode the webhook payload
    const payload = req.body;
    const headers = req.headers;
    const event = svix.verify(JSON.stringify(payload), headers, secret);

    // Process the event based on its type
    if (event.type === "user.created") {
      const { id, email_addresses, first_name, last_name, created_at } = event.data;

      // Save the user data to MongoDB
      const newOrganiser = new Organiser({
        clerkId: id,
        email: email_addresses[0]?.email_address, // Primary email
        firstName: first_name || "",
        lastName: last_name || "",
        createdAt: created_at ? new Date(created_at) : new Date(),
      });

      await newOrganiser.save();
      console.log(`New user saved: ${email_addresses[0]?.email_address}`);
    } else {
      console.log(`Unhandled webhook event type: ${event.type}`);
    }

    // Respond with success
    res.status(200).send("Webhook processed successfully!");
  } catch (err) {
    console.error("Error verifying webhook:", err);
    res.status(400).send("Webhook verification failed.");
  }
};