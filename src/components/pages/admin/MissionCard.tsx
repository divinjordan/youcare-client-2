import { MdGroup, MdSchedule } from "react-icons/md";
import { Clock, LocationMarker, Calendar } from "../../ui/icons";
import { Mission, useMission } from "@/store/mission";
import classNames from "classnames";
import { useCandidature } from "@/store/candidature";
import CandidaturesModal from "./CandidaturesModal";

export default function MissionItem({ item }: { item: Mission }) {
  const mission = useMission();
  const candidature = useCandidature();
  return (
    <>
      <div className="p-3 md:p-6 shadow-xl relative">
        <h3 className="font-semibold text-lg md:text-xl text-darkprimary">
          {item.titre}
        </h3>
        <div className="mt-2 text-gray-700">{item.description}</div>
        <div>
          <div className="flex space-x-1 text-gray-700 items-center mt-2">
            <div className="flex flex-wrap  items-center space-x-2">
              {(item.missionCategories as any[]).map((item) => (
                <div
                  key={`categorie${item.id}`}
                  className="text-sm bg-primary text-white rounded-full px-3 py-1 mt-2"
                >
                  {item.categorie.categorie_nom}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="md:flex md:space-x-4 items-center mt-2">
          <div className="flex space-x-1 text-gray-700 items-center">
            <Clock className="text-gray-700 w-4 h-4" />
            <span>{item.heures_mois}H(Jour) / Mois </span>
          </div>
          <div className="flex space-x-1 text-gray-700 items-center">
            <Clock className="text-gray-700 w-4 h-4" />
            <span>{item.nuits_mois} Nuits / Mois </span>
          </div>
        </div>
        <div className="md:flex md:space-x-4 items-center mt-2">
          <div className="flex space-x-1 text-gray-700 items-center">
            <LocationMarker className="text-gray-00 w-4 h-4" />
            <span>
              {item.departement.departement_nom}(
              {item.departement.departement_code})
            </span>
          </div>
        </div>
        <div className="md:flex md:space-x-4 items-center mt-2">
          <div className="flex space-x-1 text-gray-700  items-center">
            <Calendar className="text-gray-700 w-4 h-4" />
            <span>
              Du {item.date_debut} au {item.date_fin}
            </span>
          </div>
        </div>
        <div className="mt-2">
          <button
            onClick={() => {
              candidature.search({ mission_id: item.id });
            }}
            className="flex space-x-1 text-gray-700 items-center hover:underline"
          >
            <MdGroup className="text-secondary w-5 h-5" />
            <span>{item.totalCandidatures}</span> <span> Candidatures </span>
          </button>
        </div>
        <div className="mt-2">
          <div
            className={classNames(
              "inline-flex flex space-x-1  items-center text-white p-2 rounded-full",
              {
                "bg-red-500": item.status == mission.status.MISSION_STOP,
                "bg-lime-600": item.status == mission.status.MISSION_END,
                "bg-primary": item.status == mission.status.MISSION_START,
                "bg-cyan-600": item.status == mission.status.MISSION_SELECT,
              }
            )}
          >
            <MdSchedule className="w-5 h-5" />
            <span>{mission.statusLabels[item.status]}</span>
          </div>
        </div>
      </div>
    </>
  );
}
