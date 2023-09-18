const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./src/routes/routes");

const app = express();
const port = process.env.PORT || 3000;

// Middleware to process JSON data
app.use(bodyParser.json());

// Route for receiving and processing the JSON
app.use("/process-json", routes);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
