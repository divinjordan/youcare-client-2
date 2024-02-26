import { create } from "zustand";
import { Mission } from "./mission";
import { Pagination, Resource, User } from "@/types";
import { getHttpClient } from "@/utils/http";
import { initResource } from "@/utils/request";
import { API } from "@/config";

export interface Employeur {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  email: string;
  telephone: string;
  nom: string;
  prenom: string;
  date_naissance: string;
  lieu_naissance: string;
  nationalite: string;
  avatar?: string;
  email_verified_at: any;
  accept_newsletter: false;
  code_postal: string;
  adresse_complete: string;
  ville: string;
  redirect: "";
  missions: Mission[];
  user: User;
}

interface EmployeurState extends Resource<Employeur> {
  auth: () => Promise<any>;
}

export const useEmployeur = create<EmployeurState>((set) => ({
  ...initResource<Employeur>(API.EMPLOYEUR, set),
  auth: () => {
    const data = window.sessionStorage.getItem("employeur");
    if (data) {
      set(() => ({
        current: JSON.parse(data),
      }));
      return Promise.resolve(JSON.parse(data));
    } else {
      return getHttpClient()
        .get(API.EMPLOYEUR.auth())
        .then((res) => {
          window.sessionStorage.setItem("employeur", JSON.stringify(res.data));
          set(() => ({
            current: res.data,
          }));
          return Promise.resolve(res.data);
        });
    }
  },
}));
