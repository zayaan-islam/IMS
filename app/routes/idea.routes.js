module.exports = app => {
    const ideas = require("../controllers/idea.controller.js");

  
    var router = require("express").Router();
    router.post("/", ideas.create);
    router.get("/", ideas.findAll);
    router.delete("/", ideas.deleteAll);
    router.delete("/:id", ideas.delete);
  


    app.use('/api/ideas', router);
  };