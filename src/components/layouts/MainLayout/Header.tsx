import { PAGES } from "@/config";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    window.onscroll = function () {
      let navbar = document.getElementById("navbar");
      if (navbar != null) {
        if (window.scrollY > navbar.offsetHeight) {
          navbar.classList.add("fixed");
          navbar.classList.add("w-full");
        } else {
          navbar.classList.remove("fixed");
        }
      }
    };
  }, []);

  return (
    <>
      <nav className="bg-primary py-4 z-30 hidden md:block" id="navbar">
        <div className="max-w-7xl mx-auto flex justify-between md:text-lg">
          <div>
            <Link href="/" className="md:text-4xl font-bold text-white">
              YOUCARE
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-white">
              Accueil
            </Link>
            <Link href={PAGES.nosServices} className="text-white">
              Nos services
            </Link>
            <Link href={PAGES.commentCaMarche} className="text-white">
              Comment ça marche
            </Link>
            <Link
              href={`${PAGES.commentCaMarche}#tarifs`}
              className="text-white"
            >
              Tarifs
            </Link>
            <a href={PAGES.AUTH.login} className="text-white">
              Connexion
            </a>
          </div>
          <div className="flex space-x-4 text-lg">
            <Link
              href={PAGES.faireDemande()}
              className="px-4 py-1.5  text-white bg-secondary rounded-full"
            >
              Je fais une demande
            </Link>
            <Link
              href={PAGES.etudiant}
              className="px-4 py-1.5 text-primary bg-white rounded-full"
            >
              Je suis un étudiant
            </Link>
          </div>
        </div>
      </nav>
      <nav className="bg-primary md:hidden p-4">
        <div className="flex justify-between">
          <div>
            <Link href="/" className="text-xl md:text-4xl font-bold text-white">
              YOUCARE
            </Link>
          </div>
          <button
            className="text-white"
            onClick={() => setShowMobileMenu(true)}
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div
          className={`${
            showMobileMenu ? "" : "hidden"
          } fixed h-screen w-full bg-primary top-0 left-0 z-50 p-6 `}
        >
          <div className="flex justify-between">
            <div>
              <Link
                href="/"
                className="text-xl md:text-4xl font-bold text-white"
              >
                YOUCARE
              </Link>
            </div>
            <button
              className="text-white"
              onClick={() => setShowMobileMenu(false)}
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <ul className="space-y-4 mt-8">
            <li>
              <Link href="/" className="text-white">
                Accueil
              </Link>
            </li>
            <li>
              <a href={PAGES.nosServices} className="text-white">
                Nos services
              </a>
            </li>
            <li>
              <a href={PAGES.commentCaMarche} className="text-white">
                Comment ça marche
              </a>
            </li>
            <li>
              <Link
                href={`${PAGES.commentCaMarche}#tarifs`}
                className="text-white"
              >
                Tarifs
              </Link>
            </li>
            <li>
              <Link href={PAGES.AUTH.login} className="text-white">
                Connexion
              </Link>
            </li>
          </ul>
          <div className="text-lg mt-8 space-y-2">
            <Link
              href={PAGES.faireDemande()}
              className="px-4 py-1.5 inline-block w-full text-center text-white bg-secondary rounded-full"
            >
              Je fais une demande
            </Link>
            <Link
              href={PAGES.etudiant}
              className="px-4 py-1.5 block w-full text-center text-primary bg-white rounded-full"
            >
              Je suis un étudiant
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
