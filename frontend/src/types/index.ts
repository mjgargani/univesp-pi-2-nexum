export type Theme = 'light' | 'dark' | null;

export type HypermediaMethod = "GET" | "POST" | "PUT" | "DELETE";

export type HypermediaInputType = "text" | "password" | "email" | "number" | "checkbox" | "radio" | "select";

export interface HypermediaInput {
  name: string;
  type: HypermediaInputType;
  label: string;
  required: boolean;
}

export interface HypermediaButton {
  name: string;
  type: "button";
  label: string;
  submit: boolean;
}

export interface HypermediaFormRowCol {
  order: number;
  col: (HypermediaInput | HypermediaButton)[];
}

export interface HypermediaFormRow {
  order: number;
  row: HypermediaFormRowCol[];
}
export interface HypermediaForm {
  title: string;
  action: {
    href: string,
    rel: string,
    method: HypermediaMethod,
  },
  form: HypermediaFormRow[],
}

export interface LoginRequest {
  userName: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export type UserViewNode = {
  order: number;
  tag: string;
  className?: string;
  __html?: string;
  innerText?: string;
  children?: UserViewNode[]; // A propriedade 'children' é um array de mais Nós
  [key: string]: any; // Permite outras props (ex: 'href' para <a>, 'disabled' para <button>)
};

export type UserViewResponse = UserViewNode[];

export type UserNavigationResponse = Array<{
  label: string;
  link: {
    href: string;
    rel: string;
    method: string;
  };
}>;

export interface MainContextType {
  // Interface
  loading: boolean;
  setLoading: (value: boolean) => void;
  theme: boolean | null;
  handleThemeChange: () => void;
  // Dados do usuário
  token: string | null;
  setToken: (value: string | null) => void;
  userView: UserViewProps | null;
  setUserView: (value: UserViewProps | null) => void;
  userNavigation: UserNavigationResponse | null;
  setUserNavigation: (value: UserNavigationResponse | null) => void;
  // Ações
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  getUserView: (endPoint: string) => Promise<void>;
  getNavigation: () => Promise<void>;
}