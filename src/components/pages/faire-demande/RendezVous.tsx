import { useErrors, useLoading } from "@/store/interact";
import { useDemande } from "@/store/demande";
import { FC, useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Loading } from "@/components/ui";

interface CurrentDate {
  year: number;
  month: number;
  date: number;
}
type DayHoraire = {
  date: any;
  nuit: boolean;
  heures: string[];
};

interface RendezVousProps {
  submit: () => void;
}

const testDate = (date1: CurrentDate, date2: CurrentDate): boolean =>
  date1.year == date2.year &&
  date1.date == date2.date &&
  date1.month == date2.month;

const addZero = (index: number) => (index > 9 ? `${index}` : `0${index}`);
const isset = (value: number | string) =>
  value != undefined && value != null && value != "";

const RendezVous: FC<RendezVousProps> = ({ submit }) => {
  const demande = useDemande();
  const [hour, setHour] = useState<string>("");

  function previous() {
    demande.setStep("informations");
  }

  const [currentDate, setCurrentDate] = useState<CurrentDate>(
    {} as CurrentDate
  );
  const [selectedDate, setSelectedDate] = useState<CurrentDate>(
    {} as CurrentDate
  );

  useEffect(() => {
    const date = new Date();
    setCurrentDate((obj) => ({
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
    }));
  }, []);

  function createDays(): number[] {
    const date = new Date(
      currentDate.year as number,
      (currentDate.month as number) + 1,
      0
    );
    const tab = [];
    for (let i = 1; i < date.getDate() + 1; i++) {
      tab.push(i);
    }
    return tab;
  }

  function monthLabel(month: number): string {
    const labels = [
      "Janvier",
      "Fevrier",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Aout",
      "Septembre",
      "Octobre",
      "Novembre",
      "Decembre",
    ];
    return labels[month];
  }

  function nextMonth(): void {
    setCurrentDate((value) => ({
      ...value,
      month: value.month + 1,
    }));
  }

  function previousMonth(): void {
    setCurrentDate((value) => ({
      ...value,
      month: value.month - 1,
    }));
  }

  function isActiveDate(item: number): boolean {
    const date = new Date();
    return date.getMonth() == currentDate.month && currentDate.date == item;
  }

  function isSelected(item: number): boolean {
    const temp = { year: 0, month: 0, date: 0 };
    return testDate(
      { ...temp, ...selectedDate },
      { ...temp, ...currentDate, date: item }
    );
  }

  function selectDay(item: number) {
    setSelectedDate((values) => ({ ...values, ...currentDate, date: item }));
  }
  function heures() {
    return Array.from({ length: 17 - 9 }, (_, i) => i + 9)
      .map((item) => [`${addZero(item)}:00`, `${addZero(item)}:30`])
      .flat();
  }

  function chooseHour(item: string) {
    demande.set({
      rendez_vous: `${selectedDate.year}-${addZero(
        selectedDate.month + 1
      )}-${addZero(selectedDate.date)} ${item}`,
    });
    setHour(item);
  }

  return (
    <div className={`${demande.step == "rendez-vous" ? "" : "hidden"}`}>
      <h3 className="text-xl md:text-2xl font-semibold">
        Prenez rendez-vous ?
      </h3>

      <div className="py-4">
        <h4 className="text-lg mb-2"> Precisez un Jour </h4>
        <div className="bg-gray-50 border overflow-hidden rounded-md">
          <div className="flex items-center justify-between p-4 ">
            <button
              onClick={previousMonth}
              className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-secondary hover:text-white transition-colors"
            >
              <AiOutlineLeft className="w-5 h-5" />
            </button>
            <span className="md:text-xl text-darkprimary font-semibold">
              {monthLabel(currentDate.month)}
            </span>
            <button
              onClick={nextMonth}
              className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-secondary hover:text-white transition-colors"
            >
              <AiOutlineRight className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-7">
            {createDays().map((item, index) => (
              <div
                key={`day${index}`}
                onClick={() => selectDay(item)}
                className={`${
                  isActiveDate(item)
                    ? "bg-secondary text-white border border-secondary"
                    : ""
                } 
                ${
                  isSelected(item)
                    ? "bg-green-600 text-white border-green-600"
                    : ""
                }
                border border-gray-300 p-4 text-center`}
              >
                <div> {item}</div>
              </div>
            ))}
          </div>
        </div>
        <div
          className={`${
            selectedDate.date != undefined && selectedDate.date != null
              ? ""
              : "hidden"
          }`}
        >
          <h4 className="text-lg mb-2 mt-4"> Precisez une heure </h4>
          <ul className="grid grid-cols-2 gap-2">
            {heures().map((item, index) => (
              <li
                key={`heure${index}`}
                onClick={() => chooseHour(item)}
                className={`${
                  hour == item
                    ? "bg-secondary text-white border border-secondary"
                    : "text-secondary"
                } cursor-pointer border-2 p-4 flex items-center justify-center border-secondary `}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={previous}
          className="px-5 md:px-8 py-2 md:py-2.5 md:text-xl text-secondary border-secondary border-2 rounded-full mt-6"
        >
          Précédent
        </button>

        <button
          onClick={submit}
          className={`${
            isset(demande.current.rendez_vous as string) ? "" : "hidden"
          } px-5 md:px-8 py-2 md:py-2.5 md:text-lg text-white bg-secondary rounded-full mt-6`}
        >
          <Loading item="submit" text="Continuer" alt="En cours.." />
        </button>
      </div>
    </div>
  );
};

export default RendezVous;
