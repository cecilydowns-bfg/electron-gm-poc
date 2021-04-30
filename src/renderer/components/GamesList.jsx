import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import useLoadGames from '../utils/useLoadGames';
import getMacEnglishVariant from '../utils/getMacEnglishVariant';

const GamesList = () => {
    const { games, loading } = useLoadGames();

    if (loading) {
        return <div>Loading</div>;
    }

    return (
        <div>
            <h2 className="content__heading">Mac Games</h2>

            <div className="gamelist__root">
                {games &&
                    games.map((game) => (
                        <div className="gamelist__item" key={game.sku}>
                            <Link to={`/gameslist/${game.sku}`}>
                                <img
                                    src={game.image}
                                    className="gamelist__image"
                                />
                            </Link>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default GamesList;
