import { User } from "../../../data/model/user";
import { getAllUsers } from "../../../data/repository/user";

export const getUsersForDisplay = async (): Promise<User[]> => {
  return await getAllUsers();
};
