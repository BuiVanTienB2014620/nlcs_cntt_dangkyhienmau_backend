const { ObjectId } = require("mongodb");
const ApiError = require("../api-error");
const BloodDonationService = require("../services/blooddonation.service");
const MongoDB = require("../utils/mongodb.util");

exports.createBloodDonation = async (req, res, next) => {
    if (!req.body?.userId ) {
        return next(new ApiError(400, "User ID and donation date are required fields"));
    }
    try {
        const bloodDonationService = new BloodDonationService(MongoDB.client);
        const document = await bloodDonationService.createBloodDonation(req.body);
        return res.send(document);
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, "An error occurred while creating a blood donation"));
    }
};

exports.findBloodDonationById = async (req, res, next) => {
    try {
        const bloodDonationService = new BloodDonationService(MongoDB.client);
        const document = await bloodDonationService.findBloodDonationById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Blood donation not found"));
        }
        return res.send(document);
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, `Error retrieving blood donation with ID=${req.params.id}`));
    }
};

exports.updateBloodDonation = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can't be empty"));
    }
    try {
        const bloodDonationService = new BloodDonationService(MongoDB.client);
        const document = await bloodDonationService.updateBloodDonation(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Blood donation not found"));
        }
        return res.send({ message: "Blood donation was updated successfully" });
    } catch (error) {
        return next(new ApiError(500, `Error updating blood donation with ID=${req.params.id}`));
    }
};

exports.deleteBloodDonation = async (req, res, next) => {
    try {
        const bloodDonationService = new BloodDonationService(MongoDB.client);
        const document = await bloodDonationService.deleteBloodDonation(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Blood donation not found"));
        }
        return res.send({ message: "Blood donation was deleted successfully" });
    } catch (error) {
        return next(new ApiError(500, `Error deleting blood donation with ID=${req.params.id}`));
    }
};
