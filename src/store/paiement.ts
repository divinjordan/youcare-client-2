import { create } from "zustand";
import { API } from "@/config";
import { Intervenant, Resource, User } from "@/types";
import { initResource } from "@/utils/request";

export interface Paiement {
  id: number;
  intervenant_id: number;
  montant: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  nom: string;
  prenom: string;
  email: string;
}

interface PaiementState extends Resource<Paiement> {
  //set: (key: string) => void;
}

export const usePaiement = create<PaiementState>((set) => ({
  ...initResource(API.PAIEMENT, set),
}));
