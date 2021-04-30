import React, { useEffect } from 'react';
import GameListItem from './GameListItem.jsx';
import { useGames } from '../../state/hooks';
import { PRODUCTS } from '../../api/queries';
import { useQuery } from '@apollo/client';
import useLoadGames from '../../utils/useLoadGames.js';
import mygamedata from '../../api/mygamedata.json';

const MyGames = () => {
    const { games, loading } = useLoadGames();

    const myGames = games
        .filter((game) => mygamedata.find((g) => g.sku === game.sku))
        .map((game) => {
            return {
                ...game,
                ...mygamedata.find((g) => g.sku === game.sku)
            };
        });

    if (loading) {
        return <div>Loading</div>;
    }

    return (
        <div>
            <h2 className="content__heading">My Games</h2>
            <div>
                {myGames.map((game) => (
                    <div key={game.sku}>
                        <GameListItem game={game} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyGames;
