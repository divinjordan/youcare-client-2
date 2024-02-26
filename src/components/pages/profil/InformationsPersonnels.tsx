import { Errors, Loading, Notifs, Show } from "@/components/ui";
import { API } from "@/config";
import { useErrors, useLoading, useNotifs } from "@/store/interact";
import { useIntervenant } from "@/store/intervenant";
import { getHttpClient } from "@/utils/http";

export default function InformationsPersonnels() {
  const notifs = useNotifs();
  const errors = useErrors();
  const loading = useLoading();
  const intervenant = useIntervenant();

  function uploadAvatar(event: any) {
    const fd = new FormData();
    fd.append("avatar", event.target.files[0]);

    loading.start("upload_avatar");
    getHttpClient()
      .post(API.INTERVENANT.avatar(intervenant.current.id as number), fd)
      .then((res) => {
        intervenant.set({ avatar: res.data.avatar });
      })
      .catch((error) => errors.catch(error))
      .finally(() => {
        loading.stop("upload_avatar");
      });
  }

  function uploadCV(event: any) {
    const fd = new FormData();
    let fileNameParts = event.target.files[0].type.split("/");
    if (!["image", "application"].includes(fileNameParts[0])) {
      notifs.set("error", "Uploader un fichier image ou pdf");
      return 0;
    }

    if (fileNameParts[0] == "application") {
      if (fileNameParts[1] != "pdf") {
        notifs.set("error", "Uploader un fichier image ou pdf");
        return 0;
      }
    }
    fd.append("cv", event.target.files[0]);
    loading.start("upload_cv");
    getHttpClient()
      .post(API.INTERVENANT.cv(intervenant.current.id as number), fd)
      .then((res) => {
        intervenant.set({ user_cv: res.data.user_cv });
      })
      .catch((error) => errors.catch(error))
      .finally(() => {
        loading.stop("upload_cv");
      });
  }

  function handleChange(e: any) {
    intervenant.set({ [e.target.name]: e.target.value });
  }

  function submit() {
    loading.stop("submit");
    errors.reset();
    getHttpClient()
      .post(
        API.INTERVENANT.informationsPersonnels(
          intervenant.current.id as number
        ),
        {
          ...intervenant.current,
        }
      )
      .then(() => {
        // clear all data into session.
        window.sessionStorage.removeItem("intervenant");
        notifs.set(
          "success",
          "Vos informations personnels ont ete enregistrees avec succes"
        );
      })
      .catch((error) => {
        errors.catch(error);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      })
      .finally(() => loading.stop("submit"));
  }

  function cvFileUrl() {
    if (
      intervenant.current.user_cv != null &&
      intervenant.current.user_cv != "null" &&
      intervenant.current.user_cv != undefined
    ) {
      const fileNameParts = intervenant.current.user_cv.split(".");
      if (fileNameParts[1] == "pdf") {
        return "pdf";
      }
      return "image";
    } else {
      return "";
    }
  }

  return (
    <>
      <Notifs />

      <Errors />
      <p className=" mt-1 text-gray-700">
        Touts les champs avec le <span className="text-secondary">(*)</span>{" "}
        doivent être renseignés pour que votre profil soit validé par le
        système. Rassurez qu'ils soient bien remplis.
      </p>

      <div className="p-4 md:p-8 border rounded-lg mt-6">
        <div className="flex items-center">
          <div
            style={{
              backgroundImage: `url(${intervenant.current.avatar as string})`,
            }}
            className="w-[100px] md:w-[150px] h-[100px] md:h-[150px] bg-cover bg-center"
          />
          <div className="ml-6">
            <h3 className="text-darkprimary font-semibold"> Photo de profil</h3>
            <label
              htmlFor="upload_avatar"
              className="inline-block mt-2 text-center bg-gray-100 text-gray-700 border px-4 py-2 rounded-md"
            >
              <input
                type="file"
                className="hidden"
                id="upload_avatar"
                onChange={uploadAvatar}
              ></input>
              <Loading
                item="upload_avatar"
                text="Changer la photo"
                alt="En cours"
                className="w-6 h-6 fill-primary text-gray-200"
              />
            </label>
          </div>
        </div>
        <p className="text-gray-700 mt-3">
          {" "}
          Choisissez une bonne image. Elle sera visible au public
        </p>
      </div>

      <div className="md:grid  md:grid-cols-2 gap-4 md:gap-8 mt-6 md:mt-8">
        <div>
          <label
            htmlFor="prenom"
            className="block mb-2  font-semibold text-darkprimary "
          >
            Prenom <span className=" text-secondary">*</span>{" "}
          </label>
          <input
            name="prenom"
            value={intervenant.current.prenom}
            onChange={handleChange}
            type="text"
            id="prenom"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-secondary/50 focus:border-secondary/50 block w-full p-2.5"
          />
        </div>
        <div className="mb-3 md:mb-0">
          <label
            htmlFor="nom"
            className="block mb-2  font-semibold text-darkprimary "
          >
            Nom <span className=" text-secondary">*</span>
          </label>
          <input
            name="nom"
            value={intervenant.current.nom}
            onChange={handleChange}
            type="text"
            id="nom"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-secondary/50 focus:border-secondary/50 block w-full p-2.5"
          />
        </div>
        <div className="mb-3 md:mb-0">
          <label
            htmlFor="date_naissance"
            className="block mb-2  font-semibold text-darkprimary "
          >
            Date de naissance <span className=" text-secondary">*</span>
          </label>
          <input
            name="date_naissance"
            value={intervenant.current.date_naissance}
            onChange={handleChange}
            type="date"
            id="date_naissance"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-secondary/50 focus:border-secondary/50 block w-full p-2.5"
            placeholder="09/10/1999"
          />
        </div>
        <div className="mb-3 md:mb-0">
          <label
            htmlFor="lieu_naissance"
            className="block mb-2  font-semibold text-darkprimary "
          >
            Lieu de naissance <span className=" text-secondary">*</span>
          </label>
          <input
            name="lieu_naissance"
            value={intervenant.current.lieu_naissance}
            onChange={handleChange}
            type="text"
            id="lieu_naissance"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-secondary/50 focus:border-secondary/50 block w-full p-2.5"
          />
        </div>
        <div className="mb-3 md:mb-0">
          <label
            htmlFor="nationalite"
            className="block mb-2  font-semibold text-darkprimary "
          >
            Nationalite <span className=" text-secondary">*</span>
          </label>
          <input
            name="nationalite"
            value={intervenant.current.nationalite}
            onChange={handleChange}
            type="text"
            id="nationalite"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-secondary/50 focus:border-secondary/50 block w-full p-2.5"
          />
        </div>
        <div className="mb-3 md:mb-0">
          <label
            htmlFor="securite_sociale"
            className="block mb-2  font-semibold text-darkprimary "
          >
            Securite sociale <span className=" text-secondary">*</span>
          </label>
          <input
            name="securite_sociale"
            value={intervenant.current.securite_sociale}
            onChange={handleChange}
            type="text"
            id="securite_sociale"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-secondary/50 focus:border-secondary/50 block w-full p-2.5"
            placeholder=""
          />
        </div>

        <div className="col-span-2">
          <label
            htmlFor="passe_sanitaire"
            className="block mb-2  font-semibold text-darkprimary "
          >
            {" "}
            Passe sanitaire <span className=" text-secondary">*</span>{" "}
          </label>
          <select
            name="passe_sanitaire"
            value={intervenant.current.passe_sanitaire}
            onChange={handleChange}
            id="passe_sanitaire"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-secondary/50 focus:border-secondary/50 block w-full p-2.5"
          >
            <option value="Aucun vaccin">Aucun vaccin</option>
            <option value="Parcours vaccinal en cours">
              {" "}
              Parcours vaccinal en cours
            </option>
            <option value="Vaccin complet"> Vaccin complet</option>
          </select>
        </div>
      </div>

      <div className="my-6 md:my-8 border-t"></div>

      <h4 className="text-xl md:text-2xl font-semibold text-darksecondary">
        {" "}
        Contacts{" "}
      </h4>

      <div className="md:grid  md:grid-cols-2 gap-8 mt-4">
        <div className="mb-3 md:mb-0">
          <label
            htmlFor="email"
            className="block mb-2 font-semibold text-darkprimary "
          >
            Adresse email <span className=" text-secondary">*</span>
          </label>
          <input
            name="email"
            disabled
            value={intervenant.current.email}
            onChange={handleChange}
            type="text"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-500 rounded-lg focus:ring-secondary/50 focus:border-secondary/50 block w-full p-2.5"
            placeholder="0687263865"
          />
        </div>

        <div className="mb-3 md:mb-0">
          <label
            htmlFor="telephone"
            className="block mb-2  font-semibold text-darkprimary "
          >
            Numero de téléphone <span className=" text-secondary">*</span>
          </label>
          <input
            name="telephone"
            value={intervenant.current.telephone}
            onChange={handleChange}
            type="text"
            id="telephone"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-secondary/50 focus:border-secondary/50 block w-full p-2.5"
            placeholder="0687263865"
          />
        </div>

        <div className="mb-3 md:mb-0">
          <label
            htmlFor="code_postal"
            className="block mb-2  font-semibold text-darkprimary "
          >
            Code postal <span className=" text-secondary">*</span>
          </label>
          <input
            name="code_postal"
            value={intervenant.current.code_postal}
            onChange={handleChange}
            type="text"
            id="code_postal"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-secondary/50 focus:border-secondary/50 block w-full p-2.5"
            placeholder="75002"
          />
        </div>

        <div className="mb-3 md:mb-0">
          <label
            htmlFor="ville"
            className="block mb-2  font-semibold text-darkprimary "
          >
            Ville <span className=" text-secondary">*</span>
          </label>
          <input
            name="ville"
            value={intervenant.current.ville}
            onChange={handleChange}
            type="text"
            id="ville"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-secondary/50 focus:border-secondary/50 block w-full p-2.5"
            placeholder="Paris"
          />
        </div>

        <div className="col-span-2 mb-3 md:mb-0">
          <label
            htmlFor="adresse"
            className="block mb-2  font-semibold text-darkprimary "
          >
            Adresse complete <span className=" text-secondary">*</span>
          </label>
          <input
            name="adresse_complete"
            value={intervenant.current.adresse_complete}
            onChange={handleChange}
            type="text"
            id="adresse_complete"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-secondary/50 focus:border-secondary/50 block w-full p-2.5"
          />
        </div>
      </div>
      <div className="my-4 md:my-12 border-t"></div>
      <div className="col-span-2 mb-4">
        <h4 className="block mb-2 font-semibold text-darkprimary ">
          {" "}
          Etes vous un auto entrepreneur ?{" "}
          <span className=" text-secondary">*</span>
        </h4>
        <label
          htmlFor="auto_entrepreneur_oui"
          className="flex items-center gap-2"
        >
          <input
            type="radio"
            id="auto_entrepreneur_oui"
            name="auto_entrepreneur"
            value="OUI"
            onChange={handleChange}
            checked={
              intervenant.current.auto_entrepreneur == "OUI" ? true : false
            }
            className="text-secondary focus:ring-secondary/50 focus:border-secondary/50"
          />
          <span>OUI</span>
        </label>
        <label
          htmlFor="auto_entrepreneur_non"
          className="flex items-center gap-2"
        >
          <input
            type="radio"
            id="auto_entrepreneur_non"
            name="auto_entrepreneur"
            value="NON"
            onChange={handleChange}
            checked={
              intervenant.current.auto_entrepreneur == "NON" ? true : false
            }
            className="text-secondary focus:ring-secondary/50 focus:border-secondary/50"
          />
          <span>Non</span>
        </label>
      </div>

      <Show
        className="col-span-2"
        cond={intervenant.current.auto_entrepreneur == "OUI"}
      >
        <label
          htmlFor="numero_siret"
          className="block mb-2  font-semibold text-darkprimary "
        >
          Votre numero de siret <span className=" text-secondary">*</span>
        </label>
        <input
          name="numero_siret"
          value={intervenant.current.numero_siret}
          onChange={handleChange}
          type="text"
          id="numero_siret"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-secondary/50 focus:border-secondary/50 block w-full p-2.5"
          placeholder="123 568 941 00056"
        />
      </Show>

      <div className="col-span-2">
        <h4 className="block mb-2  font-semibold text-darkprimary ">
          {" "}
          Avez vous éffectuez une formation PSC1 ?{" "}
          <span className=" text-secondary">*</span>
        </h4>
        <label htmlFor="psc1_oui" className="flex items-center gap-2">
          <input
            type="radio"
            id="psc1_oui"
            name="psc1"
            value="OUI"
            onChange={handleChange}
            checked={intervenant.current.psc1 == "OUI" ? true : false}
            className="text-secondary focus:ring-secondary/50 focus:border-secondary/50"
          />
          <span>OUI</span>
        </label>
        <label htmlFor="psc1_non" className="flex items-center gap-2">
          <input
            type="radio"
            id="psc1_non"
            name="psc1"
            value="NON"
            onChange={handleChange}
            checked={intervenant.current.psc1 == "NON" ? true : false}
            className="text-secondary focus:ring-secondary/50 focus:border-secondary/50"
          />
          <span>NON</span>
        </label>
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
