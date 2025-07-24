import { authenticationRepository } from "../../../data/repository/authentication"

export const authenticateUser = async (email: string, password: string) => {
    return await authenticationRepository.login({
        email,
        password,
    });
}