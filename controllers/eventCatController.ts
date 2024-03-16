import { eventEntity } from "../entities/event";

import { statusCode} from "../lib";
import { eventCategoryEntity } from "../entities/eventCategory";

export const eventCatController = {
  getEventCategory: async (): Promise<any> => {
    const response: any = await eventCategoryEntity.getEventCategory();
    if (!response) {
      return { status: statusCode.HTTP_NOTFOUND, eventCategory: null };
    }
    return { status: statusCode.HTTP_SUCESS, eventCategory: response };
  }
};
