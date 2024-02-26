import { useState, useContext, createContext, useEffect } from "react";
import { Icon } from "./icons";
import Show from "@/components/common/Show";
import classNames from "classnames";

const TabContext = createContext<any>({});

interface TabContainerProps {
  children: React.ReactNode;
}

export function TabContainer({ children }: TabContainerProps) {
  const [active, setActive] = useState(0);

  return (
    <TabContext.Provider value={{ active, setActive }}>
      {children}
    </TabContext.Provider>
  );
}

interface TabMenuProps {
  tabs: any;
  menuClass?: string;
  itemClass?: string;
  iconClass?: string;
  iconClassActive?: string;
  activeClass?: string;
  activeItem: any;
}

export function TabMenu({
  tabs,
  menuClass = "flex flex-wrap font-medium text-center border-b border-primary/10",
  itemClass = "w-full md:w-auto flex items-center  px-3 md:px-6 py-2 md:rounded-t-lg border-b-2 border-transparent",
  iconClass = "text-primary",
  iconClassActive = "text-white",
  activeClass = "bg-primary text-white",
  activeItem,
}: TabMenuProps) {
  const { active, setActive } = useContext(TabContext);
  useEffect(() => {
    setActive(tabs[activeItem].key);
  }, [tabs]);
  return (
    <ul className={menuClass}>
      {tabs.map((item: any, index: number) => (
        <li
          key={`${index}${item.key}`}
          onClick={() => setActive(item.key)}
          className={`cursor-pointer ${itemClass} ${
            active == item.key ? activeClass : ""
          }`}
        >
          {item.icon != undefined ? (
            <Icon
              icon={item.icon}
              className={classNames(iconClass, {
                [iconClassActive]: active == item.key,
              })}
            />
          ) : null}
          {item.text}
        </li>
      ))}
    </ul>
  );
}

interface TabItemProps {
  item: any;
  children: React.ReactNode;
}

export function TabItem({ item, children }: TabItemProps) {
  const { active } = useContext(TabContext);
  return <Show cond={active == item}>{children}</Show>;
}
