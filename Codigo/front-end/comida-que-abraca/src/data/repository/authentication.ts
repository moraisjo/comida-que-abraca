import api from "../../api/axios";

import { AuthenticationRequest, AuthenticationResponse } from "../model/authentication";

const API_URL = "/login";

class AuthenticationRepository {
  async login(
    authenticationRequest: AuthenticationRequest
  ): Promise<AuthenticationResponse> {
    try {
      const response = await api.post<AuthenticationResponse>(
        API_URL,
        authenticationRequest
      );
      return response.data;
    } catch (error) {
      console.error("Error: authentication failed", error);
      throw error;
    }
  }
}

export const authenticationRepository = new AuthenticationRepository();