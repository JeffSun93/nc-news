import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const convertToRelativeTime = (date) => {
  return dayjs(date).fromNow();
};

export const convertToAbsoluteTime = (date) => {
  return dayjs(date).format("MMMM D, YYYY h:mm A");
};
