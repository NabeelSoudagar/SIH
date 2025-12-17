import { supabase } from './config/supabase.js'
import dotenv from 'dotenv'

dotenv.config()

async function checkStatusValues() {
  const statuses = ['pending', 'confirmed', 'completed', 'cancelled', 'scheduled']
  
  for (const status of statuses) {
    try {
      const testData = {
        doctor_id: '9c24ec9d-74b3-4efb-853b-ec576cdc7321',
        patient_id: '9c24ec9d-74b3-4efb-853b-ec576cdc7321', 
        scheduled_at: new Date().toISOString(),
        status: status
      }
      
      const { data, error } = await supabase
        .from('consultations')
        .insert(testData)
        .select()
        .single()
      
      if (error) {
        console.log(`❌ Status '${status}' failed:`, error.message)
      } else {
        console.log(`✅ Status '${status}' works`)
        // Clean up - delete the test record
        await supabase.from('consultations').delete().eq('id', data.id)
      }
      
    } catch (err) {
      console.log(`❌ Status '${status}' error:`, err.message)
    }
  }
}

checkStatusValues()