import React from 'react';
import { useUserState } from '../state/hooks';
import useLocalStorage from 'react-use-localstorage';

const Header = () => {
    const user = useUserState();
    const [, setToken] = useLocalStorage();

    const handleLogout = () => {
        setToken('');
        window.location.reload();
    };

    return (
        <header className="header__root">
            <h1 className="header__title">Game Manager</h1>
            {user && (
                <div className="header__user">
                    Welcome {user.customer.firstname}!
                    <a
                        className="header__logout"
                        href="#"
                        onClick={handleLogout}
                    >
                        Log out
                    </a>
                </div>
            )}
        </header>
    );
};

export default Header;
