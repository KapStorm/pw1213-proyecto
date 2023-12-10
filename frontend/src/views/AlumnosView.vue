<script setup>

import AlumnosList from '@/components/alumnos/AlumnosList.vue'
import axios from 'axios'
import { ref } from 'vue'
import AlumnosForm from '@/components/alumnos/AlumnosForm.vue'

const alumnos = ref([])

async function loadAlumnos() {
  const res = await axios.get('http://localhost:3000/api/alumnos')
  alumnos.value = res.data.map(x => ({
    ...x,
    estatus: x.estatus === 'A' ? 'Activo' : 'Baja'
  }))
}
</script>

<template>
  <AlumnosForm on-submit='loadAlumnos' />
  <AlumnosList :alumnos='alumnos' :load-alumnos='loadAlumnos' />
</template>

<style scoped>

</style>