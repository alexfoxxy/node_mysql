const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const users = sequelize.define('users', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    usertoken: {
        type: Sequelize.STRING,
        allowNull: false
    }

})

module.exports = users