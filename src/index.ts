import { makeCalendarChart } from "./dayChart";
import { makeMonthChart } from "./monthChart";
import { makeWeekdayChart } from "./weekdayChart";
import { dates } from "./pieDays";
import * as echarts from "echarts/core";

const years = [2021, 2020];
const dates2021 = dates
  .map((dateString: string) => new Date(dateString))
  .filter((date) => date.getFullYear() === 2021);

function makeDayCharts() {
  years.forEach((year) => {
    const el = document.getElementById("dayCharts");
    const mountEl = document.createElement("div");
    mountEl.classList.add("chart");
    mountEl.classList.add("dayChart");
    el?.appendChild(mountEl);
    makeCalendarChart(dates, year, mountEl);
  });
}

function resizeCharts() {
  const wrappers = document.querySelectorAll(".chart");
  wrappers.forEach((wrapper) => {
    const instance = echarts.getInstanceByDom(wrapper as HTMLElement);
    instance.resize();
  });
}

makeDayCharts();

makeMonthChart(dates2021);

makeWeekdayChart(dates2021);

window.addEventListener("resize", () => {
  resizeCharts();
});
