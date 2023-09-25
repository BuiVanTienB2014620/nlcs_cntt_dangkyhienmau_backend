const express = require("express");
const users = require("../controllers/user.controller.js");
const router = express.Router();

router.route("/")
      .get(users.findAllUsers) // Đổi tên hàm callback từ findAll sang findUsers
      .post(users.createUser)
    //   .delete(users.deleteAll);

router.route("/:id")
      .get(users.findUserById)
      .put(users.updateUser)
      .delete(users.deleteUser);

module.exports = router;
