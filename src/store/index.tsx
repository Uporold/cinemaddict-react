import React, { createContext, ReactNode, useContext } from "react";
import { injectStores } from "@mobx-devtools/tools";
import { RootStore } from "./root-store";
import { injectStore } from "../api";

const StoreContext = createContext<RootStore | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const store = new RootStore();
  injectStores({ ...store });
  injectStore(store);
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used with StoreProvider");
  }

  return context;
};
