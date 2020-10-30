module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("user", {
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail:true
        },
        unique: {
            args: true,
            msg: 'Email address already in use!'
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [8,42]
        }
      }


    });
  
    return Users;
  };