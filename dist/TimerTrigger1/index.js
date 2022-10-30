"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const timerTrigger = function (context, myTimer) {
    return __awaiter(this, void 0, void 0, function* () {
        var timeStamp = new Date().toISOString();
        //await get function which calls MS graph to scrape user data at midnight every day
        //await put function which calls cosmos db to store/update user's MS graph data
        if (myTimer.isPastDue) {
            context.log('Timer function is running late!');
        }
        context.log('Timer trigger function ran!', timeStamp);
    });
};
exports.default = timerTrigger;
//# sourceMappingURL=index.js.map