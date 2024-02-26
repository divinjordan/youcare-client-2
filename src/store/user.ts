import { create } from "zustand";
import { API } from "@/config";
import { Resource } from "@/types";
import { initResource } from "@/utils/request";
import { getHttpClient } from "@/utils/http";

export interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
}

interface UserState extends Resource<User> {
  stats: Record<string, number>;
  fetchStats: () => Promise<any>;
}

export const useUser = create<UserState>((set) => ({
  ...initResource(API.USER, set),
  stats: {},
  fetchStats: () => {
    return getHttpClient()
      .get(API.USER.index("/stats"))
      .then((res) => {
        set(() => ({ stats: res.data }));
        return Promise.resolve(res);
      });
  },
}));
