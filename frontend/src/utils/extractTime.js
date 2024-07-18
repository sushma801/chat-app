export const extractTime = (date) => {
  const newDate = new Date(date);
  const hours = padZero(newDate.getHours());
  const minutes = padZero(newDate.getMinutes());
  return `${hours}:${minutes}`;
};
const padZero = (number) => {
  return number.toString().padStart(2, '0');
};
