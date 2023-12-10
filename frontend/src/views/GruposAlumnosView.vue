<script setup>
import { ref } from 'vue'
import GruposAlumnosList from '@/components/gruposalumnos/GruposAlumnosList.vue'

const gruposAlumnos = ref([])

const getGruposAlumnos = async () => {
  const response = await fetch('http://localhost:3000/api/alumnos-grupos')
  gruposAlumnos.value = await response.json()
}
</script>

<template>
  <GruposAlumnosList :gruposAlumnos='gruposAlumnos' :getGrupos='getGruposAlumnos' />
</template>
