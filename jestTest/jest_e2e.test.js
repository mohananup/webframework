
import { mathOperations } from "../unitTests/jestTestfunc.js";
import {chromium} from "playwright";



test('test two nos', ()=> {

    expect(mathOperations.sum1(2,3)).toBe(5);
});