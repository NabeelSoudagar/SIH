import { supabase } from './config/supabase.js'
import dotenv from 'dotenv'

dotenv.config()

async function testValidConsultation() {
  try {
    const testData = {
      doctor_id: '43917ca2-3cc6-4227-8a9e-a73ea57b7985', // Valid doctor ID
      patient_id: '9c24ec9d-74b3-4efb-853b-ec576cdc7321', // Valid patient ID
      scheduled_at: new Date().toISOString()
      // Don't set status, let it use default
    }
    
    console.log('Testing with valid IDs:', testData)
    
    const { data, error } = await supabase
      .from('consultations')
      .insert(testData)
      .select()
      .single()
    
    if (error) {
      console.error('Insert error:', error)
    } else {
      console.log('✅ Success:', data)
      // Clean up
      await supabase.from('consultations').delete().eq('id', data.id)
    }
    
  } catch (err) {
    console.error('Test failed:', err)
  }
}

testValidConsultation()