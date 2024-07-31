import { store } from "@/redux/store";
import { ReactNode, useRef } from "react";
import { Provider } from "react-redux";

interface ProviderProps {
  children: ReactNode;
}
interface ProviderProps extends React.PropsWithChildren<{}> {}

export function StoreProvider({ children }: ProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
