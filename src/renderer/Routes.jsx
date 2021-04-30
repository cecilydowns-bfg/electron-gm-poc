import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home.jsx';
import GamesList from './components/GamesList.jsx';
import MyGames from './components/MyGames/MyGames.jsx';
import GameDetail from './components/GameDetail.jsx';
import AuthModal from './components/AuthModal.jsx';

const Routes = () => {
    return (
        <section className="content__root">
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/gameslist">
                    <GamesList />
                </Route>
                <Route path="/gameslist/:sku">
                    <GameDetail />
                </Route>
                <Route path="/mygames">
                    <MyGames />
                </Route>
            </Switch>
        </section>
    );
};

export default Routes;
