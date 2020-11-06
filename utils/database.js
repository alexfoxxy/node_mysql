const Sequelize = require('sequelize')

const DB_NAME = 'dbname'
const USER_NAME = 'user name'
const PASSWORD = 'password'

const sequelize = new Sequelize(DB_NAME, USER_NAME, PASSWORD, {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql'
})

module.exports = sequelize