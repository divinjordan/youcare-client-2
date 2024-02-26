import { create } from "zustand";
import { User } from "./auth";
import { getHttpClient } from "@/utils/http";
import { API } from "@/config";
import { Disponibilite, Resource } from "@/types";
import { initResource } from "@/utils/request";

export interface Intervenant {
  id: number;
  email: string;
  user_cv?: string;
  nom: string;
  prenom: string;
  date_naissance: string;
  lieu_naissance: string;
  nationalite: string;
  securite_sociale: string;
  passe_sanitaire: string;
  iban: string;
  bic: string;
  telephone: string;
  code_postal?: string;
  ville: string;
  adresse_complete?: string;
  avatar?: string;
  auto_entrepreneur?: string;
  numero_siret?: string;
  presentation?: string;
  domaine_activite?: string;
  etablissement?: string;
  details_experiences?: string;
  experience_senior?: string;
  domaines_competences?: any;
  zones_intervention?: any;
  permis_de_conduire?: string;
  avoir_voiture?: string;
  psc1?: string;
  majeur: string;
  autoriser_travailler: string;
  investir: string;
  maitrise_fr: string;
  email_verified_at: any;
  documents: any;
  accept_newsletter?: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  user: User;
  disponibilites?: Disponibilite[];
}

interface IntervenantState extends Resource<Intervenant> {
  //set: (key: string) => void;
  stats: any[];
  auth: () => Promise<any>;
  getDisponibilites: (id: number) => Promise<any>;
  fetchStats: (startDate: string, endDate: string) => Promise<any>;
}

export const useIntervenant = create<IntervenantState>((set) => ({
  ...initResource(API.INTERVENANT, set),
  current: {
    domaines_competences: [],
    zones_intervention: [],
    documents: {},
  } as Intervenant,
  stats: [],
  auth: () => {
    const data = window.sessionStorage.getItem("intervenant");

    const excludesPaths = ["/intervenant"];

    if (data && !excludesPaths.includes(window.location.pathname)) {
      set(() => ({
        current: JSON.parse(data),
      }));
      return Promise.resolve(JSON.parse(data));
    } else {
      return getHttpClient()
        .get(API.INTERVENANT.auth())
        .then((res) => {
          window.sessionStorage.setItem(
            "intervenant",
            JSON.stringify(res.data)
          );
          set(() => ({
            current: res.data,
          }));
          return Promise.resolve(res.data);
        });
    }
  },
  getDisponibilites(id: number) {
    return getHttpClient()
      .get(API.INTERVENANT.index(`/${id}/disponibilites`))
      .then((res) => {
        set((state) => ({
          current: {
            ...state.current,
            disponibilites: res.data,
          },
        }));
      });
  },
  fetchStats: (startDate: string, endDate: string) => {
    return getHttpClient()
      .get(`intervenants/stats?start=${startDate}&end=${endDate}`)
      .then((res) => {
        set(() => ({ stats: res.data }));
        return Promise.resolve(res);
      });
  },
}));
