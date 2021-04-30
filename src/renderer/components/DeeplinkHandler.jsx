import React from 'react';
import { useHistory } from 'react-router-dom';
import { ipcRenderer } from 'electron';

const DeeplinkHandler = () => {
    const history = useHistory();
    ipcRenderer.on('deeplink-activated', (event, message) => {
        const sku = message.replace('bfgm://', '');
        history.push(`/gameslist/${sku}`);
    });
    return <div />;
};

export default DeeplinkHandler;
