import winston from "winston";
import LokiTransport from "winston-loki";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new LokiTransport({
      host: "http://loki:3100", // Loki URL
      labels: { job: "loki-service" },
      json: true,
      batching: true,
      interval: 5,
    }),
  ],
});

export { logger };
