import {
  Calendar,
  FormFill,
  Search,
  Users,
  Icon,
} from "../components/ui/icons";
import { studentPricing as pricing } from "../data/pricing";
import MainLayout from "@/components/layouts/MainLayout";
import { PAGES } from "@/config";
import Link from "next/link";

const etapes = [
  {
    title: "Inscription",
    icon: FormFill,
    description:
      "Vous pouvez créer votre compte en quelques secondes. Vous devez ếtre majeur et disposer du droit de travailler en France",
  },
  {
    title: "Vérification de votre compte",
    icon: Search,
    description:
      "Vous fournissez des documents pour vérifier votre identité et valider votre compte. Ensuite vous êtes contacté par un de nos professionnels pour finaliser la vérification.",
  },
  {
    title: "Recherche des missions.",
    icon: Search,
    description:
      "Vous avez accès aux missions ouvertes en vous connectant à votre tableau de bord. Postuler à celles qui correspondent à votre disponibilité. Vous pouvez postuler à autant de missions que possible.",
  },
  {
    title: "Selection",
    icon: Search,
    description:
      "Quand vous postulez à une mission votre profil est présenté au senior. Si vous êtes sélectionné, alors vous êtes contacté pour une prise de rendez-vous. Question de faire de faire connaissance.",
  },
  {
    title: "Début de la mission",
    icon: Users,
    description:
      "Une fois le rendez-vous fixé, vous recevez un email de confirmation. Et l’accompagnement peut commencer.",
  },
  {
    title: "Suivi de la mission",
    icon: Calendar,
    description:
      "Vous devez noter vos heures effectuées au fur et à mesure depuis votre  calendrier sur votre espace membre. A la fin du mois vos heures sont comptabilisées et vous recevrez votre virement bancaire.",
  },
  {
    title: "Fin de la mission.",
    icon: Calendar,
    description:
      "Vous avez effectué toutes les heures précisez dans votre disponibilité, alors vous signaler depuis votre tableau de bord la fin de la mission. Vous devrez aussi contacter la famille pour signaler.",
  },
];

const conditions = [
  "Vous devez être majeur",
  "Avoir le droit de travailler en France",
  "Être étudiant(e) en santé et avoir un certificat de scolarité en cours de validité",
  "Apprécier le contact avec les personnes âgées et aimer prendre soin des autres",
];

export default function JeSuisEtudiant() {
  return (
    <MainLayout title={"Etudiant"}>
      <div className="max-w-6xl mx-auto py-20 px-3 md:px-0">
        <div className="flex">
          <div className="w-full md:w-1/2">
            <h2 className="text-darkprimary text-3xl md:text-5xl font-semibold">
              Une opportunité <br />
              avec Youcare
            </h2>
            <h3 className="text-darkprimary mt-8 md:text-xl">
              Trouvez un petit Job flexible adapté pour les étudiants en
              médecine.{" "}
            </h3>
            <div className="">
              <Link
                href={PAGES.AUTH.register}
                className="inline-block bg-secondary text-white rounded-full px-5 py-2 md:text-xl mt-8"
              >
                Je m'inscris maintenant
              </Link>
            </div>
          </div>
          <div className="hidden w-full md:w-1/2 md:flex md:justify-center">
            <img src="/images/help-5.jpg" className="w-full md:w-1/2" />
          </div>
        </div>
      </div>
      <div className="bg-gray-100 py-12">
        <div>
          <h2 className="text-darkprimary text-3xl md:text-5xl font-semibold text-center">
            Rénumération
          </h2>
          <h3
            className="text-gray-700 md:text-xl mt-4 text-center max-w-4xl mx-auto"
            style={{ lineHeight: 1.7 }}
          >
            Decouvrez combien vous ếtes rénumérer pour les missions sur Youcare.
            Il s'agit des montants de bases. Pour chaque mission, votre
            employeur c'est la famille qui réçoit l'accompagnement. Ainsi les
            montants peuvent varier à la hausse en fonction de la famille.
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
                  <br /> 50 &euro; / Nuit
                </h3>
                <ul className="mt-4 text-gray-700 space-y-2 text-lg">
                  {pricing.nuit.map((item) => (
                    <li key={`pricingjour${item}`} className="flex space-x-2">
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
                  {" "}
                  Tarif Jour{" "}
                </h3>
                <h3 className="mt-4 text-secondary text-center text-3xl font-semibold">
                  {" "}
                  <span className="text-base">à partir de</span>
                  <br /> 10 &euro; / Heure
                </h3>
                <ul className="mt-4 text-gray-700 space-y-2 text-lg">
                  {pricing.jour.map((item) => (
                    <li key={`pricingnuit${item}`} className="flex space-x-2">
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
            Vous recevez votre paiement une fois par mois entre 20 et 30 du
            moins.
          </h5>
        </div>
      </div>
      <div className="bg-secondary">
        <div className="max-w-7xl mx-auto pt-12 pb-20 px-3 md:px-0">
          <div className="text-center">
            <h2 className="text-white text-3xl md:text-5xl font-semibold">
              Comment ca marche ?
            </h2>
            <p className="text-white md:text-xl mt-6">
              Un processus simple en quelques étapes.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 grid-center gap-4 md:gap-8 justify-center">
            {etapes.map((item, index) => (
              <div
                key={`etape${item}`}
                className="bg-gray-50 mt-8 p-4 flex flex-wrap rounded-2xl"
              >
                <div className="w-full md:w-2/12 text-secondary">
                  <Icon icon={item.icon} className="w-8 md:w-10 h-8 md:h-10" />
                </div>
                <div className="w-full md:w-10/12">
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
      </div>

      <div className="bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-darkprimary text-3xl md:text-4xl font-semibold text-center">
            Quelles sont les conditions à remplir ?
          </h2>
          <ul className="text-gray-700 space-y-2 md:text-xl max-w-4xl mx-auto mt-8">
            {conditions.map((item) => (
              <li key={`condition${item}`} className="flex space-x-2">
                <span className="text-secondary pt-1.5">
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
          <div className="mt-8 text-center">
            <Link
              href={PAGES.AUTH.register}
              className="inline-block text-xl  bg-secondary text-white  rounded-full px-5 py-2"
            >
              Je m'inscris maintenant
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-20">
        <h2 className="text-darkprimary text-4xl font-semibold text-center">
          Travailler avec Youcare, c'est aussi...
        </h2>
        <div className="flex flex-wrap mt-8">
          <div className="w-full md:w-2/5">
            <img src="/images/help-4.jpg" />
          </div>
          <div className="w-full md:w-3/5 pl-8">
            <h3 className="text-darkprimary text-2xl font-semibold">
              Contribuer à une mission
            </h3>
            <p className="mt-3 md:text-lg text-gray-700">
              En rejoignant le réseau YOUCARE, tu permets à un senior en perte
              d’autonomie de continuer à vivre à son domicile, selon son
              souhait. Tu contribues également à rompre sa solitude et son
              isolement en lui offrant de beaux moments de partage
              intergénérationnel !
            </p>
            <h3 className="text-darkprimary text-2xl font-semibold mt-6">
              Développer une expérience professionnelle dans votre domaine.
            </h3>
            <p className="mt-3 md:text-lg text-gray-700">
              En tant que future professionnel de santé, youcare offre une
              opportunité d'améliorer des compétences professionnelles grâce au
              mission d’accompagnement. Elles te permettent de développer des
              compétences en rapport humains et sociaux qui sont de véritables
              plus pour ta future carrière en tant que professionnel de santé.
            </p>
            <h3 className="text-darkprimary text-2xl font-semibold mt-6">
              Bénéficier d'une grande flexibilité
            </h3>
            <p className="mt-3 md:text-lg text-gray-700">
              Tu disposes d’un contrôle total sur ton planning. C’est toi qui
              décide de quand et où tu fais des interventions. Tu peux suivre
              des cours en journée et effectuer des accompagnements la nuit. Il
              s’agit d’une opportunité de job compatible avec tout type d’emploi
              de temps de part sa flexibilité.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
