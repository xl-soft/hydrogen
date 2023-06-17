import {
    BrowserWindow,
    IpcMainEvent,
    app,
    ipcMain
} from "electron";
import { HydrogenID } from "./HydrogenID";
import { Hydrogen } from "./Hydrogen";
import { HydrogenOptions } from "./types/HydrogenOptions";
import { HydrogenConfig } from "./HydrogenConfig";
import { env } from "./env";

export class HydrogenWindow extends Hydrogen {
    public window?: BrowserWindow;

    constructor(private options: HydrogenOptions = { id: "main", config: {} }) {
        super();
        this.options.config = new HydrogenConfig(this.options.config).get();
    }

    public spawn() {
        let id = new HydrogenID();
        let port = Number(env!.PORT);
        id.set('win', this.options.id);
        this.window = new BrowserWindow(this.options.config);
        app.isPackaged
            ? this.window!.loadFile(`./index.html?windowid=${id.get(this.options.id).uuid}`)
            : this.window!.loadURL(`http://localhost:${port}?windowid=${id.get(this.options.id).uuid}`);

        ipcMain.on(`${id.get(this.options.id).uuid}:close`, (e: IpcMainEvent) => this.window?.close());
        ipcMain.on(`${id.get(this.options.id).uuid}:minimize`, (e: IpcMainEvent) => this.window?.minimize());
        ipcMain.on(`${id.get(this.options.id).uuid}:maximize`, (e: IpcMainEvent) => this.window?.isMaximized()
            ? this.window?.unmaximize()
            : this.window?.maximize()
        );
    }
}
