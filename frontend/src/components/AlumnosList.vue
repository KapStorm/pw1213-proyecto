<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const alumnos = ref([])

onMounted(async () => {
  const res = await axios.get('http://localhost:3000/api/alumnos')
  alumnos.value = res.data
})
</script>

<template>
  <table class='w-full table-auto'>
    <thead>
    <tr>
      <th>N. Control</th>
      <th>Nombre</th>
      <th>Carrera</th>
      <th>Estatus</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for='alumno in alumnos' :key='alumno.id'>
      <td>{{ alumno.ncontrol }}</td>
      <td>{{ alumno.nombre }}</td>
      <td>{{ alumno.carrera }}</td>
      <td>{{ alumno.estatus }}</td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>