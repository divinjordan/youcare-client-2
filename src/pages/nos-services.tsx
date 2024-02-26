import { allServices as services } from "@/data/services-list";
import MainLayout from "@/components/layouts/MainLayout";
import { FC } from "react";
import { NextPage } from "next";
import { PAGES } from "@/config";
import Link from "next/link";

const avantages = [
  "Le processus de demande est simplifié et votre demande est reçue et analysée dans les brefs et délais. Nous sélectionnons toujours le profil le plus adapté à votre besoin.",
  "Nos aidants à mettent l’accent sur les rapports humains, la convivialité, le développement des rapports sociaux et l'apport de la chaleur humaine.",
  "Nous respectons toutes les chartes et les lois relatives aux services d’aides à domicile. Et nous vérifions tous les documents nécessaires pour le contrôle d'identité des étudiants aidants",
];

const NosServicesPage: FC<NextPage> = () => {
  return (
    <MainLayout title="nos services">
      <div className="max-w-7xl mx-auto pt-12 px-3 md:px-0">
        <div className="flex">
          <div className="w-full md:w-1/2">
            <h2 className="text-darkprimary text-3xl md:text-5xl font-semibold">
              Nos services
            </h2>
            <p className="text-gray-700 md:text-lg mt-8">
              Nos aidants assurent un accompagnement sérieux et rigoureux en
              assumant toutes les tâches que les personnes âgées ne peuvent plus
              assurer correctement tout seuls.
            </p>
            <p className="text-gray-700 md:text-lg mt-4">
              Nous assurons l’entretien de la maison ( lessive, repassage), aide
              à la vie quotidienne (garde de nuit,aide au repas, courses,
              promenades, accompagnement dans les rendez-vous...) ainsi que des
              tâches administratives.
            </p>
            <p className="text-gray-700 md:text-lg mt-4">
              Recevez aussi accompagnement informatique pour les tâches simples
              tels qu' envoyer des mails, communiquer avec la famille sur les
              réseaux sociaux et bien d’autres.
            </p>
          </div>
          <div className="hidden w-full md:w-1/2 md:flex md:justify-end">
            <img src="/images/image-5.png" className="w-full md:w-4/5" />
          </div>
        </div>
      </div>

      <div className="py-12 text-center">
        <a
          href="#services"
          className="border-2 border-secondary text-secondary px-5 py-2 md:text-2xl transition hover:bg-secondary hover:text-white rounded-full"
        >
          Je fais une demande
        </a>
      </div>

      <div className="bg-gray-200 md:h-[400px]">
        <div className="flex items-center">
          <div className="w-full md:w-1/2 px-3 md:px-12 py-8 md:py-0">
            <h3 className="text-darkprimary font-semibold text-3xl md:text-4xl">
              Création des liens sociaux
            </h3>
            <p
              className="mt-4 md:mt-6 md:text-xl text-gray-800"
              style={{ lineHeight: 1.7 }}
            >
              Vous recevez un accompagnement allant de quelques heures à
              plusieurs heures par semaine. Nous consacrons pas seulement notre
              temps à un accompagnement simple mais nous nous assurons de créer
              une relation durable et sincère permettant ainsi a la personne
              accompagne de maintenir des liens sociaux durable.
            </p>
          </div>
          <div
            className="hidden md:block w-full md:w-1/2 bg-cover h-[400px]"
            style={{ backgroundImage: "url('images/image1.jpg')" }}
          ></div>
        </div>
      </div>

      <div className="bg-gray-200 md:h-[400px] py-8 md:py-0">
        <div className="flex flex-wrap items-center">
          <div
            className="w-full md:w-1/2 bg-cover h-[400px]"
            style={{ backgroundImage: "url('images/image3.jpg')" }}
          ></div>
          <div className="w-full md:w-1/2 px-3 md:px-12">
            <h3 className="text-darkprimary font-semibold text-3xl md:text-4xl">
              Des aidants sélectionnés avec soin
            </h3>
            <p
              className="mt-6 md:text-xl text-gray-800"
              style={{ lineHeight: 1.7 }}
            >
              Nos aidants sont des étudiants en école de médecine ou de
              paramédical. Ils ont fait le choix de faire de l’aide aux
              personnes leur métier, car c’est leur vocation. Ce sont jeunes
              hommes et femmes qui accordent une place importante à la famille,
              au partage et au relation social. Ils sont sélectionnés avec soin
              de manière à maintenir les meilleurs profils.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-secondary py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-3 md:px-0">
          <h2 className="text-3xl md:text-4xl text-white font-semibold text-center">
            Découvrez nos services
          </h2>
          <h3 className="text-white text-2xl mt-2 text-center">
            Un ensemble de services sur mesures et adaptes à vos besoins.
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-8 mt-8">
            {services.map((item) => (
              <div
                key={`services${item}`}
                className=" bg-white p-4 md:p-8 rounded-lg"
              >
                <h2 className="mt-4 text-2xl font-semibold text-darkprimary">
                  {item.title}
                </h2>
                <p className="text-gray-700 mt-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Explicabo inventore corporis nostrum blanditiis, dolore illo
                  labore accusamus tempore dicta velit voluptates similique
                  adipisci cupiditate vitae, aspernatur quo mollitia
                  consequuntur fugit!
                </p>
                <Link
                  href={PAGES.faireDemande(item.title)}
                  className="inline-block border-secondary text-secondary mt-4 border rounded-full px-4 py-1.5 hover:bg-secondary hover:text-white transition-colors"
                >
                  Decouvrir
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-12 md:pt-20 pb-24">
        <div className="max-w-6xl mx-auto px-3 md:px-0">
          <h2 className="text-3xl md:text-4xl font-semibold text-center text-darkprimary">
            Pourquoi choisir YOUCARE ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mt-4 md:mt-10">
            {avantages.map((item) => (
              <div
                key={`avantages${item}`}
                className=" bg-white p-4 rounded-lg border-2 border-secondary"
              >
                <div className="rounded-md text-secondary px-2 w-16 h-16 mx-auto flex items-center justify-center">
                  <svg
                    className="w-12 h-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="mt-2 md:text-lg text-center text-gray-700">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default NosServicesPage;
