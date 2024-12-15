const express = require("express");
const router = express.Router();
router.use("/api/v1/jobs", require("./job.routes"));

module.exports = router;
