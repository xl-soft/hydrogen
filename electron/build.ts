import path from "path";
import fs from "fs";

let parent = JSON.parse(
    fs.readFileSync(path.join(__dirname, "..", "package.json")).toString()
);
delete parent.type;
parent = JSON.stringify(parent);
fs.writeFileSync(path.join(__dirname, "..", "build", "package.json"), parent);
