import { errorHandler, statusCode } from "../lib";
import { prisma } from "../lib/dbcon";

export const eventCategoryEntity = {
  getEventCategory: async (): Promise<any> => {
    try {
      const events = await prisma.eventCategory.findMany();
      return events;
    } catch (e) {
      return null;
    }
  }
};
