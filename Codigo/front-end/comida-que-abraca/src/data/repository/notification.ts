import api from "../../api/axios";

const API_URL = "/notifications";

export const getNotificationsByUser = async (userId: number) => {
  const response = await api.get(`${API_URL}/user/1`);
  return response.data;
};
