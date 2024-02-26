import { useErrors } from "@/store/interact";
import { useDemande } from "@/store/demande";
import { useCategorie } from "@/store/categorie";
import { useEffect } from "react";

export default function Besoins() {
  const errors = useErrors((s) => s);
  const demande = useDemande((state) => state);
  const categorie = useCategorie();

  useEffect(() => {
    categorie.fetchAll();
  }, []);

  function next() {
    errors.reset();
    if ((demande.current.categories as string[]).length == 0) {
      errors.set(
        "needs",
        "Veuillez selectionner au moins un besoin avant de continuer"
      );
      return 0;
    } else {
      demande.setStep("coordonnees");
    }
  }

  return (
    <div className={`${demande.step == "besoins" ? "" : "hidden"}`}>
      <h3 className="text-xl md:text-2xl font-semibold">
        Quelles sont les services dont vous avez besoin ?
      </h3>
      <h4 className="text-darkprimary">Vous pouvez en choisir plusieurs</h4>
      <div className="grid grid-cols-2 gap-4 mt-5">
        {categorie.items.map((item, index) => (
          <div
            key={`categorie${index}`}
            onClick={() => demande.toggleNeed(item.id)}
            className={`${
              demande.current.categories?.includes(item.id)
                ? "border-secondary bg-secondary text-white"
                : "border-secondary/50"
            } border-2  py-4 flex items-center justify-center  hover:bg-secondary hover:text-white rounded-lg text-lg font-medium cursor-pointer `}
          >
            {item.categorie_nom}
          </div>
        ))}
      </div>
      <button
        onClick={next}
        className="px-5 md:px-8 py-2 md:py-2.5 md:text-xl text-white bg-secondary rounded-full mt-6"
      >
        Continuer
      </button>
    </div>
  );
}
