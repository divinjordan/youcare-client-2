import { FC, useState } from "react";
import AuthLayout from "@/components/layouts/AuthLayout";
import { InputText, InputPassword } from "@/components/ui/form";
import { useErrors, useLoading } from "@/store/interact";
import { Errors, Loading, Show } from "@/components/ui/interact";
import Link from "next/link";
import { useAuth } from "@/store/auth";
import { Button } from "@/components/ui";
import { API, PAGES } from "@/config";
import { NextPageContext } from "next";
import { getHttpClient } from "@/utils/http";
import { useRouter } from "next/router";
import { MdArrowLeft } from "react-icons/md";

type LoginPageProps = {
  message: string;
};

const LoginPage: FC<LoginPageProps> = ({ message }) => {
  const loading = useLoading();
  const errors = useErrors();
  const auth = useAuth();
  const router = useRouter();

  const [form, setForm] = useState<{
    password: string;
    email: string;
  }>({
    password: "",
    email: "",
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
    auth
      .login(form.email, form.password)
      .then((credentials) => {
        // Clear old session data
        window.sessionStorage.removeItem("intervenant");
        window.sessionStorage.removeItem("employeur");
        window.sessionStorage.removeItem("admin");
        router.push(credentials.redirect);
      })
      .catch((error: any) => errors.catch(error))
      .finally(() => {
        loading.stop("submit");
      });
  };

  return (
    <AuthLayout className="bg-primary min-h-screen">
      <div>
        <div className="flex items-center justify-between">
          <Link href="/" className="block text-4xl font-semibold text-white">
            YOUCARE
          </Link>
          <Link
            href="/"
            className="text-xl text-white items-center flex hover:underline"
          >
            <span>Retour à l'accueil</span>
          </Link>
        </div>

        <div className="mt-4 w-[550px] min-h-[500px] bg-white px-16 py-12 rounded-md relative z-10">
          <div className="flex items-center justify-center">
            <Loading item="auth" text="" alt="" />
          </div>
          <div>
            <h2 className="font-bold text-3xl text-primary">Connexion</h2>
            <h3 className="text-base mt-1 font-semibold">
              Connecter vous à votre compte Youcare
            </h3>

            <Errors />

            <Show
              cond={message != "" && message != undefined}
              className="bg-green-600 text-white p-3 mt-4"
            >
              {message}
            </Show>

            <div className="mt-6">
              <InputText
                value={form.email}
                name="email"
                type="email"
                label="Adresse email"
                handler={handleChange}
              />

              <InputPassword
                className="mt-4 relative"
                label="Mot de passe"
                value={form.password}
                handler={handleChange}
              />

              <div className="mt-4">
                <Link href={PAGES.AUTH.forgotPassword}>
                  <button className="text-primary font-semibold hover:underline">
                    Mot de passe oublié ?
                  </button>
                </Link>
              </div>

              <div className="mt-6">
                <Button size="w-full" onClick={submit}>
                  <Loading item="submit" text="Connexion" alt="En cours..." />
                </Button>

                <p className="mt-8">
                  Vous n'avez pas de compte YOUCARE ?
                  <Link
                    href={PAGES.AUTH.register}
                    className="text-secondary font-black ml-2 hover:underline"
                  >
                    Créer un compte etudiant
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  let message = "";

  if (context.query.m) {
    message = context.query.m as string;
  }

  if (context.query.t) {
    try {
      const result = await getHttpClient().post(
        API.AUTH.ACTIVATE.token(context.query.t as string)
      );
      message = result.data.message;
    } catch (error) {
      console.log(error);
    }
  }

  return {
    props: {
      message,
    }, // will be passed to the page component as props
  };
}

export default LoginPage;
