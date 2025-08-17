import { api } from "../api";
import type { UserProps } from "../../types";
// import type { CredentialResponse } from "@react-oauth/google";

interface GoogleToken {
  access_token?: string;
  credential?: string;
}

export async function loginGoogleApi(data: GoogleToken): Promise<UserProps> {
  const token = data.credential || data.access_token;
  if (!token) {
    throw new Error("Token do Google não recebido");
  }

  const response = await api.post("/auth/google", {
    credential: token, // backend precisa aceitar access_token também
  });

  const { token: appToken, id, name, email } = response.data;
  return { id, name, email, token: appToken };
}
