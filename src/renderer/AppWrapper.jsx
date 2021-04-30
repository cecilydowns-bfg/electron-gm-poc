import React, { useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import StateProvider from './state/provider';
import ApiProvider from './api/ApiProvider.jsx';
import Routes from './Routes.jsx';
import Navigation from './components/Navigation.jsx';
import Header from './components/Header.jsx';

import AuthModal from './components/AuthModal.jsx';
import DeeplinkHandler from './components/DeeplinkHandler.jsx';

const AppWrapper = () => {
    return (
        <StateProvider>
            <ApiProvider>
                <Router>
                    <DeeplinkHandler />
                    <AuthModal />
                    <Header />
                    <div className="main__root">
                        <Navigation />
                        <Routes />
                    </div>
                </Router>
            </ApiProvider>
        </StateProvider>
    );
};

export default AppWrapper;
