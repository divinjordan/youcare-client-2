import { FC } from "react";

type ShowProps = {
  cond: boolean;
  children: React.ReactNode;
  className?: string;
};

const Show: FC<ShowProps> = ({ children, cond, className }: ShowProps) => {
  if (cond) {
    return <div className={className}>{children}</div>;
  } else {
    return <></>;
  }
};

export default Show;
