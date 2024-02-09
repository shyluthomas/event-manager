import { Response, Request, Router } from "express";
import { HealthResponseDto } from "../types";

export const healthRoute = Router();

healthRoute.get("/", (req: Request, res: Response<{}, HealthResponseDto>) => {
  const timestamp = Date.now();
  res.send({ status: "OK", timestamp: timestamp });
});
