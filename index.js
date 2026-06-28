/**
 * AskAIOrbit Framework
 * Enterprise Backend AI Framework
 */

import * as Core from "./Core/index.js";
import * as Foundation from "./Foundation/index.js";
import * as Database from "./Database/index.js";
import * as Security from "./Security/index.js";
import * as Communication from "./Communication/index.js";
import * as HTTP from "./HTTP/index.js";
import * as DataProcessing from "./DataProcessing/index.js";
import * as AI from "./AI/index.js";
import * as Enterprise from "./Enterprise/index.js";
import * as Developer from "./Developer/index.js";
import * as Cloud from "./Cloud/index.js";

const Orbit = {
    version: "1.0.1",

    Core,
    Foundation,
    Database,
    Security,
    Communication,
    HTTP,
    DataProcessing,
    AI,
    Enterprise,
    Developer,
    Cloud
};

export default Orbit;

export {
    Core,
    Foundation,
    Database,
    Security,
    Communication,
    HTTP,
    DataProcessing,
    AI,
    Enterprise,
    Developer,
    Cloud
};