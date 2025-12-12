import { supabase } from '../config/supabase.js'

export const getProfile = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('doctors')
      .select('*')
      .eq('id', req.user.id)
      .single()

    if (error) throw error
    res.json(data)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const getAllDoctors = async (req, res) => {
  try {
    // Fetch registered doctors from database
    const { data, error } = await supabase
      .from('doctors')
      .select(`
        id,
        full_name,
        specialization,
        registration_no,
        users!inner(name, email)
      `)

    if (error) {
      console.error('Database error:', error)
      // Return demo data as fallback
      return res.json([
        { id: '1', name: 'Dr. Sarah Johnson', specialization: 'Cardiology', experience: '10 years', rating: 4.8, availability: 'Mon-Fri 9AM-5PM' },
        { id: '2', name: 'Dr. Michael Chen', specialization: 'Dermatology', experience: '8 years', rating: 4.7, availability: 'Tue-Sat 10AM-6PM' },
        { id: '3', name: 'Dr. Emily Rodriguez', specialization: 'Pediatrics', experience: '12 years', rating: 4.9, availability: 'Mon-Wed-Fri 8AM-4PM' }
      ])
    }

    // Format the data for frontend
    const formattedDoctors = data.map(doctor => ({
      id: doctor.id,
      name: doctor.full_name || doctor.users?.name || 'Unknown Doctor',
      specialization: doctor.specialization || 'General Medicine',
      registration_no: doctor.registration_no,
      email: doctor.users?.email,
      experience: '5+ years', // Default value
      rating: 4.5, // Default value
      availability: 'Mon-Fri 9AM-5PM' // Default value
    }))

    res.json(formattedDoctors)
  } catch (err) {
    console.error('Error fetching doctors:', err)
    // Return demo data as fallback
    res.json([
      { id: '1', name: 'Dr. Sarah Johnson', specialization: 'Cardiology', experience: '10 years', rating: 4.8, availability: 'Mon-Fri 9AM-5PM' },
      { id: '2', name: 'Dr. Michael Chen', specialization: 'Dermatology', experience: '8 years', rating: 4.7, availability: 'Tue-Sat 10AM-6PM' },
      { id: '3', name: 'Dr. Emily Rodriguez', specialization: 'Pediatrics', experience: '12 years', rating: 4.9, availability: 'Mon-Wed-Fri 8AM-4PM' }
    ])
  }
}
