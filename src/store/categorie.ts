import { getHttpClient } from "@/utils/http";
import { logError } from "@/utils/logger";
import { create } from "zustand";

export interface Categorie {
  id: number;
  categorie_nom: string;
  categorie_slug: string;
  courte_description: string;
  description: string;
  parent_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

interface CategorieState {
  items: Categorie[];
  setAll: (current: Categorie[]) => void;
  fetchAll: () => Promise<void>;
}

export const useCategorie = create<CategorieState>((set) => ({
  items: [],
  setAll: (list: Categorie[]) =>
    set(() => ({
      items: list,
    })),
  fetchAll: () => {
    return getHttpClient()
      .get("categories")
      .then((res) => {
        set(() => ({
          items: res.data,
        }));
      })
      .catch((error) => logError(error));
  },
}));
