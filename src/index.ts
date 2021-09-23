import { makeDayChart } from "./dayChart";
import { makeMonthChart } from "./monthChart";
import { makeWeekdayChart } from "./weekdayChart";
import { dates } from "./pieDays";

makeDayChart(dates);

makeMonthChart(dates);

makeWeekdayChart(dates);
