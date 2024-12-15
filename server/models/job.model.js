const path = require("path");
const filename = path.join(__dirname, "../data/jobs.json");
let jobs = require(filename);
const helper = require("../helpers/helper");
function getJobs() {
  return new Promise((resolve, reject) => {
    if (jobs.length === 0) {
      reject({
        message: "no jobs available",
        status: 202,
      });
    }
    const sortedJobs = jobs.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    resolve(sortedJobs);
  });
}
function getJobById(id) {
  return new Promise((resolve, reject) => {
    helper
      .findById(jobs, id)
      .then((job) => resolve(job))
      .catch((err) => reject(err));
  });
}
function insertJob(newJob) {
  return new Promise((resolve, reject) => {
    const id = helper.incrementId(jobs);
    const newDate = helper.newDate();
    const job = { id, ...newJob, createdAt: newDate };

    jobs.push(job);
    helper.writeJSONFile(filename, jobs);
    resolve(job);
  });
}
function deleteJob(id) {
  return new Promise((resolve, reject) => {
    const index = jobs.findIndex((job) => job.id === parseInt(id, 10));
    if (index === -1) {
      reject({
        message: `Job with ID ${id} not found`,
        status: 404,
      });
    } else {
      const deletedJob = jobs.splice(index, 1)[0];
      helper.writeJSONFile(filename, jobs);
      resolve(deletedJob);
    }
  });
}
function searchJobs(searchTerm) {
  return new Promise((resolve, reject) => {
    const filteredJobs = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredJobs.length === 0) {
      reject({
        message: "No jobs match your search",
        status: 404,
      });
    } else {
      resolve(filteredJobs);
    }
  });
}
module.exports = {
  getJobById,
  getJobs,
  insertJob,
  deleteJob,
  searchJobs,
};
