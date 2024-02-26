import { create } from "zustand";
import { Mission } from "./mission";
import { Intervenant,Resource } from "@/types";
import { initResource } from "@/utils/request";
import { API } from "@/config";

export interface Candidature {
  id: number;
  intervenant_id: number;
  mission_id: number;
  status: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  mission: Mission;
  intervenant: Intervenant;
}

export const candidature_status_labels = {
  0: "En attente",
  1: "Pre-selectionnée",
  2: "Rejetée",
  3: "Selectionnée",
};

export const candidature_status_enums = {
  ATTENTE: 0,
  PRE_SELECTIONNE: 1,
  REJETEE: 2,
  SELECTIONNE: 3,
};

interface CandidatureState extends Resource<Candidature> {}

export const useCandidature = create<CandidatureState>((set) => ({
  ...initResource<Candidature>(API.CANDIDATURE, set),
}));
