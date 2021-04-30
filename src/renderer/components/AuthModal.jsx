import React, { useEffect, useState } from 'react';
import useLocalStorage from 'react-use-localstorage';
import { useMutation, useLazyQuery, gql } from '@apollo/client';

import { useToken, useUser } from '../state/hooks';
import { GENERATE_TOKEN, CUSTOMER_DETAILS } from '../api/queries';

const AuthModal = () => {
    // Graphql query setup
    const [getToken, { loading: tokenLoading, data: tokenData }] = useMutation(
        GENERATE_TOKEN
    );
    const [
        getUserData,
        { loading: userLoading, data: userData, error: userError }
    ] = useLazyQuery(CUSTOMER_DETAILS);
    const isLoading = tokenLoading || userLoading;

    // User auth token, saved in local storage
    const [token, setToken] = useLocalStorage();

    // Global user state
    const [user, userDispatch] = useUser();

    // Login input field state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Login input field handlers
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePass = (e) => setPassword(e.target.value);
    const handleSubmit = (e) => getToken({ variables: { email, password } });

    // Fetch user data when token becomes present in state
    useEffect(() => {
        if (token && !user) {
            console.log('calling get user data');
            getUserData();
        }
    }, [token, user, getUserData]);

    // Handle user error - unset token if it doesn't work
    useEffect(() => {
        if (userError) {
            console.error(userError);
            setToken('');
            window.location.reload();
        }
    }, [userError, setToken]);

    // Dispatch token to local storage when token api call finishes
    useEffect(() => {
        if (!token && tokenData) {
            console.log('set token - ', tokenData);
            setToken(tokenData.generateCustomerToken.token);
            window.location.reload();
        }
    }, [token, tokenData, setToken]);

    // Dispatch user data to state when user api call finishes
    useEffect(() => {
        if (!user && userData) {
            console.log('user data dispatch - ', userData);
            userDispatch(userData);
        }
    }, [user, userData, userDispatch]);

    // Render nothing when token is present and user is in state
    if (token && user) {
        return <div />;
    }

    // Otherwise render modal with Loading message or login form
    return (
        <div className="authModal__root">
            <div className="authModal__inner">
                {isLoading ? (
                    <div className="authModal__heading">Loading</div>
                ) : (
                    <>
                        <div className="authModal__heading">
                            Please log in to continue
                        </div>
                        <div className="authModal__form">
                            <input
                                type="text"
                                className="authModal__usernameInput"
                                onChange={handleEmail}
                            />
                            <input
                                type="password"
                                className="authModal__passwordInput"
                                onChange={handlePass}
                            />
                            <button
                                className="authModal__button"
                                onClick={handleSubmit}
                            >
                                Log in
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AuthModal;
