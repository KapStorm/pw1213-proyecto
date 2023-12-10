<script setup>
import { ref } from 'vue'
import axios from 'axios'

const props = defineProps({
  onSubmit: {
    type: Function,
    required: true
  }
})

const estatuss = ['Activo', 'Baja']

const clavemaestro = ref()
const nombre = ref('')
const departamento = ref()
const estatus = ref('')
const error = ref('')

async function handleSubmit() {
  const res = await axios.post('http://localhost:3000/api/maestros', {
    clavemaestro: clavemaestro.value,
    nombre: nombre.value,
    departamento: departamento.value,
    estatus: estatus.value.charAt(0)
  })
  if (res.data.error) {
    error.value = res.data.error
    return
  }
  await props.onSubmit()
}
</script>

<template>
  <h2 class='text-3xl text-center'>Formulario insertar maestros</h2>
  <form @submit.prevent='handleSubmit'>
    <v-text-field label='Clave Maestro' v-model='clavemaestro' type='number' required />
    <v-text-field label='Nombre' v-model='nombre' required />
    <v-text-field label='Departamento' v-model='departamento' type='number' required />
    <v-select label='Estatus' :items='estatuss' v-model='estatus' required />
    <v-btn type='submit' class='my-3'>Guardar</v-btn>
  </form>
  {{ error }}
</template>
