

import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import PatientDashboard from '../views/PatientDashboard.vue'
import DoctorDashboard from '../views/DoctorDashboard.vue'
import Signup from '../views/Signup.vue'
import VideoCall from '../views/VideoCall.vue'
import MedicalStore from '../views/MedicalStore.vue'
import BookConsultation from '../views/BookConsultation.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/patient-dashboard',
    name: 'PatientDashboard',
    component: PatientDashboard,
    meta: { requiresAuth: true, role: 'patient' }
  },
  {
    path: '/doctor-dashboard',
    name: 'DoctorDashboard',
    component: DoctorDashboard,
    meta: { requiresAuth: true, role: 'doctor' }
  },
  {
    path: '/video-call',
    name: 'VideoCall',
    component: VideoCall,
    meta: { requiresAuth: true }
  },
  {
    path: '/medical-store',
    name: 'MedicalStore',
    component: MedicalStore
  },
  {
    path: '/book-consultation',
    name: 'BookConsultation',
    component: BookConsultation,
    meta: { requiresAuth: true, role: 'patient' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard for authentication
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = !!authStore.token
  const userRole = authStore.user?.role

  // Allow navigation to public routes
  if (!to.meta.requiresAuth) {
    next()
    return
  }

  // Check authentication for protected routes
  if (!isAuthenticated) {
    next('/login')
    return
  }

  // Check role-based access
  if (to.meta.role && userRole !== to.meta.role) {
    // Redirect to appropriate dashboard based on role
    if (userRole === 'patient') {
      next('/patient-dashboard')
    } else if (userRole === 'doctor') {
      next('/doctor-dashboard')
    } else {
      next('/')
    }
    return
  }

  next()
})

export default router
