import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
  Icon,
  Calendar,
  Chartpie,
  Briefcase,
  User as UserIcon,
  CreditCard,
  Users,
} from "@/components/ui/icons";

import { useAuth } from "@/store/auth";
import PageLoading from "@/components/common/PageLoading";
import { PAGES } from "@/config";
import UserAvatar from "@/components/common/UserAvatar";
import { AiOutlineMenu } from "react-icons/ai";
import classNames from "classnames";
import { useErrors } from "@/store/interact";
import { useIntervenant } from "@/store/intervenant";
import Link from "next/link";
import { useEmployeur } from "@/store/employeur";
import { MdBadge, MdPerson, MdWorkOutline } from "react-icons/md";

export const links: {
  label: string;
  link: string[];
  icon: any;
}[] = [
  {
    label: "Mon profil",
    link: ["/employeur/profil"],
    icon: (className: string) => <MdPerson className={className} />,
  },
  {
    label: "Mes demandes",
    link: ["/employeur/demandes", "/employeur"],
    icon: (className: string) => <MdBadge className={className} />,
  },
  {
    label: "Mes missions",
    link: ["/employeur/missions"],
    icon: (className: string) => <MdWorkOutline className={className} />,
  },
];

type DashboardProps = {
  children: React.ReactNode;
};

export default function IntervenantDashboard({ children }: DashboardProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const router = useRouter();
  const errors = useErrors();
  const employeur = useEmployeur();
  const auth = useAuth();

  useEffect(() => {
    if (window.innerWidth > 672) {
      setShowMenu(true);
    }

    errors.reset();
    employeur
      .auth()
      .then((userLogged) => {
        if (
          userLogged.email_verified_at != null &&
          userLogged.email_verified_at != undefined
        ) {
          setLoading(false);
        } else {
          router.push(PAGES.AUTH.activate);
        }
      })
      .catch((error) => {
        // Track error.
        if (error.response != undefined) {
          if ([401, 500, 405].includes(error.response.status)) {
            auth.logout();
            router.push(PAGES.AUTH.login);
          }
        }
      });
  }, []);

  if (loading) {
    return <PageLoading />;
  } else
    return (
      <div>
        <div className="border-b border-gray-200">
          <header className="container-width mx-auto flex items-center  justify-between py-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-primary">
              YOUCARE
            </h1>
            <div className="flex space-x-4 items-center">
              <button
                className="inline-flex md:hidden"
                onClick={() => {
                  setShowMenu(!showMenu);
                }}
              >
                <AiOutlineMenu className="w-6 h-6 text-gray-600" />
              </button>

              <UserAvatar
                avatar={employeur.current.avatar as string}
                className="w-10 h-10"
              />
              <Link
                href="/auth/logout"
                className="hover:underline text-darkprimary"
              >
                Se deconnecter
              </Link>
            </div>
          </header>
        </div>

        <section className="mx-auto flex flex-wrap container-width">
          <nav className="w-full md:w-[180px] border-b  md:border-none relative mt-4 md:mt-8">
            <ul
              className={classNames("", {
                hidden: !showMenu,
              })}
            >
              {links.map((item, index) => (
                <li
                  key={`${index}${item.label}`}
                  className={`relative  rounded-r-full cursor-pointer ${
                    item.link.includes(router.pathname)
                      ? "bg-secondary text-white rounded-r-full"
                      : "hover:bg-secondary/10"
                  }`}
                >
                  <a
                    href={item.link[0]}
                    className="flex px-4 py-3 space-x-2 items-center "
                  >
                    {item.icon(
                      classNames("w-5 h-5 text-secondary", {
                        "text-white": item.link.includes(router.pathname),
                      })
                    )}

                    <span className="font-medium">{item.label} </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <main className="w-full mx-auto md:w-[1000px] pl-8 pt-8">
            {children}
          </main>
        </section>
        <div className="h-[200px]"></div>
        <footer className="border-t py-4 mt-8 flex items-center justify-center text-gray-700">
          <span className="">
            © {new Date().getFullYear()} <Link href="/">YOUCARE</Link>. Tous
            droits réserves.
          </span>
        </footer>
      </div>
    );
}
