<template>
  <nav class="navbar">
    <div class="nav-container">
      <h1 class="logo">WellnessApp</h1>
      <ul class="nav-links">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/breathing">Breathing</router-link></li>
        <li><router-link to="/wellness">Wellness</router-link></li>
        <li><router-link to="/ai-support">AI Support</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background: linear-gradient(90deg, #2563eb, #1e40af);
  padding: 0.8rem 2rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  color: #fff;
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 1px;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
}

.nav-links a {
  color: #f9fafb;
  font-weight: 600;
  text-decoration: none;
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  transition: background 0.2s, transform 0.2s;
}

.nav-links a:hover {
  background: rgba(255,255,255,0.2);
  transform: scale(1.05);
}
</style>
