<script setup>
import { onMounted, ref, watch } from 'vue'
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
const grupoLleno = ref(false)

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

  alumnos.value = response.data
}

watch(selectedGrupo, (newValue) => {
  if (!newValue) {
    return
  }

  const grupo = grupos.value.find((grupo) => {
    return grupo.clavegrupo === newValue
  })

  if (grupo) {
    grupoLleno.value = grupo.inscritos >= grupo.limitealumnos
  }
})

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
    <v-btn color='primary' type='submit' :disabled='grupoLleno'>
      Asignar
    </v-btn>
  </form>
  <p class='text-red-500' v-if='grupoLleno'>
    El grupo esta lleno, ya no se puede inscribir mas alumnos
  </p>
</template>
