"use strict";
const isAdmin = (req, res, next) => {
    if (req.headers["user"] === "admin") {
        return next();
    }
    return next("access error");
};
module.exports = isAdmin;
//# sourceMappingURL=isAdmin.js.map