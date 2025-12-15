import { supabase } from './config/supabase.js'
import dotenv from 'dotenv'

dotenv.config()

async function checkDatabase() {
  try {
    console.log('Testing Supabase connection...')
    
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1)

    if (error) {
      console.error('Database connection failed:', error)
    } else {
      console.log('✅ Database connection successful!')
    }
  } catch (err) {
    console.error('Connection test failed:', err)
  }
}

checkDatabase()