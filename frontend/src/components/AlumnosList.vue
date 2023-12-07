<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import AlumnosEditDialog from '@/components/AlumnosEditDialog.vue'

const selectedAlumno = ref({})
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
const dialog = ref(false)

onMounted(async () => {
  await loadAlumnos()
})

async function loadAlumnos () {
  const res = await axios.get('http://localhost:3000/api/alumnos')
  alumnos.value = res.data.map(x => ({
    ...x,
    estatus: x.estatus === 'A' ? 'Activo' : 'Baja'
  }))
}

function editAlumno (alumno) {
  selectedAlumno.value = alumno
  dialog.value = true
}
</script>

<template>
  <v-data-table :headers='headers' :items='alumnos'>
    <template v-slot:top>
      <v-dialog v-model='dialog'>
        <AlumnosEditDialog :alumno='selectedAlumno' />
      </v-dialog>
    </template>
    <template v-slot:item.action='{ item }' >
      <v-icon icon='mdi-pencil' @click='editAlumno(item)' />
      <v-icon icon='mdi-delete' />
    </template>
  </v-data-table>
</template>
