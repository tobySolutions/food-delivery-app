// This is where we create our context that supplies to all the places
// .. the data contained herein is needed

import React, { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();

export const StateProvider = ({reducer, initialState, children}) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
)

// create a custom hook that will be called to handle data delivery 
export const useStateValue = () => useContext(StateContext);