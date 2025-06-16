import {
  getNotificationsByUser,
  markNotificationAsVisualized,
} from "../../../data/repository/notification";

export const fetchUserNotifications = async (userId: number) => {
  try {
    const notifications = await getNotificationsByUser(userId);
    return notifications;
  } catch (error) {
    throw error;
  }
};

export const visualizeNotification = async (notificationId: number) => {
  try {
    await markNotificationAsVisualized(notificationId);
  } catch (error) {
    throw error;
  }
};
