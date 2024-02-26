import { create } from "zustand";
import {
  Categorie,
  Departement,
  Employeur,
  Pagination,
  Resource,
} from "@/types";
import { getHttpClient } from "@/utils/http";
import { API } from "@/config";
import { initResource } from "@/utils/request";

export interface MissionCategorie {
  id: number;
  categorie_id: number;
  employeur_id: number;
}

export interface Mission {
  id: number;
  categorie_id: number;
  demande_id: number;
  titre: string;
  description: string;
  heures_mois: number;
  nuits_mois: number;
  categorie: Categorie; // generate from categorie id.
  employeur: Employeur;
  departement: Departement;
  date_debut: string;
  date_fin: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  status: number;
  quantiteHeures: number;
  quantiteNuits: number;
  user_auth_favori: boolean;
  missionCategories: [];
  categories: any[];
  totalCandidatures: number;
}

interface MissionState extends Resource<Mission> {
  status: Record<string, number>;
  statusLabels: Record<number, string>;
  stats: any[];
  setAll: (current: Mission[]) => void;
  fetch: (id: number | string, params?: any) => Promise<void>;
  fetchAll: (limit?: number, params?: any) => Promise<any>;
  loadMore: (limit?: number, params?: any) => Promise<any>;
  fetchStats: (startDate: string, endDate: string) => Promise<any>;
}

export const useMission = create<MissionState>((set) => ({
  ...initResource<Mission>(API.MISSION, set),
  status: {
    MISSION_OPEN: 0,
    MISSION_SELECT: 1,
    MISSION_START: 2,
    MISSION_STOP: 3,
    MISSION_END: 4,
  },
  statusLabels: {
    0: "Mission ouverte",
    1: "Candidat selectionnée",
    2: "Mission en cours",
    3: "Mission interrompu",
    4: "Mission terminée",
  },
  stats: [],
  setAll: (list: Mission[]) =>
    set(() => ({
      items: list,
    })),
  fetchAll: (limit = 20, params: any = {}) => {
    return getHttpClient()
      .get(
        `missions?limit=${limit}&${Object.entries(params)
          .map(([key, val]) => `${key}=${val}`)
          .join("&")}`
      )
      .then((res) => {
        set((state) => {
          let current = state.current;
          if (res.data.data.length > 0) {
            current = res.data.data[0];
          }
          return {
            items: res.data.data,
            pagination: { ...res.data, data: [] },
            current: current,
          };
        });
        return Promise.resolve(res);
      });
  },
  loadMore: (limit = 20, params: any = {}) => {
    return getHttpClient()
      .get(
        `missions?limit=${limit}&${Object.entries(params)
          .map(([key, val]) => `${key}=${val}`)
          .join("&")}`
      )
      .then((res) => {
        set((state) => {
          let current = state.current;
          if (res.data.data.length > 0) {
            current = res.data.data[0];
          }
          return {
            items: [...state.items, ...res.data.data],
            pagination: { ...res.data, data: [] },
            current: current,
          };
        });
        return Promise.resolve(res);
      });
  },
  fetch: (id: number | string, params: any = {}) => {
    return getHttpClient()
      .get(`missions/${id}`)
      .then((res) => {
        set((state) => {
          return {
            current: res.data,
          };
        });
      });
  },
  fetchStats: (startDate: string, endDate: string) => {
    return getHttpClient()
      .get(`missions/stats?start=${startDate}&end=${endDate}`)
      .then((res) => {
        set(() => ({ stats: res.data }));
        return Promise.resolve(res);
      });
  },
}));
