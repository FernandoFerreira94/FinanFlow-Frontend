import { api } from "../api";

interface UpdateReadNotificationProps {
  idExpense: string;
}
import Cookies from "js-cookie";

export async function UpdateReadNotification({
  idExpense,
}: UpdateReadNotificationProps) {
  const token = Cookies.get("tokenFinanFlow");
  await api.put(`/update/read/${idExpense}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
