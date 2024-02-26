import Modal from "@/components/common/Modal";
import { useForm } from "@/components/hooks/useForm";
import { Errors, InputPassword, InputText } from "@/components/ui";
import { useDisplay, useErrors, useLoading } from "@/store/interact";
import { useUser } from "@/store/user";
import { CreateAdminForm } from "@/types";
import { FC, useEffect } from "react";

const CreateAdminModal: FC = () => {
  const form = useForm(CreateAdminForm);
  const display = useDisplay();
  const loading = useLoading();
  const errors = useErrors();
  const user = useUser();

  useEffect(() => {
    errors.reset();
    form.reset();
    form.setFieldValue("role", "admin");
  }, [display.values.create_admin]);

  const submit = () => {
    form
      .submit(user.create)
      .then((res: any) => {
        user.add(res.data);
        display.hide("create_admin");
      })
      .catch((error: any) => errors.catch(error));
  };

  return (
    <Modal
      show={display.values.create_admin}
      title={"Créer un administrateur"}
      size="w-[400px]"
      validLoading={loading.values.create_admin != undefined}
      validLabel="Valider"
      cancelLabel="Annuler"
      setShow={(show: boolean) => {
        show ? display.show("create_admin") : display.hide("create_admin");
      }}
      onCancel={() => {
        form.reset();
      }}
      onClose={() => {
        form.reset();
      }}
      onValid={submit}
    >
      <div className="px-8 space-y-4 py-8">
        <Errors />
        <InputText
          label="Nom"
          name="nom"
          value={form.values.nom}
          handler={form.handleChange}
        />
        <InputText
          label="Prenom"
          name="prenom"
          value={form.values.prenom}
          handler={form.handleChange}
        />
        <InputText
          label="Email"
          name="email"
          value={form.values.email}
          handler={form.handleChange}
        />
        <InputPassword
          label="Mot de passe"
          name="password"
          value={form.values.password}
          handler={form.handleChange}
        />
      </div>
    </Modal>
  );
};

export default CreateAdminModal;
