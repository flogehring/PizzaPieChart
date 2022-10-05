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

const dayLabels = getWeekDays(navigator.language);
const daysOfTheWeek = [0, 1, 2, 3, 4, 5, 6];


function getWeekDays(locale: string) {
  const baseDate = new Date(2022, 8, 25); // just a Sunday
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    weekDays.push(baseDate.toLocaleDateString(locale, { weekday: 'long' }));
    baseDate.setDate(baseDate.getDate() + 1);
  }
  return weekDays;
}

function getWeekdayData(dates: Date[]): { value: number, name: string }[] {
  return daysOfTheWeek.map(weekday => {
    console.log(weekday);
    const sumOfHits = dates.filter(date => date.getDay() === weekday).length;
    return { value: sumOfHits, name: dayLabels[weekday] };
  });
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
        value: item.value,
        name: item.name,
        label: {
          formatter: () => `${item.name}: ${item.value} 🍕`,
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
