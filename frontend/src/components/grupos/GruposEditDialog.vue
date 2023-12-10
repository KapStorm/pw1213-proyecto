<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const props = defineProps({
  grupo: {
    type: Object,
    required: true
  },
  onSubmit: {
    type: Function,
    required: true
  }
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

const clavegrupo = ref(props.grupo.clavegrupo)
const materia = ref()
const maestro = ref()
const limitealumnos = ref(props.grupo.limitealumnos)
const horariolunes = ref(props.grupo.horariolunes)
const horariomartes = ref(props.grupo.horariomartes)
const horariomiercoles = ref(props.grupo.horariomiercoles)
const horariojueves = ref(props.grupo.horariojueves)
const horarioviernes = ref(props.grupo.horarioviernes)
const error = ref()

onMounted(async () => {
  await getMaestros()
  await getMaterias()
  materia.value = materias.value.find(materia => materia.clavemateria === props.grupo.clavemateria)
  maestro.value = maestros.value.find(maestro => maestro.clavemaestro === props.grupo.clavemaestro)
})

const horas = ['', ...Array.from({ length: 13 }, (_, i) => {
  const hour = i + 7
  return `${hour}:00-${hour + 1}:00`
})]

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

async function handleSubmit() {
  const response = await axios.put(`http://localhost:3000/api/grupos/${props.grupo.clavegrupo}`, {
    clavemateria: materia.value.clavemateria,
    clavemaestro: maestro.value.clavemaestro,
    limitealumnos: limitealumnos.value,
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
  <v-card>
    <v-card-title>
      <p class='text-4xl text-center text-wrap'>Editar Grupo</p>
    </v-card-title>
    <v-card-text>
      <v-container>
        <form @submit.prevent='handleSubmit'>
          <v-text-field
            v-model='clavegrupo'
            label='Clave del grupo'
            required
            :disabled='true' />
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
            label='Horario martes' />
          <v-select
            v-model='horariomiercoles'
            :items='horas'
            label='Horario miercoles' />
          <v-select
            v-model='horariojueves'
            :items='horas'
            label='Horario jueves' />
          <v-select
            v-model='horarioviernes'
            :items='horas'
            label='Horario viernes' />
          <v-btn
            @click='onSubmit'
            color='primary'
            type='submit'>
            Guardar
          </v-btn>
        </form>
      </v-container>
    </v-card-text>
  </v-card>
  {{ error }}
</template>
