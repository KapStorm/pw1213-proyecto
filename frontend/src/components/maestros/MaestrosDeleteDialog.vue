<script setup>
import axios from 'axios'
import { ref } from 'vue'

const props = defineProps({
  maestro: {
    type: Object,
    required: true
  },
  onSubmit: {
    type: Function,
    required: true
  }
})

const error = ref('')

const emit = defineEmits(['close'])

async function handleSubmitDelete(maestro) {
  await axios.delete(`http://localhost:3000/api/maestros/${maestro.clavemaestro}`)
    .then(res => {
      if (res.data.error) {
        error.value = res.data.error
        return
      }

      props.onSubmit()
      emit('close')
    })
}
</script>

<template>
  <v-card class='w-5xl mx-auto'>
    <v-card-title>
      <span class='text-4xl text-center'>Eliminar alumno {{ maestro.nombre }}</span>
    </v-card-title>
    <v-card-text>
      <p>¿Estás seguro de eliminar este maestro?</p>
    </v-card-text>
    <v-card-actions>
      <div class='mx-auto'>
        <v-btn color='primary' @click='handleSubmitDelete(maestro)'>Eliminar</v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<style scoped>

</style>