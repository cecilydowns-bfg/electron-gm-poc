const { app, ipcMain, BrowserWindow, shell, protocol } = require('electron');
const path = require('path');
const { execFile, fork, spawn } = require('child_process');

const { download } = require('electron-dl');
const { electron } = require('process');

const fs = require('fs');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    // eslint-disable-line global-require
    app.quit();
}

let mainWindow;

const createWindow = () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false
        }
    });

    // and load the index.html of the app.
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();

    protocol.registerHttpProtocol('bfgm', (req, cb) => {
        console.log('REQ', req);
    });
    // let link;
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    if (!mainWindow) {
        createWindow();
    }
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// SSL/TSL: this is the self signed certificate support
app.on(
    'certificate-error',
    (event, webContents, url, error, certificate, callback) => {
        // On certificate error we disable default behaviour (stop loading the page)
        // and we then say "it is all fine - true" to the callback
        event.preventDefault();
        callback(true);
    }
);

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// Handle Deeplink app event
app.on('open-url', (event, data) => {
    event.preventDefault();
    if (mainWindow) {
        // Send event to renderer
        mainWindow.webContents.send('deeplink-activated', data);
    } else {
        setTimeout(() => {
            mainWindow.webContents.send('deeplink-activated', data);
        }, 1000);
    }
});

// Handle Download Game event
ipcMain.on('download-game', async (event, { url, sku }) => {
    console.log('Downloading game with sku', sku);
    const win = BrowserWindow.getFocusedWindow();
    const onProgress = ({ percent }) => {
        win.webContents.send(`${sku}-dl-percent`, percent);
    };
    await download(win, url, { onProgress });

    await shell.openPath(`${app.getPath('downloads')}/${sku}.zip`);
});

// Handle Open Game event
ipcMain.on('open-game', async (event, { fileName }) => {
    console.log('Opening game with name', fileName);
    const p = spawn(
        `${app.getPath('downloads')}/${fileName}.app/Contents/MacOS/${fileName}`
    );
    p.stdout.on('data', (data) => {
        console.log('stdout: ' + data);
    });

    p.stderr.on('data', (data) => {
        console.log('stderr: ' + data);
    });

    p.on('close', (code) => {
        console.log('child process exited with code ' + code);
    });
});

// Handle Delete Game event
ipcMain.on('delete-game', async (event, { fileName }) => {
    console.log('Deleting game with name', fileName);
    shell.moveItemToTrash(`${app.getPath('downloads')}/${fileName}.app`);
});

// Check if game is on system
ipcMain.handle('is-on-system', async (event, { fileName }) => {
    // Return boolean
    return fs.existsSync(`${app.getPath('downloads')}/${fileName}.app`);
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
