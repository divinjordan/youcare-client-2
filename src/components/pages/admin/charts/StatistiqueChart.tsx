import React, { FC, useEffect, useState } from "react";
import Chart, { ChartItem } from "chart.js/auto";
import add from "date-fns/add";
import { format } from "date-fns";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const months = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

interface StatistiqueChartProps {
  model: any;
  name: string;
  title: string;
  borderColor?: string;
}

const StatistiqueChart: FC<StatistiqueChartProps> = ({
  model,
  name,
  title,
  borderColor = "#06B6D4",
}) => {
  const [month, setMonth] = useState<number>(0);
  const [year, setYear] = useState<number>(0);

  useEffect(() => {
    const date = new Date();
    const m = date.getMonth();
    const y = date.getFullYear();
    updateDateFilter(y, m);
  }, []);

  const fetchData = (date: any, currentYear: number, currentMonth: number) => {
    const monthDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    const nextMonth = add(
      new Date(
        `${currentYear}-${
          currentMonth > 9 ? currentMonth + 1 : `0${currentMonth + 1}`
        }-01 00:00:00`
      ),
      {
        days: monthDays,
      }
    );
    // Fetch demandes.
    model
      .fetchStats(format(date, "yy-MM-01"), format(nextMonth, "yy-MM-01"))
      .then((res: any) => {
        const days = Array.from({ length: monthDays }).map((_, index) => {
          return {
            position: index + 1,
            format: `${currentYear}-${
              currentMonth > 9 ? currentMonth + 1 : `0${currentMonth + 1}`
            }-${index + 1 > 9 ? index + 1 : `0${index + 1}`}`,
          };
        });

        const container = document.getElementById(`${name}-chart-container`);
        if (!container) return 0;

        // Remove and recreate the chart.
        if (document.getElementById(name) as unknown as HTMLElement) {
          container.innerHTML = "";
        }
        container.innerHTML = `<canvas id=${name}></canvas>`;

        new Chart(document.getElementById(name) as unknown as ChartItem, {
          type: "line",
          data: {
            labels: days.map((d) => d.position),
            datasets: [
              {
                label: name,
                borderColor,
                data: days.map((d) => {
                  const item = res.data.find(
                    (item: any) => item.day == d.format
                  );
                  if (item) return item.total;
                  return 0;
                }),
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: false,
              },
            },
          },
        });
      });
  };

  const goNextMonth = () => {
    let m = month;
    let y = year;
    if (month == 11) {
      y = year + 1;
      m = 0;
    } else {
      m = month + 1;
    }
    updateDateFilter(y, m);
  };

  const goPreviousMonth = () => {
    let m = month;
    let y = year;
    if (month == 0) {
      y = year - 1;
      m = 11;
    } else {
      m = month - 1;
    }
    updateDateFilter(y, m);
  };

  const updateDateFilter = (y: number, m: number) => {
    setYear(y);
    setMonth(m);
    const date = new Date();
    date.setFullYear(y);
    date.setMonth(m);
    fetchData(date, y, m);
  };

  return (
    <>
      <div className="flex justify-between mb-4">
        <h3 className="text-lg text-darkprimary font-semibold">{title}</h3>
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={goPreviousMonth}
            className="p-2 rounded-full bg-gray-100"
          >
            <MdChevronLeft className="text-gray-700 w-4 h-4" />
          </button>
          <span className="text-gray-500">
            {months[month]} {year}
          </span>
          <button
            onClick={goNextMonth}
            className="p-2 rounded-full bg-gray-100"
          >
            <MdChevronRight className="text-gray-700 w-4 h-4" />
          </button>
        </div>
      </div>
      <div id={`${name}-chart-container`}></div>
    </>
  );
};

export default StatistiqueChart;
