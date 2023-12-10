<script setup>

import { onMounted } from 'vue'

const props = defineProps({
  maestros: {
    type: Array,
    required: true
  },
  loadMaestros: {
    type: Function,
    required: true
  }
})

onMounted(async () => {
  await props.loadMaestros()
})

const headers = [
  {
    title: 'Clave Maestro',
    value: 'clavemaestro'
  },
  {
    title: 'Nombre',
    value: 'nombre'
  },
  {
    title: 'Departamento',
    value: 'departamento'
  },
  {
    title: 'Estatus',
    value: 'estatus'
  },
  {
    title: 'Acciones',
    value: 'action'
  }
]
</script>

<template>
  <v-data-table :headers='headers' :items='maestros'>
    <template v-slot:[`item.action`]>
      <v-icon icon='mdi-pencil' />
      <v-icon icon='mdi-delete' />
    </template>
  </v-data-table>
</template>

<style scoped>

</style>