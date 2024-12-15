const fs = require("fs");
const path = require("path");
function incrementId(array) {
  const randomId = Math.floor(Math.random() * 1000) + 1;
  const existingIds = array.map((item) => item.id);

  return array.length > 0 && existingIds.includes(randomId)
    ? incrementId(array)
    : randomId;
}

function newDate() {
  return new Date().toString();
}
function findById(array = [], id = 0) {
  return new Promise((resolve, reject) => {
    const row = array.find((r) => r.id == id);
    if (!row) {
      reject({
        message: `No Record found with the given id :${id}`,
        status: 404,
      });
    }
    resolve(row);
  });
}

function writeJSONFile(filename, content) {
  try {
    const dir = path.dirname(filename);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filename, JSON.stringify(content, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing file:", err.message);
    throw err;
  }
}

module.exports = {
  writeJSONFile,
  findById,
  incrementId,
  newDate,
};
