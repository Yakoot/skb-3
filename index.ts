import express = require("express");
import request = require("request-promise");
import xregexp = require("xregexp");

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

let pc = {};
const pcUrl = "https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json";
request(pcUrl)
  .then(async (res: any) => {
    pc = await JSON.parse(res);
  })
  .catch(err => {
    console.log("Что-то пошло не так", err);
  })

app.get("/volumes", async (req: Request, res: Response) => {
  let disk = {};
  let hdd = pc["hdd"];
  for (let key of hdd) {
    if (!(key['volume'] in disk)) disk[key['volume']] = '0B';
    disk[key['volume']] = disk[key['volume']].replace(/^\d*/, +disk[key['volume']].slice(0, -1) + key['size']);
  }
  res.send(disk);
});

app.get("/*", async (req: Request, res: Response) => {
  let url = req.url;
  url = url.replace(/^\/|\/$/g, '');
  let path = url.split('/');
  if (url == '') path = [];

  let answer = pc;
  path.forEach((key, index) => {
    if ((key == 'length' && index == 0) || (key != 'length' && key in answer)) {
      answer = answer[key];
    } else {
      res.status(404).send("Not Found");
    }
  });
  res.json(answer);
});


app.listen(3000, function () {
    // tslint:disable-next-line
    console.log("Example app listening on port 3000!");
});
