<script setup>
import { ref } from 'vue'
import axios from 'axios'
import router from '@/router'

const props = defineProps({
  alumno: {
    type: Object,
    required: true
  },
})

const carreras = ['Sistemas', 'Industrial', 'Gestion']
const estatuss = ['Activo', 'Baja']

const ncontrol = ref(props.alumno.ncontrol)
const nombre = ref(props.alumno.nombre)
const carrera = ref(props.alumno.carrera)
const estatus = ref(props.alumno.estatus)
const error = ref('')
const snackbar = ref(false)

async function handleSubmit() {
  await axios.put(`http://localhost:3000/api/alumnos/${ncontrol.value}`, {
    nombre: nombre.value,
    carrera: carrera.value,
    estatus: estatus.value.charAt(0)
  })
    .then(res => {
      if (res.data.error) {
        error.value = res.data.error
        snackbar.value = true
        return
      }
      router.go(0)
    })
}
</script>

<template>
  <v-card class='max-w-5xl mx-auto'>
    <v-card-title>
      <span class='text-4xl text-center'>Editar alumno {{ alumno.nombre }}</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <form @submit.prevent='handleSubmit'>
          <v-text-field label='N. Control' v-model='ncontrol' :disabled='true' />
          <v-text-field label='Nombre' v-model='nombre' />
          <v-select label='Carrera' :items='carreras' v-model='carrera' />
          <v-select label='Estatus' :items='estatuss' v-model='estatus' />
          <v-btn class='mx-auto' color='primary' type='submit'>Guardar</v-btn>
        </form>
      </v-container>
    </v-card-text>
  </v-card>
  <v-snackbar v-model='snackbar' color='red'>
    {{error}}
  </v-snackbar>
</template>

<style scoped>

</style>