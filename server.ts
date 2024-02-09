import express from "express";
// import * as compression from 'compression';
// import helmet from 'helmet';

import { userRoutes, healthRoute } from "./routes";
import { logger, errorHandler } from "./middlewares";

export const startServer = () => {
  const port = process.env.PORT || 8044;
  const app = express();
  app.use(express.json());

  app.use(logger);
  app.use("/health", healthRoute);
  app.use("/user", userRoutes);

  /* Handling Error */
  app.use(errorHandler);

  const server = app.listen(port, () => {
    console.log("server started..port => ", port);
  });
  return app;
};
