import { BrowserWindowConstructorOptions, app } from "electron";

export class HydrogenConfig {
    private HydrogenConfig: BrowserWindowConstructorOptions = {
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
            devTools: !app.isPackaged,
        },
    };

    constructor(private config?: BrowserWindowConstructorOptions) {
        this.HydrogenConfig = {
            ...this.HydrogenConfig,
            ...this.config,
        };
    }

    get(): BrowserWindowConstructorOptions {
        return this.HydrogenConfig;
    }
}
