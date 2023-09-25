const { ObjectId } = require("mongodb");

const ApiError = require("../api-error");
const DonorService = require("../services/donor.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    if (!req.body?.name || !req.body?.bloodType || req.body.name.trim() === '' || req.body.bloodType.trim() === '') {
        return next(new ApiError(400, "Name and blood type are required and cannot be empty"));
    }
    try {
        const donorService = new DonorService(MongoDB.client);
        const document = await donorService.create(req.body);
        return res.send(document);
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, "An error occurred while creating a donor"));
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can't be empty"));
    }
    try {
        const donorService = new DonorService(MongoDB.client);
        const document = await donorService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Donor not found"));
        }
        return res.send({ message: "Donor was updated successfully", updatedDocument: document });
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, `Error updating donor with id=${req.params.id}`));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const donorService = new DonorService(MongoDB.client);
        const document = await donorService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Donor not found"));
        }
        return res.send({ message: "Donor was deleted successfully", deletedDocument: document });
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, `Error deleting donor with id=${req.params.id}`));
    }
};
exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const donorService = new DonorService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await donorService.findByName(name);
        } else {
            documents = await donorService.find({});
        }
        return res.send(documents);
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, "An error occurred while retrieving donors"));
    }
};

exports.findOne = async (req, res, next) => {
    try {
        const donorService = new DonorService(MongoDB.client);
        const document = await donorService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Donor not found"));
        }
        return res.send(document);
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, `Error retrieving donor with id=${req.params.id}`));
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const donorService = new DonorService(MongoDB.client);
        const deletedCount = await donorService.deleteAll();
        return res.send({ message: `${deletedCount} donors were deleted successfully` });
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, "An error occurred while removing all donors"));
    }
};

exports.find = async (req, res, next) => {
    try {
        const donorService = new DonorService(MongoDB.client);
        const { filters } = req.body; // Đảm bảo bạn đã truyền filters từ body của request
        const documents = await donorService.find(filters);
        return res.send(documents);
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, "An error occurred while retrieving donors"));
    }
};

exports.findByIds = async (req, res, next) => {
    try {
        const donorService = new DonorService(MongoDB.client);
        const { ids } = req.body; // Đảm bảo bạn đã truyền ids từ body của request
        const documents = await donorService.findByIds(ids);
        return res.send(documents);
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, "An error occurred while retrieving donors"));
    }
};
