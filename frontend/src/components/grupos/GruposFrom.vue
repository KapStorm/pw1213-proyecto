<script setup>
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'

const props = defineProps({
  onSubmit: {
    type: Function,
    required: true
  }
})

// Create an array of string with hours, example: 7:00-8:00, 8:00-9:00, etc.
const horas = Array.from({ length: 13 }, (_, i) => {
  const hour = i + 7
  return `${hour}:00-${hour + 1}:00`
})

const maestros = ref([])
const materias = ref([])

async function getMaestros() {
  const response = await axios.get('http://localhost:3000/api/maestros')
  maestros.value = response.data
}

async function getMaterias() {
  const response = await axios.get('http://localhost:3000/api/materias')
  materias.value = response.data
}

function materiasProps(materia) {
  return {
    title: materia.nombre,
    subtitle: materia.clavemateria
  }
}

function maestrosProps(maestro) {
  return {
    title: maestro.nombre,
    subtitle: maestro.clavemaestro
  }
}

const clavegrupo = ref()
const materia = ref()
const maestro = ref()
const limitealumnos = ref()
const horariolunes = ref()
const horariomartes = ref()
const horariomiercoles = ref()
const horariojueves = ref()
const horarioviernes = ref()
const error = ref()

watch(clavegrupo, (value) => {
  if (value.length > 4) {
    clavegrupo.value = value.slice(0, 4)
  }
})

onMounted(async () => {
  await getMaestros()
  await getMaterias()
})

async function handleSubmit() {
  const response = await axios.post('http://localhost:3000/api/grupos', {
    clavegrupo: clavegrupo.value,
    clavemateria: materia.value.clavemateria,
    clavemaestro: maestro.value.clavemaestro,
    limitealumnos: limitealumnos.value,
    inscritos: 0,
    horariolunes: horariolunes.value,
    horariomartes: horariomartes.value,
    horariomiercoles: horariomiercoles.value,
    horariojueves: horariojueves.value,
    horarioviernes: horarioviernes.value
  })
  if (response.data.error) {
    error.value = response.data.error
    return
  }
  props.onSubmit()
}
</script>

<template>
  <form @submit.prevent='handleSubmit'>
    <v-text-field
      v-model='clavegrupo'
      label='Clave del grupo'
      required />
    <v-select
      v-model='materia'
      :items='materias'
      :item-props='materiasProps'
      label='Materia'
      required />
    <v-select
      v-model='maestro'
      :items='maestros'
      :item-props='maestrosProps'
      label='Maestro'
      required />
    <v-text-field
      v-model='limitealumnos'
      label='Limite de alumnos'
      min='1'
      type='number'
      required />
    <v-select
      v-model='horariolunes'
      :items='horas'
      label='Horario lunes'
      required />
    <v-select
      v-model='horariomartes'
      :items='horas'
      label='Horario martes'
      required />
    <v-select
      v-model='horariomiercoles'
      :items='horas'
      label='Horario miercoles'
      required />
    <v-select
      v-model='horariojueves'
      :items='horas'
      label='Horario jueves'
      required />
    <v-select
      v-model='horarioviernes'
      :items='horas'
      label='Horario viernes'
      required />
    <v-btn
      @click='onSubmit'
      color='primary'
      type='submit'>
      Guardar
    </v-btn>
  </form>
  {{ error }}
</template>
