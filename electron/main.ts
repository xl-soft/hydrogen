import { app as Electron } from 'electron'
import { HydrogenWindow } from "./window"

let main = new HydrogenWindow({
    id: 'main'
})
main.s()
Electron.once("ready", main.spawn)
Electron.on("activate", () => { if (!main.HydrogenElectronWindow) main.spawn() })
Electron.on("window-all-closed", () => { if (process.platform !== "darwin") { Electron.quit(); process.exit(0) } })