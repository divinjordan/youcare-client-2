import { useEffect, useState } from "react";
import AuthLayout from "@/components/layouts/AuthLayout";
import { InputText, InputPassword, InputRadio } from "@/components/ui/form";
import { useDisplay, useErrors, useLoading } from "@/store/interact";
import { Display, Errors, Loading } from "@/components/ui/interact";
import Link from "next/link";
import { useAuth } from "@/store/auth";
import { Button } from "@/components/ui";
import { PAGES } from "@/config";
import { useRouter } from "next/router";
import { RegisterFormFields, RegisterQuestionsFormFields } from "@/types/form";
import { useForm } from "@/components/hooks/useForm";
import { MdArrowLeft, MdExpandLess, MdExpandMore } from "react-icons/md";
import classNames from "classnames";
import { Ville, useVille } from "@/store/ville";

const questions: { title: string; name: string }[] = [
  { title: "Etes-vous majeur ?", name: "majeur" },
  {
    title: "Etes-vous autorisé à travailler en France ?",
    name: "autoriser_travailler",
  },
  {
    title: "Avez-vous envie de vous investir auprès des personnes âgées ?",
    name: "investir",
  },
  {
    title: "Maîtrisez-vous parfaitement le français écrit et oral ?",
    name: "maitriser_fr",
  },
];

export default function Register() {
  const loading = useLoading();
  const errors = useErrors();
  const auth = useAuth();
  const router = useRouter();
  const display = useDisplay();

  const [step, setStep] = useState<string>("informations");

  const ville = useVille();

  const form = useForm(RegisterFormFields);

  const questionsForm = useForm(RegisterQuestionsFormFields);

  useEffect(() => {
    const parts = router.asPath.split("?");
    const search = parts[1];
    if (parts.length > 1) {
      const paramString = search.split("&");
      const paramArr = paramString.map((item) => item.split("="));
      const params: Record<string, any> = {};
      paramArr.forEach((element: string[]) => {
        params[element[0]] = element[1];
      });
      if (params.hasOwnProperty("affiliation_id")) {
        form.setFieldValue("affiliation_id", `YOU${params.affiliation_id}`);
      }
    }
  }, []);

  const validateInformations = async () => {
    if (loading.values.hasOwnProperty("validateInformations")) return 0;

    errors.reset();
    loading.start("validateInformations");
    try {
      await form.submit(auth.validateRegisterInformations);
      setStep("questions");
    } catch (error) {
      errors.catch(error);
    } finally {
      loading.stop("validateInformations");
    }
  };

  const submit = async () => {
    if (loading.values.hasOwnProperty("submit")) return 0;

    errors.reset();
    loading.start("submit");
    try {
      await questionsForm.validate();

      if (questionsForm.values.majeur == "NON") {
        errors.set(
          "majeur_error",
          "Vous devez être majeur pour poursuivre votre inscription"
        );
        return 0;
      }

      const data = {
        ...form.values,
        ...questionsForm.values,
      };

      if (form.values.hasOwnProperty("affiliation_id")) {
        data["affiliation_id"] = form.values.affiliation_id.split("YOU").pop();
      }

      await auth.register(data);

      // Clear old session data
      window.sessionStorage.removeItem("intervenant");
      window.sessionStorage.removeItem("employeur");
      window.sessionStorage.removeItem("admin");

      router.push(PAGES.INTERVENANT.index);
    } catch (error) {
      errors.catch(error);
    } finally {
      loading.stop("submit");
    }
  };

  const handleCodePostal = (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement;
    if (target.value != "") {
      ville.simpleSearch({ code_postal: target.value });
    }
  };

  const chooseVille = (item: Ville) => {
    form.setFieldValue("ville", item.ville_nom);
    form.setFieldValue("code_postal", item.ville_code_postal);
    ville.filter(() => false);
  };

  return (
    <AuthLayout className="bg-gray-200 min-h-screen" drawColor="bg-secondary">
      <div>
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="block text-4xl font-semibold text-secondary"
          >
            YOUCARE
          </Link>
          <Link href="/" className="text-xl items-center flex hover:underline">
            Retour à l'accueil
          </Link>
        </div>

        <div className="w-[600px] min-h-[500px] bg-white px-8 py-8 rounded-md relative z-10 shadow-lg">
          <div className="flex items-center justify-center">
            <Loading item="auth" text="" alt="" />
          </div>
          <div>
            <Errors />

            {step == "informations" ? (
              <div className="mt-4 grid grid-cols-2 gap-4">
                <InputText
                  value={form.values.nom}
                  name="nom"
                  label="Nom"
                  handler={form.handleChange}
                />

                <InputText
                  value={form.values.prenom}
                  name="prenom"
                  label="Prenom"
                  handler={form.handleChange}
                />

                <InputText
                  value={form.values.email}
                  name="email"
                  label="Adresse email"
                  handler={form.handleChange}
                />

                <InputText
                  value={form.values.telephone}
                  name="telephone"
                  label="Numero de telephone"
                  handler={form.handleChange}
                />

                <InputText
                  value={form.values.code_postal}
                  name="code_postal"
                  label="Code postal"
                  handler={handleCodePostal}
                />

                <div className="relative">
                  <InputText
                    value={form.values.ville}
                    name="ville"
                    label="Ville"
                    handler={form.handleChange}
                  />
                  <div
                    className={classNames("relative", {
                      hidden: !ville.items.length,
                    })}
                  >
                    <ul className="absolute -top-2 z-20  w-full bg-gray-100 h-[200px] overflow-auto">
                      {ville.items.map((item, index) => (
                        <li
                          key={`ville${index}`}
                          onClick={() => chooseVille(item)}
                          className="px-4 py-2 border-b border-gray-300 cursor-pointer hover:bg-primary/10"
                        >
                          {item.ville_nom}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <InputText
                  className="col-span-2"
                  value={form.values.adresse}
                  name="adresse"
                  label="Adresse complete"
                  handler={form.handleChange}
                />

                <InputPassword
                  className="col-span-2 relative"
                  label="Your password"
                  value={form.values.password}
                  handler={form.handleChange}
                />

                <div className="mt-4 col-span-2 relative">
                  <label className="mb-2 block">
                    {" "}
                    ID de parrainage (optionnel)
                  </label>
                  <Display item="input_affiliation_id">
                    <InputText
                      value={form.values.affiliation_id}
                      name="affiliation_id"
                      handler={form.handleChange}
                    />
                  </Display>
                  <button
                    onClick={() => {
                      display.show("input_affiliation_id");
                    }}
                    className={classNames("absolute right-4 top-0", {
                      hidden: display.values.input_affiliation_id,
                    })}
                  >
                    <MdExpandMore className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => {
                      display.hide("input_affiliation_id");
                    }}
                    className={classNames("absolute right-4 top-0", {
                      hidden: !display.values.input_affiliation_id,
                    })}
                  >
                    <MdExpandLess className="w-6 h-6" />
                  </button>
                </div>

                <div className="mt-8 col-span-2">
                  <Button size="w-full" onClick={validateInformations}>
                    <Loading
                      item="validateInformations"
                      text="Continuer"
                      alt="En cours..."
                    />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {questions.map((item) => {
                  return (
                    <InputRadio
                      key={`question${item}`}
                      labelClass="block mb-1 text-lg font-medium"
                      inputClass="text-secondary focus:ring-secondary/50 focus:border-secondary/50 w-4 h-4"
                      label={item.title}
                      name={item.name}
                      value={questionsForm.values[item.name]}
                      options={[
                        { label: "Oui", value: "OUI" },
                        { label: "Non", value: "NON" },
                      ]}
                      handler={questionsForm.handleChange}
                    />
                  );
                })}
                <div className="mt-12">
                  <Button size="w-full" onClick={submit}>
                    <Loading item="submit" text="Continuer" alt="En cours..." />
                  </Button>
                </div>
              </div>
            )}
            <p className="mt-8 text-center">
              Vouz avez déjà un compte ?
              <Link
                href={PAGES.AUTH.login}
                className="text-secondary font-black ml-2"
              >
                Connectez-vous
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
