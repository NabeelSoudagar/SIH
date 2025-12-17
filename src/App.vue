<template>
  <div class="flex flex-col min-h-screen">
    <NavBar />
    <main class="flex-grow">
      <router-view />
      <Footer>
        </Footer>
    </main>
    
    
  </div>
</template>


<script setup>
import NavBar from './components/Navbar.vue'
import { RouterView } from 'vue-router';
import Footer from './components/Footer.vue'
</script>
