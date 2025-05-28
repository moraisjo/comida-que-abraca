import { getNotificationsByUser } from "../../../data/repository/notification";

export const fetchUserNotifications = async (userId: number) => {
  try {
    const notifications = await getNotificationsByUser(userId);
    return notifications;
  } catch (error) {
    throw error;
  }
};
