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

export function makeCalendarChart(
  dates: string[],
  year: number,
  mountEl: HTMLDivElement
) {
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

  var chartDom = mountEl;
  var myChart = echarts.init(chartDom);
  var option: EChartsOption;

  function getSeriesDataItems() {
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

  const series: HeatmapSeriesOption = {
    type: "heatmap",
    coordinateSystem: "calendar",
    itemStyle: {
      color: "transparent"
    },

    data: getSeriesDataItems()
  };

  option = {
    title: {
      top: 30,
      left: "center",
      text: "🍕 " + year
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
    calendar: [
      {
        top: 80,
        left: 20,
        right: 20,
        cellSize: ["auto", 15],
        range: [`${year}-01-01`, `${year}-06-30`],
        itemStyle: {
          borderWidth: 0.5
        },
        yearLabel: { show: true },
        dayLabel: { firstDay: 1 }
      },
      {
        top: 240,
        left: 20,
        right: 20,
        cellSize: ["auto", 15],
        range: [`${year}-07-01`, `${year}-12-31`],
        itemStyle: {
          borderWidth: 0.5
        },
        yearLabel: { show: true },
        dayLabel: { firstDay: 1 }
      }
    ],
    series: [
      {
        ...series,
        calendarIndex: 0
      },
      {
        ...series,
        calendarIndex: 1
      }
    ]
  };

  myChart.setOption(option);
}
