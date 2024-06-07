/**
 * Redux provider configs.
 * @author Maheen Nasir
 */
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./store";

/**
 * Props for the ReduxProviders component.
 * @interface ReduxProvidersProps
 */
interface ReduxProvidersProps {
  /**
   * The children nodes to be wrapped by the Redux provider.
   * @type {ReactNode}
   */
  children: ReactNode;
}

/**
 * ReduxProviders component.
 * This component wraps its children with the Redux Provider, enabling them to access the Redux store.
 * @component
 * @param {ReduxProvidersProps} props - The props for the component.
 * @returns {JSX.Element} The Redux Provider wrapping the children.
 */
export const ReduxProviders: React.FC<ReduxProvidersProps> = ({ children }: ReduxProvidersProps): JSX.Element => (
  <Provider store={store}>{children}</Provider>
);
