const db = require("../models/index")
const User = db.users;

checkExistingEmailorUserName = (req, res, next) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Username is already in use!"
            });
            return;
        }
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Email is already registered!"
            });
            return;
        }
        next();
    });
    });
};

const verifySignUp = {
    checkExistingEmailorUserName : checkExistingEmailorUserName
};

module.exports = verifySignUp;