<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <h2 class="auth-title">Welcome Back</h2>
        <p class="auth-subtitle">Sign in to your healthcare account</p>
      </div>

      <form @submit.prevent="handleLogin" class="auth-form">
        <div class="form-group">
          <label for="email" class="form-label">
            <i class="fas fa-envelope form-icon"></i>
            Email
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="form-input"
            placeholder="Enter your Email"
          />
        </div>

        <div class="form-group">
          <label for="password" class="form-label">
            <i class="fas fa-lock form-icon"></i>
            Password
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="form-input"
            placeholder="Enter your Password"
          />
        </div>

        <div class="form-group">
          <label for="role" class="form-label">
            <i class="fas fa-user-md form-icon"></i>
            Account Type
          </label>
          <select id="role" v-model="role" required class="form-select">
            <option value="patient">👥 Patient</option>
            <option value="doctor">👨‍⚕️ Doctor</option>
          </select>
        </div>

        <button type="submit" class="auth-button" :disabled="!email || !password">
          <i class="fas fa-sign-in-alt"></i>
          Sign In
        </button>
      </form>

      <div v-if="message" class="auth-message" :class="{ 'error': message.includes('failed'), 'success': message.includes('successful') }">
        <i :class="message.includes('failed') ? 'fas fa-exclamation-circle' : 'fas fa-check-circle'"></i>
        {{ message }}
      </div>

      <div class="auth-footer">
        <p>Don't have an account?
          <router-link to="/signup" class="auth-link">Create one here</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";
import axios from "axios";

const router = useRouter();
const authStore = useAuthStore();
const email = ref("");
const password = ref("");
const role = ref("patient");
const message = ref("");

const handleLogin = async () => {
  try {
    await authStore.login({
      email: email.value,
      password: password.value,
      role: role.value
    });
    
    message.value = "Login successful ✅";
    
    // Redirect to home page after successful login
    setTimeout(() => {
      router.push('/');
    }, 1000);
    
  } catch (err) {
    console.error('Login error:', err);
    message.value = err.response?.data?.error || "Login failed ❌";
  }
};
</script>

<style scoped>
/* Modern Authentication Styling */
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.auth-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.auth-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.auth-title {
  color: #2c3e50;
  font-size: 2.2rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  background: linear-gradient(135deg, #2c3e50, #3498db);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.auth-subtitle {
  color: #7f8c8d;
  font-size: 1rem;
  margin: 0;
  font-weight: 400;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  position: relative;
}

.form-label {
  display: flex;
  align-items: center;
  color: #2c3e50;
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
  gap: 0.5rem;
}

.form-icon {
  color: #3498db;
  font-size: 1rem;
  width: 16px;
}

.form-input,
.form-select {
  width: 100%;
  padding: 1rem 1.2rem;
  border: 2px solid #e1e8ed;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  color: #2c3e50;
  box-sizing: border-box;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  background: #ffffff;
}

.form-input::placeholder {
  color: #95a5a6;
}

.form-select {
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 1rem center;
  background-repeat: no-repeat;
  background-size: 1rem;
  padding-right: 3rem;
}

.auth-button {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
}

.auth-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(52, 152, 219, 0.4);
  background: linear-gradient(135deg, #2980b9, #3498db);
}

.auth-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.auth-button i {
  font-size: 1rem;
}

.auth-message {
  padding: 1rem;
  border-radius: 10px;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

.auth-message.success {
  background: rgba(46, 204, 113, 0.1);
  color: #27ae60;
  border: 1px solid rgba(46, 204, 113, 0.3);
}

.auth-message.error {
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
  border: 1px solid rgba(231, 76, 60, 0.3);
}

.auth-footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e1e8ed;
}

.auth-footer p {
  color: #7f8c8d;
  margin: 0;
  font-size: 0.95rem;
}

.auth-link {
  color: #3498db;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.auth-link:hover {
  color: #2980b9;
  text-decoration: underline;
}

/* Responsive Design */
@media (max-width: 480px) {
  .auth-container {
    padding: 1rem;
  }

  .auth-card {
    padding: 2rem 1.5rem;
    border-radius: 15px;
  }

  .auth-title {
    font-size: 1.8rem;
  }

  .form-input,
  .form-select {
    padding: 0.875rem 1rem;
  }

  .auth-button {
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .auth-card {
    background: rgba(45, 52, 64, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .auth-title {
    color: #ecf0f1;
  }

  .auth-subtitle {
    color: #bdc3c7;
  }

  .form-label {
    color: #ecf0f1;
  }

  .form-input,
  .form-select {
    background: rgba(52, 73, 94, 0.8);
    border-color: #34495e;
    color: #ecf0f1;
  }

  .form-input:focus,
  .form-select:focus {
    border-color: #3498db;
    background: #34495e;
  }

  .auth-footer {
    border-top-color: #34495e;
  }

  .auth-footer p {
    color: #bdc3c7;
  }
}
</style>
