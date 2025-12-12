<template>
  <div class="book-consultation">
    <h1>Book Consultation</h1>
    <form @submit.prevent="bookConsultation" class="consultation-form">
      <div class="form-group">
        <label for="doctor">Select Doctor:</label>
        <select v-model="form.doctorId" id="doctor" required>
          <option value="">Choose a doctor</option>
          <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">
            {{ doctor.name }} - {{ doctor.specialization }} ({{ doctor.experience }}) ⭐{{ doctor.rating }}
          </option>
        </select>
      </div>

      <div v-if="selectedDoctor" class="doctor-info">
        <h3>Doctor Information</h3>
        <p><strong>Name:</strong> {{ selectedDoctor.name }}</p>
        <p><strong>Specialization:</strong> {{ selectedDoctor.specialization }}</p>
        <p><strong>Experience:</strong> {{ selectedDoctor.experience }}</p>
        <p><strong>Rating:</strong> ⭐{{ selectedDoctor.rating }}/5</p>
        <p><strong>Availability:</strong> {{ selectedDoctor.availability }}</p>
      </div>

      <div class="form-group">
        <label for="scheduledAt">Scheduled Date & Time:</label>
        <input
          type="datetime-local"
          v-model="form.scheduledAt"
          id="scheduledAt"
          required
        />
      </div>

      <button type="submit" :disabled="loading" class="submit-btn">
        {{ loading ? 'Booking...' : 'Book Consultation' }}
      </button>

      <div v-if="error" class="error-message">{{ error }}</div>
      <div v-if="success" class="success-message">{{ success }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useAuthStore } from '../store/auth'
import api from '../services/api'

const authStore = useAuthStore()

const doctors = ref([])
const loading = ref(false)
const error = ref('')
const success = ref('')

const form = ref({
  doctorId: '',
  scheduledAt: ''
})

const selectedDoctor = ref(null)

const fetchDoctors = async () => {
  try {
    console.log('Fetching doctors from API...')
    const response = await api.get('/doctors')
    console.log('Doctors response:', response.data)
    doctors.value = response.data
    if (doctors.value.length === 0) {
      error.value = 'No doctors available at the moment.'
    }
  } catch (err) {
    console.error('Error fetching doctors:', err)
    if (err.response) {
      error.value = `Server error: ${err.response.status} - ${err.response.data?.error || 'Unknown error'}`
    } else if (err.request) {
      error.value = 'Cannot connect to server. Please check if the backend is running.'
    } else {
      error.value = 'Failed to load doctors. Please try again.'
    }
  }
}

const updateSelectedDoctor = () => {
  if (form.value.doctorId) {
    selectedDoctor.value = doctors.value.find(doctor => doctor.id == form.value.doctorId)
  } else {
    selectedDoctor.value = null
  }
}

const bookConsultation = async () => {
  if (!form.value.doctorId || !form.value.scheduledAt) {
    error.value = 'Please fill in all fields.'
    return
  }

  loading.value = true
  error.value = ''
  success.value = ''

  try {
    const payload = {
      doctor_id: form.value.doctorId,
      patient_id: authStore.user.id,
      scheduledAt: new Date(form.value.scheduledAt).toISOString()
    }

    const response = await api.post('/consultations/book', payload)
    success.value = response.data.message
    form.value = { doctorId: '', scheduledAt: '' } // Reset form
  } catch (err) {
    error.value = err.response?.data?.error || 'Failed to book consultation. Please try again.'
    console.error('Error booking consultation:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchDoctors()
})

// Watch for doctor selection changes
watch(() => form.value.doctorId, updateSelectedDoctor)
</script>

<style scoped>
.book-consultation {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.consultation-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

select,
input[type="datetime-local"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.submit-btn {
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.submit-btn:hover:not(:disabled) {
  background-color: #0056b3;
}

.submit-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error-message {
  color: #dc3545;
  margin-top: 10px;
  font-weight: bold;
}

.success-message {
  color: #28a745;
  margin-top: 10px;
  font-weight: bold;
}

.doctor-info {
  background-color: #e8f4fd;
  border: 1px solid #bee5eb;
  border-radius: 6px;
  padding: 15px;
  margin-bottom: 20px;
}

.doctor-info h3 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #0c5460;
}

.doctor-info p {
  margin: 5px 0;
  color: #495057;
}

.doctor-info strong {
  color: #212529;
}
</style>
