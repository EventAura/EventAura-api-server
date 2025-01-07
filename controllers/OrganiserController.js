import Organiser from "../models/Organisers.js";

const createOrganiser = async (req, res) => {
    try {
        const { clerkId, email, firstName, lastName } = req.body;
    
        const newOrganiser = new Organiser({
        clerkId,
        email,
        firstName,
        lastName,
        });
    
        await newOrganiser.save();
    
        res.status(201).json(newOrganiser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    };


export { createOrganiser };