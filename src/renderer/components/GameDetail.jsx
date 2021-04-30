import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import useLoadGames from '../utils/useLoadGames';
import getMacEnglishVariant from '../utils/getMacEnglishVariant';

const GameDetail = () => {
    const { games, loading } = useLoadGames();
    const { sku = '' } = useParams();
    const game = games.find((game) => game.sku === sku);

    if (loading) {
        return <div>Loading</div>;
    }

    if (!game) {
        return <div>Game not found</div>;
    }

    return (
        <div>
            <h2 className="content__heading">{game.name}</h2>
            <img src={game.image} className="gamedetail__image" />
            <div dangerouslySetInnerHTML={{ __html: game.description }}></div>
        </div>
    );
};

export default GameDetail;
