const db = require("../models");
const Idea = db.idea;
const Op = db.Sequelize.Op;
//Creates entry for submitted idea in database
exports.create = (req, res) => {

    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  

    const idea = {
      title: req.body.title,
      description: req.body.description,
      driver: req.body.driver,
      risk: req.body.risk,
      published: req.body.published ? req.body.published : false
    };
  

    Idea.create(idea)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Idea."
        });
      });
  };
//Deletes idea from database
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Idea.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Idea was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete IDea with id=${id}. Maybe Idea was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Idea with id=" + id
        });
      });
  };
//Finds every idea in database
  exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  
    Idea.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving ideas."
        });
      });
  };
//Can delete all existing ideas in database
  exports.deleteAll = (req, res) => {
    Idea.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Ideas were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all ideas."
        });
      });
  };
//Selects all the ideas in the database to show
  exports.selectAll = (req, res) => {
    Idea.select("*")
      .then(data => {
        res.json(data)
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving ideas."});
        });
      };

  //Finds idea by Title or ID
  exports.findOne = (req, res) => {
  const id = req.params.id;

  Idea.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Idea with id=" + id
      });
    });
};