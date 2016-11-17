import express = require("express");

const isAdmin: express.RequestHandler = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.headers["user"] === "admin") {
    return next();
  }
  return next("access error");
}

export = isAdmin;
