import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Consultation = sequelize.define('Consultation', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  doctor_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  patient_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  scheduled_at: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('scheduled', 'ongoing', 'completed', 'cancelled'),
    defaultValue: 'scheduled'
  }
}, {
  tableName: 'consultations',
  timestamps: true
});

export default Consultation;