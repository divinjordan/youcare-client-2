import { create } from "zustand";
import { API } from "@/config";
import { Resource, User } from "@/types";
import { initResource } from "@/utils/request";
import { Mission } from "./mission";
import { getHttpClient } from "@/utils/http";

export interface MissionFavori {
  id: number;
  mission_id: number;
  intervenant_id: number;
  mission: Mission;
}

interface MissionFavoriState extends Resource<MissionFavori> {
  //set: (key: string) => void;
  toggle: (missionId: number, intervenantId: number) => Promise<any>;
}

export const useMissionFavori = create<MissionFavoriState>((set) => ({
  ...initResource<MissionFavori>(API.MISSION_FAVORI, set),
  toggle: async (missionId: number, intervenantId: number) => {
    const res = await getHttpClient().post(API.MISSION_FAVORI.index(), {
      mission_id: missionId,
      intervenant_id: intervenantId,
    });
    return await Promise.resolve(res);
  },
}));
