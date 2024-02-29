import { FC, useEffect, useState } from "react";
import AuthLayout from "@/components/layouts/AuthLayout";
import { InputText, InputPassword } from "@/components/ui/form";
import { useErrors, useLoading } from "@/store/interact";
import { Errors, Loading, Show } from "@/components/ui/interact";
import Link from "next/link";
import { Role, useAuth } from "@/store/auth";
import { Button } from "@/components/ui";
import { API } from "@/config";
import { getHttpClient } from "@/utils/http";
import { logError } from "@/utils/logger";

const LoginChoicePage: FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  useEffect(() => {
    getHttpClient()
      .get(API.AUTH.roles)
      .then((res) => setRoles(res.data))
      .catch((error) => logError(error));
  }, []);
  return (
    <AuthLayout className="bg-primary min-h-screen">
      <div>
        <Link href="/" className="block text-4xl font-semibold text-white">
          YOUCARE
        </Link>
        <div className="mt-4 w-[550px] min-h-[400px] bg-white px-16 py-12 rounded-md relative z-10">
          <div className="flex items-center justify-center">
            <Loading item="auth" text="" alt="" />
          </div>
          <div>
            <h3 className="text-base mt-1 font-semibold text-darkprimary text-lg md:text-2xl">
              Sur quel profil souhaitez vous vous connectez ?
            </h3>

            <div className="mt-8">
              <ul className="space-y-4">
                {roles.map((item: Role, index) => (
                  <li key={`role${index}`} className="">
                    <Link href={item.redirect}>
                      <span className="cursor-pointer border border-secondary hover:bg-secondary hover:text-white p-4 rounded-full text-center md:text-xl block">
                        {item.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

// export async function getServerSideProps(context: NextPageContext) {
//   let roles: Role[] = [];

//   return {
//     props: {
//       roles,
//     }, // will be passed to the page component as props
//   };
// }

export default LoginChoicePage;
