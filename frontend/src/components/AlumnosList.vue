<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const alumnos = ref([])
const headers = [
  {
    title: 'N. Control',
    value: 'ncontrol'
  },
  {
    title: 'Nombre',
    value: 'nombre'
  },
  {
    title: 'Carrera',
    value: 'carrera'
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

onMounted(async () => {
  const res = await axios.get('http://localhost:3000/api/alumnos')
  alumnos.value = res.data.map(x => ({
    ...x,
    estatus: x.estatus === 'A' ? 'Activo' : 'Baja'
  }))
})
</script>

<template>
  <v-data-table :headers='headers' :items='alumnos'>
    <template v-slot:item.action='{ item }' >
      <v-icon icon='mdi-pencil' @click='console.log(item.target)' />
      <v-icon icon='mdi-delete' />
    </template>
  </v-data-table>
</template>
