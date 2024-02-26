import { useDisplay } from "@/store/interact";
import { FC } from "react";

type DisplayProps = {
  item: string;
  children: React.ReactNode;
  className?: string;
};

const Display: FC<DisplayProps> = ({
  children,
  item,
  className,
}: DisplayProps) => {
  const display = useDisplay();

  function checkDisplay(item: string): boolean {
    if (display.values[item] == undefined) {
      return false;
    } else {
      return true;
    }
  }

  if (checkDisplay(item)) {
    return <div className={className}>{children}</div>;
  } else {
    return <></>;
  }
};

export default Display;
