<script setup>
import { ref } from 'vue'
import axios from 'axios'

const props = defineProps({
  materia: {
    type: Object,
    required: true
  },
  onSubmit: {
    type: Function,
    required: true
  }
})

const clavemateria = ref(props.materia.clavemateria)
const nombre = ref(props.materia.nombre)
const creditos = ref(props.materia.creditos)
const error = ref('')

const creditos_ = [1, 2, 3, 4, 5, 6]

async function handleSubmit(materia) {
  const res = await axios.put(`http://localhost:3000/api/materias/${materia.clavemateria}`, {
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
  <v-card class='w-2/5 max-w-5xl mx-auto'>
    <v-card-title>
      <p class='text-4xl text-center text-wrap'>Editar maestro</p>
    </v-card-title>
    <v-card-text>
      <v-container>
        <form @submit.prevent='handleSubmit(materia)'>
          <v-text-field label='Clave Materia' v-model='clavemateria' required :disabled='true' />
          <v-text-field label='Nombre' v-model='nombre' required />
          <v-select label='Creditos' :items='creditos_' v-model='creditos' required />
          <v-btn type='submit' class='my-3'>Guardar</v-btn>
        </form>
      </v-container>
    </v-card-text>
  </v-card>
  {{ error }}
</template>

<style scoped>

</style>