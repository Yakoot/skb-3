"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const express = require("express");
const bodyParser = require("body-parser");
var bn = require('big-number');
const allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://account.skill-branch.ru");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
};
let app = express();
app.use(allowCrossDomain);
app.use(bodyParser.json());
let count = (n) => {
    if (n == 0)
        return 1;
    if (n == 1)
        return 6 * 3 * count(0);
    if (n == 2)
        return 6 * 2 * count(1) + 9 * 3 * count(0);
    return bn(count(n - 1)).multiply(12).add(bn(count(n - 2)).multiply(18));
};
app.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
    let n = req.query.i;
    res.send(count(n).toString());
}));
app.listen(3000, function () {
    console.log("Example app listening on port 3000!");
});
//# sourceMappingURL=index.js.map