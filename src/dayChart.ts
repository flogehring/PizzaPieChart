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
  LegendComponent
} from "echarts/components";
import { HeatmapChart, HeatmapSeriesOption } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

export function makeDayChart(dates: string[]) {
  echarts.use([
    TitleComponent,
    CalendarComponent,
    TooltipComponent,
    VisualMapComponent,
    HeatmapChart,
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

  var chartDom = document.getElementById("dayChart")!;
  var myChart = echarts.init(chartDom);
  var option: EChartsOption;

  function getVirtualData() {
    return dates.map((item: string) => {
      const date = new Date(item);
      return {
        value: [item, 0],
        label: {
          formatter: () => "🍕",
          show: true
        },
        additionalData: {
          tooltipText: date.toLocaleString("default", {
            day: "numeric",
            month: "numeric",
            year: "numeric"
          })
        }
      };
    });
  }

  option = {
    title: {
      top: 30,
      left: "center",
      text: "🍕 PunchCard"
    },

    tooltip: {
      formatter: (params: any) => {
        return params.data.additionalData.tooltipText;
      }
    },
    visualMap: {
      min: 0,
      max: 10,
      type: "piecewise",
      orient: "horizontal",
      left: "center",
      top: 65,
      show: false,
      inRange: {
        color: "transparent"
      }
    },
    calendar: {
      top: 120,
      left: 30,
      right: 30,
      cellSize: ["auto", 13],
      range: "2021",
      itemStyle: {
        borderWidth: 0.5
      },
      yearLabel: { show: false },
      dayLabel: { firstDay: 1 }
    },
    series: {
      type: "heatmap",
      coordinateSystem: "calendar",
      itemStyle: {
        color: "transparent"
      },

      data: getVirtualData()
    }
  };

  myChart.setOption(option);
}
