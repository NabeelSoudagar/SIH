import { DataTypes } from 'sequelize'
import sequelize from '../config/db.js'
import User from './User.js'

const Consultation = sequelize.define('Consultation', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  status: { type: DataTypes.ENUM('pending', 'scheduled', 'active', 'completed'), defaultValue: 'pending' },
  scheduledAt: DataTypes.DATE,
  roomId: { type: DataTypes.STRING, allowNull: true }
})

Consultation.belongsTo(User, { as: 'doctor' })
Consultation.belongsTo(User, { as: 'patient' })

export default Consultation
