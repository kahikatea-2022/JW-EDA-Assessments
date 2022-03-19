const app = require("./server");

// Start listening for requests...
const port = 3000;
app.listen(port, () => {
  console.log(`API server started at http://localhost:${port}`);
});
