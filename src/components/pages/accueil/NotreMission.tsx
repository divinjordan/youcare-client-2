import { PAGES } from "@/config";
import Link from "next/link";

export default function NotreMission() {
  return (
    <div
      style={{
        backgroundImage: "url(/images/image3.jpg)",
        backgroundPositionY: "-100px",
        backgroundRepeat: "no-repeat",
      }}
      className="h-[500px] bg-cover"
      id="mission"
    >
      <div className="bg-gradient-to-r from-primary/70 h-[500px] ">
        <div className="max-w-6xl mx-auto py-20">
          <div className="bg-white/60 inline-block p-4">
            <h2 className="text-4xl text-secondary font-semibold">
              Des jeunes aidants engagés
            </h2>
            <p className="md:text-lg font-semibold mt-6 max-w-2xl text-darkprimary">
              Nous avons pour ambition de créer et maintenir des relations entre
              les générations pour retarder la perte d'autonomie. Nos aidants
              sont des jeunes étudiants en médecine et en science paramédicale.
              Il sont motivés, engagés et animés par une forte envie d'apporter
              de l'aide à leur prochain et de créer une relation humaine
              favorable au bien être de tous.
            </p>
            <div className="mt-4">
              <Link
                href={PAGES.nosServices}
                type="button"
                className="inline-flex text-lg font-semibold items-center text-white bg-secondary rounded-full px-5 py-2.5 text-center mr-3 md:mr-0"
              >
                {" "}
                Joindre Youcare{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
