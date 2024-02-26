import { Disponibilite } from "@/types";
import classNames from "classnames";
import { format } from "date-fns";
import { FC, useEffect, useState } from "react";
import {
  MdAdd,
  MdChevronLeft,
  MdChevronRight,
  MdDelete,
  MdEdit,
} from "react-icons/md";
import { useDisplay } from "@/store/interact";
import { useDisponibilite } from "@/store/disponibilite";
import { useIntervenant } from "@/store/intervenant";
import DeleteDisponibilite from "./DeleteDisponibilite";
import MutateDisponibilite from "./MutateDisponibilite";

const days = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

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

interface IntervenantCalendarProps {
  disponibilites: Disponibilite[];
  mode: string;
}

interface CalendarCell {
  day: number;
  month: string;
  disponibilites: Disponibilite[];
  date: Date;
}

const IntervenantCalendar: FC<IntervenantCalendarProps> = ({
  disponibilites,
  mode,
}) => {
  const [month, setMonth] = useState<number>(0);
  const [year, setYear] = useState<number>(0);
  const display = useDisplay();

  const intervenant = useIntervenant();
  const disponibilite = useDisponibilite();

  useEffect(() => {
    const date = new Date();
    setMonth(date.getMonth());
    setYear(date.getFullYear());
  }, []);

  const goNextMonth = () => {
    if (month == 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  };

  const goPreviousMonth = () => {
    if (month == 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  };

  const fillCalender = () => {
    const date = new Date();
    date.setMonth(month);
    date.setFullYear(year);
    date.setDate(0);

    const lastMonthLastDay = new Date(date.getTime() - 1000 * 60 * 60);
    const nextMonthFirstDay = new Date();
    let currentMonthLastDay = new Date();

    if (month == 11) {
      nextMonthFirstDay.setFullYear(year + 1);
      nextMonthFirstDay.setMonth(0);
    } else {
      nextMonthFirstDay.setMonth(month + 1);
    }

    nextMonthFirstDay.setDate(0);
    currentMonthLastDay = new Date(
      nextMonthFirstDay.getTime() - 1000 * 60 * 60
    );

    const calendarCells: CalendarCell[] = [];
    for (let i = 0; i < date.getDay(); i++) {
      calendarCells.unshift({
        day: lastMonthLastDay.getDate() - i,
        month: "previous",
        date: new Date(
          lastMonthLastDay.getFullYear(),
          lastMonthLastDay.getMonth(),
          lastMonthLastDay.getDate() - i
        ),
        disponibilites: [],
      });
    }

    for (let i = 0; i < currentMonthLastDay.getDate(); i++) {
      calendarCells.push({
        day: i + 1,
        month: "current",
        date: new Date(
          currentMonthLastDay.getFullYear(),
          currentMonthLastDay.getMonth(),
          i + 1
        ),
        disponibilites: [],
      });
    }

    const remainingWeekDays = 7 - (calendarCells.length % 7);

    for (let i = 0; i < remainingWeekDays; i++) {
      calendarCells.push({
        day: i + 1,
        month: "next",
        date: new Date(
          nextMonthFirstDay.getFullYear(),
          nextMonthFirstDay.getMonth(),
          i + 1
        ),
        disponibilites: [],
      });
    }

    return calendarCells.map((cell) => {
      // Check if the cell has
      let newCell: CalendarCell = { ...cell, disponibilites: [] };

      disponibilites.forEach((item: Disponibilite) => {
        const itemDate = new Date(item.date_debut);

        if (
          itemDate.getDate() == cell.date.getDate() &&
          itemDate.getMonth() == cell.date.getMonth() &&
          itemDate.getFullYear() == itemDate.getFullYear()
        ) {
          newCell.disponibilites.push(item);
        }
      });

      return newCell;
    });
  };

  const addDisponibilite = (date: Date) => {
    disponibilite.setMutationMode("create");
    disponibilite.setForm({
      type: "1",
      date_debut: date,
      intervenant_id: intervenant.current.id,
    });
    display.show("add_disponibilite");
  };

  const editDisponibilite = (item: Disponibilite) => {
    disponibilite.setMutationMode("edit");
    disponibilite.set(item);
    disponibilite.setForm({
      date_debut: new Date(item.date_debut),
      heure_debut: format(new Date(item.date_debut), "HH:mm"),
      heure_fin: format(new Date(item.date_fin), "HH:mm"),
      type: item.type,
      intervenant_id: item.intervenant_id,
    });
    display.show("add_disponibilite");
  };

  const deleteDisponibilite = (item: Disponibilite) => {
    disponibilite.set(item);
    display.show("delete_disponibilite");
  };

  return (
    <div className="">
      <div className="flex justify-center items-center space-x-4">
        <button
          onClick={goPreviousMonth}
          className="p-2 rounded-full bg-gray-100"
        >
          <MdChevronLeft className="text-gray-700 w-4 h-4" />
        </button>
        <span className="text-xl">
          {months[month]} {year}
        </span>
        <button onClick={goNextMonth} className="p-2 rounded-full bg-gray-100">
          <MdChevronRight className="text-gray-700 w-4 h-4" />
        </button>
      </div>
      <div className="mt-6 w-full">
        <div className="grid grid-cols-7">
          {days.map((item, index) => (
            <div className="px-2 " key={`day${index}`}>
              {item}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 mt-1">
          {fillCalender().map((item, index) => (
            <div
              key={`cell${index}`}
              className={classNames(
                "h-48 border   border-white bg-gray-50 relative",
                {
                  "bg-gray-50 text-gray-400": item.month != "current",
                  "bg-blue-50": item.month == "current",
                  "calendar-cell hover:border-secondary hover:border-2 ":
                    mode == "edit",
                }
              )}
            >
              <div className="p-2">
                {`${item.day < 10 ? `0${item.day}` : item.day}`}{" "}
              </div>
              <div className="mt-1 px-1">
                {item.disponibilites.length ? (
                  <div>
                    {item.disponibilites.map((dis) => (
                      <div
                        key={`dis${dis.id}`}
                        className="disponibilite-card relative"
                      >
                        <div className="cursor-pointer bg-primary p-2 rounded-md flex items-center justify-between text-white mt-2">
                          <span>
                            {format(new Date(dis.date_debut), "HH:mm")}
                          </span>
                          -
                          <span>{format(new Date(dis.date_fin), "HH:mm")}</span>
                        </div>
                        <div className="disponibilite-btns hidden absolute -top-6 right-2 space-x-1">
                          <button
                            onClick={() => editDisponibilite(dis)}
                            className="hover:text-secondary rounded-md text-white bg-gray-400 p-2"
                          >
                            <MdEdit />
                          </button>
                          <button
                            onClick={() => deleteDisponibilite(dis)}
                            className="hover:text-secondary rounded-md text-white bg-gray-400 p-2"
                          >
                            <MdDelete />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
              {mode == "edit" ? (
                <div
                  className={classNames("", {
                    "add-button hidden mt-2 text-center":
                      item.disponibilites.length,
                    "add-button hidden absolute top-[35%] left-[35%]":
                      item.disponibilites.length == 0,
                  })}
                >
                  <button
                    onClick={() => addDisponibilite(item.date)}
                    className="p-3 rounded-full border-2 border-secondary text-secondary"
                  >
                    <MdAdd />
                  </button>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
      {mode == "edit" ? <MutateDisponibilite /> : null}
      {mode == "edit" ? <DeleteDisponibilite /> : null}
    </div>
  );
};

export default IntervenantCalendar;
