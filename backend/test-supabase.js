import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

console.log('SUPABASE_URL:', process.env.SUPABASE_URL)
console.log('SUPABASE_SERVICE_ROLE_KEY exists:', !!process.env.SUPABASE_SERVICE_ROLE_KEY)
console.log('SUPABASE_SERVICE_ROLE_KEY length:', process.env.SUPABASE_SERVICE_ROLE_KEY?.length)

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function testConnection() {
  try {
    const { data, error } = await supabase.from('patients').select('*').limit(1)
    if (error) {
      console.error('Supabase error:', error)
    } else {
      console.log('Supabase connection successful!')
      console.log('Data:', data)
    }
  } catch (err) {
    console.error('Connection test failed:', err)
  }
}

testConnection()
