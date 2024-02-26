import { create } from "zustand";

interface _State {
  values: Record<string, boolean>;
}

export const use_ = create<_State>(() => ({
  values: {},
}));
