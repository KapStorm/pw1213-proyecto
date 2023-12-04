<script setup>
import { ref } from 'vue'
import axios from 'axios'

const carreras = ['Sistemas', 'Industrial', 'Gestion']
const estatuss = ['Activo', 'Baja']

const ncontrol = ref('')
const nombre = ref('')
const carrera = ref(carreras[0])
const estatus = ref(estatuss[0])
const error = ref('')

async function handleSubmit() {
  await axios.post('http://localhost:3000/api/alumnos', {
    ncontrol: ncontrol.value,
    nombre: nombre.value,
    carrera: carrera.value,
    estatus: estatus.value.charAt(0)
  })
    .then(res => {
      if (res.data.error) {
        error.value = res.data.error
        return
      }
      window.location.reload()
    })
}
</script>

<template>
  <h2 class='text-3xl text-center'>Formulario insertar alumnos</h2>
  <form class='m-4 [&>section]:my-3' @submit.prevent='handleSubmit'>
    <v-text-field label='N. Control' v-model='ncontrol' type='number' required />
    <v-text-field label='Name' v-model='nombre' required />
    <v-select label='Carrera' :items='carreras' v-model='carrera' />
    <v-select label='Estatus' :items='estatuss' v-model='estatus' />
    <v-btn type='submit' class='my-3'>Guardar</v-btn>
  </form>
  {{ error }}
</template>

<style scoped>

</style>