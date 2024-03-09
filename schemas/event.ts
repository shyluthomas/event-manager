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

export const getEventSchema = z.object({
  params: z.object({
    id: z.string({ required_error: "Event id is required" }),
  }),
});

export const updateEventSchema = z.object({
  params: z.object({
    id: z.string({ required_error: "id is required" }),
  }),
  body: z.object({
    title: z.string({ required_error: "title is required" }).optional(),
    description: z
      .string({ required_error: "description is required" })
      .optional(),
    eventCategoryId: z
      .number({ required_error: "eventCategory is required" })
      .optional(),
    eventCardImage: z.string().optional(),
    file: z.string({ required_error: "Event card image required" }).optional(),
    ticketTotalCount: z
      .number({ required_error: "ticket count is required" })
      .optional(),
    eventItenary: z
      .array(
        z.object({
          schedule: z
            .string({ required_error: "schedule is required" })
            .optional(),
          description: z
            .string({ required_error: "title is required" })
            .optional(),
        })
      )
      .optional(),
  }),
});
