import { Icon } from "../components/ui/icons";
import { steps } from "../data/steps";
import { pricing } from "../data/pricing";
import Simulation from "@/components/common/Simulation";
import CreditImpot from "@/components/common/CreditImpot";
import MainLayout from "@/components/layouts/MainLayout";
import Link from "next/link";
import { PAGES } from "@/config";

export default function CommentCaMarche() {
  return (
    <MainLayout title="Comment ca marche ">
      <div className="max-w-4xl mx-auto pt-12 pb-20 px-3 md:px-0">
        <div className="text-center">
          <h2 className="text-darkprimary text-3xl md:text-5xl font-semibold">
            Comment ca marche ?
          </h2>
          <p className="text-gray-700 md:text-xl mt-4 md:mt-6">
            Démarrez votre accompagnement en quelques étapes.
          </p>
        </div>
        <div className="mt-8">
          {steps.map((item, index) => (
            <div
              key={`step${index}`}
              className="bg-gray-100 rounded-lg mt-8 p-6 flex flex-wrap"
            >
              <div className="w-full md:w-1/12 text-secondary">
                <Icon icon={item.icon} className="w-12 h-12" />
              </div>
              <div className="w-full md:w-11/12 mt-3 md:mt-0">
                <h3 className="text-primary text-xl md:text-2xl font-semibold">
                  {index + 1}. {item.title}
                </h3>
                <p className="mt-3 md:text-lg text-gray-700">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pb-20 px-3 md:px-0" id="tarifs">
        <div>
          <h2 className="text-darkprimary text-3xl md:text-5xl font-semibold text-center">
            Nos tarifs
          </h2>
          <h3
            className="text-gray-700 md:text-xl mt-4 text-center max-w-4xl mx-auto"
            style={{ lineHeight: 1.7 }}
          >
            Bénéficiez de nos tarifs très avantageux pour un service{" "}
            <strong>simple à mettre en place</strong>, qui vous donne la liberté
            de <strong>choisir vous même les intervenants</strong> parmis les{" "}
            <strong> profils sélectionnés et vérifiés</strong> avec soins
            partout sur le territoire nationale. Vous profitez en plus{" "}
            <strong> d'un contrôle en temps réel des horaires</strong> . Sans
            oublier que vous que vous pouvez bénéficier d'une{" "}
            <strong>
              réduction de 50% grâce au{" "}
              <a href="#credit-impots" className="text-secondary">
                {" "}
                Crédit d'impôts.{" "}
              </a>{" "}
            </strong>
          </h3>
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <div className="rounded-lg w-full md:w-[400px] border-2 border-secondary">
              <div className="p-8">
                <h3 className="text-3xl text-center text-primary font-semibold">
                  {" "}
                  Tarif Nuit{" "}
                </h3>
                <h3 className="mt-4 text-secondary text-center text-3xl font-semibold">
                  {" "}
                  <span className="text-base">à partir de</span>
                  <br /> 55 &euro; / Nuit
                </h3>
                <ul className="mt-4 text-gray-700 space-y-2 text-lg">
                  {pricing.nuit.map((item, index) => (
                    <li key={`pricingnuit${index}`} className="flex space-x-2">
                      <span className="text-secondary pt-1.5">
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
            <div className="rounded-lg w-full md:w-[400px] border-2 border-secondary">
              <div className="p-8">
                <h3 className="text-3xl text-center text-primary font-semibold">
                  Tarif Jour
                </h3>
                <h3 className="mt-4 text-secondary text-center text-3xl font-semibold">
                  <span className="text-base">à partir de</span>
                  <br /> 12 &euro; / Heure
                </h3>
                <ul className="mt-4 text-gray-700 space-y-2 text-lg">
                  {pricing.jour.map((item, index) => (
                    <li key={`pricingjour${index}`} className="flex space-x-2">
                      <span className="text-secondary pt-1.5">
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
          </div>
          <h5 className="text-center mt-8 text-gray-700 text-lg max-w-4xl mx-auto">
            Vous payer uniquement au moment de démarrer votre accompagnement et
            nos services sont sans engagements. Vous avez acces à un support
            client gratuit et disponible 7j/7.
          </h5>
          <div className="mt-8 text-center">
            <Link
              href={PAGES.faireDemande()}
              className="px-8 py-2 inline-block  md:text-xl text-center text-white bg-secondary rounded-full"
            >
              Je fais une demande
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-20">
        <Simulation />
      </div>

      <CreditImpot />
    </MainLayout>
  );
}
