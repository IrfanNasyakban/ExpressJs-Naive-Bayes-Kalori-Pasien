const { Sequelize } = require("sequelize");

const db = new Sequelize('spk_naive_bayes', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})


module.exports = db