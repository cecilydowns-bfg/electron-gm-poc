import React, { useEffect, useState } from 'react';
import ProgressBar from './ProgressBar.jsx';
import { ipcRenderer } from 'electron';

const GameListItem = ({ game }) => {
    const [onSystem, setOnSystem] = useState(false);
    const [dlProgress, setDlProgress] = useState(0);
    const { name, sku, url, fileName } = game;

    useEffect(() => {
        ipcRenderer.on(`${sku}-dl-percent`, (event, message) => {
            console.log('Setting percent:', message);
            setDlProgress(message);
        });
    }, [sku]);

    useEffect(() => {
        const interval = setInterval(() => {
            ipcRenderer.invoke('is-on-system', { fileName }).then((res) => {
                setOnSystem(res);
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [fileName]);

    const handleDelete = () => {
        ipcRenderer.send('delete-game', {
            fileName
        });
    };
    const handleDownload = () => {
        ipcRenderer.send('download-game', {
            url,
            sku
        });
    };
    const handlePlay = () => {
        ipcRenderer.send('open-game', {
            fileName
        });
    };

    if (!game) {
        return <div />;
    }

    return (
        <div className="gamelistitem__root">
            {name}
            <button
                className="button__root button__root--small gamelistitem__deletebutton"
                onClick={handleDelete}
            >
                X
            </button>
            {onSystem ? (
                <button
                    className="button__root button__root--small button__root--green gamelistitem__playbutton"
                    onClick={handlePlay}
                >
                    Play Now
                </button>
            ) : (
                <button
                    className="button__root button__root--small gamelistitem__dlbutton"
                    onClick={handleDownload}
                >
                    Download
                </button>
            )}
            {dlProgress !== 0 && dlProgress !== 1 && (
                <ProgressBar percent={dlProgress} />
            )}
        </div>
    );
};

export default GameListItem;
