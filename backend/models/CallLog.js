import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const CallLog = sequelize.define('CallLog', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  room_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  caller_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  receiver_id: {
    type: DataTypes.UUID,
    allowNull: true
  },
  start_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  end_time: {
    type: DataTypes.DATE,
    allowNull: true
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('ongoing', 'completed', 'failed'),
    defaultValue: 'ongoing'
  }
}, {
  tableName: 'call_logs',
  timestamps: true
});

export default CallLog;