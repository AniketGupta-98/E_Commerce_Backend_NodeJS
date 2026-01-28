module.exports = (app) => {
    const User = require("../controllers/user.controllers");

    app.post("/user/create", User.createUser);

    app.post("/user/login", User.loginUser);
};
