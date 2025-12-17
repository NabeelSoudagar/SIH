import { supabase } from './config/supabase.js'
import dotenv from 'dotenv'

dotenv.config()

async function testConsultation() {
  try {
    // Test inserting a consultation
    const testData = {
      doctor_id: '9c24ec9d-74b3-4efb-853b-ec576cdc7321',
      patient_id: '9c24ec9d-74b3-4efb-853b-ec576cdc7321', 
      scheduled_at: new Date().toISOString(),
      status: 'scheduled'
    }
    
    console.log('Testing consultation insert with:', testData)
    
    const { data, error } = await supabase
      .from('consultations')
      .insert(testData)
      .select()
      .single()
    
    if (error) {
      console.error('Insert error:', error)
    } else {
      console.log('Success:', data)
    }
    
  } catch (err) {
    console.error('Test failed:', err)
  }
}

testConsultation()