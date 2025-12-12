<template>
  <div class="doctor-dashboard">
    <h1>Doctor Dashboard</h1>
    <div class="dashboard-content">
      <section class="quick-actions">
        <h2>Quick Actions</h2>
        <router-link to="/video-call" class="action-btn live-call-btn">Start Live Call</router-link>
      </section>

      <section class="consultations">
        <h2>Your Consultations</h2>
        <div v-if="consultations.length === 0" class="no-consultations">
          <p>No consultations scheduled.</p>
        </div>
        <div v-else class="consultation-list">
          <div v-for="consultation in consultations" :key="consultation.id" class="consultation-card">
            <div class="consultation-info">
              <p><strong>Patient:</strong> {{ consultation.patient ? consultation.patient.name : 'Unknown' }}</p>
              <p><strong>Scheduled At:</strong> {{ new Date(consultation.scheduledAt).toLocaleString() }}</p>
              <p><strong>Status:</strong> {{ consultation.status }}</p>
            </div>
            <div class="consultation-actions">
              <button v-if="consultation.status === 'scheduled'" @click="startLiveCall(consultation)" class="live-call-btn">Join Live Call</button>
            </div>
          </div>
        </div>
      </section>

      <section class="patient-management">
        <h2>Patient Management</h2>
        <p>Manage patient records and appointments here.</p>
        <!-- Placeholder for patient management content -->
      </section>
    </div>
  </div>
</template>

<script>
import api from '../services/api.js'

export default {
  name: 'DoctorDashboard',
  data() {
    return {
      consultations: []
    }
  },
  methods: {
    startLiveCall(consultation) {
      this.$router.push({ path: '/video-call', query: { roomId: consultation.id } })
    }
  },
  async mounted() {
    try {
      const response = await api.get('/consultations/doctor')
      this.consultations = response.data
    } catch (error) {
      console.error('Error fetching consultations:', error)
    }
  }
}
</script>
