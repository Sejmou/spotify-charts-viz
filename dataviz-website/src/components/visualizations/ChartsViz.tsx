import type { RouterOutputs } from "../../utils/api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { color } from "d3";
import "chartjs-adapter-moment";
import moment from "moment";
import { useComparisonTrackColors } from "~/store/track-comparison";

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// need to register zoom plugin as well, however import would fail with NextJS SSR as window is not defined
if (typeof window !== "undefined") {
  void import("chartjs-plugin-zoom").then((module) => {
    ChartJS.register(module.default);
  });
}

type Props = {
  data: RouterOutputs["charts"]["getChartPerformanceOfTracks"];
};

const ChartsViz = ({ data }: Props) => {
  const colors = useComparisonTrackColors();

  const chartDatasets = data.trackChartData.map((data) => ({
    id: data.id,
    label: data.name,
    data: data.chartEntries?.map((c) => c?.rank || null) ?? [],
    backgroundColor: colors[data.id] || "white",
    borderColor: color(colors[data.id] || "white")
      ?.darker(0.5)
      .toString(),
  }));

  const chartData = {
    labels: data.dates.map((d) => moment(d)),
    datasets: chartDatasets,
  };

  return (
    <Line
      className="relative"
      data={chartData}
      datasetIdKey="id"
      options={{
        responsive: true,
        maintainAspectRatio: false,
        spanGaps: false,
        scales: {
          x: {
            type: "time",
            grid: {
              tickColor: "white",
              color: "#222",
            },
            ticks: {
              color: "#fff",
            },
          },
          y: {
            type: "linear",
            reverse: true,
            min: 1,
            max: 50,
            grid: {
              tickColor: "white",
              color: "#333",
            },
            ticks: {
              color: "white",
            },
            title: {
              text: "Chart Position",
              display: true,
              color: "white",
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              title: (context) => {
                // for some reason, context is an array of length 1?!
                // parsed.x is the date timestamp in milliseconds
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                return moment(new Date(context[0]!.parsed.x)).format(
                  "dddd, MMMM Do YYYY"
                );
              },
            },
          },
          legend: {
            display: false,
          },
          zoom: {
            zoom: {
              drag: {
                enabled: true,
                modifierKey: "alt",
              },
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true,
              },
              mode: "x",
            },
            pan: {
              enabled: true,
            },
            limits: {
              y: {
                min: 1,
                max: 50,
              },
              x: {
                min: moment(data.dates[0]).valueOf(),
                max: moment(data.dates[data.dates.length - 1]).valueOf(),
              },
            },
          },
        },
      }}
    />
  );
};

export default ChartsViz;
