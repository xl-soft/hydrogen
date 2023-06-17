import { HydrogenID } from "./HydrogenID";

export abstract class Hydrogen {
    protected ids = new HydrogenID();
    protected load() { }
    protected loaddev(port: number) { }
}
