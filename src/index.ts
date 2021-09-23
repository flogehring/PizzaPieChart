import { makeDayChart } from "./dayChart";
import { makeMonthChart } from "./monthChart";
import { makeWeekdayChart } from "./weekdayChart";
import { dates } from "./pieDays";

const years = [2021, 2020];

years.forEach((year) => {
  const el = document.getElementById("dayCharts");
  const mountEl = document.createElement("div");
  mountEl.classList.add("chart");
  mountEl.classList.add("dayChart");
  el?.appendChild(mountEl);
  makeDayChart(dates, year, mountEl);
});

//makeDayChart(dates, "2021", "dayChart");

makeMonthChart(dates);

makeWeekdayChart(dates);
