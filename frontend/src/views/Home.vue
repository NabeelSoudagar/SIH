<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Accessible Healthcare for Nabha & Rural Punjab</h1>
        <p>
          Connect with doctors instantly, check medicine availability, and
          access your health records — anytime, anywhere.
        </p>
        <div class="hero-buttons">
          <RouterLink class="btn patient" to="/login">Login as Patient</RouterLink>
          <RouterLink class="btn doctor" to="/login">Login as Doctor</RouterLink>
        </div>
      </div>
      <div class="hero-image">
        <img src="../assets/telemedicine.jpg" alt="Telemedicine Illustration" />
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <h2>Our Key Features</h2>
      <div class="feature-grid">
        <div class="feature-card">
          <img src="../assets/video-call.png" alt="Video Consultations" />
          <h3>Video Consultations</h3>
          <p>Consult with doctors remotely in your preferred language.</p>
        </div>

        <div class="feature-card">
          <img src="../assets/records.webp" alt="Digital Health Records" />
          <h3>Digital Health Records</h3>
          <p>Offline access to your medical history for rural patients.</p>
        </div>

        <div class="feature-card">
          <img src="../assets/pharmacy.png" alt="Medicine Availability" />
          <h3>Medicine Updates</h3>
          <p>Get real-time updates on stock at local pharmacies.</p>
        </div>

        <div class="feature-card">
          <img src="../assets/ai-checker.png" alt="AI Symptom Checker" />
          <h3>AI Symptom Checker</h3>
          <p>Lightweight tool optimized for low-bandwidth rural areas.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
/* General */
.home {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

/* Hero Section */
.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(to right, #2c3e50, #3498db);
  color: white;
  padding: 4rem 2rem;
  flex-wrap: wrap;
}
.hero-content {
  max-width: 500px;
}
.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}
.hero p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}
.hero-buttons {
  display: flex;
  gap: 1rem;
}
.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: bold;
}
.patient {
  background: #27ae60;
  color: white;
}
.doctor {
  background: #e67e22;
  color: white;
}
.hero-image img {
  max-width: 400px;
  border-radius: 15px;
  margin-top: 1rem;
}

/* Features Section */
.features {
  padding: 3rem 2rem;
  text-align: center;
}
.features h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
}
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
}
.feature-card {
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}
.feature-card:hover {
  transform: translateY(-5px);
}
.feature-card img {
  width: 60px;
  margin-bottom: 1rem;
}
.feature-card h3 {
  margin-bottom: 0.5rem;
}
</style>
