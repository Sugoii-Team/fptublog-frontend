const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.static("./build/"));

app.get("/*", (req, res) => {
  res.sendFile(path.join("index.html"));
});

app.listen(PORT, () => {
  console.log(`App in running on ${PORT}`);
});
