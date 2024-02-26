import { PAGES } from "@/config";
import Link from "next/link";

export default function AccompagnementPresenation() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-3">
      <div className="flex">
        <div className="w-full md:w-1/2">
          <h2 className="text-darkprimary text-3xl md:text-5xl font-semibold">
            Un accompagnement de qualité au quotidien
          </h2>
          <p className="text-gray-700 md:text-lg mt-8">
            Avec Youcare, vous avez accès à un service d'accompagnement à
            domicile partout en France en fonction de vos besoins. Nos aidants
            sont des jeunes étudiants dont les profils sont sélectionnés avec
            soin.
          </p>
          <p className="text-gray-700 md:text-lg mt-4">
            Nous mettons un accent particulier sur la création des relations
            humaines de confiance intergénérationnelle.
          </p>
          <p className="text-gray-700 md:text-lg mt-4">
            Vous bénéficiez d'un processus simplifié qui vous permet de trouver
            en quelques minutes un aidant qui correspondent à vos critères.
          </p>
          <div className="mt-8">
            <Link
              href={PAGES.nosServices}
              className="border-2 border-secondary text-secondary px-5 py-2 md:text-xl transition hover:bg-secondary hover:text-white rounded-full"
            >
              En savoir plus
            </Link>
          </div>
        </div>
        <div className="w-full hidden md:w-1/2 md:flex md:justify-end">
          <img src="/images/help-3.jpg" className="w-full md:w-4/5" />
        </div>
      </div>
    </div>
  );
}
