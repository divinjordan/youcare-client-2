import {
  SearchParams,
  Pagination,
  ModelApiRoute,
  ApiRouteParam,
} from "@/types";
import { getHttpClient } from "./http";
import { uuid } from "./helpers";

export const setPaginatedResults = (res: any) => {
  return {
    items: res.data.data,
    pagination: { ...res.data, data: [] },
    loading: false,
  };
};

export const initResource = <T>(apiRoute: ModelApiRoute, set: any) => ({
  pagination: {} as Pagination,
  items: [],
  current: {} as T,
  simpleSearch(params: SearchParams = {} as SearchParams) {
    return getHttpClient()
      .get(apiRoute.search(params))
      .then((res: any) => {
        set(() => ({
          items: res.data,
          loading: false,
        }));
      });
  },
  search(params: SearchParams = {} as SearchParams) {
    return getHttpClient()
      .get(apiRoute.search(params))
      .then((res: any) => {
        set(() => setPaginatedResults(res));
      });
  },
  get(id: ApiRouteParam) {
    return getHttpClient()
      .get(`${apiRoute.index(`/${id as number}`)}`)
      .then((res: any) => {
        set((state: any) => ({
          current: {
            ...state.current,
            ...res.data,
          },
        }));
      });
  },
  set: (inputs: Partial<T>) =>
    set((state: any) => ({
      current: {
        ...state.current,
        ...inputs,
      },
    })),
  add: (input: T) => {
    set((state: any) => ({
      items: [...state.items, ...[input]],
    }));
  },
  filter: (predicate: (item: T) => boolean) => {
    set((state: any) => ({
      items: state.items.filter(predicate),
    }));
  },
  create: (data: Partial<T>) => {
    return getHttpClient().post(apiRoute.index(""), data);
  },
  update: (data: Partial<T>, id: number | string) => {
    return getHttpClient().put(apiRoute.index(`/${id}`), data);
  },
  destroy: (id: number | string) => {
    return getHttpClient().delete(apiRoute.index(`/${id}`));
  },
});

export const formatUriParams = (params: SearchParams) => {
  if (Object.entries(params).length == 0) return "";
  return (
    "?" +
    Object.entries(params)
      .filter(([_, val]) => val != undefined && val != null && val != "")
      .map(([key, val]) => `${key}=${val}`)
      .join("&")
  );
};
