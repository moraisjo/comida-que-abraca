import api from "../../api/axios";

const API_URL = "/notifications";

export const getNotificationsByUser = async (userId: number) => {
  const response = await api.get(`${API_URL}/user/${userId}`);
  return response.data;
};

export const markNotificationAsVisualized = async (notificationId: number) => {
  const response = await api.put(`${API_URL}/${notificationId}/visualize`);
  return response.data;
};