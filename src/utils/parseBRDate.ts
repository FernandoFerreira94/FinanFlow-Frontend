// Função para transformar a data BR em Date
export function parseBRDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split("/");
  return new Date(Number(`20${year}`), Number(month) - 1, Number(day));
}
