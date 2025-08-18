export function formatDateOnly(dateStr?: string | null) {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const yearFull = date.getFullYear().toString();
  const yearShort = yearFull.slice(-2); // pega só os 2 últimos dígitos

  return `${day}/${month}/${yearShort}`;
}
