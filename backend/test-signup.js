async function testSignup() {
  try {
    const response = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: "test@example.com",
        password: "password123",
        role: "patient",
        profile: {
          name: "Test User",
          age: 25,
          village: "Test Village"
        }
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Signup successful:", data);
    } else {
      const errorData = await response.json();
      console.error("Signup failed:", errorData);
    }
  } catch (error) {
    console.error("Signup failed:", error.message);
  }
}

testSignup();
