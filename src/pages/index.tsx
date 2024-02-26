import { FC } from "react";
import Faqs from "@/components/common/Faqs";
import MainLayout from "@/components/layouts/MainLayout";
import Hero from "@/components/pages/accueil/Hero";
import AccompagnementPresenation from "@/components/pages/accueil/AccompagnementPresentation";
import Services from "@/components/pages/accueil/Services";
import NotreMission from "@/components/pages/accueil/NotreMission";

const HomePage: FC = () => {
  return (
    <MainLayout title="Accueil">
      <Hero />

      <AccompagnementPresenation />

      <Services />

      <NotreMission />
    </MainLayout>
  );
};

export default HomePage;
