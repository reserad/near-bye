import {
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  format,
} from "date-fns";

export const formatDate = (original: string) => {
  const originalDate = new Date(original);
  const now = new Date();
  const hourDiff = differenceInHours(now, originalDate);
  const minuteDiff = differenceInMinutes(now, originalDate);
  const secondDiff = differenceInSeconds(now, originalDate);
  if (hourDiff > 24) {
    return format(originalDate, "d MMM");
  } else if (minuteDiff > 60) {
    return `${hourDiff}h`;
  } else if (minuteDiff < 60 && secondDiff >= 60) {
    return `${hourDiff}m`;
  } else {
    return `${secondDiff}s`;
  }
};
