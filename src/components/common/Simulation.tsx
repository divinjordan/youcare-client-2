import { useEffect, useState } from "react";

export default function Simulation() {
  const tarif = {
    jour: 12,
    nuit: 55,
  };

  const [simulation, setSimulation] = useState({
    heures_mois: 0,
    nuit_mois: 0,
    avant_credit: 0,
    apres_credit: 0,
  });
  const [showSendSimulation, setShowSendSimulation] = useState(false);

  function handleChange(e: any) {
    setSimulation((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));

    setSimulation((values) => ({
      ...values,
      avant_credit:
        simulation.heures_mois * tarif.jour + simulation.nuit_mois * tarif.nuit,
      apres_credit:
        (simulation.heures_mois * tarif.jour +
          simulation.nuit_mois * tarif.nuit) /
        2,
    }));
  }

  return (
    <>
      <div className="max-w-6xl mx-auto flex flex-wrap">
        <div className="w-full md:w-2/5">
          <h2 className="text-darkprimary text-2xl md:text-4xl font-semibold">
            Simulation: Calculez le prix de votre accompagnement.
          </h2>
          <p
            className="text-gray-700 md:text-xl mt-8 mx-auto"
            style={{ lineHeight: 1.7 }}
          >
            Calculez votre budget en inscrivant vos souhaits d’accompagnement au
            mois ! Nous pouvons également vous transmettre un devis personnalisé
            gratuitement sur demande à nos équipes.
          </p>
        </div>
        <div className="w-full md:w-3/5 pl-8">
          <div className="bg-white rounded-lg p-8 px-12 shadow-xl">
            <div className="">
              <h3 className="text-lg md:text-xl text-darkprimary font-semibold">
                {" "}
                Tarif de jour
              </h3>
              <label htmlFor="" className="text-gray-700 md:text-lg">
                {" "}
                Le nombre d&apos;heures en journee par mois (heure/mois)
              </label>
              <div className="flex flex-wrap">
                <div className="w-full md:w-10/12 pr-8">
                  <input
                    type="range"
                    min="0"
                    max="230"
                    value={simulation.heures_mois}
                    name="heures_mois"
                    className="slider"
                    onChange={handleChange}
                  />
                  <div className="flex justify-between  px-1  text-secondary">
                    <span>0</span>
                    <span>230</span>
                  </div>
                </div>
                <div className="w-full md:w-2/12">
                  <input
                    type="number"
                    value={simulation.heures_mois}
                    name="heures_mois"
                    onChange={handleChange}
                    className="w-[100px] px-4 text-lg py-1.5 text-white border-none bg-secondary rounded-lg"
                  />
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-lg md:text-xl text-darkprimary font-semibold">
                {" "}
                Tarif de nuit
              </h3>
              <label htmlFor="" className="text-gray-700 md:text-lg">
                {" "}
                Le nombre de nuit par mois (nuit/mois)
              </label>
              <div className="flex flex-wrap">
                <div className="w-full md:w-10/12 pr-8">
                  <input
                    type="range"
                    min="0"
                    max="31"
                    value={simulation.nuit_mois}
                    name="nuit_mois"
                    className="slider"
                    onChange={handleChange}
                  />
                  <div className="flex justify-between  px-1 text-secondary">
                    <span>0</span>
                    <span>31</span>
                  </div>
                </div>
                <div className="w-full md:w-2/12">
                  <input
                    type="number"
                    value={simulation.nuit_mois}
                    name="nuit_mois"
                    onChange={handleChange}
                    className="w-[100px] px-4 text-lg py-1.5 text-white border-none bg-secondary rounded-lg"
                  />
                </div>
              </div>
            </div>
            <div className="mt-8 text-primary text-lg md:text-xl font-semibold">
              <div className="flex justify-between">
                <span>Montant avant crédit d’impôts :</span>
                <span>{simulation.avant_credit} &euro;</span>
              </div>
              <div className="flex justify-between">
                <span>Déduction crédits d’impôts :</span>
                <span>{simulation.apres_credit} &euro;</span>
              </div>
              <div className="flex justify-between mt-4 text-secondary text-lg md:text-2xl">
                <span>Montant final :</span>
                <span>{simulation.apres_credit} &euro;</span>
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={() => setShowSendSimulation(true)}
                className={`${
                  showSendSimulation ? "hidden" : ""
                } px-4 md:px-8 py-2 md:text-xl bg-secondary text-white rounded-full`}
              >
                {" "}
                Recevoir par mail
              </button>
              <div
                className={`${
                  showSendSimulation ? "" : "hidden"
                } mt-6 grid grid-cols-2 gap-4 text-lg`}
              >
                <input
                  className="px-4 py-2 rounded-lg text-gray-700 border border-gray-300"
                  placeholder="Prenom"
                />
                <input
                  className="px-4 py-2 rounded-lg text-gray-700 border border-gray-300"
                  placeholder="Nom"
                />
                <input
                  className="px-4 py-2 rounded-lg col-span-2 text-gray-700 border border-gray-300"
                  placeholder="Adresse email"
                />
                <button
                  className={`px-8 py-2 md:text-xl bg-secondary text-white rounded-full`}
                >
                  {" "}
                  Envoyer{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
