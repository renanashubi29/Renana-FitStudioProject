import { 
    getAllRegistrations, 
    getRegistrationById, 
    createRegistration, 
    updateRegistrationById, 
    deleteRegistrationById, 
    resetRegistrationsFromFile 
} from "../services/registrationService.js";


export const getAllRegistrationsController = async (req, res) => {
    try {
        const registrations = await getAllRegistrations();
        res.status(200).json(registrations);
    } catch (error) {
        res.status(500).json({ message: "Error fetching registrations", error: error.message });
    }
};

export const getRegistrationByIdController = async (req, res) => {
    try {
        const registration = await getRegistrationById(req.params.id);
        if (!registration) {
            return res.status(404).json({ message: "Registration not found" });
        }
        res.status(200).json(registration);
    } catch (error) {
        res.status(500).json({ message: `Invalid registration ID: ${req.params.id}` });
    }
};


export const createRegistrationController = async (req, res) => {
    try {
        // הסרביס כבר יבדוק אם ה-User וה-Workout קיימים
        const savedRegistration = await createRegistration(req.body);
        res.status(201).json(savedRegistration);
    } catch (error) {
        // אם הסרביס זרק שגיאה (כמו "User not found"), היא תתפס כאן
        res.status(400).json({ message: "Error creating registration", error: error.message });
    }
};


export const updateRegistrationController = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedRegistration = await updateRegistrationById(id, req.body);
        
        if (!updatedRegistration) {
            return res.status(404).json({ message: "Registration not found" });
        }
        res.status(200).json(updatedRegistration);
    } catch (error) {
        res.status(500).json({ message: "Error updating registration", error: error.message });
    }
};


export const deleteRegistrationController = async (req, res) => {
    try {
        const deletedRegistration = await deleteRegistrationById(req.params.id);
        if (!deletedRegistration) {
            return res.status(404).json({ message: "Registration not found" });
        }
        res.status(200).json({
            message: "Registration cancelled successfully",
            registration: deletedRegistration
        });
    } catch (error) {
        res.status(500).json({ message: "Error deleting registration", error: error.message });
    }
};


export const resetRegistrationsController = async (req, res) => {
    try {
        const allRegistrations = await resetRegistrationsFromFile();
        res.status(201).json(allRegistrations);
    } catch (error) {
        res.status(400).json({ 
            message: "Error resetting registrations", 
            error: error.message 
        });
    }
};