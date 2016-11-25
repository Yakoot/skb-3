import express = require("express");
import mongoose = require("mongoose");
import bodyParser = require("body-parser");
var bn = require('big-number');


import _ = require("lodash");
// import * as prm from 'bluebird';
import rp = require("request-promise");



import Request = express.Request;
import Response = express.Response;
import NextFunction = express.NextFunction;


// CORS middleware
const allowCrossDomain = function(req: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin", "http://account.skill-branch.ru");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");

    next();
};

let app = express();
app.use(allowCrossDomain);
app.use(bodyParser.json());


let count = (n: number):any => {
  if (n == 0) return 1;
  if (n == 1) return 6 * 3 * count(0);
  if (n == 2) return 6 * 2 * count(1) + 9 * 3 * count(0);
  return bn(count(n - 1)).multiply(12).add(bn(count(n - 2)).multiply(18));
}

app.get("/", async (req: Request, res: Response) => {
  let n = req.query.i;
  res.send(count(n).toString());
});

app.listen(3000, function () {
    // tslint:disable-next-line
    console.log("Example app listening on port 3000!");
});
