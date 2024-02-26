import { create } from "zustand";
import { API } from "@/config";
import { Resource, User } from "@/types";
import { initResource } from "@/utils/request";

export interface Ville {
  ville_nom: string;
  departement_code: string;
  ville_code_postal: string;
}

interface VilleState extends Resource<Ville> {}

export const useVille = create<VilleState>((set) => ({
  ...initResource(API.VILLE, set),
}));
