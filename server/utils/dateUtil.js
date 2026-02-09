export const getMinutesFromStartOfDay = (timeStr) => {

   const [hours, minutes] = timeStr.split(':');
  const totalMinutes = (Number(hours) * 60) + Number(minutes);

  return totalMinutes;
};