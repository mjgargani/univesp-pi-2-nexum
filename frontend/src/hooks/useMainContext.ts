import { useContext } from "react";
import { MainContext } from "../context/contexts";

export function useMainContext() {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error("useMainContext precisa ser usado dentro de um MainContextProvider");
  }
  return context;
}