import { MdNotifications } from "react-icons/md";
import { useContext, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { Content } from "../../componentsGlobal/content";
import { AuthContext } from "../../context/AuthContext";
import { CardNotification } from "./componetsNotification/cardNotification";

// Component de notificações
export default function Notification() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext not found");
  const {
    notification,
    updateReadNotification,
    refetchNotification,
    deleteNotification,
  } = context;

  useEffect(() => {
    if (!notification || !Array.isArray(notification)) return;

    notification.forEach((item) => {
      if (item.expense.paid) {
        deleteNotification(item.id);
      }
    });
  }, [notification, deleteNotification]);

  const { mutate } = useMutation({
    mutationFn: updateReadNotification,
    onSuccess: () => {
      refetchNotification();
    },
    onError: () => {
      toast.error("Ops algo deu errado! 😞");
    },
  });

  function handleReadNotification(id: string) {
    mutate(id);
  }

  return (
    <Content title="Notificações" icon={MdNotifications}>
      <div className="flex flex-col gap-6 ">
        {notification
          ?.filter((item) => item.expense.paid === false)
          .map((item) => {
            const dateObj = new Date(item.expense.dueDate);
            const day = dateObj.getDate().toString().padStart(2, "0");
            const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
            const year = dateObj.getFullYear().toString().slice(-2);

            const formttedDueDate = `${day}/${month}/${year}`;

            return (
              <button
                key={item.id}
                onClick={() => handleReadNotification(item.id)}
              >
                <CardNotification
                  name={item.expense.name}
                  dueDate={formttedDueDate}
                  amount={item.expense.amount}
                  read={item.read}
                />
              </button>
            );
          })}
      </div>
    </Content>
  );
}
