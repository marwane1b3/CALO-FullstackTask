const express = require("express");
const router = express.Router();
const JobModal = require("../models/job.model");
const middlewares = require("../helpers/middlewares");

router.get("/", async (req, res) => {
  await JobModal.getJobs()
    .then((jobs) => res.json(jobs))
    .catch((err) => {
      if (err.status) {
        res.status(err.status).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    });
});

router.get("/:id", middlewares.mustBeInteger, async (req, res) => {
  const id = req.params.id;
  await JobModal.getJobById(id)
    .then((job) => res.json(job))
    .catch((err) => {
      if (err.status) {
        res.status(err.status).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    });
});

router.post("/", middlewares.checkFieldsJob, async (req, res) => {
  try {
    const job = await JobModal.insertJob(req.body);
    res.status(201).json({
      message: ` job #${job.id} has been created`,
      content: job,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", middlewares.mustBeInteger, async (req, res) => {
  const id = req.params.id;
  try {
    const job = await JobModal.deleteJob(id);
    res.json({
      message: `Job #${id} has been deleted`,
      content: job,
    });
  } catch (err) {
    if (err.status) {
      res.status(err.status).json({ message: err.message });
    } else {
      res.status(500).json({ message: err.message });
    }
  }
});

router.get("/find/search", async (req, res) => {
  const searchTerm = req.query.q;
  if (!searchTerm) {
    return res.status(400).json({ message: "Search term is required" });
  }

  try {
    const jobs = await JobModal.searchJobs(searchTerm);
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
