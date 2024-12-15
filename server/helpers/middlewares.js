function mustBeInteger(req, res, next) {
  const id = req.params.id;
  if (!Number.isInteger(parseInt(id))) {
    res
      .status(400)
      .json({ message: "Wrong id format id must be of type number !" });
  } else {
    next();
  }
}
function checkFieldsJob(req, res, next) {
  const { title, content } = req.body;

  const missingFields = [];
  if (!title?.trim()) missingFields.push("title");
  if (!content?.trim()) missingFields.push("content");

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `Missing required field(s): ${missingFields.join(", ")}`,
    });
  }

  next();
}
module.exports = {
  mustBeInteger,
  checkFieldsJob,
};
