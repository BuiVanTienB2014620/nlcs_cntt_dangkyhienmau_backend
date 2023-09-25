const { ObjectId } = require("mongodb");
const ApiError = require("../api-error");
const FaqService = require("../services/faq.service");
const MongoDB = require("../utils/mongodb.util");

exports.createFaq = async (req, res, next) => {
    if (!req.body?.title || !req.body?.content) {
        return next(new ApiError(400, "Title and content are required fields"));
    }
    try {
        const faqService = new FaqService(MongoDB.client);
        const document = await faqService.createFaq(req.body);
        return res.send(document);
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, "An error occurred while creating an FAQ"));
    }
};

exports.findFaqById = async (req, res, next) => {
    try {
        const faqService = new FaqService(MongoDB.client);
        const document = await faqService.findFaqById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "FAQ not found"));
        }
        return res.send(document);
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, `Error retrieving FAQ with ID=${req.params.id}`));
    }
};

exports.updateFaq = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can't be empty"));
    }
    try {
        const faqService = new FaqService(MongoDB.client);
        const document = await faqService.updateFaq(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "FAQ not found"));
        }
        return res.send({ message: "FAQ was updated successfully" });
    } catch (error) {
        return next(new ApiError(500, `Error updating FAQ with ID=${req.params.id}`));
    }
};

exports.deleteFaq = async (req, res, next) => {
    try {
        const faqService = new FaqService(MongoDB.client);
        const document = await faqService.deleteFaq(req.params.id);
        if (!document) {
            return next(new ApiError(404, "FAQ not found"));
        }
        return res.send({ message: "FAQ was deleted successfully" });
    } catch (error) {
        return next(new ApiError(500, `Error deleting FAQ with ID=${req.params.id}`));
    }
};
