import { FC } from "react";
import { Button, ButtonSecondary, IconButton, Show } from "@/components/ui";
import { MdOutlineClose } from "react-icons/md";
import Spinner from "./Spinner";

type ModalProps = {
  children: React.ReactNode;
  title: string;
  show: boolean;
  cancelLabel?: string;
  validLabel?: string;
  validLoading?: boolean;
  validLoadingText?: string;
  validLoadingSpinner?: string;
  bg?: string;
  index?: string;
  size?: string;
  setShow: (show: boolean) => void;
  onClose?: () => void;
  onCancel?: () => void | undefined;
  onValid?: () => void | undefined;
};

const Modal: FC<ModalProps> = ({
  children,
  title,
  show,
  cancelLabel = "Cancel",
  validLabel = "Ok",
  validLoading = false,
  validLoadingText = "Processing...",
  validLoadingSpinner = "fill-white text-primary w-4 h-4",
  bg = "bg-black/50",
  index = "z-50",
  size = "w-[600px]",
  setShow = (show: boolean) => {},
  onClose = () => {},
  onCancel = () => {},
  onValid = () => {},
}) => {
  return (
    <Show
      cond={show}
      className={`${bg} ${index} z-30 fixed top-0 left-0 w-full min-h-screen flex items-center justify-center`}
    >
      <div
        className={`${size} bg-white rounded-lg  rounded-lg overflow-hidden`}
      >
        <header className="flex items-center justify-between bg-gray-50 px-8 py-4 ">
          <h3 className="text-xl font-medium">{title}</h3>
          <IconButton
            bg="bg-gray-100"
            hover="hover:bg-gray-200"
            color="text-black"
            onClick={() => {
              setShow(false);
              onClose();
            }}
          >
            <MdOutlineClose className="w-6 h-6" />
          </IconButton>
        </header>
        <div>{children}</div>
        <footer className="flex items-center justify-end bg-gray-50 px-8 py-4 space-x-4">
          {cancelLabel != "" ? (
            <Button
              onClick={() => {
                setShow(false);
                onCancel();
              }}
              bg="bg-gray-300"
              color="text-black"
            >
              {cancelLabel}
            </Button>
          ) : null}

          {validLabel != "" ? (
            <ButtonSecondary onClick={onValid}>
              {validLoading ? (
                <span className="flex justify-center items-center">
                  <Spinner className={validLoadingSpinner} />
                  <span>{validLoadingText}</span>
                </span>
              ) : (
                <span>{validLabel}</span>
              )}
            </ButtonSecondary>
          ) : null}
        </footer>
      </div>
    </Show>
  );
};

export default Modal;
