<script setup></script>

<template>
  <div id="app">
    <header>
      <h1>Mini-SITEC</h1>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/alumnos">Alumnos</router-link>
      </nav>
    </header>

    <router-view />
  </div>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: black solid 1px;
}

a {
  text-decoration: none;
  color: #000;
  font-weight: bold;
  margin: 8px;
  padding: 8px;
}

a:hover {
  background-color: #000;
  color: #fff;
  transition: all 0.3s ease-in-out;
  border-radius: 4px;
}
</style>
