import { create } from "zustand";
import { API } from "@/config";
import { Resource, User } from "@/types";
import { initResource } from "@/utils/request";

export interface Affilie {
  id: number;
  parrain_id?: number;
  intervenant_id?: number;
  intervenant: Partial<User>;
  parrain: Partial<User>;
  created_at: any;
}

interface AffilieState extends Resource<Affilie> {
  //set: (key: string) => void;
}

export const useAffilie = create<AffilieState>((set) => ({
  ...initResource(API.AFFILIE, set),
}));
