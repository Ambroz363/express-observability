import "./metrics/tracer.js";

import express from "express";
import { meter } from "./metrics/meter.js";
import { logger } from "./metrics/logger.js";

const PORT = 8081;

const app = express();

const requestCounter = meter.createCounter("http_requests", {
  description: "Counts HTTP requests",
});

app.use((req, res, next) => {
  logger.info(`Started processing request: ${req.url}`);
  requestCounter.add(1, { method: req.method, route: req.route });
  next();
});

app.get("/", (req, res) => {
  res.send("Hey");
});

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
