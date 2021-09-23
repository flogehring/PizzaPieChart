import * as echarts from "echarts/core";
import {
  TitleComponent,
  TitleComponentOption,
  CalendarComponent,
  CalendarComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  VisualMapComponent,
  VisualMapComponentOption,
  LegendComponent,
  GridComponent
} from "echarts/components";
import { HeatmapChart, HeatmapSeriesOption } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

const days = [1, 2, 3, 4, 5, 6, 0];

function getWeekdayData(dates: Date[]): [number, number, number][] {
  let i = 0;
  return days.map((day: number) => {
    const relevantDates = dates.filter((date) => date.getDay() === day);
    return [i++, 1, relevantDates.length];
  });
}

function getxAxisLabels(): string[] {
  return [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];
}

function getPiesLabel(number: number) {
  return "🍕\n".repeat(number);
}

export function makeWeekdayChart(dateStrings: string[]) {
  const dates = dateStrings.map((item) => new Date(item));
  const xAxisLabels = getxAxisLabels();
  const piesPerWeekday = getWeekdayData(dates);

  echarts.use([
    TitleComponent,
    CalendarComponent,
    TooltipComponent,
    VisualMapComponent,
    HeatmapChart,
    GridComponent,
    CanvasRenderer,
    LegendComponent
  ]);

  type EChartsOption = echarts.ComposeOption<
    | TitleComponentOption
    | CalendarComponentOption
    | TooltipComponentOption
    | VisualMapComponentOption
    | HeatmapSeriesOption
  >;

  var chartDom = document.getElementById("weekdayChart")!;
  var myChart = echarts.init(chartDom);
  var option: EChartsOption;

  function getVirtualData() {
    return piesPerWeekday.map((item) => {
      return {
        value: item,
        label: {
          formatter: () => getPiesLabel(item[2]),
          lineHeight: 16,
          show: true
        }
      };
    });
  }

  option = {
    title: {
      top: 30,
      left: "center",
      text: "🍕 per weekday"
    },
    xAxis: {
      type: "category",
      data: xAxisLabels
    },
    yAxis: {
      type: "category",
      axisLabel: {
        show: false
      }
    },
    tooltip: {
      show: true,
      trigger: "item"
    },
    visualMap: {
      min: 0,
      max: 20,
      type: "continuous",
      orient: "horizontal",
      left: "center",
      top: 65,
      show: false,
      color: ["#0a9e40", "#fff"]
    },
    series: {
      type: "heatmap",
      data: getVirtualData()
    }
  };

  myChart.setOption(option);
}
