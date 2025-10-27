// Later you can connect this to a pharmacy table
export const getMedicines = async (req, res) => {
  res.json([
    { name: 'Paracetamol', stock: 120 },
    { name: 'Amoxicillin', stock: 50 },
    { name: 'ORS Pack', stock: 200 }
  ])
}

export const getStores = async (req, res) => {
  const stores = [
    { id: 1, name: 'Punjab Medical Store', location: 'Amritsar, Punjab', phone: '9876543210', hours: '9 AM - 9 PM', deliveryTime: '2-4 hours' },
    { id: 2, name: 'Chandigarh Pharma', location: 'Chandigarh, Punjab', phone: '9876543211', hours: '8 AM - 10 PM', deliveryTime: '1-3 hours' },
    { id: 3, name: 'Ludhiana Health Hub', location: 'Ludhiana, Punjab', phone: '9876543212', hours: '9 AM - 8 PM', deliveryTime: '3-5 hours' }
  ];
  res.json(stores);
}

export const placeOrder = async (req, res) => {
  const { storeId, medicines, address, doctorNote } = req.body;
  // Simulate order placement
  res.json({ message: `Order placed successfully for store ID ${storeId}. Delivery to ${address}. Medicines: ${medicines.join(', ')}. Doctor Note: ${doctorNote || 'None'}` });
}
