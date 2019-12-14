import { createContext, useContext } from 'react';

export const AuthContext = createContext();

// useAuth is a custom hook.
// returns current context value for the context.
// context value is determined by value prop of nearest MyContext
// Provider value above the calling component in the tree
// https://reactjs.org/docs/hooks-reference.html#usecontext
export function useAuth() {
  return useContext(AuthContext);
}