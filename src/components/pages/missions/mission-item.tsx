import { Clock, LocationMarker, Calendar } from "../../ui/icons";
import { BsBookmarkCheck, BsBookmarkCheckFill } from "react-icons/bs";
import { Mission } from "@/store/mission";
import { Loading, Show } from "@/components/ui";
import { useState } from "react";
import { useIntervenant } from "@/store/intervenant";
import { MissionFavori, useMissionFavori } from "@/store/mission-favori";
import { useCandidature } from "@/store/candidature";
import { useLoading, useNotifs } from "@/store/interact";

export default function MissionItem({
  item,
  canApply,
  hasApply,
}: {
  item: Mission;
  canApply: boolean;
  hasApply: boolean;
}) {
  const [userAuthFavori, setUserAuthFavori] = useState<boolean>(
    item.user_auth_favori
  );

  const favori = useMissionFavori();
  const intervenant = useIntervenant();
  const candidature = useCandidature();
  const notifs = useNotifs();
  const loading = useLoading();

  const toggleFavori = () => {
    setUserAuthFavori(!userAuthFavori);
    favori
      .toggle(item.id as number, intervenant.current.id)
      .then((res) => {
        setUserAuthFavori(res.data.user_auth_favori);
        if (!res.data.user_auth_favori) {
          favori.filter((f: MissionFavori) => f.mission.id != item.id);
        }
      })
      .catch(() => {
        setUserAuthFavori(false);
      });
  };

  const apply = () => {
    loading.start(`apply${item.id}`);
    candidature
      .create({
        intervenant_id: intervenant.current.id,
        mission_id: item.id,
      })
      .then((res) => {
        candidature.add(res.data);
      })
      .catch(() => notifs.set("error", "Une erreur c'est produite"))
      .finally(() => {
        loading.stop(`apply${item.id}`);
      });
  };

  const cancel = () => {
    loading.start(`cancel${item.id}`);
    const element = candidature.items.find((c) => c.mission_id == item.id);
    if (element !== undefined) {
      candidature
        .destroy(element.id)
        .then((res) => {
          candidature.filter((c) => c.id != res.data.id);
        })
        .catch(() => notifs.set("error", "Une erreur c'est produite"))
        .finally(() => {
          loading.stop(`cancel${item.id}`);
        });
    }
  };

  return (
    <>
      <div className="border p-3 md:p-6 rounded-md shadow-xl relative">
        <button
          onClick={toggleFavori}
          className="hover:bg-secondary/20 w-16 h-16 inline-flex items-center justify-center rounded-full absolute right-4 top-2"
        >
          {userAuthFavori ? (
            <BsBookmarkCheckFill className="text-secondary w-8 h-8" />
          ) : (
            <BsBookmarkCheck className="text-secondary w-8 h-8" />
          )}
        </button>
        <h3 className="font-semibold text-lg md:text-xl text-darkprimary">
          {item.titre}
        </h3>
        <div className="mt-2 text-gray-700">{item.description}</div>
        <div>
          <div className="flex space-x-1 text-gray-700 items-center mt-4">
            <div className="flex items-center space-x-2">
              {(item.missionCategories as any[]).map((item) => (
                <div
                  key={`categorie${item.id}`}
                  className="text-sm bg-gray-200 rounded-full px-3 py-1"
                >
                  {item.categorie.categorie_nom}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="md:flex md:space-x-4 items-center mt-4">
          <div className="flex space-x-1 text-gray-700 items-center">
            <Clock className="text-gray-700 w-4 h-4" />
            <span>{item.heures_mois}H(Jour) / Mois </span>
          </div>
          <div className="flex space-x-1 text-gray-700 items-center">
            <Clock className="text-gray-700 w-4 h-4" />
            <span>{item.nuits_mois} Nuits / Mois </span>
          </div>

          <div className="flex space-x-1 text-gray-700 items-center">
            <LocationMarker className="text-gray-00 w-4 h-4" />
            <span>
              {item.departement.departement_nom}(
              {item.departement.departement_code})
            </span>
          </div>
          <div className="flex space-x-1 text-gray-700  items-center">
            <Calendar className="text-gray-700 w-4 h-4" />
            <span>
              Du {item.date_debut} au {item.date_fin}
            </span>
          </div>
        </div>
        <div className="mt-4">
          <Show cond={canApply}>
            <button
              onClick={apply}
              className="px-3 py-1.5 rounded-full  bg-secondary text-white text-sm"
            >
              <Loading
                item={`apply${item.id}`}
                text="Postuler"
                alt="En cours.."
              ></Loading>
            </button>
          </Show>
          <Show cond={hasApply}>
            <button
              onClick={cancel}
              className="px-4 py-2 rounded-full  bg-gray-200 text-gray-700"
            >
              <Loading
                item={`cancel${item.id}`}
                text="Annuler ma candidature"
                alt="En cours.."
              ></Loading>
            </button>
          </Show>
        </div>
      </div>
    </>
  );
}
