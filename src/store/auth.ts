import { create } from "zustand";
import { deleteToken, setToken } from "@/utils/token";
import { getHttpClient } from "@/utils/http";
import { API, PAGES } from "@/config";
import { RegisterFormFieldsType } from "@/types";

export interface User {
  id: number;
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
  created_at: string;
  updated_at: string;
  deleted_at: string;
  role_id: number;
  role: any;
  redirect: "";
}

export interface Role {
  key: string;
  name: string;
  id: number;
  redirect: string;
}

interface AuthState {
  user: User;
  validateRegisterInformations: (
    values: RegisterFormFieldsType
  ) => Promise<any>;
  register: (values: RegisterFormFieldsType) => Promise<any>;
  login: (string: string, password: string) => Promise<any>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<any>;
  resetPassword: (password: string, token: string) => Promise<any>;
  activate: (token: string) => Promise<any>;
  sendActivateEmail: (token: string) => Promise<any>;
  fetchLoggedUser: () => Promise<User>;
  sendActivationEmail: () => Promise<any>;
}

export const useAuth = create<AuthState>((set) => ({
  user: {} as User,
  validateRegisterInformations: (values: RegisterFormFieldsType) => {
    return getHttpClient().post(API.AUTH.validateRegisterInformations, values);
  },
  register: (values: RegisterFormFieldsType) => {
    return getHttpClient()
      .post(API.AUTH.register, values)
      .then((res) => {
        setToken(res.data.token);
      });
  },
  login: (email: string, password: string) => {
    return getHttpClient()
      .post(API.AUTH.login, {
        email,
        password,
      })
      .then((res) => {
        setToken(res.data.token);
        return Promise.resolve(res.data);
      });
  },
  forgotPassword: (email: string) => {
    return getHttpClient().post(API.AUTH.forgotPassword, { email });
  },
  resetPassword: (password: string, token: string) => {
    return getHttpClient().post(API.AUTH.resetPassword, { password, token });
  },
  createPassword: (password: string, token: string) => {
    return getHttpClient().post(API.AUTH.createPassword, { password, token });
  },
  activate: (token: string) => {
    return Promise.resolve(1);
  },
  sendActivateEmail: (token: string) => {
    return Promise.resolve(1);
  },
  fetchLoggedUser() {
    return getHttpClient()
      .get(API.AUTH.user)
      .then((res) => {
        set(() => ({
          user: res.data,
        }));
        return Promise.resolve(res.data);
      });
  },

  sendActivationEmail() {
    return getHttpClient().get(API.AUTH.ACTIVATE.send);
  },
  logout: () => {
    deleteToken();
    window.location.assign(window.location.origin + PAGES.AUTH.login);
  },
}));
