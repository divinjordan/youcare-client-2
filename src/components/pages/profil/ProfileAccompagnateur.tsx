import { allServices as services } from "@/data/services-list";
import departements from "@/data/departements-reduces.json";
import { useErrors, useLoading, useNotifs } from "@/store/interact";
import { useState } from "react";
import { useIntervenant } from "@/store/intervenant";
import { getHttpClient } from "@/utils/http";
import { API } from "@/config";
import { Loading, Notifs, Show } from "@/components/ui";

export default function ProfileAccompagnateur() {
  const notifs = useNotifs();
  const loading = useLoading();
  const errors = useErrors();

  const intervenant = useIntervenant();

  const [deps, setDeps] = useState<string[]>([]);

  function handleChange(e: any) {
    intervenant.set({
      [e.target.name]: e.target.value,
    });
  }

  const handleDomainesCompetences = (e: any) => {
    const value = e.target.value;
    intervenant.set({
      domaines_competences: intervenant.current.domaines_competences.includes(
        value
      )
        ? intervenant.current.domaines_competences.filter(
            (s: any) => s != value
          )
        : [...intervenant.current.domaines_competences, value],
    });
  };

  const chooseZone = (value: string) => {
    intervenant.set({
      zones_intervention: intervenant.current.zones_intervention.includes(value)
        ? intervenant.current.zones_intervention.filter((s: any) => s != value)
        : [value, ...intervenant.current.zones_intervention],
    });
  };

  function searchZone(event: any) {
    setDeps(() => departements);
    setDeps((items) =>
      items.filter((e) =>
        e.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  }

  function submit() {
    loading.start("submit");
    getHttpClient()
      .post(
        API.INTERVENANT.profilAccompagnateur(intervenant.current.id as number),
        {
          ...intervenant.current,
        }
      )
      .then(() => {
        // clear all data into session.
        window.sessionStorage.removeItem("intervenant");
        notifs.set(
          "success",
          "Les informations ont ete enregistrees avec succes"
        );
      })
      .catch((error) => errors.catch(error))
      .finally(() => loading.stop("submit"));
  }

  return (
    <>
      <Notifs />

      <p className=" mt-1 text-gray-700">
        Tous les champs avec le <span className="text-secondary">(*)</span>{" "}
        doivent être renseignés pour que votre profil soit validé par le
        système. Rassurez qu'ils soient bien remplis.
      </p>

      <div className="mt-6">
        <div className="mb-6">
          <label
            htmlFor="presentation"
            className="block mb-2  font-semibold text-darkprimary "
          >
            Présentez-vous en quelques lignes et racontez-nous ce que vous aimez
            faire dans la vie ! <span className=" text-secondary">*</span>
          </label>
          <textarea
            name="presentation"
            value={intervenant.current.presentation}
            onChange={handleChange}
            id="presenation"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-secondary/50 focus:border-secondary/50 block w-full p-2.5"
            rows={4}
          ></textarea>
        </div>
        <div className="mb-6">
          <label
            htmlFor="domaine_activite"
            className="block mb-2  font-semibold text-darkprimary "
          >
            Quel est votre domaine d’étude / d’activité ?{" "}
            <span className=" text-secondary">*</span>
          </label>
          <input
            name="domaine_activite"
            value={intervenant.current.domaine_activite}
            onChange={handleChange}
            id="domaine_activite"
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-secondary/50 focus:border-secondary/50 block w-full p-2.5"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="etablissement"
            className="block mb-2  font-semibold text-darkprimary "
          >
            Nom de votre établissement{" "}
            <span className=" text-secondary">*</span>
          </label>
          <input
            name="etablissement"
            value={intervenant.current.etablissement}
            onChange={handleChange}
            id="etablissement"
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-secondary/50 focus:border-secondary/50 block w-full p-2.5"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="details_experiences"
            className="block mb-2  font-semibold text-darkprimary "
          >
            Dites-nous en un peu plus sur vos différentes expériences ?{" "}
            <span className=" text-secondary">*</span>
          </label>
          <textarea
            name="details_experiences"
            value={intervenant.current.details_experiences}
            onChange={handleChange}
            id="details_experiences"
            rows={4}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-secondary/50 focus:border-secondary/50 block w-full p-2.5"
          ></textarea>
        </div>

        <div className="col-span-2 mb-6">
          <h4 className="block mb-2  font-semibold text-darkprimary ">
            {" "}
            Avez-vous déjà d’expériences avec les personnes âgées ? (oui/non){" "}
            <span className=" text-secondary">*</span>
          </h4>
          <label
            htmlFor="experience_senior_oui"
            className="flex items-center gap-2"
          >
            <input
              type="radio"
              id="experience_senior_oui"
              name="experience_senior"
              value="OUI"
              onChange={handleChange}
              checked={
                intervenant.current.experience_senior == "OUI" ? true : false
              }
              className="text-secondary focus:ring-secondary/50 focus:border-secondary/50"
            />
            <span>OUI</span>
          </label>
          <label
            htmlFor="experience_senior_non"
            className="flex items-center gap-2"
          >
            <input
              type="radio"
              id="experience_senior_non"
              name="experience_senior"
              value="NON"
              onChange={handleChange}
              checked={
                intervenant.current.experience_senior == "NON" ? true : false
              }
              className="text-secondary focus:ring-secondary/50 focus:border-secondary/50"
            />
            <span>Non</span>
          </label>
        </div>

        <div className="col-span-1 mb-6">
          <h4 className="block mb-2  font-semibold text-darkprimary ">
            {" "}
            Avez vous un permis de conduire{" "}
            <span className=" text-secondary">*</span>
          </h4>
          <label
            htmlFor="permis_de_conduire_oui"
            className="flex items-center gap-2"
          >
            <input
              type="radio"
              id="permis_de_conduire_oui"
              name="permis_de_conduire"
              value="OUI"
              onChange={handleChange}
              checked={
                intervenant.current.permis_de_conduire == "OUI" ? true : false
              }
              className="text-secondary focus:ring-secondary/50 focus:border-secondary/50"
            />
            <span>OUI</span>
          </label>
          <label
            htmlFor="permis_de_conduire_non"
            className="flex items-center gap-2"
          >
            <input
              type="radio"
              id="permis_de_conduire_non"
              name="permis_de_conduire"
              value="NON"
              onChange={handleChange}
              checked={
                intervenant.current.permis_de_conduire == "NON" ? true : false
              }
              className="text-secondary focus:ring-secondary/50 focus:border-secondary/50"
            />
            <span>Non</span>
          </label>
        </div>

        <Show
          className="col-span-1 mb-6"
          cond={intervenant.current.permis_de_conduire == "OUI"}
        >
          <h4 className="block mb-2  font-semibold text-darkprimary ">
            {" "}
            Avez vous une voiture ?{" "}
          </h4>
          <label
            htmlFor="avoir_voiture_oui"
            className="flex items-center gap-2"
          >
            <input
              type="radio"
              id="avoir_voiture_oui"
              name="avoir_voiture"
              value="OUI"
              onChange={handleChange}
              checked={
                intervenant.current.avoir_voiture == "OUI" ? true : false
              }
              className="text-secondary focus:ring-secondary/50 focus:border-secondary/50"
            />
            <span>OUI</span>
          </label>
          <label
            htmlFor="avoir_voiture_non"
            className="flex items-center gap-2"
          >
            <input
              type="radio"
              id="avoir_voiture_non"
              name="avoir_voiture"
              value="NON"
              onChange={handleChange}
              checked={
                intervenant.current.avoir_voiture == "NON" ? true : false
              }
              className="text-secondary focus:ring-secondary/50 focus:border-secondary/50"
            />
            <span>Non</span>
          </label>
        </Show>

        <div className="mb-6">
          <label className="block mb-2  font-semibold text-darkprimary ">
            Quels sont vos domaines de competences
            <span className=" text-secondary">*</span>
          </label>
          {services.map((item, index) => (
            <label
              key={`service${index}`}
              htmlFor={item.title.split(" ").join("")}
              className="flex items-center gap-2"
            >
              <input
                type="checkbox"
                id={item.title.split(" ").join("")}
                name="domaines_competences"
                value={item.title}
                onChange={handleDomainesCompetences}
                checked={
                  intervenant.current.domaines_competences.includes(item.title)
                    ? true
                    : false
                }
                className="text-secondary focus:ring-secondary/50 focus:border-secondary/50"
              />
              <span>{item.title}</span>
            </label>
          ))}
        </div>

        <div className="mt-8 mb-4 border-t"></div>
        <h4 className="block text-lg md:text-xl  font-semibold text-darkprimary ">
          Vos zones d'intervention
        </h4>

        <div className="mt-4">
          <div className="flex w-full flex-wrap">
            <div className="w-3/5">
              <span className="text-gray-700 mt-6">
                Entrer le nom du departement dans lequelle vous pouvez
                intervenir.
              </span>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-secondary/50 focus:border-secondary/50 block p-2.5 mt-4 w-full"
                onChange={searchZone}
                placeholder="Paris, Gironde..."
              ></input>
              <div className="flex flex-wrap  gap-3 mt-4 text-darkprimary">
                {deps.map((item, index) => (
                  <div
                    key={`service${index}`}
                    onClick={() => chooseZone(item)}
                    className="cursor-pointer p-3 px-4 rounded-full border border-secondary text-darkprimary hover:bg-secondary hover:text-white"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex w-2/5 pl-8 pt-4">
              <div
                className={`${
                  intervenant.current.zones_intervention.length == 0
                    ? "bg-orange-500"
                    : "bg-gray-100"
                } w-full p-2 md:p-4`}
              >
                <Show
                  cond={intervenant.current.zones_intervention.length == 0}
                  className="text-white"
                >
                  Vous n'avez choisi aucune zone. Veuillez rechercher et choisir
                  une zone d'intervention.
                </Show>
                <ul className="mt-3">
                  {intervenant.current.zones_intervention.map(
                    (item: any, index: number) => (
                      <li
                        key={`service${index}`}
                        className="mb-2 bg-secondary rounded-md text-white flex justify-between px-4 py-3"
                      >
                        <span>{item}</span>
                        <button
                          onClick={() => chooseZone(item)}
                          className="p-1 rounded-full hover:bg-white/50"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.4}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="pb-12"></div>
      </div>

      <div className="h-[100px]"></div>
      <div className="mt-8 border-t fixed bottom-0 bg-white w-full py-4">
        <button
          onClick={submit}
          className="bg-secondary text-white px-8 rounded-full py-3 "
        >
          <Loading
            item="submit"
            text="Enregistrer"
            alt="Enregistrement en cours..."
          />
        </button>
      </div>
    </>
  );
}
