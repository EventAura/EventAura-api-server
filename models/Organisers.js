import mongoose from "mongoose";

const OrganiserSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: [String],
        required: true,
    },
    firstName: {
        type: String,       
    },
    lastName: {
        type: String,       
    },
})

const Organiser = mongoose.model("Organiser", OrganiserSchema);

export default Organiser;