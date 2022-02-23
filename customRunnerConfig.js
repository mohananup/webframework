// import {config} from "./playwright.config.js";
//import {Config, Global} from "jest/types";
//import {AssertionResult, TestResult} from "jest/test-result";
//import {Global} from 'jest/types';
import  path  from "path"

//const path = require("path")

const cRunner = {
  rootDir: path.join(__dirname, ".."),
  displayName: "playwrighttest",
  runner: "@playwright/test", // which runner to use
  testMatch: ["__e2e__/*.js"], // which files to run against
}

//const cRunner = {

//     globalConfig: Global,
//     config: config,
//     environment: config.projects,
//     packageName: pa
    
    
//}

// runtime: Runtime,
//     testPath: string,
//     TestResult: config.outputdir




export default cRunner;