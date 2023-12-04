<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class='flex justify-between p-5 border-b-2'>
    <h1>Mini-SITEC</h1>
    <nav class='[&>a]:m-5 [&>a]:p-2 [&>a]:rounded [&>a]:transition-all'>
      <RouterLink class='hover:bg-black hover:text-white' to='/'>Home</RouterLink>
      <RouterLink class='hover:bg-black hover:text-white' to='/alumnos'>Alumnos</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>
