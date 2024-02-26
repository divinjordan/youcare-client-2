import { create } from "zustand";
import { Employeur, Pagination, Resource } from "@/types";
import { getHttpClient } from "@/utils/http";
import { API } from "@/config";
import { initResource } from "@/utils/request";

export interface Demande {
  id?: number;
  employeur_id?: number;
  status?: number;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  code_postal: string;
  ville: string;
  accept_terms: boolean;
  commercial_use: boolean;
  besoins: string[];
  rendez_vous: string;
  created_at: string;
  updated_at: string;
  employeur?: Employeur;
  categories: any[];
}

interface DemandeState extends Resource<Demande> {
  step: string;
  stats: any[];
  setStep: (step: string) => void;
  toggleNeed: (need: any) => void;
  setAll: (current: Demande[]) => void;
  fetchAll: (limit?: number) => Promise<void>;
  fetch: (id: number | string) => Promise<void>;
  fetchStats: (startDate: string, endDate: string) => Promise<any>;
}

export const useDemande = create<DemandeState>((set) => ({
  ...initResource<Demande>(API.DEMANDE, set),
  current: { categories: [] } as unknown as Demande,
  step: "besoins",
  stats: [],
  setAll: (list: Demande[]) =>
    set(() => ({
      items: list,
    })),
  setStep: (step: string) =>
    set(() => ({
      step,
    })),
  toggleNeed: (need: any) =>
    set((state) => {
      if ((state.current.categories as string[]).includes(need)) {
        return {
          current: {
            ...state.current,
            categories: (state.current.categories as string[]).filter(
              (e) => e != need
            ),
          },
        };
      } else {
        return {
          current: {
            ...state.current,
            categories: [...(state.current.categories as string[]), need],
          },
        };
      }
    }),
  fetchAll: (limit = 20) => {
    return getHttpClient()
      .get(`demandes?limit=${limit}`)
      .then((res: any) => {
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
      });
  },
  fetch: (id: number | string) => {
    return getHttpClient()
      .get(`demandes/${id}`)
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
      .get(`demandes/stats?start=${startDate}&end=${endDate}`)
      .then((res) => {
        set(() => ({ stats: res.data }));
        return Promise.resolve(res);
      });
  },
}));
