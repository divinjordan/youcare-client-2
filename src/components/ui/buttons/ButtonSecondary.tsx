import { FC } from "react";
import { Button, ButtonProps } from "./Button";

export const ButtonSecondary: FC<ButtonProps> = (props) => {
  return (
    <Button {...props} bg="bg-secondary" color="text-white">
      {props.children}
    </Button>
  );
};
