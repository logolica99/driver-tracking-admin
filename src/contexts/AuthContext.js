import React, { useReducer, createContext } from "react";

export const AuthContext = createContext();

const initialState = {
  email: "",
  isLoggedIn: true,

  loading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOG_IN": {
      return {
        ...state,
        email: action.payload.email,
        isLoggedIn: true,
      };
    }
    case "LOG_OUT": {
      return {
        ...state,
        email: "",
        isLoggedIn: false,
      };
    }
    case "UPDATE_LOADING": {
      return {
        ...state,
        loading: action.payload.loading,
      };
    }

    default:
      return { ...state };
  }
};

export const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {props.children}
    </AuthContext.Provider>
  );
};
