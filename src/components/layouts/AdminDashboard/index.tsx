import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/store/auth";
import PageLoading from "@/components/common/PageLoading";
import UserAvatar from "@/components/common/UserAvatar";
import { AiOutlineMenu } from "react-icons/ai";
import classNames from "classnames";
import { useErrors } from "@/store/interact";
import {
  MdBadge,
  MdCreditCard,
  MdDashboard,
  MdGroup,
  MdManageAccounts,
  MdPerson,
  MdPostAdd,
  MdSupportAgent,
  MdWorkOutline,
} from "react-icons/md";
import { PAGES } from "@/config";
import Link from "next/link";

export const links: {
  label: string;
  link: string[];
  icon: any;
}[] = [
  {
    label: "Tableau de board",
    link: ["/admin"],
    icon: <MdDashboard />,
  },
  {
    label: "Intervenants",
    link: ["/admin/intervenants"],
    icon: <MdPerson />,
  },
  {
    label: "Aidants",
    link: ["/admin/employeurs"],
    icon: <MdSupportAgent />,
  },
  {
    label: "Les demandes",
    link: ["/admin/demandes"],
    icon: <MdBadge />,
  },
  {
    label: "Les annonces",
    link: ["/admin/annonces", "/admin/creer-mission"],
    icon: <MdPostAdd />,
  },
  {
    label: "Les missions",
    link: ["/admin/missions"],
    icon: <MdWorkOutline />,
  },
  {
    label: "Parrainage",
    link: ["/admin/parrainage"],
    icon: <MdGroup />,
  },
  {
    label: "Paiements",
    link: ["/admin/paiements"],
    icon: <MdCreditCard />,
  },
  {
    label: "Administrateurs",
    link: ["/admin/users"],
    icon: <MdManageAccounts />,
  },
];

type DashboardProps = {
  children: React.ReactNode;
};

export default function AdminDashboard({ children }: DashboardProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const auth = useAuth();
  const router = useRouter();
  const errors = useErrors();

  useEffect(() => {
    if (window.innerWidth > 672) {
      setShowMenu(true);
    }

    errors.reset();
    setLoading(false);

    auth
      .fetchLoggedUser()
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
        <div className="md:border-b md:border-gray-200">
          <header className="md:hidden flex items-center  justify-between py-2 px-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-primary">
              YOUCARE
            </h1>
            <div className="flex space-x-8 items-center">
              <button
                className="inline-flex md:hidden"
                onClick={() => {
                  setShowMenu(!showMenu);
                }}
              >
                <AiOutlineMenu className="w-6 h-6 text-gray-600 z-20 " />
              </button>
              <UserAvatar className="w-12 h-12" />
            </div>
          </header>
        </div>

        <nav className="z-20 w-full md:w-[250px] md:fixed md:left-0 md:top-0 md:h-screen border-b  md:border-none relative bg-gray-800 text-white">
          <h1 className="hidden md:block text-2xl sm:text-3xl font-bold  p-4 px-10 text-secondary">
            YOUCARE
          </h1>
          <ul
            className={classNames("", {
              hidden: !showMenu,
            })}
          >
            {links.map((item, index) => (
              <li key={`${index}${item.label}`} className="relative px-4">
                <a
                  href={item.link[0]}
                  className={classNames(
                    "flex px-6 py-3 space-x-2 items-center hover:bg-secondary/50 rounded-md text-medium",
                    {
                      "bg-secondary": item.link.includes(
                        router.pathname
                          .split("/")
                          .filter((i) => !i.includes("["))
                          .join("/")
                      ),
                    }
                  )}
                >
                  {item.icon}
                  <span>{item.label} </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <section className="z-10 md:pl-[250px] relative">
          <header className="hidden md:flex items-center  justify-end py-2 px-8">
            <div className="flex space-x-2 items-center">
              <UserAvatar className="w-8 h-8" />
              <Link href="auth/logout">
                <button className="px-2 border-gray-200 border text-sm rounded-md p-1 bg-gray-50">
                  Deconnexion
                </button>
              </Link>
            </div>
          </header>
          <div className="px-8 pb-16 pt-1">
            <main className="md:w-[1000px] mx-auto">{children}</main>
          </div>
        </section>
      </div>
    );
}
