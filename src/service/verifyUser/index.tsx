import { api } from "../api";

interface VerifyUserProps {
  name: string;
  email: string;
}

export async function verifyUser({ name, email }: VerifyUserProps) {
  const response = await api.post("/user/verifyuser", { name, email });
  return response.data;
}
