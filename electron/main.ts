import { app, type BrowserWindowConstructorOptions } from 'electron'
import { HydrogenWindow } from "./hydrogen/HydrogenWindow"
import { HydrogenOptions } from "./hydrogen/types/HydrogenOptions"
import { env } from './hydrogen/env'

console.log(env)

const NAME = "XLauncher Software"


const win = new HydrogenWindow({ id: 'main', config: { title: NAME }})

const win1 = new HydrogenWindow({ id: 'main1', config: { title: NAME }})

const win2 = new HydrogenWindow({ id: 'main2', config: { title: NAME }})

const win3 = new HydrogenWindow({ id: 'main3', config: { title: NAME }})

app.once("ready", () => { win.spawn(); win1.spawn(); win2.spawn(); win3.spawn(); })
app.on("activate", () => { if (!win.window) win.spawn() })
app.on("window-all-closed", () => { if (process.platform !== "darwin") { app.quit(); process.exit(0) } })