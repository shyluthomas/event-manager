import { z } from "zod";

export const createEventSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "title is required" }),
    description: z.string({ required_error: "description is required" }),
    eventCategoryId: z.number({ required_error: "eventCategory is required" }),
    eventCardImage: z.string().optional(),
    file: z.string({ required_error: "Event card image required" }),
    ticketTotalCount: z.number({ required_error: "ticket count is required" }),
    eventItenary: z.array(
      z.object({
        schedule: z.string({ required_error: "schedule is required" }),
        description: z.string({ required_error: "title is required" }),
      })
    ),
  }),
});
