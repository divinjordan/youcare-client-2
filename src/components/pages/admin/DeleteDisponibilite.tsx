import Modal from "@/components/common/Modal";
import { useDisponibilite } from "@/store/disponibilite";
import { useDisplay } from "@/store/interact";
import { useIntervenant } from "@/store/intervenant";
import { FC } from "react";

interface DeleteDisponibiliteProps {}

const DeleteDisponibilite: FC<DeleteDisponibiliteProps> = () => {
  const display = useDisplay();
  const disponibilite = useDisponibilite();
  const intervenant = useIntervenant();
  return (
    <Modal
      title="Confirmer"
      show={display.values.delete_disponibilite}
      setShow={(value: boolean) => display.set("delete_disponibilite", value)}
      onValid={() => {
        disponibilite.destroy(disponibilite.current.id).then(() => {
          intervenant.getDisponibilites(intervenant.current.id);
        });
        display.hide("delete_disponibilite");
      }}
    >
      <div className="p-8">Souhaitez vous vraiment supprimer cette element</div>
    </Modal>
  );
};

export default DeleteDisponibilite;
