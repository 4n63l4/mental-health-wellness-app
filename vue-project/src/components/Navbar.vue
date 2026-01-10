<template>
  <nav class="navbar">
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/breathing">Breathing</router-link></li>
      <li><router-link to="/wellness">Wellness</router-link></li>
      <li><router-link to="/ai-support">AI Support</router-link></li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  background: #2563eb;
  padding: 1rem;
}
ul {
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;
}
a {
  color: white;
  font-weight: 600;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
