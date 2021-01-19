const authJWt = require("./authJwt");
const verifySignUp = require("./verifySignUp");

//Exports functions to check token and for user registration
module.exports = {
    authJWt,
    verifySignUp
};