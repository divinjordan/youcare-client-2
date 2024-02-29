import { FC, useEffect, useState } from "react";
import AuthLayout from "@/components/layouts/AuthLayout";
import { InputText, InputPassword } from "@/components/ui/form";
import { useErrors, useLoading } from "@/store/interact";
import { Errors, Loading, Show } from "@/components/ui/interact";
import Link from "next/link";
import { useAuth } from "@/store/auth";
import { Button, buttonClasses } from "@/components/ui";
import { API, PAGES } from "@/config";
import { NextPageContext } from "next";
import { getHttpClient } from "@/utils/http";
import { useRouter } from "next/router";

type ResetPasswordPageProps = {
  token: string;
};

const ResetPasswordPage: FC<ResetPasswordPageProps> = ({ token }) => {
  const loading = useLoading();
  const errors = useErrors();
  const auth = useAuth();
  const [message, setMessage] = useState<string>("");

  const [form, setForm] = useState<{
    password: string;
  }>({
    password: "",
  });

  const handleChange = (e: React.FormEvent): void => {
    const target = e.target as HTMLInputElement;
    const valueChanged: Record<string, string> = {
      [target.name]: target.value,
    };
    setForm((values) => ({ ...values, ...valueChanged }));
  };

  const submit = () => {
    errors.reset();
    loading.start("submit");
    setMessage("");
    auth
      .resetPassword(form.password, token)
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch((error: any) => errors.catch(error))
      .finally(() => {
        loading.stop("submit");
      });
  };

  return (
    <AuthLayout className="bg-gray-200 min-h-screen" drawColor="bg-primary">
      <div>
        <Link href="/" className="block text-5xl font-black text-secondary">
          YOUCARE
        </Link>
        <div className="mt-4 w-[600px] min-h-[500px] bg-white px-16 py-12 rounded-md relative z-10 shadow-xl">
          <div className="flex items-center justify-center">
            <Loading item="auth" text="" alt="" />
          </div>
          <div>
            <h2 className="font-bold text-3xl text-primary">
              Reinitialiser votre mot de passe
            </h2>
            <Errors />

            <Show
              cond={message != ""}
              className="bg-green-600 text-white p-3 mt-4"
            >
              <p>{message}</p>
              <Link
                href={PAGES.AUTH.login}
                className="underline hover:font-medium"
              >
                Connexion
              </Link>
            </Show>

            <div className="mt-8">
              <InputPassword
                buttonClass="absolute right-4 top-11 text-gray-600"
                className="mt-4 relative"
                labelClass="mb-3 block"
                label="Entre votre nouveau mot de passe"
                value={form.password}
                handler={handleChange}
              />

              <div className="mt-6">
                <Button size="w-full" onClick={submit}>
                  <Loading
                    item="submit"
                    text="Reinitialiser"
                    alt="En cours..."
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  let token = "";

  if (context.query.t) {
    token = context.query.t as string;
  }

  return {
    props: {
      token,
    }, // will be passed to the page component as props
  };
}

export default ResetPasswordPage;
