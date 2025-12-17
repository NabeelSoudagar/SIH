import { supabase } from './config/supabase.js'
import dotenv from 'dotenv'

dotenv.config()

async function checkDoctors() {
  try {
    // Check what users exist with doctor role
    const { data: doctors, error } = await supabase
      .from('users')
      .select('id, name, email, role')
      .eq('role', 'doctor')
    
    if (error) {
      console.error('Error fetching doctors:', error)
    } else {
      console.log('Available doctors:', doctors)
    }
    
    // Check what users exist with patient role  
    const { data: patients, error: patientError } = await supabase
      .from('users')
      .select('id, name, email, role')
      .eq('role', 'patient')
    
    if (patientError) {
      console.error('Error fetching patients:', patientError)
    } else {
      console.log('Available patients:', patients)
    }
    
  } catch (err) {
    console.error('Check failed:', err)
  }
}

checkDoctors()