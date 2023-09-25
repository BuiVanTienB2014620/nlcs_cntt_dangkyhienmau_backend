const express = require("express");
const faqs = require("../controllers/faq.controller");
const router = express.Router();

router.route("/")
      // .get(faqs.findAll)
      .post(faqs.createFaq)
      // .delete(faqs.deleteAll)

router.route("/:id")
      .get(faqs.findFaqById)
      .put(faqs.updateFaq)
      .delete(faqs.deleteFaq);


module.exports = router;

