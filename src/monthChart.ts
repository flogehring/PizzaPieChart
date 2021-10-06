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

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function getMonthData(dates: Date[]): [number, number, number][] {
  return months.map((month) => {
    const relevantDates = dates.filter((date) => date.getMonth() === month - 1);
    return [month - 1, 1, relevantDates.length];
  });
}

function getMonthLabels(year: number, months: number[]): string[] {
  return months
    .map((item: number) => `${item}`.padStart(2, "0"))
    .map((monthDateString) => `${year}-${monthDateString}-01T00:00:00.000Z`)
    .map((isoDateString) => new Date(isoDateString))
    .map((date: Date) =>
      date.toLocaleString("default", {
        month: "short"
      })
    );
}

function getPiesLabel(number: number) {
  return "🍕\n".repeat(number);
}

export function makeMonthChart(dates: Date[]) {
  const year = dates[0].getFullYear();
  const monthAxisLabels = getMonthLabels(year, months);

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

  var chartDom = document.getElementById("monthChart")!;
  var myChart = echarts.init(chartDom);
  var option: EChartsOption;

  function getVirtualData() {
    const piesPerMonth = getMonthData(dates);
    return piesPerMonth.map((item) => {
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
      text: `🍕 per month (${dates[0].getFullYear()})`
    },
    xAxis: {
      type: "category",
      data: monthAxisLabels
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
      max: 15,
      type: "continuous",
      orient: "horizontal",
      left: "center",
      top: 65,
      show: false,
      color: ["#0a9e40", "#fff"]
    },

    series: {
      type: "heatmap",
      itemStyle: {
        color: "transparent"
      },

      data: getVirtualData()
    }
  };

  myChart.setOption(option);
}
