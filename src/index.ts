import { makeCalendarChart } from "./dayChart";
import { makeMonthChart } from "./monthChart";
import { makeWeekdayChart } from "./weekdayChart";
import { dates } from "./pieDays";
import * as echarts from "echarts/core";

const years = [2023, 2022, 2021, 2020];

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

function makeMonthCharts() {
  years.forEach((year) => {
    const el = document.getElementById("monthCharts");
    const mountEl = document.createElement("div");
    mountEl.classList.add("chart");
    mountEl.classList.add("monthChart");
    el?.appendChild(mountEl);
    makeMonthChart(mountEl,
      dates
        .map((s) => new Date(s))
        .filter((d: Date) => d.getFullYear() === year));
  });
}

function resizeCharts() {
  const wrappers = document.querySelectorAll(".chart");
  wrappers.forEach((wrapper) => {
    const instance = echarts.getInstanceByDom(wrapper as HTMLElement);
    instance?.resize();
  });
}

makeDayCharts();

makeMonthCharts();

makeWeekdayChart(dates.map((d) => (new Date(d))));

window.addEventListener("resize", () => {
  resizeCharts();
});
