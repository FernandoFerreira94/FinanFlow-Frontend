import { MdNotifications } from "react-icons/md";
import { useExpenses } from "../../../hook/useExpenses";
import { Content } from "../../../componentsDasktop/content";
import { CardNotificationMobile } from "../../../componetsMobile/cardNotificationMobile";
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
        <div className="flex gap-6 flex-wrap">
          {isLoading && (
            <div className="flex flex-col gap-8 items-center justify-center w-full  h-50">
              <div className="custom-loader  w-full"></div>
              <p className="text-xl font-semibold text-gray-500">
                Carregando notificações...
              </p>
            </div>
          )}

          {!isLoading && isError && (
            <div className="flex items-center justify-center w-full  h-50">
              <h1 className="text-2xl font-semibold max-sm:text-xl">
                Erro ao carregar as notificações 😓
              </h1>
            </div>
          )}
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
              <CardNotificationMobile
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
