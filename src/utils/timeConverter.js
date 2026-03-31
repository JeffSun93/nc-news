import dayjs from "dayjs";

export const convertToRelativeTime = (date) => {
  const diffSeconds = dayjs().diff(dayjs(date), "second");

  if (diffSeconds < 60) {
    return `${diffSeconds}s ago`;
  }

  const diffMinutes = Math.floor(diffSeconds / 60);
  const remSeconds = diffSeconds % 60;
  if (diffMinutes < 60) {
    return `${diffMinutes}m ${remSeconds}s ago`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  const remMinutes = diffMinutes % 60;
  if (diffHours < 24) {
    return `${diffHours}h ${remMinutes}m ago`;
  }

  const diffDays = Math.floor(diffHours / 24);
  const remHours = diffHours % 24;
  const diffYears = dayjs().diff(dayjs(date), "year");
  if (diffDays < 365) {
    return `${diffDays}d ${remHours}h ago`;
  }

  const remDays = diffDays - diffYears * 365;
  return `${diffYears}y ${remDays > 0 ? `${remDays}d ` : ""}ago`;
};

export const convertToAbsoluteTime = (date) => {
  return dayjs(date).format("MMMM D, YYYY h:mm A");
};
