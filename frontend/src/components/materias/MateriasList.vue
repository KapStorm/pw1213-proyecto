<script setup>
import { onMounted } from 'vue'

const props = defineProps({
  materias: {
    type: Array,
    required: true
  },
  loadMaterias: {
    type: Function,
    required: true
  }
})

onMounted(async () => {
  await props.loadMaterias()
})

const headers = [
  {
    title: 'Clave Materia',
    value: 'clavemateria'
  },
  {
    title: 'Nombre',
    value: 'nombre'
  },
  {
    title: 'Creditos',
    value: 'creditos'
  },
  {
    title: 'Acciones',
    value: 'action'
  }
]
</script>

<template>
  <v-data-table :headers='headers' :items='materias'>
    <template v-slot:[`item.action`]>
      <v-icon icon='mdi-pencil' />
      <v-icon icon='mdi-delete' />
    </template>
  </v-data-table>
</template>
