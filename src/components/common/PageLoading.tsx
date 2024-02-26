import { FC } from "react";
import Spinner from "@/components/common/Spinner";

const PageLoading: FC = () => {
  return (
    <div className="bg-primary flex items-center justify-center flex h-screen w-full">
      <div className="text-center">
        <Spinner className="fill-white text-secondary  w-12 h-12" />
        <h3 className="mt-4 text-white">Loading...</h3>
      </div>
    </div>
  );
};

export default PageLoading;
