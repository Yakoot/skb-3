import express = require("express");
import bodyParser = require("body-parser");
import _ = require("lodash");
// import * as prm from 'bluebird';

let pokemons = require("./pokemons.json");
pokemons = _.sortBy(pokemons, "name");
let all = {
  "angular": _.orderBy(pokemons, [(one: any) => {
    return one.weight / one.height;
  }, "name"], ["asc", "asc"]),
  "fat": _.orderBy(pokemons, [(one: any) => {
    return one.weight / one.height;
  }, "name"], ["desc", "asc"]),
  "huge": _.orderBy(pokemons, ["height", "name"], ["desc", "asc"]),
  "micro": _.orderBy(pokemons, ["height", "name"], ["asc", "asc"]),
  "heavy": _.orderBy(pokemons, ["weight", "name"], ["desc", "asc"]),
  "light": _.orderBy(pokemons, ["weight", "name"], ["asc", "asc"])
};



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

let makeOffset = (array: any, offset: number, limit: number) => {
  let answer = _.map(array, (one:any) => { return one.name;});
  return answer.slice(offset, offset + limit);
}


app.get("/:type?", async (req: Request, res: Response) => {
  let offset = req.query.offset ? +req.query.offset : 0;
  let limit = req.query.limit ? +req.query.limit : 20;
  let type = "";
  if (req.params && req.params.type) {
    type = req.params.type;
  }
  let array = req.params.type ? all[req.params.type] : pokemons;

  res.json(makeOffset(array, offset, limit));
});



app.listen(3000, function () {
    // tslint:disable-next-line
    console.log("Example app listening on port 3000!");
});
