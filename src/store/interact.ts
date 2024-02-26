import { MESSAGES } from "@/config";
import { logError } from "@/utils/logger";
import { create } from "zustand";

interface DisplayState {
  values: Record<string, boolean>;
  set: (key: string, value: boolean) => void;
  show: (key: string) => void;
  hide: (key: string) => void;
  toggle: (key: string) => void;
  reset: () => void;
}

interface LoadingState {
  values: Record<string, boolean>;
  start: (key: string) => void;
  stop: (key: string) => void;
  reset: () => void;
}

interface ErrorsState {
  values: Record<string, string[]>;
  set: (key: string, value: string | string[]) => void;
  unset: (key: string) => void;
  catch: (error: any) => void;
  reset: () => void;
  log: (error: any) => void;
}

interface NotifsState {
  values: { text: string; type: string }[];
  set: (type: string, text: string) => void;
  unset: (type: number) => void;
  catch: (error: any) => void;
}

export const useLoading = create<LoadingState>((setter) => ({
  values: {},
  start: (key) =>
    setter((state) => ({
      values: {
        ...state.values,
        [key]: true,
      },
    })),
  stop: (key) =>
    setter((state) => {
      const newValues: Record<string, any> = {};
      for (let k in state.values) {
        if (k != key) {
          newValues[k] = state.values[k];
        }
      }
      return {
        values: newValues,
      };
    }),
  reset: () => setter(() => ({})),
}));

export const useDisplay = create<DisplayState>((set) => ({
  values: {},
  set: (key, value) => {
    set((state) => ({
      values: {
        ...state.values,
        [key]: value,
      },
    }));
  },
  show: (key) =>
    set((state) => ({
      values: {
        ...state.values,
        [key]: true,
      },
    })),
  hide: (key) =>
    set((state) => {
      const newValues: Record<string, any> = {};
      for (let k in state.values) {
        if (k != key) {
          newValues[k] = state.values[k];
        }
      }
      return {
        values: newValues,
      };
    }),
  toggle: (key) => {
    set((state) => {
      if (state.values.hasOwnProperty(key)) {
        const newValues: Record<string, any> = {};
        for (let k in state.values) {
          if (k != key) {
            newValues[k] = state.values[k];
          }
        }
        return {
          values: newValues,
        };
      } else {
        return {
          values: {
            ...state.values,
            [key]: true,
          },
        };
      }
    });
  },
  reset: () => set(() => ({})),
}));

export const useErrors = create<ErrorsState>((setter) => ({
  values: {},
  set: (key, value) =>
    setter((state) => ({
      values: {
        ...state.values,
        [key]: typeof value == "string" ? [value] : value,
      },
    })),
  unset: (key) =>
    setter((state) => ({
      values: Object.fromEntries(
        Object.entries(state.values).filter(([k, v]) => k != key)
      ),
    })),
  catch: (error) => {
    let isServerError = true;

    if (error.response != undefined) {
      if (error.response.status == 422) {
        isServerError = false;
        return setter(() => ({
          values: error.response.data.errors,
        }));
      }
    } else {
      if (error.message != undefined) {
        return setter(() => ({
          values: {
            error_message: [error.message],
          },
        }));
      }
    }

    if (isServerError) {
      return setter(() => ({
        values: {
          server_error: [MESSAGES.serverError],
        },
      }));
    }
  },
  reset: () => {
    setter(() => ({
      values: {},
    }));
  },
  log(error: any) {
    logError(error);
  },
}));

export const useNotifs = create<NotifsState>((setter) => ({
  values: [],
  set: (type, text) =>
    setter((state) => ({ values: [{ type, text }, ...state.values] })),
  unset: (index) =>
    setter((state) => ({
      values: state.values.filter((_, i) => i != index),
    })),
  catch: (error) => {
    let isServerError = true;

    if (error.response != undefined) {
      if (error.response.status == 422) {
        isServerError = false;
        return setter(() => ({
          values: error.response.data.errors,
        }));
      }
    } else {
      if (error.message != undefined) {
        return setter((state) => ({
          values: [{ type: "error", text: "error.message" }, ...state.values],
        }));
      }
    }

    if (isServerError) {
      return setter((state) => ({
        values: [
          { type: "error", text: MESSAGES.serverError },
          ...state.values,
        ],
      }));
    }
  },
}));
