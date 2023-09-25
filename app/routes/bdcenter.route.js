const express = require("express");
const bdcenters = require("../controllers/dbcenter.controller");
const router = express.Router();

router.route("/")
    //   .get(bdcenters.findAll)
      .post(bdcenters.createBDCenter);
    //   .delete(bdcenters.deleteAll)

router.route("/:id")
      .get(bdcenters.findBDCenterById)
      .put(bdcenters.updateBDCenter)
      .delete(bdcenters.deleteBDCenter);


module.exports = router;