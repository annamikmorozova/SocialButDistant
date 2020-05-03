const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user.model");

router.route("/").get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/").post((req, res) => {

    //const { error } = validate(req.body);
    //if (error) return res.status(400).send(error.details[0].message);

    User.findOne({email: req.body.email})
        .then(user => {
            if (user) return res.status(400).send("User already exists");
            let password = req.body.password;
            bcrypt.hash(password, 12, (err, hash) => {
                console.log(hash);
                user = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hash
                });

                user.save()
                    .then(() => {
                        req.session.user = user;
                        res.redirect("/groups");
                    })
                    .catch(err => res.status(400).json("Error: " + err));
            });
        });
});

function checkSignIn(req, res, next){
   if(req.session.user){
      next();     //If session exists, proceed to page
   } else {
      var err = new Error("Not logged in!");
      console.log(req.session.user);
      next(err);  //Error, trying to access unauthorized page!
   }
}

router.route("/login").post((req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if(!user) res.send("User not found");
            bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
                if (err) {
                    throw err
                } else if (!isMatch) {
                    console.log("Password doesn't match!")
                } else {
                    req.session.user = user;
                    res.redirect("/");
                }
            })
        })
});

module.exports = { usersRouter: router, checkSignIn };
