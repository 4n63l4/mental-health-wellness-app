<template>
  <div id="app">
    <Navbar />
    <router-view /> <!-- 👈 This is where pages render -->
    <Footer />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>
