const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')
const User = require('./User')

const Consultation = sequelize.define('Consultation', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  status: { type: DataTypes.ENUM('pending', 'active', 'completed'), defaultValue: 'pending' },
  scheduledAt: DataTypes.DATE
})

Consultation.belongsTo(User, { as: 'doctor' })
Consultation.belongsTo(User, { as: 'patient' })

module.exports = Consultation
