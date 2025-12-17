import { supabase } from './config/supabase.js'
import dotenv from 'dotenv'

dotenv.config()

async function setupConsultationsTable() {
  try {
    console.log('Setting up consultations table...')
    
    // Create consultations table
    const { data, error } = await supabase.rpc('create_consultations_table', {})
    
    if (error) {
      console.error('Error creating table:', error)
      
      // Try alternative approach - check if table exists first
      const { data: tableCheck, error: checkError } = await supabase
        .from('consultations')
        .select('count')
        .limit(1)
      
      if (checkError && checkError.code === '42P01') {
        console.log('Table does not exist. You need to create it manually in Supabase.')
        console.log('Run this SQL in your Supabase SQL Editor:')
        console.log(`
CREATE TABLE consultations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  doctor_id UUID NOT NULL,
  patient_id UUID NOT NULL,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  status VARCHAR(20) DEFAULT 'scheduled',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX idx_consultations_doctor_id ON consultations(doctor_id);
CREATE INDEX idx_consultations_patient_id ON consultations(patient_id);
CREATE INDEX idx_consultations_scheduled_at ON consultations(scheduled_at);
        `)
      } else {
        console.log('✅ Consultations table already exists!')
      }
    } else {
      console.log('✅ Consultations table created successfully!')
    }
    
  } catch (err) {
    console.error('Setup failed:', err)
  }
}

setupConsultationsTable()