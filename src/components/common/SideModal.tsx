import { FC } from "react";
import { IconButton, Show } from "@/components/ui";
import { MdOutlineClose } from "react-icons/md";

type ModalProps = {
  children: React.ReactNode;
  title: string;
  show: boolean;
  bg?: string;
  index?: string;
  size?: string;
  setShow: (show: boolean) => void;
  onClose?: () => void;
};

const SideModal: FC<ModalProps> = ({
  children,
  title,
  show,
  bg = "bg-black/50",
  index = "z-50",
  size = "w-[600px]",
  setShow = (show: boolean) => {},
  onClose = () => {},
}) => {
  return (
    <Show
      cond={show}
      className={`${bg} ${index} fixed top-0 left-0 w-full min-h-screen flex items-center justify-end`}
    >
      <div className={`${size} bg-white h-screen overflow-auto`}>
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
      </div>
    </Show>
  );
};

export default SideModal;
