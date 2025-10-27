<template>
  <nav class="navbar">
    <ul>
      <li><RouterLink to="/">{{ $t("Home") }}</RouterLink></li>
      <li><RouterLink to="/Signup">{{ $t("Signup") }}</RouterLink></li>
      <li><RouterLink to="/login">{{ $t("Login") }}</RouterLink></li>
      <li><RouterLink to="/VideoCall">{{ $t("LiveCall") }}</RouterLink></li>
      <li><RouterLink to="/patient">{{ $t("PatientDashboard") }}</RouterLink></li>
      <li><RouterLink to="/doctor">{{ $t("DoctorDashboard") }}</RouterLink></li>
      <li><RouterLink to="/medical-store">{{ $t("MedicalStore") }}</RouterLink></li>

      <!-- Language Buttons -->
      <li class="lang-buttons">
        <button @click="setLanguage('en')">EN</button>
        <button @click="setLanguage('pa')">ਪੰਜਾਬੀ</button>
        <button @click="setLanguage('hi')">हिन्दी</button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { RouterLink } from "vue-router"
import { useI18n } from "vue-i18n"

const { locale } = useI18n()

function setLanguage(lang) {
  locale.value = lang
}
</script>

<style scoped>
.navbar {
  background: #2c3e50;
  padding: 1rem;
}

ul {
  display: flex;
  list-style: none;
  gap: 1rem;
  align-items: center;
}

a {
  color: white;
  text-decoration: none;
}

a.router-link-active {
  font-weight: bold;
  border-bottom: 2px solid white;
}

/* Language buttons */
.lang-buttons button {
  margin-left: 8px;
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  background: white;
  color: #2c3e50;
  cursor: pointer;
  font-weight: bold;
}

.lang-buttons button:hover {
  background: #1abc9c;
  color: white;
}
</style>
