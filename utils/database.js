const Sequelize = require('sequelize')

const DB_NAME = 'test_node'
const USER_NAME = 'root'
const PASSWORD = '0000'

const sequelize = new Sequelize(DB_NAME, USER_NAME, PASSWORD, {
    host: 'localhost',
    port: '3366',
    dialect: 'mysql'
})

module.exports = sequelize