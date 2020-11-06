const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const media = sequelize.define('Media', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
    },
    path: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    dateUpdate: {
        type: Sequelize.DATE,
        allowNull: true
    }
})

module.exports = media