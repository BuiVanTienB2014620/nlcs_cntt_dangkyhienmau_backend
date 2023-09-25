const express = require("express");
const donors = require("../controllers/donor.controller.js");
const router = express.Router();

router.route("/")
      .get(donors.findAll)
      .post(donors.create)
      .delete(donors.deleteAll)

router.route("/:id")
      .get(donors.findOne)
      .put(donors.update)
      .delete(donors.delete);


module.exports = router;

