import express from "express";

export const eventRoutes = express.Router();

/* getting Events */
eventRoutes.get("/", async (req, res) => {
  console.log("/get events");
});

/* getting Event by ID */
eventRoutes.get("/:id", async (req, res) => {
  console.log("/get event by id");
});

/* Create Events */
eventRoutes.post("/", async (req, res) => {
  console.log("/create  events");
});

/* Update Events by ID */
eventRoutes.patch("/:id", async (req, res) => {
  console.log("/update events");
});

/* Delete Events */
eventRoutes.delete("/", async (req, res) => {
  console.log("/delete events");
});
