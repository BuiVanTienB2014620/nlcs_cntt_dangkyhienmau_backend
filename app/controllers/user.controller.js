const { ObjectId } = require("mongodb");
const ApiError = require("../api-error");
const UserService = require("../services/user.service");
const MongoDB = require("../utils/mongodb.util");

exports.createUser = async (req, res, next) => {
    if (!req.body?.name || !req.body?.bloodGroup) {
        return next(new ApiError(400, "Name and blood group are required fields"));


    }
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.createUser(req.body);
        return res.send(document);
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, "An error occurred while creating a user"));
    }
};

exports.findUserById = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.findUserById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "User not found"));
        }
        return res.send(document);
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, `Error retrieving user with id=${req.params.id}`));
    }
};

exports.updateUser = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can't be empty"));
    }
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.updateUser(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "User not found"));
        }
        return res.send({ message: "User was updated successfully" });
    } catch (error) {
        return next(new ApiError(500, `Error updating user with id=${req.params.id}`));
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.deleteUser(req.params.id);
        if (!document) {
            return next(new ApiError(404, "User not found"));
        }
        return res.send({ message: "User was deleted successfully" });
    } catch (error) {
        return next(new ApiError(500, `Error deleting user with id=${req.params.id}`));
    }
};


exports.findAllUsers = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const documents = await userService.findAllUsers();

        // Kiểm tra nếu không có người dùng nào
        if (!documents || documents.length === 0) {
            return res.status(404).json({ message: "Không có người dùng nào được tìm thấy." });
        }

        // Trả về danh sách người dùng
        return res.status(200).json(documents);
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, "Đã xảy ra lỗi khi tìm tất cả người dùng."));
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const deletedCount = await userService.deleteAll();
        return res.send({ message: `${deletedCount} users was deleted successfully` });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing all users")


        );
      
    }
};
