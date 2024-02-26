import { InferType, object, string, number, date } from "yup";

export const RegisterFormFields = object({
  nom: string().required(),
  prenom: string().required(),
  email: string().required().email(),
  adresse: string().required(),
  code_postal: string().required(),
  ville: string().required(),
  password: string().required(),
  telephone: string().required().length(10),
  affiliation_id: string(),
});

export const RegisterQuestionsFormFields = object({
  majeur: string().required(),
  autoriser_travailler: string().required(),
  investir: string().required(),
  maitriser_fr: string().required(),
});

export type RegisterFormFieldsType = InferType<typeof RegisterFormFields>;

export const DemandeStatusFormFields = object({
  status: string(),
});
export type DemandeStatusFormFields = InferType<typeof DemandeStatusFormFields>;

export const SearchMissionFormFields = object({
  keyword: string(),
  departement: string(),
});

export const SearchIntervenantForm = object({
  keyword: string(),
});
export type SearchIntervenantFormType = InferType<typeof SearchIntervenantForm>;

export const SearchForm = object({
  keyword: string(),
});
export type SearchFormType = InferType<typeof SearchForm>;

export const CalendarFilterForm = object({
  start_date: string(),
  end_date: string(),
});

export type CalendarFilterFormType = InferType<typeof CalendarFilterForm>;

export const MutateDisponibiliteForm = object({
  type: string().required("Le moment est requis"),
  intervenant_id: number().required(),
  date_debut: date(),
  date_fin: date(),
  heure_debut: string().required("L'heure de debut est requise"),
  heure_fin: string().required("L'heure de fin est requise"),
});

export type MutateDisponibiliteFormType = InferType<
  typeof MutateDisponibiliteForm
>;

export const CreateAdminForm = object({
  nom: string().required("Le nom est requis"),
  prenom: string(),
  email: string()
    .required("L'adresse email est requise")
    .email("Entrer une adresse email valide"),
  password: string().required("Le mot de passe est requis"),
  role: string(),
});
