<script setup>
import { onMounted, ref } from 'vue'
import AlumnosEditDialog from '@/components/AlumnosEditDialog.vue'
import AlumnosDeleteDialog from '@/components/AlumnosDeleteDialog.vue'

const props = defineProps({
  alumnos: {
    type: Array,
    required: true
  },
  loadAlumnos: {
    type: Function,
    required: true
  }
})

const selectedAlumno = ref({})
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
const carreras = ['Sistemas', 'Industrial', 'Gestion']
const estatuss = ['Activo', 'Baja']
const editDialog = ref(false)
const deleteDialog = ref(false)
const snackbarMessage = ref({
  text: '',
  type: 'error'
})
const snackbar = ref(false)

onMounted(async () => {
  await props.loadAlumnos()
})

function editAlumno(alumno) {
  selectedAlumno.value = { ...alumno }
  editDialog.value = true
}

function deleteAlumno(alumno) {
  selectedAlumno.value = { ...alumno }
  deleteDialog.value = true
}

async function handleSubmitEdit() {
  editDialog.value = false
  snackbarMessage.value = {
    text: `Alumno ${selectedAlumno.value.nombre} editado correctamente`,
    type: 'success'
  }
  snackbar.value = true
  await props.loadAlumnos()
}

async function handleSubmitDelete() {
  await handleSubmitDeleteClose()
  snackbarMessage.value = {
    text: `Alumno ${selectedAlumno.value.nombre} eliminado correctamente`,
    type: 'success'
  }
  snackbar.value = true
}

async function handleSubmitDeleteClose() {
  deleteDialog.value = false
  await props.loadAlumnos()
}
</script>

<template>
  <v-data-table :headers='headers' :items='alumnos'>
    <template v-slot:top>
      <v-dialog v-model='editDialog'>
        <AlumnosEditDialog :alumno='selectedAlumno' @on-submit-alumno-edit='handleSubmitEdit' />
      </v-dialog>
      <v-dialog v-model='deleteDialog'>
        <AlumnosDeleteDialog :alumno='selectedAlumno' @onSubmitAlumnoDelete='handleSubmitDelete'
                             @onSubmitAlumnoDeleteClose='handleSubmitDeleteClose' />
      </v-dialog>
    </template>
    <template v-slot:item.action='{ item }'>
      <v-icon icon='mdi-pencil' @click='editAlumno(item)' />
      <v-icon icon='mdi-delete' @click='deleteAlumno(item)' />
    </template>
  </v-data-table>
  <v-snackbar v-model='snackbar' :color='snackbarMessage.type'>
    {{ snackbarMessage.text }}
  </v-snackbar>
</template>
