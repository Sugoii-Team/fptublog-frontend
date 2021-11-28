const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

/* app.use(express.static("./build/"));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve("index.html"));
}); */

app.listen(PORT, () => {
  console.log(`App in running on ${PORT}`);
});
