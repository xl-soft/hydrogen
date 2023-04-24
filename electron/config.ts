import { type BrowserWindowConstructorOptions, app } from "electron";

class HydrogenElectronConfig {

    private HydrogenElectronConfigBase: BrowserWindowConstructorOptions = {
        width: 1270,
        height: 720,
        minWidth: 1270,
        minHeight: 720,
        center: true,
        resizable: true,
        transparent: false,
        hasShadow: false,
        frame: false,
        titleBarStyle: "hidden",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: !app.isPackaged
        },
    };

    constructor(private HydrogenElectronConfigOptions?: BrowserWindowConstructorOptions) {
        this.HydrogenElectronConfigBase = {
            ...this.HydrogenElectronConfigBase,
            ...this.HydrogenElectronConfigOptions,
        };
    }

    get(): BrowserWindowConstructorOptions {
        return this.HydrogenElectronConfigBase;
    }
}

export default HydrogenElectronConfig;
