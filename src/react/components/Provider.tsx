import React, { ReactNode } from "react";
import { Adapter } from "storageAdapter";
import { MnemosyneContext } from "react/components/Context";

export const MnemosyneProvider: React.FC<{
  adapter: Adapter<any>;
  children: ReactNode;
}> = ({ adapter, children }) => {
  const Context = MnemosyneContext;
  return <Context.Provider value={adapter}>{children}</Context.Provider>;
};
