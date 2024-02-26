import { useErrors, useLoading } from "@/store/interact";
import { useDemande } from "@/store/demande";
import { getHttpClient } from "@/utils/http";
import { API } from "@/config";
import { Loading } from "@/components/ui";
import classNames from "classnames";
import { Ville, useVille } from "@/store/ville";

export default function Coordonnees() {
  const loading = useLoading((state) => state);
  const errors = useErrors((state) => state);

  const demande = useDemande((state) => state);
  const ville = useVille();

  function handleChange(e: React.FormEvent) {
    const target = e.target as HTMLInputElement;
    demande.set({ [target.name]: target.value });
  }

  function handleBooleanChange(name: string, value: boolean) {
    demande.set({ [name]: value });
  }

  function previous() {
    demande.setStep("besoins");
  }

  function next() {
    errors.reset();

    if (!demande.current.accept_terms) {
      errors.set(
        "accept_terms",
        "Veuillez lire et accepter les conditions générales et la politiques de confidentialité"
      );
      window.scroll({ top: 0, behavior: "smooth" });
      return 0;
    }

    if (!demande.current.commercial_use) {
      errors.set(
        "accept_terms",
        "Veuillez accepter que vos informations soient utilisés à des fins commerciales"
      );
      window.scroll({ top: 0, behavior: "smooth" });
      return 0;
    }

    // valider la demande.
    loading.start("submit");
    getHttpClient()
      .post(API.DEMANDES.validerCoordonnees, demande.current)
      .then(() => {
        demande.setStep("rendez-vous");
      })
      .catch((error) => errors.catch(error))
      .finally(() => {
        loading.stop("submit");
      });
  }

  const handleCodePostal = (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement;
    if (target.value != "") {
      ville.simpleSearch({ code_postal: target.value });
    }
  };

  const chooseVille = (item: Ville) => {
    demande.set({ ville: item.ville_nom, code_postal: item.ville_code_postal });
    ville.filter(() => false);
  };

  return (
    <div className={`${demande.step == "coordonnees" ? "" : "hidden"}`}>
      <h3 className="text-xl md:text-2xl font-semibold">Vos coordonnees </h3>
      <div className="grid grid-cols-2 gap-4 mt-5">
        <div>
          <label
            htmlFor="nom"
            className="block mb-2  font-semibold text-darkprimary "
          >
            Prenom
          </label>
          <input
            name="prenom"
            onChange={handleChange}
            type="text"
            id="prenom"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-secondary/50 focus:border-secondary/50 block w-full p-2.5"
            placeholder="Votre prenom"
          />
        </div>
        <div>
          <label
            htmlFor="nom"
            className="block mb-2  font-semibold text-darkprimary "
          >
            Nom
          </label>
          <input
            name="nom"
            onChange={handleChange}
            type="text"
            id="nom"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-secondary/50 focus:border-secondary/50 block w-full p-2.5"
            placeholder="Votre nom"
          />
        </div>
        <div>
          <label
            htmlFor="nom"
            className="block mb-2  font-semibold text-darkprimary "
          >
            Adresse email
          </label>
          <input
            name="email"
            onChange={handleChange}
            type="text"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-secondary/50 focus:border-secondary/50 block w-full p-2.5"
            placeholder="Votre Adresse email"
          />
        </div>
        <div>
          <label
            htmlFor="nom"
            className="block mb-2  font-semibold text-darkprimary "
          >
            Numero de téléphone
          </label>
          <input
            name="telephone"
            onChange={handleChange}
            type="text"
            id="telephone"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-secondary/50 focus:border-secondary/50 block w-full p-2.5"
            placeholder="0687263865"
          />
        </div>
        <div>
          <label
            htmlFor="nom"
            className="block mb-2  font-semibold text-darkprimary "
          >
            Code postal
          </label>
          <input
            name="code_postal"
            onChange={handleCodePostal}
            type="text"
            id="code_postal"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-secondary/50 focus:border-secondary/50 block w-full p-2.5"
            placeholder="Votre Code postal"
          />
        </div>
        <div>
          <label
            htmlFor="nom"
            className="block mb-2  font-semibold text-darkprimary "
          >
            Ville
          </label>
          <input
            name="ville"
            value={demande.current.ville}
            type="text"
            id="ville"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-secondary/50 focus:border-secondary/50 block w-full p-2.5"
            placeholder="Votre ville"
          />
          <div
            className={classNames("relative", {
              hidden: !ville.items.length,
            })}
          >
            <ul className="absolute -top-2 z-20  w-full bg-gray-100 h-[200px] overflow-auto">
              {ville.items.map((item, index) => (
                <li
                  key={`ville${index}`}
                  onClick={() => chooseVille(item)}
                  className="px-4 py-2 border-b border-gray-300 cursor-pointer hover:bg-primary/10"
                >
                  {item.ville_nom}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-span-2">
          Indiquez-nous le code postal où se situerait l'accompagnement.
        </div>

        <div className="col-span-2">
          <div className="flex space-x-2 mt-4">
            <input
              type="checkbox"
              name="accept_terms"
              id="accept_terms"
              checked={demande.current.accept_terms}
              onChange={(e) =>
                handleBooleanChange("accept_terms", e.target.checked)
              }
            />

            <label className="-mt-2">
              {" "}
              J'accepte{" "}
              <a
                href="/conditions-generales"
                className="text-secondary hover:underline"
              >
                {" "}
                les conditions generales d'utilisation de YOUCARE{" "}
              </a>{" "}
              ainsi sa{" "}
              <a
                href="/politique-de-confidentialite"
                className="text-secondary hover:underline"
              >
                {" "}
                politique de confidentialite
              </a>
            </label>
          </div>

          <div className="flex space-x-2 mt-4">
            <input
              type="checkbox"
              name="commercial_user"
              id="commercial_use"
              checked={demande.current.commercial_use}
              onChange={(e) =>
                handleBooleanChange("commercial_use", e.target.checked)
              }
            />
            <label className="-mt-2">
              {" "}
              J'accepte que mes informations soient utilisés à des fins
              commerciales{" "}
            </label>
          </div>
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
          onClick={next}
          className="px-5 md:px-8 py-2 md:py-2.5 md:text-lg text-white bg-secondary rounded-full mt-6"
        >
          <Loading item="submit" text="Continuer" alt="En cours..." />
        </button>
      </div>
    </div>
  );
}
