export type SearchParams = Record<string, number | string>;

export interface Pagination {
  current_page: number;
  data: any[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: number;
  links: any[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export type ApiRouteParam = string | number | SearchParams;

export type ModelApiRoute = Record<
  string,
  (() => string) | ((arg: ApiRouteParam) => string)
>;

export interface Resource<T> {
  pagination: Pagination;
  items: T[];
  current: T;
  simpleSearch: (params?: SearchParams) => Promise<any>;
  search: (params?: SearchParams) => Promise<any>;
  set: (data: Partial<T>) => void;
  add: (input: T) => void;
  get: (data: ApiRouteParam) => void;
  filter: (predicate: (resource: T) => boolean) => void;
  create: (data: Partial<T>) => Promise<any>;
  update: (date: Partial<T>, id: string | number) => Promise<any>;
  destroy: (id: number | string) => Promise<any>;
}
