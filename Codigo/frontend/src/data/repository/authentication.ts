import api from "../../api/axios";

import { AuthenticationRequest, AuthenticationResponse } from "../model/authentication";

const API_URL = "/login";

class AuthenticationRepository {
  async login(
    authenticationRequest: AuthenticationRequest
  ): Promise<AuthenticationResponse | undefined> {
    try {
      const response = await api.post<AuthenticationResponse>(
        API_URL,
        authenticationRequest
      );
      return response.data;
    } catch (error) {
      console.error("Error during login:", error);
      return undefined;
    }
  }
}

export const authenticationRepository = new AuthenticationRepository();