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
