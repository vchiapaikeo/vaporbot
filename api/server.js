const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const jsonParser = bodyParser.json();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

COLAB_URL = "http://0e4b-35-196-252-247.ngrok-free.app";

// API routes
app.post("/api/v1/question", async (req, res) => {
  const body = req.body;
  console.log('Got body:', body);
  const response = await fetch(`${COLAB_URL}/question`, {
    method: "POST",
    body: JSON.stringify({query: body.query}),
    headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "69420" },
  });
  console.log(response);
  const data = await response.json()
  console.log(data);
  res.send(data);
});

app.get("/api/v1/readiness_check", async (req, res) => {
  res.sendStatus(200);
});

app.get("/api/v1/liveness_check", async (req, res) => {
  res.sendStatus(200);
});

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

module.exports = app;
