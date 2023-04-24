import { BrowserWindow, app as HydrogenElectron, BrowserWindow as HydrogenElectronBrowserWindow, ipcMain as HydrogenElectronIpc, BrowserWindowConstructorOptions } from "electron"
import HydrogenElectronServe from "electron-serve"
import HydrogenElectronConfigConstructor from "./config"

interface HydrogenWindowOptions {
    id: string,
    config?: BrowserWindowConstructorOptions,
}

abstract class Hydrogen {
    public HydrogenElectronWindow: BrowserWindow | undefined = undefined
    public HydrogenElectronConfigBase: BrowserWindowConstructorOptions = {}
    protected HydrogenElectronConfig = {}
    protected HydrogenElectronLoad = HydrogenElectronServe({directory: `./${this.options.id}`})
    protected HydrogenElectronLoadDev = (port: number) => this.HydrogenElectronWindow!.loadURL(`http://localhost:${port}/${this.options.id}`).catch(() => setTimeout(() => { this.HydrogenElectronLoadDev(port); }, 200))

    constructor(protected options: HydrogenWindowOptions) {
        this.HydrogenElectronConfig = new HydrogenElectronConfigConstructor(this.options.config).get()
        this.HydrogenElectronConfigBase = {...this.HydrogenElectronConfig, ...this.options.config}
    }
}

class HydrogenWindow extends Hydrogen {
    public s() {
        console.log(this.options)
    }
    public spawn() {
        this.HydrogenElectronWindow = new HydrogenElectronBrowserWindow(this.HydrogenElectronConfig.get())
        this.HydrogenElectronWindow.once("close", () => process.exit(0) )
        HydrogenElectron.isPackaged ? this.HydrogenElectronLoadDev(3000) : this.HydrogenElectronLoad(this.HydrogenElectronWindow)
        HydrogenElectronIpc.on(`${this.options.id}:close`, e => this.HydrogenElectronWindow?.close())
        HydrogenElectronIpc.on(`${this.options.id}:minimize`, e => this.HydrogenElectronWindow?.minimize())
        HydrogenElectronIpc.on(`${this.options.id}:maximize`, e => this.HydrogenElectronWindow?.isMaximized() ? this.HydrogenElectronWindow?.unmaximize() : this.HydrogenElectronWindow?.maximize() )
    }
}

export {
    HydrogenWindow
}

