import BgDrawing from "@/components/common/BgDrawing";
import {
  Button,
  ButtonSecondary,
  Errors,
  Loading,
  Show,
} from "@/components/ui";
import { PAGES } from "@/config";
import { useAuth } from "@/store/auth";
import { useErrors, useLoading } from "@/store/interact";
import Link from "next/link";
import { FC, useState } from "react";

type ActivatePageProps = {};

const ActivatePage: FC<ActivatePageProps> = () => {
  const errors = useErrors();
  const loading = useLoading();
  const auth = useAuth();
  const [message, setMessage] = useState<string>("");

  function submit() {
    loading.start("submit");
    errors.reset();
    auth
      .sendActivationEmail()
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch((error) => errors.catch(error))
      .finally(() => {
        loading.stop("submit");
      });
  }

  return (
    <div
      className={`min-h-screen bg-primary py-12 overflow-auto flex items-center justify-center  relative`}
    >
      <BgDrawing />
      <div>
        <Link href="/" className="block text-4xl font-semibold text-white">
          YOUCARE
        </Link>
        <div className="w-[550px] min-h-[500px] bg-white px-16 py-12 rounded-md relative z-10 mt-4">
          <div>
            <h2 className="font-bold text-3xl text-primary">
              Activer votre compte
            </h2>

            <Errors />

            <Show
              cond={message != ""}
              className="px-4 bg-green-500 text-white mt-4 p-3"
            >
              {message}
            </Show>

            <p className="text-lg  mt-8">
              Un mail d'activation a ete envoye a votre adresse email. S'il vous
              plait consulter votre messagerie pour activer votre compte.
            </p>

            <p className="text-lg mt-8">
              Si vous n'avez pas recu le mail, cliquer sur le boutton ci-dessous
              pour recevoir un autre.
            </p>

            <div className="mt-8">
              <div className="mt-6">
                <Button size="w-full" onClick={submit}>
                  <Loading
                    item="submit"
                    text="Envoyer un nouveau email"
                    alt="En cours..."
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivatePage;
