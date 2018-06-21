const {
    app,
    BrowserWindow,
    Menu
} = require('electron');

const path = require('path');
const url = require('url');
//process.env.NODE_ENV = 'production';

let mainWindow;
const os = require('os');
var apiProcess = null;

// #region Events
app.on('ready', init);


app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createMainWindow()
    }
});

process.on('exit', function () {
    console.log('exit');
    apiProcess.kill();
});

// #endregion

function init() {
    startCoreApi();
    createMainWindow();
}

function createMainWindow() {
    console.log('start');
    //create new window
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        frame: true,
        resizable: false
    });
    // Load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'src/angularweb/dist/angularweb/index.html'),
        protocol: 'file:',
        slashes: true,
    }));

    // Quit app when closed
    mainWindow.on('close', function (e) {
        mainWindow = null;
    })
    // Create menu  
    const mainMenuTemplate = [{
        label: 'File',
        submenu: [{
            label: 'Quit',
            accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+q',
            click() {
                app.quit();
            }
        }]
    }];

    // if mac, add empty object to menu
    if (process.platform == 'darwin') {
        mainMenuTemplate.unshift({});
    }

    // Add developer tools item if not in production
    if (process.env.NODE_ENV !== 'production') {
        mainMenuTemplate.push({
            label: 'Developer Tools',
            submenu: [{
                    label: 'Toggle Devtools',
                    accelerator: process.platform == 'darwin' ? 'Command+i' : 'Ctrl+i',
                    click(item, focusedWindow) {
                        focusedWindow.toggleDevTools();
                    }
                },
                {
                    role: 'reload'
                }
            ]
        })
    }

    // Build menu from temmplate 
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    Menu.setApplicationMenu(mainMenu);
}


function startCoreApi() {
    var proc = require('child_process').spawn;

    var apiPath = path.join(__dirname, 'src\\coreapi\\bin\\dist\\win\\coreapi.exe')
    if (os.platform() === 'darwin') {
        apiPath = path.join(__dirname, 'src//coreapi//bin//dist//osx//coreapi')
    }

    console.log(apiPath);

    apiProcess = proc(apiPath);

    apiProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        if (mainWindow == null) {
            console.log('createMainWindow');
            createMainWindow();
        }
    });
};