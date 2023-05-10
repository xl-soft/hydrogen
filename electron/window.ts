import { BrowserWindow, app as HydrogenElectron, BrowserWindow as HydrogenElectronBrowserWindow, ipcMain as HydrogenElectronIpc, BrowserWindowConstructorOptions } from "electron"
import HydrogenElectronConfigConstructor from "./config"

interface HydrogenWindowOptions {
    id: string,
    config?: BrowserWindowConstructorOptions,
}

class HydrogenWindow {

    public HydrogenElectronWindow: BrowserWindow | undefined = undefined
    private HydrogenElectronConfig: BrowserWindowConstructorOptions = {}
    private HydrogenWindow: HydrogenWindowOptions = { id: 'main' }

    private HydrogenElectronLoad() {
        console.log('PROD')
        // this.HydrogenElectronWindow!.loadFile(`./index.html?windowid=${this.options.id}`)
    }

    private HydrogenElectronLoadDev(port: number) {
        console.log(port, 'DEV')
        // this.HydrogenElectronWindow!.loadURL(`http://localhost:${port}?windowid=${this.options.id}`)
    }

    constructor(private options: HydrogenWindowOptions) {
        this.HydrogenWindow.id = this.options.id
        console.log(this.HydrogenWindow, 'constructor')
        this.HydrogenElectronConfig = new HydrogenElectronConfigConstructor(options.config).get()
        this.HydrogenElectronConfig = {...this.HydrogenElectronConfig, ...options.config}
    }

    public spawn() {
        console.log(this.HydrogenWindow, 'spawn')
        this.HydrogenElectronWindow = new HydrogenElectronBrowserWindow(this.HydrogenElectronConfig)
        this.HydrogenElectronWindow.once("close", () => process.exit(0) )
        // HydrogenElectron.isPackaged ? console.log(this.HydrogenWindowOptions) : console.log(this.HydrogenWindowOptions)
        HydrogenElectronIpc.on(`${this.HydrogenWindow.id}:close`, (e: any) => this.HydrogenElectronWindow?.close())
        HydrogenElectronIpc.on(`${this.HydrogenWindow.id}:minimize`, (e: any) => this.HydrogenElectronWindow?.minimize())
        HydrogenElectronIpc.on(`${this.HydrogenWindow.id}:maximize`, (e: any) => this.HydrogenElectronWindow?.isMaximized() ? this.HydrogenElectronWindow?.unmaximize() : this.HydrogenElectronWindow?.maximize() )
    }
}

export {
    HydrogenWindow
}

