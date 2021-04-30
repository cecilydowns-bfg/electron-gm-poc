import React, { useReducer } from 'react';
import reducer from './reducer';
import initialState from './initialState';

export const StateContext = React.createContext(undefined);
export const DispatchContext = React.createContext(undefined);

const StateProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                {props.children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    );
};

export default StateProvider;
