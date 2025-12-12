import { DataTypes } from 'sequelize'
import sequelize from '../config/db.js'
import User from './User.js'

const CallLog = sequelize.define('CallLog', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  roomId: { type: DataTypes.STRING, allowNull: false },
  startTime: { type: DataTypes.DATE, allowNull: false },
  endTime: { type: DataTypes.DATE, allowNull: true },
  duration: { type: DataTypes.INTEGER, allowNull: true }, // in seconds
  status: { type: DataTypes.ENUM('ongoing', 'completed', 'failed'), defaultValue: 'ongoing' }
})

CallLog.belongsTo(User, { as: 'caller', foreignKey: 'callerId' })
CallLog.belongsTo(User, { as: 'receiver', foreignKey: 'receiverId' })

export default CallLog
