import { MeterProvider } from "@opentelemetry/sdk-metrics";
import { PrometheusExporter } from "@opentelemetry/exporter-prometheus";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { ATTR_SERVICE_NAME } from "@opentelemetry/semantic-conventions";

const PORT = 9464;
const ENDPOINT = "/metrics";

const prometheusExporter = new PrometheusExporter(
  {
    port: PORT,
    endpoint: ENDPOINT,
  },
  () =>
    console.log(
      `Prometheus scrape endpoint: http://localhost:${PORT}${ENDPOINT}`
    )
);

const meterProvider = new MeterProvider({
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: "observable-node-server-app",
  }),
  readers: [prometheusExporter]
});

const meter = meterProvider.getMeter("observable-node-server-meter");

export { meter };
