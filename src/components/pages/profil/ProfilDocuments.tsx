import { Loading, Notifs } from "@/components/ui";
import Show from "@/components/common/Show";
import { useErrors, useLoading, useNotifs } from "@/store/interact";
import { useEffect, useState } from "react";
import { useIntervenant } from "@/store/intervenant";
import { getHttpClient } from "@/utils/http";
import { API } from "@/config";

// default values for documents.
const _documents = {
  carte_identite: "",
  certificat_scolarite: "",
  cv: "",
};

export default function ProfilDocuments() {
  const notifs = useNotifs();
  const loading = useLoading();
  const errors = useErrors();
  const intervenant = useIntervenant();

  const [documents, setDocuments] =
    useState<Record<string, File | string>>(_documents);

  useEffect(() => {
    if (intervenant.current.hasOwnProperty("id")) {
      getHttpClient()
        .get(API.INTERVENANT.documents(intervenant.current.id as number))
        .then((res) => {
          setDocuments((docs) => ({
            ...docs,
            ...res.data,
          }));
        });
    }
  }, [intervenant]);

  function handleUpload(e: any) {
    let fileNameParts = e.target.files[0].type.split("/");
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

    setDocuments((obj) => ({
      ...obj,
      [e.target.name]: e.target.files[0],
    }));
  }

  function submit() {
    const fd = new FormData();
    for (let k in documents) {
      if (typeof documents[k] == "object") fd.append(k, documents[k]);
    }
    loading.stop("submit");
    getHttpClient()
      .post(API.INTERVENANT.documents(intervenant.current.id as number), fd)
      .then(() => {
        // clear all data into session.
        window.sessionStorage.removeItem("intervenant");
        notifs.set(
          "success",
          "Vos informations personnels ont ete enregistrees avec succes"
        );
      })
      .catch((error) => errors.catch(error))
      .finally(() => loading.stop("submit"));
  }

  function DocumentFileDisplay({ fileUrl }: any) {
    function fileType(_fileUrl: any) {
      if (_fileUrl != null && _fileUrl != "null" && _fileUrl != undefined) {
        const fileUrlParts = _fileUrl.split(".");
        if (fileUrlParts.pop() == "pdf") {
          return "pdf";
        }
        return "image";
      }
      return "";
    }

    return (
      <>
        <Show cond={fileType(fileUrl) == "image"} className="w-full h-full">
          <div
            className="w-[150px]  h-[150px] md:w-[250px] md:h-[250px] bg-cover bg-center"
            style={{ backgroundImage: `url(${fileUrl})` }}
          ></div>
        </Show>
        <Show cond={fileType(fileUrl) == "pdf"}>
          afficher le pdf
          <iframe
            src={fileUrl}
            className="overflow-hidden w-[150px]  h-[150px] md:w-[250px] md:h-[250px]"
          />
        </Show>
      </>
    );
  }

  return (
    <>
      <Notifs />

      <p className="mt-1 text-gray-700">
        Tous les documents avec le <span className="text-secondary">(*)</span>{" "}
        doivent être fournis pour que votre profil soit validé par le système.
        Rassurez qu'ils soient bien remplis.
      </p>

      <div className="p-4 md:p-8 border rounded-lg mt-8">
        <h4 className="text-lg md:text-xl text-darkprimary">
          Carte d'identité<span className=" text-secondary">*</span>
        </h4>
        <div className="bg-gray-100 mt-2 border-2  border-dashed p-4 text-center">
          <Show cond={documents.carte_identite == ""}>
            <svg
              className="w-10 h-10 text-gray-700 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
          </Show>

          <Show
            cond={
              typeof documents.carte_identite == "string" &&
              documents.carte_identite != ""
            }
          >
            <DocumentFileDisplay fileUrl={documents.carte_identite} />
          </Show>

          <Show cond={typeof documents.carte_identite == "object"}>
            <div>{(documents.carte_identite as File).name}</div>
          </Show>

          <label
            htmlFor="carte_identite"
            className="inline-block mx-auto mt-3 text-center bg-primary text-white rounded-full border px-4 py-2"
          >
            <input
              type="file"
              name="carte_identite"
              className="hidden"
              id="carte_identite"
              onChange={handleUpload}
            ></input>
            Charger un fichier
          </label>
        </div>
        <p className="text-gray-700 mt-3">
          Ce document permet de verifier votre identité. Téléverser une image
          bien lisible ou un fichier pdf.{" "}
        </p>
      </div>

      <div className="p-4 md:p-8 border rounded-lg mt-8">
        <h4 className="text-lg md:text-xl text-darkprimary">
          Certificat de scolarité<span className=" text-secondary">*</span>
        </h4>
        <div className="bg-gray-100 mt-2 border-2  border-dashed p-4 text-center">
          <Show cond={documents.certificat_scolarite == ""}>
            <svg
              className="w-10 h-10 text-gray-700 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
          </Show>

          <Show
            cond={
              typeof documents.certificat_scolarite == "string" &&
              documents.certificat_scolarite != ""
            }
          >
            <DocumentFileDisplay fileUrl={documents.certificat_scolarite} />
          </Show>

          <Show cond={typeof documents.certificat_scolarite == "object"}>
            <div>{(documents.certificat_scolarite as File).name}</div>
          </Show>

          <label
            htmlFor="certificat_scolarite"
            className="inline-block mx-auto mt-3 text-center bg-primary text-white rounded-full border px-4 py-2"
          >
            <input
              type="file"
              name="certificat_scolarite"
              className="hidden"
              id="certificat_scolarite"
              onChange={handleUpload}
            ></input>
            Charger un fichier
          </label>
        </div>
        <p className="text-gray-700 mt-3">
          Ce document permet de vérifier que vous êtes bien scolarisé dans
          l'etablissement que vous avez précisé. Téléverser une image bien
          lisible ou un fichier pdf.
        </p>
      </div>

      <div className="p-4 md:p-8 border rounded-lg mt-8">
        <h4 className="text-lg md:text-xl text-darkprimary">Votre CV</h4>
        <div className="bg-gray-100 mt-2 border-2  border-dashed p-4 text-center">
          <Show cond={documents.cv == ""}>
            <svg
              className="w-10 h-10 text-gray-700 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
          </Show>

          <Show cond={typeof documents.cv == "string" && documents.cv != ""}>
            <DocumentFileDisplay fileUrl={documents.cv} />
          </Show>

          <Show cond={typeof documents.cv == "object"}>
            <div>{(documents.cv as File).name}</div>
          </Show>

          <label
            htmlFor="cv"
            className="inline-block mx-auto mt-3 text-center bg-primary text-white rounded-full border px-4 py-2"
          >
            <input
              type="file"
              name="cv"
              className="hidden"
              id="cv"
              onChange={handleUpload}
            ></input>
            Charger un fichier
          </label>
        </div>
        <p className="text-gray-700 mt-3">
          Ce document permet d'evaluer votre experience professionnel.
          Téléverser une image bien lisible ou un fichier pdf.
        </p>
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
