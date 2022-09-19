import { injectBackground } from "./inject-background";
import { injectHashes } from "./inject-hashes";
import { injectLib } from "./inject-lib";
import { injectPreview } from "./inject-preview";

injectHashes();
injectPreview();
injectLib();
injectBackground();
