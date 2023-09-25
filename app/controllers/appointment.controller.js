const { ObjectId } = require("mongodb");
const ApiError = require("../api-error");
const AppointmentService = require("../services/appointment.service");
const MongoDB = require("../utils/mongodb.util");

exports.createAppointment = async (req, res, next) => {
    if (!req.body?.userId || !req.body?.centerId || !req.body?.appointmentDate) {
        return next(new ApiError(400, "User ID, Center ID, and appointment date are required fields"));
    }
    try {
        const appointmentService = new AppointmentService(MongoDB.client);
        const document = await appointmentService.createAppointment(req.body);
        return res.send(document);
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, "An error occurred while creating an appointment"));
    }
};

exports.findAppointmentById = async (req, res, next) => {
    try {
        const appointmentService = new AppointmentService(MongoDB.client);
        const document = await appointmentService.findAppointmentById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Appointment not found"));
        }
        return res.send(document);
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, `Error retrieving appointment with ID=${req.params.id}`));
    }
};

exports.updateAppointment = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can't be empty"));
    }
    try {
        const appointmentService = new AppointmentService(MongoDB.client);
        const document = await appointmentService.updateAppointment(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Appointment not found"));
        }
        return res.send({ message: "Appointment was updated successfully" });
    } catch (error) {
        return next(new ApiError(500, `Error updating appointment with ID=${req.params.id}`));
    }
};

exports.deleteAppointment = async (req, res, next) => {
    try {
        const appointmentService = new AppointmentService(MongoDB.client);
        const document = await appointmentService.deleteAppointment(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Appointment not found"));
        }
        return res.send({ message: "Appointment was deleted successfully" });
    } catch (error) {
        return next(new ApiError(500, `Error deleting appointment with ID=${req.params.id}`));
    }
};
