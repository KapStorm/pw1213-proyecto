<script setup>
import { ref } from 'vue'
import GruposAlumnosList from '@/components/gruposalumnos/GruposAlumnosList.vue'
import GruposAlumnosForm from '@/components/gruposalumnos/GruposAlumnosForm.vue'

const gruposAlumnos = ref([])

const getGruposAlumnos = async () => {
  const response = await fetch('http://localhost:3000/api/alumnos-grupos')
  gruposAlumnos.value = await response.json()
}
</script>

<template>
  <GruposAlumnosForm :on-submitted='getGruposAlumnos' :grupos-alumnos='gruposAlumnos' />
  <GruposAlumnosList :gruposAlumnos='gruposAlumnos' :getGruposAlumnos='getGruposAlumnos' />
</template>
