const { app, BrowserWindow, ipcMain } = require("electron");
const serve = require("electron-serve");
const fs = require('fs')
const appdata = require('appdata-path')
const config = {
    electron: {
        width: 1280,
        height: 720,
        minWidth: 1280,
        minHeight: 720,
        center: true,
        hasShadow: false,
        frame: false,
        titleBarStyle: "hidden",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: !app.isPackaged || process.env.NODE_ENV == "development"
        },
        transparent: true
    },
    port: process.env.PORT || 3000,
    dev: !app.isPackaged || process.env.NODE_ENV == "development"
}

let win

const load = serve({directory: "."})
const devload = port => win.loadURL(`http://localhost:${port}`).catch(() => setTimeout(() => { vite(port); }, 200))

function main() {
    win = new BrowserWindow(config.electron)
    win.once("close", () => win = null )
    config.dev == true ? devload(config.port) : load(win)
}

app.once("ready", main)
app.on("activate", () => { if (!win) main() })
app.on("win-all-closed", () => { if (process.platform !== "darwin") { app.quit(); win = null } })

function theme(theme = 'dark') {
    let appdataFolder = appdata("XLauncher Dashboard")
    let preferencesFile = `${appdataFolder}\\preferences.json`
    if (!fs.existsSync(preferencesFile)) {
        fs.mkdirSync(appdataFolder); fs.writeFileSync(preferencesFile, '{}')
    }
    let preferencesFileContent = JSON.parse(fs.readFileSync(preferencesFile))
    preferencesFileContent.theme = theme
    preferencesFileContent = JSON.stringify(preferencesFileContent)
    fs.writeFileSync(preferencesFile, preferencesFileContent)
}

ipcMain.on('close', e => { app.quit(); win = null })
ipcMain.on('minimize', e => win.minimize())
ipcMain.on('maximize', e => win.isMaximized() ? win.unmaximize() : win.maximize() )

ipcMain.on('theme-dark', e => theme('dark'))
ipcMain.on('theme-light', e => theme('light'))
ipcMain.emit()
