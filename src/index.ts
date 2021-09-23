import { makeDayChart } from "./dayChart";
import { makeMonthChart } from "./monthChart";
import { makeWeekdayChart } from "./weekdayChart";
import { dates } from "./pieDays";
import * as echarts from "echarts/core";

function makeDayCharts() {
  const years = [2021, 2020];

  years.forEach((year) => {
    const el = document.getElementById("dayCharts");
    const mountEl = document.createElement("div");
    mountEl.classList.add("chart");
    mountEl.classList.add("dayChart");
    el?.appendChild(mountEl);
    makeDayChart(dates, year, mountEl);
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

makeMonthChart(dates);

makeWeekdayChart(dates);

window.addEventListener("resize", () => {
  resizeCharts();
});
