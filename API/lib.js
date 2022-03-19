const path = require("path");
const fs = require("fs");

function dataPath() {
  return path.join(__dirname, "data", ...arguments);
}

function listFiles(callback) {
  const path = dataPath();
  return fs.readdir(path, callback);
}

function searchFiles(searchString, callback) {
  listFiles((err, files) => {
    if (err) {
      callback(err);
    } else {
      const foundFiles = files.filter((filename) =>
        filename.includes(searchString)
      );
      callback(null, foundFiles);
    }
  });
}

// add stats or more info later
function readFile(filename, callback) {
  const path = dataPath(filename);
  fs.readFile(path, "utf-8", callback);
}

// if there is a contents update, do that before changing name
// otherwise just change name
function updateFile(filename, updates, callback) {
  const path = dataPath(filename);
  if (updates.content) {
    const flag = { flag: updates.overwrite == true ? "w" : "a" };
    fs.writeFile(path, updates.content, flag, (err) => {
      if (err) {
        callback(err);
      } else {
        renameFile(filename, updates.rename, callback);
      }
    });
  } else {
    renameFile(filename, updates.rename, callback);
  }
}

function renameFile(oldName, newName, callback) {
  console.log(`oldName: ${oldName}, newName: ${newName}`);
  if (newName == undefined) {
    readFile(oldName, callback);
    return;
  }
  // rename if rename given
  const oldPath = dataPath(oldName);
  const newPath = dataPath(newName); // NEED to check if file name valid!!
  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      callback(err);
    } else {
      readFile(newName, callback); //read file once changed
    }
  });
}

module.exports = {
  listFiles,
  searchFiles,
  readFile,
  updateFile,
};
