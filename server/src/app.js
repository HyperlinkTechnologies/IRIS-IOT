import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import router from "./routes/aws.route.js";

import healthRoutes from "./routes/health.route.js";
import deviceRoutes from "./routes/device.route.js"
import commandRoutes from "./routes/command.routes.js"
import dashboardRoutes from "./routes/dashboard.route.js"
import alertRoutes from "./routes/alert.route.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/aws",router);
app.use("/api/devices", deviceRoutes);
app.use("/api", commandRoutes);
app.use("/api/dashboards", dashboardRoutes);
app.use("/api/alerts", alertRoutes);

export default app;