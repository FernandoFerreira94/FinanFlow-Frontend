import { MdNotifications } from "react-icons/md";
import { useExpenses } from "../../../hook/useExpenses";
import { Content } from "../../../componentsGlobal/content";
import { CardNotification } from "./componetsNotification/cardNotification";
import NotificationMobile from "../../mobile/notificationMobile";
import { useUpdateReadNotification } from "../../../hook/useUpdadeReadNotification";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

// Component de notificações
export default function Notification() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext not found");
  const { user } = context;

  // Busca as despesas
  const { data, isLoading, isError } = useExpenses({
    type: "notification",
  });

  const { mutate } = useUpdateReadNotification();

  function handleUpdateRead(idExpense: string) {
    if (!user?.id) return;
    mutate({ idUser: user?.id, idExpense });
  }

  return (
    <>
      <Content title="Notificações" icon={MdNotifications}>
        <div className="flex flex-col gap-6 ">
          {isLoading && <p>Loading...</p>}
          {isError && <p>Error</p>}
          {!isLoading && !isError && data && data.length === 0 && (
            <div className="flex flex-col items-center gap-4">
              <p className="text-2xl max-sm:text-xl">
                Você não possui notificações.
              </p>
            </div>
          )}
          {data?.map((expense) => (
            <button
              className="text-left"
              key={expense.id}
              onClick={() => handleUpdateRead(expense.id)}
            >
              <CardNotification
                name={expense?.name}
                id={expense?.id}
                read={expense?.read}
                amount={expense?.amount}
                purchaseDate={expense?.purchaseDate}
              />
            </button>
          ))}
        </div>
      </Content>
      <NotificationMobile />
    </>
  );
}
