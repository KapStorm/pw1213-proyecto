<script setup>
import axios from 'axios'
import { ref } from 'vue'

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

const error = ref('')

async function handleSubmitDelete(materia) {
  await axios.delete(`http://localhost:3000/api/materias/${materia.clavemateria}`)
    .then(res => {
      if (res.data.error) {
        error.value = res.data.error
      }

      props.onSubmit()
    })
}
</script>

<template>
  <v-card class='w-5xl mx-auto'>
    <v-card-title>
      <span class='text-4xl text-center'>Eliminar materia {{ materia.nombre }}</span>
    </v-card-title>
    <v-card-text>
      <p>¿Estás seguro de eliminar esta materia?</p>
    </v-card-text>
    <v-card-actions>
      <div class='mx-auto'>
        {{ error }}
        <v-btn color='primary' @click='handleSubmitDelete(materia)'>Eliminar</v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>
