// let express = require("express");
// let router = express.Router();
// let sequelize = require('../db');
// let User = sequelize.import('../models/user.js');

const router = require('express').Router();
const User = require("../db").import("../models/user");

//Create a new endpoint: /create
//The endpoint is going to be a post request
//Have an object that matches the model of UserTable (email/password)
//Let sequelize create a new record in the database (create)

router.post("/create", function (req, res) {

    
    let userModel = {
        email: req.body.user.email,
        password: req.body.user.password,
    };
    User.create(userModel).then(
        res.send("This is our user/create endpoint")
    );
});
module.exports = router;