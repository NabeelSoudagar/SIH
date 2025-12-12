import { supabase } from './config/supabase.js'
import dotenv from 'dotenv'

dotenv.config()

async function testAuth() {
  try {
    // Check if users table exists and has data
    const { data: users, error: userError } = await supabase
      .from('users')
      .select('*')
      .limit(5)

    if (userError) {
      console.error('Error fetching users:', userError)
    } else {
      console.log('Users in database:', users)
    }

    // Test creating a user
    console.log('\nTesting user creation...')
    const testUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'testpass123',
      role: 'patient'
    }

    const { data: newUser, error: createError } = await supabase
      .from('users')
      .insert(testUser)
      .select()
      .single()

    if (createError) {
      console.error('Error creating user:', createError)
    } else {
      console.log('User created successfully:', newUser)
      
      // Clean up - delete the test user
      await supabase
        .from('users')
        .delete()
        .eq('id', newUser.id)
      console.log('Test user cleaned up')
    }

  } catch (err) {
    console.error('Test failed:', err)
  }
}

testAuth()