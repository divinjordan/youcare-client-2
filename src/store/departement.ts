import { API } from "@/config";
import { getHttpClient } from "@/utils/http";
import { create } from "zustand";

export interface Departement {
  id: number;
  departement_code: string;
  departement_nom: string;
  departement_slug: string;
}

interface DepartementState {
  current: Partial<Departement>;
  items: Partial<Departement>[];
  set: (current: Partial<Departement>) => void;
  setAll: (current: Partial<Departement>[]) => void;
  fetchAll: (limit?: number) => Promise<void>;
  search: () => Promise<void>;
}

export const useDepartement = create<DepartementState>((set) => ({
  current: {},
  items: [],
  set: (current: Partial<Departement>) =>
    set((state) => ({
      current: {
        ...state.current,
        ...current,
      },
    })),
  setAll: (items: Partial<Departement>[]) =>
    set((state) => ({
      items: items,
    })),

  fetchAll: () => {
    return getHttpClient()
      .get(API.departements)
      .then((res) => {
        set((state) => {
          let current = state.current;
          if (res.data.length > 0) {
            current = res.data[0];
          }
          return {
            items: res.data,
            current: current,
          };
        });
      });
  },
  search: () => {
    return Promise.resolve();
  },
}));
