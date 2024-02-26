import { PAGES } from "@/config";
import Link from "next/link";

const styles = {
  backgroundImage: "url(/images/image2.jpg)",
  backgroundPositionY: "-200px",
};

export default function Hero() {
  return (
    <div
      className="h-[400px] md:h-[600px] bg-cover hero-bg"
      id="hero-bg"
      style={styles}
    >
      <div className="bg-gradient-to-r relative from-blue-900/60  h-[400px] md:h-[600px] pt-12 md:pt-32 overflow-hidden">
        <div className="max-w-7xl  px-3 mx-auto text-white">
          <h2 className="text-3xl md:text-7xl font-semibold">
            Accompagnement par <br /> des etudiants en sante
          </h2>
          <p className="md:text-xl mt-4">
            Nous mettons en relation les étudiants et les familles qui <br />{" "}
            recherchent un accompagnement de nuit.
          </p>
          <div className="mt-8 md:text-xl md:space-x-4">
            <Link
              href={PAGES.faireDemande()}
              className="px-5 py-2.5  text-white bg-secondary rounded-full"
            >
              Je fais une demande
            </Link>
            <br className="md:hidden" />
            <Link
              href={PAGES.etudiant}
              className="px-5 py-2.5 mt-4 md:mt-0 text-primary bg-white rounded-full"
            >
              Je suis un etudiant
            </Link>
          </div>
        </div>
        <svg
          className="hidden md:block text-white relative z-10"
          id="curve-parent"
          width="200"
          height="200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path id="curve" d="" stroke="" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}
