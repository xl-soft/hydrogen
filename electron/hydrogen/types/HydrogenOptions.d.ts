import { BrowserWindowConstructorOptions } from "electron";

export interface HydrogenOptions {
    id: string;
    config?: BrowserWindowConstructorOptions;
}
