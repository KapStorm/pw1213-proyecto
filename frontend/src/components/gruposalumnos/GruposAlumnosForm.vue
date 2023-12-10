<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const props = defineProps({
  onSubmitted: {
    type: Function,
    required: true
  },
  gruposAlumnos: {
    type: Array,
    required: true
  }
})

const grupos = ref([])
const alumnos = ref([])
const selectedGrupo = ref()
const selectedAlumno = ref()
const error = ref()

onMounted(async () => {
  await getGrupos()
  await getAlumnos()
})

async function getGrupos() {
  const response = await axios.get('http://localhost:3000/api/grupos')

  if (response.data.error) {
    error.value = response.data.error
    return
  }

  grupos.value = response.data
}

async function getAlumnos() {
  const response = await axios.get('http://localhost:3000/api/alumnos')

  if (response.data.error) {
    error.value = response.data.error
  }

  alumnos.value = response.data.filter((alumno) => {
    return !props.gruposAlumnos.some((grupoAlumno) => {
      return grupoAlumno.ncontrol === alumno.ncontrol
    })
  })
}

async function handleSubmit() {
  const response = await axios.post('http://localhost:3000/api/alumnos-grupos', {
    clavegrupo: selectedGrupo.value,
    ncontrol: selectedAlumno.value
  })

  if (response.data.error) {
    error.value = response.data.error
    return
  }

  await props.onSubmitted()
  location.reload()
}
</script>

<template>
  <h2 class='text-3xl text-center py-2'>Asignar Alumno a Grupo</h2>
  <form @submit.prevent='handleSubmit'>
    <v-select
      v-model='selectedGrupo'
      :items='grupos'
      item-title='clavegrupo'
      item-value='clavegrupo'
      label='Grupo'
      required />
    <v-select
      v-model='selectedAlumno'
      :items='alumnos'
      item-title='nombre'
      item-value='ncontrol'
      label='Alumno'
      required />
    <v-btn color='primary' type='submit'>
      Asignar
    </v-btn>
  </form>
</template>
