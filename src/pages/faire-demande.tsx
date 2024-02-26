import CreditImport from "@/components/common/CreditImpot";
import { useDemande } from "@/store/demande";
import Besoins from "@/components/pages/faire-demande/Besoins";
import Coordonnees from "@/components/pages/faire-demande/Coordonnees";
import RendezVous from "@/components/pages/faire-demande/RendezVous";
import { useErrors, useLoading } from "@/store/interact";
import MainLayout from "@/components/layouts/MainLayout";
import { getHttpClient } from "@/utils/http";
import { Button, Errors } from "@/components/ui";
import { BsCalendar2Check } from "react-icons/bs";
import { useState } from "react";
import Link from "next/link";

const styles = {
  backgroundImage: "url(/images/image2.jpg)",
};

const avantages = [
  "Bénéficiez d'une réduction de 50% sur les frais d'accompagnement grâce au Credit d'impôt",
  "Nous vous accompagnons du debut à la fin. Notre equipe se charge de toutes les démarches administratives. L'accompagnement devient très simple à mettre en place.",
  "Vous avez la liberte de choisir vous meme les intervenenants parmis des profils verifies et selectionnes avec soin par notre professionnels.",
  "Vous avez accès à une interface simple et intuitive pour le contrôle et la gestion des horaires",
  "Tour est fait en ligne dans le confort de votre domicile, vous n'avez pas besoin de vous deplacer.",
  "Un service qui vous simplifie la vie",
];

export default function Demande() {
  const [redirectLink, setRedirectLink] = useState<string>("#");
  const loading = useLoading();
  const errors = useErrors();
  const demande = useDemande();

  function submit() {
    errors.reset();
    loading.start("submit");
    getHttpClient()
      .post("demandes", demande.current)
      .then((res) => {
        //window.location.assign("/employeur/tableau-de-bord");
        setRedirectLink(res.data.redirect);
        demande.setStep("thankyou");
      })
      .catch((error: any) => errors.catch(error))
      .finally(() => {
        window.scroll({ top: 0, behavior: "smooth" });
        loading.stop("submit");
      });
  }

  return (
    <MainLayout title="Demande">
      <div className=" bg-cover hero-bg" style={styles}>
        <div className="bg-primary/90  py-12 overflow-hidden">
          <div className="max-w-6xl flex flex-wrap px-3 mx-auto text-white">
            <div className="w-full md:w-1/2">
              <h2 className="text-center md:text-start text-2xl md:text-5xl font-semibold">
                Démarrez votre accompagnement en quelques étapes
              </h2>
              <p
                className="text-center md:text-start md:text-xl mt-8 mx-auto"
                style={{ lineHeight: 1.7 }}
              >
                Nous vous mettons en contact avec un(e) jeune etudiant(e)
                selectionné avec soin par nos professionnels.
              </p>
              <p
                className="text-center md:text-start md:text-xl mt-4 mx-auto"
                style={{ lineHeight: 1.7 }}
              >
                Vous pouvez bénéficiez d'une réduction de 50% sur les frais
                d'accompagnement grâce au <strong>Credit d'impôt</strong>
              </p>
            </div>

            <div className="w-full md:w-1/2 md:pl-8 text-darkprimary mt-6 md:mt-0">
              <div className="bg-white rounded-lg p-4 md:p-8 md:px-8 shadow-xl">
                <Errors />
                <Besoins />
                <Coordonnees />
                <RendezVous submit={submit} />
                <div
                  className={`${demande.step == "thankyou" ? "" : "hidden"}`}
                >
                  <div className="text-center">
                    <BsCalendar2Check className="w-12 h-12 mx-auto text-secondary" />
                  </div>
                  <h2 className="text-secondary text-center text-lg md:text-2xl mt-4">
                    Le rendez-vous a été enregistré avec succès
                  </h2>
                  <p className="mt-4 md:text-xl text-center">
                    Votre conseiller Youcare vous contactera en fonction des
                    horaires choisis. Consulter votre messagerie. Vous venez de
                    recevoir un mail pour plus de details.
                  </p>
                  <p className="mt-4 md:text-xl font-semibold text-center ">
                    Desormais Youcare se charge de trouver l'intervenant adapté
                    pour vous.
                  </p>
                  <p className="mt-4 md:text-xl font-semibold text-center">
                    Utilise le lien suivant pour acceder à votre espace pour
                    suivre votre demande
                  </p>
                  <div className="text-center">
                    <Link href={redirectLink}>
                      <button className="px-5 md:px-8 py-2 md:py-2.5 md:text-xl text-white bg-secondary rounded-full mt-6">
                        Suivre ma demande
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-darkprimary text-3xl md:text-4xl font-semibold ">
            Un service qui vous offre de nombreux avantages
          </h2>
          <ul className="text-gray-700 space-y-4 md:text-xl  mt-8">
            {avantages.map((item, index) => (
              <li key={`avantage${index}`} className="flex space-x-2">
                <span className="text-secondary">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <CreditImport />
    </MainLayout>
  );
}
