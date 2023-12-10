<script setup>

import { onMounted } from 'vue'

const props = defineProps({
  grupos: {
    type: Array,
    required: true
  },
  getGrupos: {
    type: Function,
    required: true
  }
})

const headers = [
  {
    title: 'Clave Grupo',
    value: 'clavegrupo'
  },
  {
    title: 'Clave Materia',
    value: 'clavemateria'
  },
  {
    title: 'Clave Maestro',
    value: 'clavemaestro'
  },
  {
    title: 'Limite Alumnos',
    value: 'limitealumnos'
  },
  {
    title: 'Inscritos',
    value: 'inscritos'
  },
  {
    title: 'Horario Lunes',
    value: 'horariolunes'
  },
  {
    title: 'Horario Martes',
    value: 'horariomartes'
  },
  {
    title: 'Horario Miercoles',
    value: 'horariomiercoles'
  },
  {
    title: 'Horario Jueves',
    value: 'horariojueves'
  },
  {
    title: 'Horario Viernes',
    value: 'horarioviernes'
  },
  {
    title: 'Acciones',
    value: 'action'
  }
]

onMounted(async () => {
  await props.getGrupos()
})
</script>

<template>
  <v-data-table :headers='headers' :items='grupos'>
    <template #[`item.action`]>
      <v-icon icon='mdi-pencil' />
      <v-icon icon='mdi-delete' />
    </template>
  </v-data-table>
</template>

<style scoped>

</style>