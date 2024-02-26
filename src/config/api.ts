import { ApiRouteParam, SearchParams } from "@/types/request";
import { formatUriParams } from "@/utils/request";

export const API = {
  AUTH: {
    user: "auth/user",
    login: "auth/login",
    validateRegisterInformations: "/auth/register/validate",
    register: "auth/register",
    logout: "auth/logout",
    forgotPassword: "auth/forgot-password",
    resetPassword: "auth/reset-password",
    createPassword: "auth/create-password",
    ACTIVATE: {
      token: (token: string) => `auth/activate/${token}`,
      send: "auth/send-activation",
    },
    roles: "auth/user/roles",
    userByToken: "token/user",
  },
  DEMANDES: {
    validerCoordonnees: "/demandes/valider-coordonnees",
  },
  INTERVENANT: {
    auth: () => `/auth/user/intervenant`,
    encours: (id: ApiRouteParam) => `/intervenants/${id}/encours`,
    candidatures: (id: ApiRouteParam) => `/intervenants/${id}/candidatures`,
    favoris: (id: ApiRouteParam) => `/intervenants/${id}/favoris`,
    documents: (id: ApiRouteParam) => `/intervenants/${id}/documents`,
    avatar: (id: ApiRouteParam) => `/intervenants/${id}/avatar`,
    cv: (id: ApiRouteParam) => `/intervenants/${id}/cv`,
    informationsPersonnels: (id: ApiRouteParam) =>
      `/intervenants/${id}/informations-personnels`,
    profilAccompagnateur: (id: ApiRouteParam) =>
      `/intervenants/${id}/profil-accompagnement`,
    historique: (id: ApiRouteParam) => `/intervenants/${id}/historique`,
    paiements: (id: ApiRouteParam) => `/intervenants/${id}/paiements`,
    paiementsInfo: (id: ApiRouteParam) => `intervenants/${id}/paiements-info`,
    search: (params: ApiRouteParam) =>
      `intervenants${formatUriParams(params as SearchParams)}`,
    index: (segment: ApiRouteParam = "") => `/intervenants${segment as string}`,
  },
  EMPLOYEUR: {
    auth: () => `/auth/user/employeur`,
    search: (params: ApiRouteParam) =>
      `employeurs/${formatUriParams(params as SearchParams)}`,
    index: (segment: ApiRouteParam = "") => `/employeurs${segment as string}`,
  },
  DEMANDE: {
    search: (params: ApiRouteParam) =>
      `demandes${formatUriParams(params as SearchParams)}`,
    index: (segment: ApiRouteParam = "") => `/demandes${segment as string}`,
  },
  AFFILIE: {
    index: (segment: ApiRouteParam = "") => `/affilies${segment as string}`,
    search: (params: ApiRouteParam) =>
      `affilies${formatUriParams(params as SearchParams)}`,
  },
  PAIEMENT: {
    index: (segment: ApiRouteParam = "") => `/paiements${segment as string}`,
    search: (params: ApiRouteParam) =>
      `paiements${formatUriParams(params as SearchParams)}`,
  },
  DISPONIBILITE: {
    index: (segment: ApiRouteParam = "") =>
      `/disponibilites${segment as string}`,
  },
  MISSION: {
    index: (segment: ApiRouteParam = "") => `/missions${segment as string}`,
    search: (params: ApiRouteParam) =>
      `missions${formatUriParams(params as SearchParams)}`,
  },
  MISSION_FAVORI: {
    index: (segment: ApiRouteParam = "") => `/favoris${segment as string}`,
    search: (params: ApiRouteParam) =>
      `favoris${formatUriParams(params as SearchParams)}`,
  },
  CANDIDATURE: {
    index: (segment: ApiRouteParam = "") => `/candidatures${segment as string}`,
    search: (params: ApiRouteParam) =>
      `candidatures${formatUriParams(params as SearchParams)}`,
  },
  VILLE: {
    index: (segment: ApiRouteParam = "") => `/villes${segment as string}`,
    search: (params: ApiRouteParam) =>
      `villes${formatUriParams(params as SearchParams)}`,
  },
  USER: {
    index: (segment: ApiRouteParam = "") => `/users${segment as string}`,
    search: (params: ApiRouteParam) =>
      `users${formatUriParams(params as SearchParams)}`,
  },
  userByToken: "/token/user",
  departements: "/departements",
  candidatures: "/candidatures",
  missions: "/missions",
};
