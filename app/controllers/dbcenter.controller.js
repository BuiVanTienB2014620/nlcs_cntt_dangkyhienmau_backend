const { ObjectId } = require("mongodb");
const ApiError = require("../api-error");
const BDCenterService = require("../services/bdcenter.service");
const MongoDB = require("../utils/mongodb.util");

exports.createBDCenter = async (req, res, next) => {
    if (!req.body?.name || !req.body?.address) {
        return next(new ApiError(400, "Name and address are required fields"));
    }
    try {
        const bdCenterService = new BDCenterService(MongoDB.client);
        const document = await bdCenterService.createBDCenter(req.body);
        return res.send(document);
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, "An error occurred while creating a blood donation center"));
    }
};

exports.findBDCenterById = async (req, res, next) => {
    try {
        const bdCenterService = new BDCenterService(MongoDB.client);
        const document = await bdCenterService.findBDCenterById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Blood donation center not found"));
        }
        return res.send(document);
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, `Error retrieving blood donation center with ID=${req.params.id}`));
    }
};

exports.updateBDCenter = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can't be empty"));
    }
    try {
        const bdCenterService = new BDCenterService(MongoDB.client);
        const document = await bdCenterService.updateBDCenter(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Blood donation center not found"));
        }
        return res.send({ message: "Blood donation center was updated successfully" });
    } catch (error) {
        return next(new ApiError(500, `Error updating blood donation center with ID=${req.params.id}`));
    }
};

exports.deleteBDCenter = async (req, res, next) => {
    try {
        const bdCenterService = new BDCenterService(MongoDB.client);
        const document = await bdCenterService.deleteBDCenter(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Blood donation center not found"));
        }
        return res.send({ message: "Blood donation center was deleted successfully" });
    } catch (error) {
        return next(new ApiError(500, `Error deleting blood donation center with ID=${req.params.id}`));
    }
};
