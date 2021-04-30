const reducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_USER':
            return { ...state, user: action.payload };
        case 'LOAD_GAMES':
            return { ...state, games: action.payload };
    }
};

export default reducer;
