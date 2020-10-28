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