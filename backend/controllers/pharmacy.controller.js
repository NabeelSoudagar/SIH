export const getMedicines = async (req, res) => {
  const medicines = [
    { name: 'Paracetamol 500mg', stock: 120, price: 25, category: 'Pain Relief' },
    { name: 'Amoxicillin 250mg', stock: 50, price: 85, category: 'Antibiotic' },
    { name: 'ORS Pack', stock: 200, price: 15, category: 'Rehydration' },
    { name: 'Crocin Advance', stock: 80, price: 30, category: 'Pain Relief' },
    { name: 'Azithromycin 500mg', stock: 35, price: 120, category: 'Antibiotic' },
    { name: 'Cetirizine 10mg', stock: 90, price: 40, category: 'Allergy' },
    { name: 'Omeprazole 20mg', stock: 60, price: 55, category: 'Acidity' },
    { name: 'Vitamin D3 Tablets', stock: 75, price: 180, category: 'Vitamin' },
    { name: 'Insulin Pen', stock: 25, price: 450, category: 'Diabetes' },
    { name: 'Blood Pressure Monitor', stock: 15, price: 1200, category: 'Medical Device' },
    { name: 'Thermometer Digital', stock: 40, price: 250, category: 'Medical Device' },
    { name: 'Hand Sanitizer 500ml', stock: 150, price: 80, category: 'Hygiene' }
  ];
  res.json(medicines);
}

export const getStores = async (req, res) => {
  const stores = [
    { 
      id: 1, 
      name: 'Punjab Medical Store', 
      location: 'Mall Road, Amritsar, Punjab', 
      phone: '9876543210', 
      hours: '9 AM - 9 PM', 
      deliveryTime: '2-4 hours',
      rating: 4.5,
      services: ['Home Delivery', '24/7 Emergency', 'Online Consultation']
    },
    { 
      id: 2, 
      name: 'Chandigarh Pharma Plus', 
      location: 'Sector 17, Chandigarh, Punjab', 
      phone: '9876543211', 
      hours: '8 AM - 10 PM', 
      deliveryTime: '1-3 hours',
      rating: 4.7,
      services: ['Express Delivery', 'Prescription Upload', 'Health Checkup']
    },
    { 
      id: 3, 
      name: 'Ludhiana Health Hub', 
      location: 'Civil Lines, Ludhiana, Punjab', 
      phone: '9876543212', 
      hours: '9 AM - 8 PM', 
      deliveryTime: '3-5 hours',
      rating: 4.3,
      services: ['Home Delivery', 'Medicine Reminder', 'Health Tips']
    },
    { 
      id: 4, 
      name: 'Jalandhar Care Pharmacy', 
      location: 'Model Town, Jalandhar, Punjab', 
      phone: '9876543213', 
      hours: '8 AM - 9 PM', 
      deliveryTime: '2-4 hours',
      rating: 4.6,
      services: ['Same Day Delivery', 'Senior Citizen Discount', 'Insurance Claims']
    },
    { 
      id: 5, 
      name: 'Patiala Medical Center', 
      location: 'Adalat Bazaar, Patiala, Punjab', 
      phone: '9876543214', 
      hours: '9 AM - 10 PM', 
      deliveryTime: '1-2 hours',
      rating: 4.8,
      services: ['Ultra Fast Delivery', 'Doctor Consultation', 'Lab Tests']
    }
  ];
  res.json(stores);
}

export const placeOrder = async (req, res) => {
  const { storeId, medicines, address, doctorNote } = req.body;
  
  // Generate random order ID
  const orderId = 'ORD' + Math.random().toString(36).substr(2, 9).toUpperCase();
  
  // Simulate order placement with more details
  const orderDetails = {
    orderId: orderId,
    storeId: storeId,
    medicines: medicines,
    address: address,
    doctorNote: doctorNote || 'None',
    estimatedDelivery: '2-4 hours',
    totalAmount: medicines.length * 50, // Demo calculation
    status: 'Confirmed',
    trackingNumber: 'TRK' + Math.random().toString(36).substr(2, 8).toUpperCase()
  };
  
  res.json({ 
    message: `Order placed successfully! Order ID: ${orderId}`, 
    orderDetails: orderDetails
  });
}
