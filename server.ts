import express from "express";
// import * as compression from 'compression';
// import helmet from 'helmet';

import { userRoutes, healthRoute, eventRoutes, profileRoutes } from "./routes";
import { logger, errorHandler } from "./middlewares";
import { authRoutes } from "./routes/authRoutes";
import cors = require("cors");
import { eventCategoryRoutes } from "./routes/eventCategoryRoutes";
export const startServer = () => {
  const port = process.env.PORT || 8044;
  const app = express();
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
      limit: 52428800,
      parameterLimit: 1000000,
    })
  );

  app.use(logger);
  app.use((req, res, next) => {
    next();
  }, cors({ maxAge: 84600 }));
  app.use("/health", healthRoute);
  app.use("/user", userRoutes);
  app.use("/auth", authRoutes);
  app.use("/event", eventRoutes);
  app.use("/profile", profileRoutes);
  app.use("/eventcat", eventCategoryRoutes);

  /* Handling Error */
  app.use(errorHandler);

  const server = app.listen(port, () => {
    console.log("server started..port => ", port);
  });
  return app;
};
