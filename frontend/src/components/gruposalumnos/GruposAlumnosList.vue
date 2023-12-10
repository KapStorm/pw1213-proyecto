<script setup>
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'
import GruposAlumnosDeleteDialog from '@/components/gruposalumnos/GruposAlumnosDeleteDialog.vue'

const props = defineProps({
  gruposAlumnos: {
    type: Array,
    required: true
  },
  getGruposAlumnos: {
    type: Function,
    required: true
  }
})

const headers = [
  {
    title: 'Numero de Control',
    value: 'ncontrol'
  },
  {
    title: 'Nombre',
    value: 'nombre'
  },
  {
    title: 'Acciones',
    value: 'action'
  }
]

onMounted(async () => {
  await props.getGruposAlumnos()
  await getAlumnos()
  await getGrupos()
})

const alumnos = ref()
const grupos = ref()
const filteredAlumnos = ref()
const error = ref()
const selectedGrupo = ref()
const selectedAlumno = ref()
const isDeleteOpen = ref(false)

function gruposProps(gruposAlumnos) {
  return {
    title: gruposAlumnos.clavegrupo
  }
}

watch(selectedGrupo, async (newValue) => {
  if (!newValue) return

  const grupoAlumno = props.gruposAlumnos.filter((grupoAlumno) => {
    return grupoAlumno.clavegrupo === newValue.clavegrupo
  })

  if (!grupoAlumno) {
    filteredAlumnos.value = []
    return
  }

  filteredAlumnos.value = alumnos.value.filter((alumno) => {
    return grupoAlumno.some((grupoAlumno) => {
      return grupoAlumno.ncontrol === alumno.ncontrol
    })
  })
})

async function getAlumnos() {
  const response = await axios.get('http://localhost:3000/api/alumnos')

  if (response.data.error) {
    error.value = response.data.error
  }

  alumnos.value = response.data
}

async function getGrupos() {
  const response = await axios.get('http://localhost:3000/api/grupos')

  if (response.data.error) {
    error.value = response.data.error
  }

  grupos.value = response.data
}

function handleDelete(alumno) {
  selectedAlumno.value = alumno
  isDeleteOpen.value = true
}
</script>

<template>
  <h2 class='text-3xl text-center mt-2'>Lista de alumnos en el grupo</h2>
  {{ error }}
  <v-select
    v-model='selectedGrupo'
    :items='grupos'
    :item-props='gruposProps'
    label='Grupos'
  />
  <v-data-table :headers='headers' :items='filteredAlumnos'>
    <template #top>
      <v-dialog v-model='isDeleteOpen' max-width='500px'>
        <GruposAlumnosDeleteDialog
          :grupo='selectedGrupo'
          :alumno='selectedAlumno'
          @close='isDeleteOpen = false'
        />
      </v-dialog>
    </template>
    <template #[`item.action`]='{item}'>
      <v-icon icon='mdi-delete' @click='handleDelete(item)' />
    </template>
  </v-data-table>
</template>
