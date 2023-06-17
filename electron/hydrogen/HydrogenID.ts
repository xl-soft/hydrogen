import { v4 as uuidv4 } from "uuid";
import { HydrogenIDI } from "./types/HydrogenIDI";
import { HydrogenIDT } from "./types/HydrogenIDT";

export class HydrogenID {
    // Array of window ID`s
    protected windows: Array<HydrogenIDI> = [];

    // Get window ID`s array
    public get(id: string): HydrogenIDI {
        let i = this.windows.find(o => o.id === id);
        return i!;
    }

    // Create new ID`s
    public set(type: HydrogenIDT, ...ids: Array<string>): void {
        ids.forEach((e) => this.windows.find((o) => o.id === e) == undefined
            ? this.windows.push({ id: e, uuid: uuidv4() })
            : console.error("HYDROGEN ERROR: Window ID is not unique")
        );
    }
}
