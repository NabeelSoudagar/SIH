import { supabase } from '../config/supabase.js';

const bookConsultation = async (req, res) => {
  try {
    const { doctor_id, patient_id, scheduledAt } = req.body;
    console.log('Booking consultation:', { doctor_id, patient_id, scheduledAt });

    // Generate unique room ID for the consultation
    const roomId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    const { data, error } = await supabase
      .from('consultations')
      .insert({
        patient_id,
        doctor_id,
        scheduled_at: scheduledAt,
        status: 'pending'
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(400).json({ error: error.message });
    }

    return res.json({
      message: 'Consultation booked successfully',
      consultation: data
    });
  } catch (error) {
    console.error('Book consultation error:', error);
    return res.status(500).json({ error: 'Failed to book consultation' });
  }
};

const getConsultations = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('consultations')
      .select('*');

    if (error) {
      console.error('Supabase error:', error);
      return res.status(400).json({ error: error.message });
    }

    return res.json({
      message: 'Consultations fetched successfully',
      data: data
    });
  } catch (error) {
    console.error('Get consultations error:', error);
    return res.status(500).json({ error: 'Failed to fetch consultations' });
  }
};

const getPatientConsultations = async (req, res) => {
  try {
    // Get consultations with doctor information
    const { data: consultations, error } = await supabase
      .from('consultations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return res.json([]);
    }

    // Get doctor names for each consultation
    const consultationsWithDoctors = await Promise.all(
      consultations.map(async (consultation) => {
        // First try to get from doctors table
        const { data: doctor } = await supabase
          .from('doctors')
          .select('full_name')
          .eq('id', consultation.doctor_id)
          .single();

        // If not found in doctors table, try demo doctors
        let doctorName = doctor?.full_name;
        if (!doctorName) {
          const demoDoctor = {
            '1': 'Dr. Sarah Johnson',
            '2': 'Dr. Michael Chen', 
            '3': 'Dr. Emily Rodriguez',
            '4': 'Dr. James Wilson',
            '5': 'Dr. Lisa Thompson'
          }[consultation.doctor_id];
          doctorName = demoDoctor || 'Unknown Doctor';
        }

        return {
          id: consultation.id,
          scheduledAt: consultation.scheduled_at,
          status: consultation.status,
          doctor: { name: doctorName }
        };
      })
    );

    return res.json(consultationsWithDoctors);
  } catch (error) {
    console.error('Get patient consultations error:', error);
    return res.json([]);
  }
};

const getDoctorConsultations = async (req, res) => {
  try {
    // Get consultations with patient information
    const { data: consultations, error } = await supabase
      .from('consultations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return res.json([]);
    }

    // Get patient names for each consultation
    const consultationsWithPatients = await Promise.all(
      consultations.map(async (consultation) => {
        // Try to get from patients table
        const { data: patient } = await supabase
          .from('patients')
          .select('full_name')
          .eq('id', consultation.patient_id)
          .single();

        const patientName = patient?.full_name || 'Unknown Patient';

        return {
          id: consultation.id,
          scheduledAt: consultation.scheduled_at,
          status: consultation.status,
          patient: { name: patientName }
        };
      })
    );

    return res.json(consultationsWithPatients);
  } catch (error) {
    console.error('Get doctor consultations error:', error);
    return res.json([]);
  }
};

const consultationController = {
  bookConsultation,
  getConsultations,
  getPatientConsultations,
  getDoctorConsultations,
};

export default consultationController;
