import React, { useEffect } from 'react';

import { useQuery } from '@apollo/client';
import { useGames } from '../state/hooks';
import { PRODUCTS } from '../api/queries';
import getMacEnglishVariant from './getMacEnglishVariant';

export const useLoadGames = () => {
    const [games, gamesDispatch] = useGames();
    const { loading, data, error } = useQuery(PRODUCTS);

    useEffect(() => {
        console.log('error', error);
    }, [error]);

    useEffect(() => {
        if (games.length === 0 && data) {
            const mappedGameData = data.products.items
                .map((product) => getMacEnglishVariant(product))
                .filter((product) => product !== null);
            gamesDispatch(mappedGameData);
        }
    }, [data, games]);

    return { games, loading };
};

export default useLoadGames;
