import Modal from "@/components/common/Modal";
import { useForm } from "@/components/hooks/useForm";
import { Display, Errors, InputText } from "@/components/ui";
import InputSelect from "@/components/ui/form/InputSelect";
import { useDisponibilite } from "@/store/disponibilite";
import { useDisplay, useErrors, useLoading } from "@/store/interact";
import { useIntervenant } from "@/store/intervenant";
import { MutateDisponibiliteForm, MutateDisponibiliteFormType } from "@/types";
import { format } from "date-fns";
import { FC, useEffect } from "react";

const MutateDisponibilite: FC = () => {
  const form = useForm(MutateDisponibiliteForm);
  const disponibilite = useDisponibilite();
  const intervenant = useIntervenant();
  const display = useDisplay();
  const loading = useLoading();
  const errors = useErrors();

  useEffect(() => {
    errors.reset();

    if (disponibilite.mutationMode == "create") {
      form.reset();
    }

    form.setValues((values: MutateDisponibiliteFormType) => {
      console.log(disponibilite.form);

      const newValues = {
        ...values,
        ...disponibilite.form,
      };

      if (newValues.type == "1") {
        display.show("heure_fin");
      }

      return newValues;
    });
  }, [display.values.add_disponibilite]);

  const handleTypeChange = (e: React.FormEvent): void => {
    const target = e.target as HTMLInputElement;
    form.setFieldValue("type", target.value);
    if (target.value == "2") {
      form.setFieldValue("heure_fin", "08:00");
      display.hide("heure_fin");
    } else {
      display.show("heure_fin");
    }
  };

  return (
    <Modal
      show={display.values.add_disponibilite}
      title={"Ajouter une disponibilité"}
      size="w-[400px]"
      validLoading={loading.values.add_disponibilite != undefined}
      setShow={(show: boolean) => {
        show
          ? display.show("add_disponibilite")
          : display.hide("add_disponibilite");
      }}
      onCancel={() => {
        form.reset();
      }}
      onClose={() => {
        form.reset();
      }}
      onValid={() => {
        errors.unset("add_disponibilite");
        form
          .validate()
          .then(() => {
            const dateDebut = new Date(form.values.date_debut);
            const dateFin = new Date(form.values.date_debut);

            const heureDebutParts = form.values.heure_debut.split(":");
            const heureFinParts = form.values.heure_fin.split(":");

            dateDebut.setHours(heureDebutParts[0]);
            dateDebut.setMinutes(heureDebutParts[1]);

            dateFin.setHours(heureFinParts[0]);
            dateFin.setMinutes(heureFinParts[1]);

            let quantity = parseFloat(
              (
                (dateFin.getTime() - dateDebut.getTime()) /
                (1000 * 60 * 60)
              ).toFixed(1)
            );

            // Si c'est la nuit. Deplace d'un jour.
            if (form.values.type == "2") {
              dateFin.setTime(dateFin.getTime() + 1000 * 60 * 60 * 24);
              quantity = 22 - parseInt(heureDebutParts[0]);
            } else {
              if (dateFin.getTime() < dateDebut.getTime()) {
                return Promise.reject({
                  message:
                    "L'heure d'arriver doit être inférieur à l'heure départ",
                });
              }
            }

            const data = {
              ...form.values,
              date_debut: format(dateDebut, "yy-MM-dd HH:mm:ss"),
              date_fin: format(dateFin, "yy-MM-dd HH:mm:ss"),
              quantity,
            };

            loading.start("add_disponibilite");

            if (disponibilite.mutationMode == "create") {
              disponibilite.create(data).finally(() => {
                loading.stop("add_disponibilite");
                form.reset();
                display.hide("add_disponibilite");
                intervenant.getDisponibilites(intervenant.current.id);
              });
            } else if (disponibilite.mutationMode == "edit") {
              disponibilite
                .update(disponibilite.current.id, data)
                .finally(() => {
                  loading.stop("add_disponibilite");
                  form.reset();
                  display.hide("add_disponibilite");
                  intervenant.getDisponibilites(intervenant.current.id);
                });
            }
          })
          .catch((error: any) => {
            errors.set("add_disponibilite", error.message);
          });
      }}
    >
      <div className="px-8 space-y-4 py-8">
        <Errors />
        <InputSelect
          options={[
            { text: "En journée", value: "1" },
            { text: "La nuit", value: "2" },
          ]}
          name="type"
          handler={handleTypeChange}
          label="A quel moment ?"
          value={form.values.type}
        />
        <div>
          <InputText
            value={form.values.heure_debut}
            handler={form.handleChange}
            name={"heure_debut"}
            label="Vous pouvez arriver à quelle heure ?"
            type="time"
          />
        </div>
        <Display item="heure_fin">
          <InputText
            value={form.values.heure_fin}
            handler={form.handleChange}
            name={"heure_fin"}
            label="Vous aller repartir à quelle heure ?"
            type="time"
          />
        </Display>
      </div>
    </Modal>
  );
};

export default MutateDisponibilite;
