const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 900,
        resizable: true,
        useContentSize: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
        },
        show: false,
        icon: 'build/icon.png'
    });

    mainWindow.setMenuBarVisibility(false);

    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    });

    // load the created React application
    mainWindow.loadFile('build/index.html');
};

app.whenReady().then(() => {
        createWindow();
    

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    } 
});

