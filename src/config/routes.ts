export const PAGES = {
  AUTH: {
    login: "/auth/connexion",
    register: "/auth/register",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    activate: "/auth/activate",
    loginChoice: "/auth/connexion-choix",
  },
  USER: {
    missions: "/user/mission",
  },
  INTERVENANT: {
    index: "/intervenant",
    missions: "/intervenant/missions",
    candidatures: "/intervenant/candidatures",
    favoris: "/intervenant/favoris",
    preselections: "/intervenant/preselections",
    profil: "/intervenant/profil",
    paiements: "/intervenant/paiements",
    parrainage: "/intervenant/parrainage",
    calendrier: "/intervenant/calendrier",
  },
  ADMIN: {
    demandes: "/admin/demandes",
    creerMission: (demandeId: string | number) =>
      `/admin/creer-mission?demande=${demandeId}`,
    intervenants: (id: number | undefined = undefined) =>
      id ? `/admin/intervenants/${id}` : "/admin/intervenants",
    employeurs: (id: number | undefined = undefined) =>
      id ? `/admin/employeurs/${id}` : "/admin/employeurs",
  },
  home: "/Home",
  nosServices: "/nos-services",
  commentCaMarche: "/comment-ca-marche",
  etudiant: "/je-suis-etudiant",
  politique: "/politique-de-confidentialite",
  mentionsLegales: "/mentions-legales",
  faireDemande: (service: string = "") =>
    service == "" ? `/faire-demande` : `/faire-demande?s=${service}`,
};
