"use strict";

import process from "process";
import opentelemetry from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";

const OTEL_EXPORTER_OTLP_TRACES_ENDPOINT = "http://tempo:4318/v1/traces";

const collectorOptions = {
  url: OTEL_EXPORTER_OTLP_TRACES_ENDPOINT, // default is http://localhost:4318/v1/traces
  concurrencyLimit: 10,
};

const traceExporter = new OTLPTraceExporter(collectorOptions);

const sdk = new opentelemetry.NodeSDK({
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
console.log("Started OTEL SDK for tracing");

process.on("SIGTERM", () => {
  sdk
    .shutdown()
    .then(
      () => console.log("Shutting down OTEL SDK gracefully"),
      (err) => console.log("Error shutting down OTEL SDK", err)
    )
    .finally(() => process.exit(0));
});
