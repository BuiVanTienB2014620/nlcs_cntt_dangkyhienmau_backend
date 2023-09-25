const express = require("express");
const appointments = require("../controllers/appointment.controller");
const router = express.Router();

router.route("/")
      // .get(appointments.findAll)
      .post(appointments.createAppointment)
      // .delete(appointments.deleteAll)

router.route("/:id")
      .get(appointments.findAppointmentById)
      .put(appointments.updateAppointment)
      .delete(appointments.deleteAppointment);


module.exports = router;

