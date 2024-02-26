import { FC, useEffect, useState } from "react";
import IntervenantDashboard from "@/components/layouts/IntervenantDashboard";
import { useRouter } from "next/router";
import { BsBookmarkCheckFill, BsClipboardCheck } from "react-icons/bs";
import { AiOutlineClockCircle, AiOutlineUser } from "react-icons/ai";
import classNames from "classnames";
import Link from "next/link";

const tabs = [
  {
    text: "En cours",
    icon: BsClipboardCheck,
    link: "/intervenant/missions/en-cours",
  },
  {
    text: "Candidatures",
    icon: AiOutlineUser,
    link: "/intervenant/missions/candidatures",
  },
  {
    text: "Favoris",
    icon: BsBookmarkCheckFill,
    link: "/intervenant/missions/favoris",
  },
  {
    text: "Historique",
    icon: AiOutlineClockCircle,
    link: "/intervenant/missions/historique",
  },
];

interface MissionsLayoutProps {
  children: React.ReactNode;
}

const MissionsLayout: FC<MissionsLayoutProps> = ({ children }) => {
  const [activeItem, setActiveItem] = useState<string | number>(0);
  const router = useRouter();

  useEffect(() => {
    setActiveItem(router.pathname);
  }, []);

  return (
    <IntervenantDashboard>
      <ul className="flex flex-wrap font-medium text-center border-b border-primary/10">
        {tabs.map((item: any, index: number) => (
          <li key={`${index}${item.text}`}>
            <Link
              href={item.link}
              onClick={() => setActiveItem(item.link)}
              className={`cursor-pointer w-full md:w-auto flex items-center  px-3 md:px-6 py-3 md:rounded-t-lg border-b-2 border-transparent ${
                activeItem == item.link ? "bg-primary text-white" : ""
              }`}
            >
              <item.icon
                className={classNames("text-primary", {
                  "text-white": activeItem == item.link,
                })}
              />
              <span className="ml-2">{item.text}</span>
            </Link>
          </li>
        ))}
      </ul>
      {children}
    </IntervenantDashboard>
  );
};

export default MissionsLayout;
