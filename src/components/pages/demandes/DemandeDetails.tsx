import { useDemande } from "@/store/demande";
import { demande_status_enums, demande_status_labels } from "@/data/data";
import { useErrors, useLoading } from "@/store/interact";
import Show from "@/components/common/Show";
import { useRouter } from "next/router";
import { getHttpClient } from "@/utils/http";
import { DemandeStatusFormFields } from "@/types";
import { useForm } from "@/components/hooks/useForm";
import { Loading } from "@/components/ui";
import { PAGES } from "@/config";
import { format } from "date-fns";
import frLocale from "date-fns/locale/fr";
import { useMission } from "@/store/mission";
import { useEffect } from "react";
import MissionCard from "../admin/MissionCard";

const details_information = {
  email: "Adresse email",
  telephone: "Numero de telephone",
  code_postal: "Code postal",
  ville: "Ville",
};

export default function DemandeDetails() {
  const demande = useDemande();
  const mission = useMission();
  const loading = useLoading();
  const errors = useErrors();
  const router = useRouter();

  const statusForm = useForm(DemandeStatusFormFields, {
    status: demande.current.status,
  });

  useEffect(() => {
    mission.search({ demande_id: demande.current.id as number });
  }, [demande.current]);

  function saveChange() {
    loading.start("saveChange");
    getHttpClient()
      .put(`demandes/${demande.current.id}`, statusForm.values)
      .then((res) => {
        demande.set(res.data);
        demande.setAll(
          demande.items.map((item) => {
            if (item.id == res.data.id) return res.data;
            else return item;
          })
        );
        statusForm.empty();
      })
      .catch((error) => errors.catch(error))
      .finally(() => {
        loading.stop("saveChange");
      });
  }

  function creerMission() {
    router.push(PAGES.ADMIN.creerMission(demande.current.id as number));
  }

  return (
    <div>
      <div className="shadow-md p-4 1 bg-white">
        <div className="mb-4 flex justify-end">
          {demande.current.status == demande_status_enums.MISSION_CREEE ? (
            <div className="bg-green-100 text-green-800 p-1 px-4 rounded-full">
              Annonce déjà créée
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Show
                cond={demande.current.status == demande_status_enums.VALIDE}
                className="space-x-2"
              >
                <button
                  onClick={creerMission}
                  className="bg-secondary px-4 py-2 text-white rounded-full"
                >
                  Créer l'annonce
                </button>
              </Show>
              <select
                onChange={statusForm.handleChange}
                name="status"
                value={statusForm.values.status}
                className="border border-gray-200  px-2 py-2 w-[130px]"
              >
                {Object.entries(demande_status_labels)
                  .filter(([key, label]) => key != "3")
                  .map(([key, label], index) => (
                    <option key={`status${index}`} value={key}>
                      {label}
                    </option>
                  ))}
              </select>

              <Show cond={statusForm.hasChanged} className="space-x-2">
                <button
                  onClick={saveChange}
                  className="bg-primary px-4 py-2 text-white rounded-full"
                >
                  <Loading item="saveChange" text="Enregistrer" alt="..." />
                </button>
              </Show>
            </div>
          )}
        </div>
        <h3 className="text-2xl sm:text-3xl font-semibold text-darkprimary mb-2">
          {demande.current.employeur?.user.nom +
            " " +
            demande.current.employeur?.user.prenom}
        </h3>
        {Object.entries(details_information).map(([key, label], index) => (
          <div
            className="flex flex-wrap py-2 border-t"
            key={`information${index}`}
          >
            <div className="w-full sm:w-2/5 text-gray-700">{label}</div>
            <div className="w-full sm:w-3/5">
              {(demande.current.employeur?.user as Record<any, any>)[key]}
            </div>
          </div>
        ))}
        <div className="flex flex-wrap py-2 border-t">
          <div className="w-full sm:w-2/5 text-gray-700">
            Date enregistrement
          </div>
          <div className="w-full sm:w-3/5">
            {format(
              new Date(demande.current.created_at),
              "dd MMMM yyyy - HH:mm",
              {
                locale: frLocale,
              }
            )}
          </div>
        </div>
        <div className="flex flex-wrap py-2 border-t">
          <div className="w-full sm:w-2/5 text-gray-700">Rendez-vous</div>
          <div className="w-full sm:w-3/5">
            {" "}
            {format(
              new Date(demande.current.rendez_vous),
              "dd MMMM yyyy - HH:mm",
              {
                locale: frLocale,
              }
            )}
          </div>
        </div>
        <div className="flex flex-wrap py-2 border-t">
          <div className="w-full sm:w-2/5 text-gray-700">Services demandés</div>
          <div className="w-full sm:w-3/5">
            <ul className="">
              {demande.current.categories?.map((item, index) => (
                <li
                  className="flex items-center space-x-2"
                  key={`categorie${index}`}
                >
                  <span>
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                  <span> {item.categorie?.categorie_nom}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {demande.current.status == demande_status_enums.MISSION_CREEE &&
      mission.items.length ? (
        <div className="mt-8">
          <h3 className="text-2xl mb-2 text-darkprimary font-semibold">
            Annonce resultante{" "}
          </h3>
          <MissionCard item={mission.items[0]} />
        </div>
      ) : null}
    </div>
  );
}
