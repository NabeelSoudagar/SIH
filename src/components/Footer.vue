<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- About -->
      <div class="footer-section">
        <h2 class="footer-title">About Us</h2>
        <p>
          Our telemedicine platform connects patients with doctors remotely,
          offering easy consultations and secure health records for rural
          communities.
        </p>
      </div>

      <!-- Quick Links -->
      <div class="footer-section">
        <h2 class="footer-title">Quick Links</h2>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/signup">Sign Up</a></li>
          <li><a href="/videocall">Video Call</a></li>
        </ul>
      </div>

      <!-- Contact -->
      <div class="footer-section">
        <h2 class="footer-title">Contact Us</h2>
        <p>Email: support@telemed.com</p>
        <p>Phone: +91 98765 43210</p>
      </div>
    </div>

    <div class="footer-bottom">
      <p>© 2025 TeleMed. All Rights Reserved.</p>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.footer {
  background: linear-gradient(to right, #1e3a8a, #1e40af, #1e3a8a);
  color: white;
  padding: 40px 20px 20px 20px;
  margin-top: 40px;
}

.footer-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  margin: auto;
}

.footer-section {
  flex: 1 1 250px;
  margin: 10px;
}

.footer-title {
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: bold;
}

.footer-section p {
  font-size: 14px;
  line-height: 1.6;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin: 6px 0;
}

.footer-section ul li a {
  color: #ffffff;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-section ul li a:hover {
  color: #a5f3fc;
}

.footer-bottom {
  text-align: center;
  margin-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 10px;
  font-size: 14px;
}
</style>
