// Configuration for control to postgres database, replace password with yours, and update name to name of database you created for project


module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "156201Zay",
    DB: "ideasdb",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };