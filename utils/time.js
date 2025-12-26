export const time = {
  getTimeInIST: (timeInMillis = Date.now()) => {
    return new Date(timeInMillis).toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  },
  convertToHourAndMinute: (milliseconds) => {
    const totalMinutes = Math.floor(milliseconds / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2,"0")}`;
  },
};

export default time;
