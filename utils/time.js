const getTimeInIST = (timeInMillis = Date.now()) => {
  return new Date(timeInMillis).toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export default getTimeInIST;
