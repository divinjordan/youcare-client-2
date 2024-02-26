import { FC } from "react";
import { Button, ButtonProps } from "./Button";

export const IconButton: FC<ButtonProps> = (props) => {
  return (
    <Button {...props} size="w-10 h-10" padding="">
      {props.children}
    </Button>
  );
};
