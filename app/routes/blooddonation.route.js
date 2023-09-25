const express = require("express");
const blooddonations = require("../controllers/blooddonation.controller");
const router = express.Router();

router.route("/")
    //   .get(bloodonations.findAll)
      .post(blooddonations.createBloodDonation);
    //   .delete(bloodonations.deleteAll)

router.route("/:id")
      .get(blooddonations.findBloodDonationById)
      .put(blooddonations.updateBloodDonation)
      .delete(blooddonations.deleteBloodDonation);


module.exports = router;