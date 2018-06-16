const {
    app,
    BrowserWindow,
    Menu,
    ipcMain
} = require('electron')
const path = require('path')
const url = require('url')
//process.env.NODE_ENV = 'production';

let mainWindow;

app.on('ready', init);

function init(){
    startDotnet();
    createMainWindow();
}


//***************************************************** */
//******************* MAIN WINDOW   ******************* */
//***************************************************** */

function createMainWindow() {
    console.log('start');
    //create new window
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    });
    //Load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'src/angularweb/dist/angularweb/index.html'),
        protocol: 'file:',
        slashes: true
    }));
    //mainWindow.loadURL('http://localhost:4200/');
    // Quit app when closed
    mainWindow.on('close', function (e) {
        app.quit();
    })
    // Build menu from temmplate 
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    Menu.setApplicationMenu(mainMenu);
}

//***************************************************** */



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

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createMainWindow()
    }
});

const os = require('os');
var apiProcess = null;

function startDotnet() {
    var proc = require('child_process').spawn;
    //  run server
    var apipath = path.join(__dirname, 'src\\coreapi\\bin\\dist\\win\\coreapi.exe')
    if (os.platform() === 'darwin') {
        apipath = path.join(__dirname, 'src\\coreapi//bin//dist//osx//coreapi')
    }
    apiProcess = proc(apipath)

    apiProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        if (mainWindow == null) {
            createMainWindow();
        }
    });
};