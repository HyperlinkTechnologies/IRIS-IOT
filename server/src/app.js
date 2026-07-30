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
import userRoutes from "./routes/user.route.js"
import imageRoutes from "./routes/image.route.js";
import sessionRoutes from "./routes/session.route.js";
import historyRoutes from "./routes/history.route.js";
import exportRoutes from "./routes/export.route.js";
import emailRoutes from "./routes/email.route.js";

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
app.use("/api/users", userRoutes);
app.use("/api/images", imageRoutes);
app.use("/api", sessionRoutes);
app.use("/api", historyRoutes);
app.use("/api", exportRoutes);
app.use("/api/email", emailRoutes);

export default app;