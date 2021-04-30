import { useContext } from 'react';
import { StateContext, DispatchContext } from './provider';

export const useUserState = () => {
    const context = useContext(StateContext);
    if (context) {
        return context.user;
    }
};

export const useUserDispatch = () => {
    const context = useContext(DispatchContext);
    const dispatch = (user) => {
        context({ type: 'LOAD_USER', payload: user });
    };
    return dispatch;
};

export const useUser = () => [useUserState(), useUserDispatch()];

export const useGamesState = () => {
    const context = useContext(StateContext);
    if (context) {
        return context.games;
    }
};

export const useGamesDispatch = () => {
    const context = useContext(DispatchContext);
    const dispatch = (games) => {
        context({ type: 'LOAD_GAMES', payload: games });
    };
    return dispatch;
};

export const useGames = () => [useGamesState(), useGamesDispatch()];
