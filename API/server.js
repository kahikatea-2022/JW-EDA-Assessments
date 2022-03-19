const express = require("express");
const { listFiles, searchFiles, readFile, updateFile } = require("./lib");

const app = express();

// middleware to read put bodies as json
app.use(express.json());

// List files in the data dir
// add file stats (e.g. date last modified later)
app.get("/files", (req, res) => {
  listFiles((err, files) => {
    if (err) {
      //this needs to be refactored...
      res.status(500).json({ error: "Error reading files" });
    } else {
      res.status(200).json({
        total: files.length,
        returned: files.length,
        files: files,
      });
    }
  });
});

// Very basic search
// only on filename for now and just checking if string includes that filename value
// If I get time ill try a better search, including file type, file contents etc.
app.get("/files/search", (req, res) => {
  const searchString = req.body.searchString;
  if (searchString) {
    searchFiles(searchString, (err, files) => {
      if (err) {
        res.status(500).json({ error: "Error reading files" }); //pass message??
      } else {
        res.status(200).json({
          total: files.length,
          returned: files.length,
          files: files,
        });
      }
    });
  } else {
    res.status(409).json({ error: "Error no filename search term found" });
  }
});

// Read File contents
// add file stats (e.g. date last modified later)
app.get("/files/:filename", (req, res) => {
  const filename = req.params.filename;
  readFile(filename, (err, contents) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({
        filename,
        contents,
      });
    }
  });
});

// Create file
// currently only works for txt
//  /files/filename/write

// Update
// takes append and content params key in body, filename??
// returns new file contents??
app.post("/files/:filename/update", (req, res) => {
  const filename = req.params.filename;
  const body = req.body;
  // check to see if content or
  if (body.content || body.rename) {
    updateFile(filename, body, (err, newContents) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json({
          filename: body.rename ? body.rename : filename,
          newContents,
        });
      }
    });
  } else {
    res.status(500).json({ error: "content or rename must be given." });
  }
});

module.exports = app;
