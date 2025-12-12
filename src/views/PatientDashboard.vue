<template>
  <div class="patient-dashboard">
    <h1>Patient Dashboard</h1>
    <div class="dashboard-content">
      <section class="quick-actions">
        <h2>Quick Actions</h2>
        <router-link to="/book-consultation" class="action-btn">Book Consultation</router-link>
        <router-link to="/video-call" class="action-btn live-call-btn">Start Live Call</router-link>
      </section>

      <section class="consultations">
        <h2>Your Consultations</h2>
        <div v-if="consultations.length === 0" class="no-consultations">
          <p>No consultations booked yet.</p>
        </div>
        <div v-else class="consultation-list">
          <div v-for="consultation in consultations" :key="consultation.id" class="consultation-card">
            <div class="consultation-info">
              <p><strong>Doctor:</strong> {{ consultation.doctor ? consultation.doctor.name : 'Unknown' }}</p>
              <p><strong>Scheduled At:</strong> {{ new Date(consultation.scheduledAt).toLocaleString() }}</p>
              <p><strong>Status:</strong> {{ consultation.status }}</p>
            </div>
            <div class="consultation-actions">
              <button v-if="consultation.status === 'scheduled'" @click="startLiveCall(consultation)" class="live-call-btn">Join Live Call</button>
            </div>
          </div>
        </div>
      </section>

      <section class="medical-records">
        <h2>Medical Records</h2>
        <p>View your medical history and records here.</p>
        <!-- Placeholder for medical records content -->
      </section>
    </div>
  </div>
</template>

<script>
import api from '../services/api.js'

export default {
  name: 'PatientDashboard',
  data() {
    return {
      consultations: []
    }
  },
  methods: {
    startLiveCall(consultation) {
      // Navigate to video call with consultation room ID
      this.$router.push({ path: '/video-call', query: { roomId: consultation.id } })
    }
  },
  async mounted() {
    try {
      const response = await api.get('/consultations/patient')
      this.consultations = response.data
    } catch (error) {
      console.error('Error fetching consultations:', error)
    }
  }
}
</script>

<style scoped>
.patient-dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.dashboard-content {
  display: grid;
  gap: 20px;
}

.quick-actions {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
}

.action-btn {
  display: inline-block;
  padding: 10px 20px;
  margin: 5px;
  background: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.live-call-btn {
  background: #28a745;
}

.consultations, .medical-records {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
}

.consultation-list {
  display: grid;
  gap: 15px;
}

.consultation-card {
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.consultation-actions button {
  padding: 8px 16px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
