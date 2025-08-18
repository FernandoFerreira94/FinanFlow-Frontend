import { api } from "../api";

interface changePasswordProps {
  user_id: string;
  newPassword: string;
}

export async function changePassword({
  user_id,
  newPassword,
}: changePasswordProps) {
  const response = await api.put("/update/changepassword", {
    user_id,
    newPassword,
  });
  return response.data;
}
