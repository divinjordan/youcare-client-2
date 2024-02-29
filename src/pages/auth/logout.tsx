import { useAuth } from "@/store/auth";
import { FC, useEffect } from "react";

const LogoutPage: FC = ({}) => {
  const auth = useAuth();
  useEffect(() => {
    // Clear old session data
    window.sessionStorage.removeItem("intervenant");
    window.sessionStorage.removeItem("employeur");
    window.sessionStorage.removeItem("admin");
    auth.logout();
  });
  return <></>;
};

export default LogoutPage;
