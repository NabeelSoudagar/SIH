<template>
  <div class="medical-store-container">
    <div class="store-header">
      <h1>Medical Stores in Punjab</h1>
      <p>Find local medical stores offering home delivery services</p>
    </div>

    <div class="store-list">
      <div v-for="store in stores" :key="store.id" class="store-card">
        <h3>{{ store.name }}</h3>
        <div class="rating" v-if="store.rating">
          <span class="stars">⭐ {{ store.rating }}/5</span>
        </div>
        <p><i class="fas fa-map-marker-alt"></i> {{ store.location }}</p>
        <p><i class="fas fa-phone"></i> {{ store.phone }}</p>
        <p><i class="fas fa-clock"></i> {{ store.hours }}</p>
        <div class="services" v-if="store.services">
          <span v-for="service in store.services" :key="service" class="service-tag">{{ service }}</span>
        </div>
        <div class="delivery-info">
          <span class="delivery-badge">Home Delivery Available</span>
          <span class="delivery-time">Delivery in {{ store.deliveryTime }}</span>
        </div>
        <button @click="selectStore(store)" class="order-btn">Order Medicines</button>
      </div>
    </div>

    <div v-if="selectedStore" class="order-form">
      <h2>Order from {{ selectedStore.name }}</h2>
      <form @submit.prevent="placeOrder">
        <div class="form-group">
          <label for="medicines">Select Medicines</label>
          <select id="medicines" v-model="order.medicines" multiple required>
            <option v-for="med in medicines" :key="med.name" :value="med.name">
              {{ med.name }} - ₹{{ med.price }} (Stock: {{ med.stock }}) - {{ med.category }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="address">Delivery Address</label>
          <input id="address" v-model="order.address" type="text" required placeholder="Enter your address" />
        </div>
        <div class="form-group">
          <label for="doctorNote">Doctor's Note (if any)</label>
          <textarea id="doctorNote" v-model="order.doctorNote" placeholder="Prescription or doctor's recommendation"></textarea>
        </div>
        <button type="submit" class="submit-btn">Place Order</button>
      </form>
    </div>

    <div v-if="orderMessage" class="message">{{ orderMessage }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const stores = ref([]);
const selectedStore = ref(null);
const medicines = ref([]);
const order = ref({
  medicines: [],
  address: '',
  doctorNote: ''
});
const orderMessage = ref('');

const fetchStores = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/pharmacy/stores');
    stores.value = res.data;
  } catch (err) {
    console.error('Error fetching stores:', err);
    // Fallback demo data
    stores.value = [
      { id: 1, name: 'Punjab Medical Store', location: 'Amritsar, Punjab', phone: '9876543210', hours: '9 AM - 9 PM', deliveryTime: '2-4 hours', rating: 4.5 }
    ];
  }
};

const fetchMedicines = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/pharmacy/medicines');
    medicines.value = res.data;
  } catch (err) {
    console.error('Error fetching medicines:', err);
    // Fallback demo data
    medicines.value = [
      { name: 'Paracetamol 500mg', stock: 120, price: 25, category: 'Pain Relief' },
      { name: 'Crocin Advance', stock: 80, price: 30, category: 'Pain Relief' }
    ];
  }
};

const selectStore = (store) => {
  selectedStore.value = store;
  fetchMedicines();
};

const placeOrder = async () => {
  try {
    const res = await axios.post('http://localhost:5000/api/pharmacy/order', {
      storeId: selectedStore.value.id,
      medicines: order.value.medicines,
      address: order.value.address,
      doctorNote: order.value.doctorNote
    });
    orderMessage.value = res.data.message;
    selectedStore.value = null;
    order.value = { medicines: [], address: '', doctorNote: '' };
  } catch (err) {
    orderMessage.value = err.response?.data?.error || 'Order failed';
  }
};

onMounted(() => {
  fetchStores();
});
</script>

<style scoped>
.medical-store-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.store-header {
  text-align: center;
  margin-bottom: 3rem;
}

.store-header h1 {
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.store-header p {
  color: #7f8c8d;
  font-size: 1.2rem;
}

.store-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.store-card {
  background: #fff;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.store-card:hover {
  transform: translateY(-5px);
}

.store-card h3 {
  color: #3498db;
  margin-bottom: 0.5rem;
}

.rating {
  margin-bottom: 1rem;
}

.stars {
  color: #f39c12;
  font-weight: bold;
}

.services {
  margin: 1rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.service-tag {
  background: #ecf0f1;
  color: #2c3e50;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  border: 1px solid #bdc3c7;
}

.store-card p {
  margin: 0.5rem 0;
  color: #555;
}

.delivery-info {
  margin: 1rem 0;
}

.delivery-badge {
  background: #27ae60;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 5px;
  font-size: 0.8rem;
  margin-right: 1rem;
}

.delivery-time {
  color: #e74c3c;
  font-weight: bold;
}

.order-btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.order-btn:hover {
  background: #2980b9;
}

.order-form {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 10px;
  margin-top: 2rem;
}

.order-form h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 600;
}

.form-group select,
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

.submit-btn {
  background: #27ae60;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background 0.3s ease;
}

.submit-btn:hover {
  background: #229954;
}

.message {
  margin-top: 2rem;
  padding: 1rem;
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  border-radius: 5px;
  text-align: center;
}

@media (max-width: 768px) {
  .store-list {
    grid-template-columns: 1fr;
  }

  .store-header h1 {
    font-size: 2rem;
  }
}
</style>
