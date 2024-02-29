import { useState } from "react";
import AuthLayout from "@/components/layouts/AuthLayout";
import { InputText } from "@/components/ui/form";
import { useErrors, useLoading } from "@/store/interact";
import { Errors, Loading, Show } from "@/components/ui/interact";
import { useAuth } from "@/store/auth";
import { Button } from "@/components/ui";
import Link from "next/link";

export default function ForgotPassword() {
  const loading = useLoading();
  const errors = useErrors();
  const auth = useAuth();
  const [message, setMessage] = useState<string>("");

  const [form, setForm] = useState<{
    email: string;
  }>({
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
      .forgotPassword(form.email)
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
        <div className="mt-4 w-[550px] min-h-[500px] bg-white px-16 py-12 rounded-md relative z-10 shadow-xl">
          <div className="flex items-center justify-center">
            <Loading item="auth" text="" alt="" />
          </div>
          <div>
            <h2 className="font-bold text-3xl text-primary">
              Mot de passe oublie ?
            </h2>
            <h3 className="text-lg mt-8">
              Entrer votre adresse email. Un email sera envoyé à votre adresse
              email avec un lien pour la réinitialisation de votre mot de passe.
            </h3>

            <Errors />

            <Show
              cond={message != ""}
              className="px-4 bg-green-500 text-white mt-4 p-3"
            >
              {message}
            </Show>

            <div className="mt-6">
              <InputText
                value={form.email}
                name="email"
                type="email"
                label="Votre adresse email"
                handler={handleChange}
              />

              <div className="mt-6">
                <Button size="w-full" onClick={submit}>
                  <Loading
                    item="submit"
                    text="Envoyer l'email"
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
}
