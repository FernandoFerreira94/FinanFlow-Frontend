interface TitleDashboardProps {
  title: string;
  icon: React.ReactNode;
}

export function TitleDashboard({ title, icon }: TitleDashboardProps) {
  return (
    <h1 className="font-semibold text-2xl font-sans text-gray-500 flex items-center gap-2  w-8/10">
      {title} {icon}{" "}
    </h1>
  );
}
