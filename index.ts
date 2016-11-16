import express = require("express");

import Request = express.Request;
import Response = express.Response;
import NextFunction = express.NextFunction;

let app = express();

// CORS middleware
const allowCrossDomain = function(req: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin", "http://account.skill-branch.ru");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");

    next();
};

app.use(allowCrossDomain);

// routes
app.get("/task2A", function (req: Request, res: Response) {

    let a = parseFloat(req.query.a);
    let b = parseFloat(req.query.b);

    a = isNaN(a) ? 0 : a;
    b = isNaN(b) ? 0 : b;

    let sum = a + b;
    res.send(sum.toString());
});

app.get("/", function (req: Request, res: Response) {
  res.send("123234");
});

app.listen(3000, function () {
    // tslint:disable-next-line
    console.log("Example app listening on port 3000!");
});
