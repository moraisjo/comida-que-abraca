import axios from "axios";

const API_URL = "http://localhost:8080";

export const getNotificationsByUser = async (userId: number) => {
  const response = await axios.get(`${API_URL}/notifications/user/1`);
  return response.data;
};
