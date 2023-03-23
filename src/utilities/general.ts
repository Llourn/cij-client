export const percentAsInt = (denominator: number, numerator: number) => {
  return Math.floor((numerator / denominator) * 100);
};

export const secondsToMinAndSec = (timeInSeconds: number, results = false) => {
  const minutes = Math.trunc(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  if (results) {
    let text = "";
    if (minutes > 0) {
      text += minutes === 1 ? `${minutes} minute` : `${minutes} minutes`;
      if (seconds > 0) {
        text += " and ";
      }
    }
    if (seconds > 0) {
      text += seconds === 1 ? `${seconds} second` : `${seconds} seconds`;
    }
    return text;
  } else {
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
};
