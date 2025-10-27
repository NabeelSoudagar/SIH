import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import PatientDashboard from '../views/PatientDashboard.vue'
import DoctorDashboard from '../views/DoctorDashboard.vue'
import Signup from '../views/Signup.vue'
import VideoCall from '../views/VideoCall.vue'
import MedicalStore from '../views/MedicalStore.vue'




const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/patient', component: PatientDashboard },
  { path: '/doctor', component: DoctorDashboard },
  {path: '/VideoCall', component:VideoCall},
  { path: '/medical-store', component: MedicalStore }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
