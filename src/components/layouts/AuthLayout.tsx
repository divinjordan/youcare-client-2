import { useAuth } from "@/store/auth";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import PageLoading from "../common/PageLoading";
import { PAGES } from "@/config";
import BgDrawing from "../common/BgDrawing";
import { useErrors } from "@/store/interact";

type AuthLayoutProps = {
  children: React.ReactNode;
  className?: string;
  drawColor?: string;
};

const AuthLayout: FC<AuthLayoutProps> = ({
  children,
  className = "bg-primary",
  drawColor = "bg-white",
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const auth = useAuth();
  const router = useRouter();
  const errors = useErrors();

  useEffect(() => {
    errors.reset();
    auth
      .fetchLoggedUser()
      .then((user) => {
        if (router.asPath != PAGES.AUTH.loginChoice) {
          router.push(user.redirect);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <PageLoading />;
  } else {
    return (
      <div
        className={`${className} py-12 overflow-auto flex items-center justify-center  relative`}
      >
        <BgDrawing drawColor={drawColor}></BgDrawing>
        {children}
      </div>
    );
  }
};

export default AuthLayout;
