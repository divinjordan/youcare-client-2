import { FC } from "react";

type BgDrawingProps = {
  drawColor?: string;
};

const BgDrawing: FC<BgDrawingProps> = ({ drawColor }) => {
  return (
    <>
      <div
        className={`${drawColor} fixed z-0 h-[30px] w-[250px] bottom-[200px] left-[100px] rounded-full -rotate-45 hidden md:block`}
      ></div>

      <div
        className={`${drawColor} z-0 fixed h-[30px] w-[250px] bottom-[0px] left-[50px] rounded-full -rotate-45  hidden md:block`}
      ></div>

      <div
        className={`${drawColor} fixed z-0 h-[30px] w-[250px] top-[200px] right-[100px] rounded-full -rotate-45  hidden md:block`}
      ></div>

      <div
        className={`${drawColor} fixed z-0 h-[30px] w-[250px] top-[0px] right-[50px] rounded-full -rotate-45  hidden md:block`}
      ></div>
    </>
  );
};

export default BgDrawing;
