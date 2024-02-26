import { Icon } from "@/components/ui/icons";
import { PAGES } from "@/config";
import { servicesHome as services } from "@/data/services-list";
import Link from "next/link";

export default function Services() {
  return (
    <div className=" max-w-7xl py-12 pb-20 mx-auto px-4">
      <div className="flex md:flex-row-reverse flex-wrap">
        <div className="w-full md:w-3/5 md:pl-12">
          <h2 className="text-3xl md:text-5xl text-primary font-semibold">
            Découvrez nos services
          </h2>
          <h3 className="text-secondary text-2xl md:text-3xl mt-2">
            Tout ce qu'il faut pour combler la perte d'autonomie.
          </h3>
          <p className="mt-6 text-gray-700 md:text-lg">
            Nos aidants assurent un accompagnement sérieux et rigoureux en
            assumant toutes les tâches que les personnes âgées ne peuvent plus
            assurer correctement tout seuls.
          </p>
          <p className="mt-6 text-gray-700 md:text-lg">
            Nous assurons l’entretien de la maison ( lessive, repassage), aide à
            la vie quotidienne (garde de nuit,aide au repas, courses,
            promenades, accompagnement dans les rendez-vous...) ainsi que des
            tâches administratives.
          </p>
          <Link
            href={PAGES.nosServices}
            className="hidden md:inline-block rounded-full bg-primary text-white text-xl px-5 py-2 mt-4 md:mt-8"
          >
            {" "}
            Decouvrir tous nos services
          </Link>
        </div>
        <div className="w-full md:w-2/5 grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 md:mt-0">
          {services.map((item) => (
            <div
              key={`service${item}`}
              className="bg-secondary p-4 md:p-6 relative service-box"
            >
              <button className="text-white absolute top-4 right-4 hidden next-button">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
              <div className="rounded-md text-white px-2 w-16 h-16 flex items-center justify-center">
                <Icon icon={item.icon} className="w-8 md:w-12 h-8 md:h-12" />
              </div>
              <h2 className="mt-4 text-xl md:text-2xl font-semibold text-white">
                {item.title}
              </h2>
            </div>
          ))}
        </div>
      </div>
      <Link
        href={PAGES.nosServices}
        className="inline-block md:hidden rounded-full bg-primary text-white px-5 py-2 mt-4 "
      >
        Decouvrir tous nos services
      </Link>
    </div>
  );
}
