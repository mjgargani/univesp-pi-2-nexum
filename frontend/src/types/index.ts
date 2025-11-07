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

export interface ProfileResponse {
  userName: string;
  firstName: string;
  lastName: string;
  roles: Array<{
    name: string;
    complement: string | null;
  }>;
  contacts: Array<{
    type: string;
    content: string;
    complement: string | null;
  }>;
  addresses: Array<{
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    complement: string | null;
  }>
}

export type MenuResponse = Array<{
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
  profile: ProfileResponse | null;
  setProfile: (value: ProfileResponse | null) => void;
  userMenu: MenuResponse | null;
  setUserMenu: (value: MenuResponse | null) => void;
  // Ações
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  getProfile: () => Promise<void>;
  getUserMenu: () => Promise<void>;
}