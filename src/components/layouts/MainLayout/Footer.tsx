import { PAGES } from "@/config";
import { allServices as services } from "@/data/services-list";
import Link from "next/link";

export default function Footer() {
  return (
    <div>
      <footer className="bg-gray-200 text-gray-700">
        <div className="max-w-6xl mx-auto flex flex-wrap px-3 md:px-0 py-8">
          <div className="w-full md:w-1/5">
            <h3 className="text-xl font-semibold">A propos de nous</h3>
            <ul className="mt-6">
              <li className="mb-4">
                <Link href={"/"} className="hover:underline">
                  Accueil
                </Link>
              </li>

              <li className="mb-4">
                <Link href={PAGES.commentCaMarche} className="hover:underline">
                  Comment ça marche ?
                </Link>
              </li>

              <li className="mb-4">
                <Link href={PAGES.politique} className="hover:underline">
                  Politique de confidentialité
                </Link>
              </li>
              <li className="mb-4">
                <Link href={PAGES.mentionsLegales} className="hover:underline">
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-1/5">
            <h3 className="text-xl font-semibold">Nos services</h3>
            <ul className="mt-6">
              {services.map((item, index) => (
                <li key={`footerservice${index}`} className="mb-4">
                  <Link
                    href={PAGES.faireDemande(item.title)}
                    className="hover:underline"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full md:w-1/5">
            <h3 className="text-xl font-semibold">Nous rejoindre</h3>
            <ul className="mt-6">
              <li className="mb-4">
                <Link href={PAGES.AUTH.login} className="hover:underline">
                  Se connecter
                </Link>
              </li>
              <li className="mb-4">
                <Link href={PAGES.faireDemande()} className="hover:underline">
                  Faire une demande
                </Link>
              </li>
              <li className="mb-4">
                <Link href={PAGES.USER.missions} className="hover:underline">
                  Trouver un job etudiant
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-2/5">
            <h3 className="font-semibold text-xl">
              {" "}
              Lettre d&apos;informations{" "}
            </h3>
            <p className="my-4 text-gray-700">
              Recevez notre mail d&apos;information hebdomadaire pour connaître
              les dernières nouvelles, les offres exclusives, les promotions et
              bien plus encore.
            </p>
            <div>
              <div>
                <input
                  className="bg-white px-4 text-gray-700 block w-full py-2 rounded-full"
                  required
                  type="email"
                  name="email"
                  placeholder="ADRESSE EMAIL"
                />
                <small className="text-red-500"></small>
              </div>
              <button className="uppercase bg-secondary text-white px-4 py-2 mt-4 rounded-full">
                S&apos;inscrire
              </button>
            </div>
          </div>
        </div>
        <div className="bg-gray-200">
          <div className="py-6 max-w-6xl mx-auto md:flex md:items-center md:justify-between border-t border-gray-300">
            <span className="">
              © {new Date().getFullYear()} <Link href="/">YOUCARE</Link>. Tous
              droits réserves.
            </span>
            <div className="flex mt-4 space-x-6 sm:justify-center md:mt-0">
              <Link href="#" className="text-primary dark:hover:text-white">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Facebook page</span>
              </Link>
              <Link href="#" className="text-primary dark:hover:text-white">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
                <span className="sr-only">Twitter page</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
