const db = require("../models");
const Idea = db.idea;
const Op = db.Sequelize.Op;

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