//Creates the model for the idea entry in postgres database

module.exports = (sequelize, Sequelize) => {
    const Idea = sequelize.define("idea", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      driver: {
        type: Sequelize.STRING
      },

      risk: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Idea;
  };