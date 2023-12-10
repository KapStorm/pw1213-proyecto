<script setup>
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'

const props = defineProps({
  gruposAlumnos: {
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
    title: 'Numero de Control',
    value: 'ncontrol'
  },
  {
    title: 'Nombre',
    value: 'nombre'
  }
]

onMounted(async () => {
  await props.getGrupos()
  await getAlumnos()
})

const alumnos = ref()
const filteredAlumnos = ref()
const error = ref()
const selectedGrupoAlumno = ref()

function gruposAlumnosProps(gruposAlumnos) {
  return {
    title: gruposAlumnos.clavegrupo,
  }
}

watch(selectedGrupoAlumno, async (newValue) => {
  if (!newValue) return


  filteredAlumnos.value = alumnos.value.filter((alumno) => {
    return alumno.ncontrol === newValue.ncontrol
  })
})

async function getAlumnos() {
  const response = await axios.get('http://localhost:3000/api/alumnos')

  if (response.data.error) {
    error.value = response.data.error
  }

  alumnos.value = response.data
}
</script>

<template>
  {{ error }}
  <v-select
    v-model='selectedGrupoAlumno'
    :items='gruposAlumnos'
    :item-props='gruposAlumnosProps'
    label='Grupos Alumnos'
    />
  <v-data-table :headers='headers' :items='filteredAlumnos'>
    <template #[`item.action`]>
      <v-icon icon='mdi-delete' />
    </template>
  </v-data-table>
</template>
