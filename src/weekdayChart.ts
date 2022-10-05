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
  GridComponent,
  GridComponentOption
} from "echarts/components";
import {
  HeatmapChart,
  HeatmapSeriesOption,
  PieChart,
  PieSeriesOption
} from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

const days = [1, 2, 3, 4, 5, 6, 0];

function getWeekdayData(dates: Date[]): [number, number, number][] {
  let i = 0;
  return days.map((day: number) => {
    const relevantDates = dates.filter((date) => date.getDay() === day);
    return [i++, 1, relevantDates.length];
  });
}

function getDayLabels(): string[] {
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

function getPiesLabel(dayNumber: number, count: number) {
  return `${getDayLabels()[dayNumber]}: ${count} 🍕`;
}

export function makeWeekdayChart(dates: Date[]) {
  const piesPerWeekday = getWeekdayData(dates);

  echarts.use([
    TitleComponent,
    TooltipComponent,
    CanvasRenderer,
    LegendComponent,
    PieChart,
    GridComponent
  ]);

  type EChartsOption = echarts.ComposeOption<
    | TitleComponentOption
    | TooltipComponentOption
    | PieSeriesOption
    | GridComponentOption
  >;

  var chartDom = document.getElementById("weekdayChart")!;
  var myChart = echarts.init(chartDom);
  var option: EChartsOption;

  function getWeekdayDataItems() {
    return piesPerWeekday.map((item) => {
      return {
        value: item,
        label: {
          formatter: () => getPiesLabel(item[0], item[2]),
          lineHeight: 16,
          show: true
        }
      };
    });
  }

  option = {
    title: {
      top: 0,
      left: "center",
      text: `🍕 per weekday`
    },
    tooltip: {
      show: false
    },
    series: {
      type: "pie",
      data: getWeekdayDataItems()
    }
  };

  myChart.setOption(option);
}
