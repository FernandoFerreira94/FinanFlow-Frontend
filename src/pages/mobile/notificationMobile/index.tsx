import { MdNotifications } from "react-icons/md";

import { MainMobile } from "../../../componetsMobile/mainMobile";
import { HeaderDashboard } from "../../../componetsMobile/headerDashboard";
import { FooterMenu } from "../../../componetsMobile/footerMenu";
import { TitleDashboard } from "../../../componetsMobile/TitleDashboard";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useUpdateReadNotification } from "../../../hook/useUpdadeReadNotification";
import { CardNotificationMobile } from "../../../componetsMobile/cardNotificationMobile";
import { useExpenses } from "../../../hook/useExpenses";

export default function NotificationMobile() {
  const { data, isLoading, isError } = useExpenses({
    type: "notification",
  });

  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext not found");
  const { user } = context;

  const { mutate } = useUpdateReadNotification();

  function handleUpdateRead(idExpense: string) {
    if (!user?.id) return;
    mutate({ idUser: user?.id, idExpense });
  }
  return (
    <MainMobile className="hidden max-sm:flex flex-col min-h-screen">
      <HeaderDashboard />

      <div className="flex-1 w-full px-5 flex flex-col gap-5 mt-4">
        <section className="w-full flex items-center py-4">
          <TitleDashboard
            title="Notificação"
            icon={<MdNotifications size={35} />}
          />
        </section>
        {isLoading && (
          <div className="flex items-center justify-center w-full  h-50 flex-col gap-5">
            <div className="custom-loader "></div>
            <p>Carregando suas notificações</p>
          </div>
        )}

        {isError && <p>Error</p>}

        <section className="flex flex-col gap-4 mb-10">
          {data?.map((expense) => (
            <CardNotificationMobile
              onClick={handleUpdateRead}
              key={expense.id}
              id={expense.id}
              name={expense.name}
              purchaseDate={expense.purchaseDate}
              amount={expense.amount}
              read={expense.read}
            />
          ))}
        </section>
      </div>

      <FooterMenu className="sticky bottom-0 w-full" />
    </MainMobile>
  );
}
