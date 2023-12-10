<script setup>
import { ref, watch } from 'vue'
import axios from 'axios'

const props = defineProps({
  onSubmit: {
    type: Function,
    required: true
  }
})

const clavemateria = ref()
const nombre = ref('')
const creditos = ref()
const error = ref('')

const creditos_ = [1, 2, 3, 4, 5, 6]

watch(clavemateria, () => {
  if (clavemateria.value.length > 8) {
    clavemateria.value = clavemateria.value.slice(0, 8)
  }
})

async function handleSubmit() {
  const res = await axios.post('http://localhost:3000/api/materias', {
    clavemateria: clavemateria.value,
    nombre: nombre.value,
    creditos: creditos.value
  })

  if (res.data.error) {
    error.value = res.data.error
    return
  }

  props.onSubmit()
}
</script>

<template>
  <h2 class='text-3xl text-center'>Formulario insertar materias</h2>
  <form @submit.prevent='handleSubmit'>
    <v-text-field label='Clave Materia' v-model='clavemateria' required />
    <v-text-field label='Nombre' v-model='nombre' required />
    <v-select label='Creditos' :items='creditos_' v-model='creditos' required />
    <v-btn type='submit' class='my-3'>Guardar</v-btn>
  </form>
  {{ error }}
</template>
