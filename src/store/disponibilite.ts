import { API } from "@/config";
import { MutateDisponibiliteFormType, Intervenant } from "@/types";
import { getHttpClient } from "@/utils/http";
import { create } from "zustand";

export interface Disponibilite {
  id: number;
  intervenant_id: number;
  date_debut: string;
  date_fin: string;
  created_at: string;
  updated_at: string;
  type: string;
}

interface DisponibiliteState {
  form: Partial<MutateDisponibiliteFormType>;
  current: Disponibilite;
  mutationMode: string;
  set: (values: Partial<Disponibilite>) => void;
  setForm: (values: Partial<MutateDisponibiliteFormType>) => void;
  create: (values: MutateDisponibiliteFormType) => Promise<any>;
  update: (id: number, values: MutateDisponibiliteFormType) => Promise<any>;
  destroy: (id: number) => Promise<any>;
  setMutationMode: (mode: string) => void;
  getAll: (intervenant_id: number) => Promise<any>;
}

export const useDisponibilite = create<DisponibiliteState>((set) => ({
  form: {} as Partial<MutateDisponibiliteFormType>,
  current: {} as Disponibilite,
  mutationMode: "create",
  set: (values: Partial<Disponibilite>) => {
    set((state) => ({
      current: {
        ...state.current,
        ...values,
      },
    }));
  },
  setForm: (values: Partial<MutateDisponibiliteFormType>) => {
    set(() => ({
      form: values,
    }));
  },
  setMutationMode: (mode: string) => {
    set(() => ({
      mutationMode: mode,
    }));
  },
  getAll: (intervenant_id: number) => {
    return getHttpClient().get(
      API.INTERVENANT.index(`/${intervenant_id}/disponibilites`)
    );
  },
  create: (values: MutateDisponibiliteFormType) => {
    return getHttpClient().post(API.DISPONIBILITE.index(), values);
  },
  update: (id: number, values: MutateDisponibiliteFormType) => {
    return getHttpClient().put(API.DISPONIBILITE.index(`/${id}`), values);
  },
  destroy: (id: number) => {
    return getHttpClient().delete(API.DISPONIBILITE.index(`/${id}`));
  },
}));
