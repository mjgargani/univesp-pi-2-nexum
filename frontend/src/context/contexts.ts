import { createContext } from "react";
import type { MainContextType } from "../types";

export const MainContext = createContext<MainContextType | null>(null);
