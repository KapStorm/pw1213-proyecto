<script setup>
import axios from 'axios'
import { ref } from 'vue'

const props = defineProps({
  grupo: {
    type: Object,
    required: true
  },
  alumno: {
    type: Object,
    required: true
  }
})

const error = ref()
const emit = defineEmits(['close'])

async function handleDelete() {
  const response = await axios.delete('http://localhost:3000/api/alumnos-grupos', {
    data: {
      ncontrol: props.alumno.ncontrol,
      clavegrupo: props.grupo.clavegrupo
    }
  })

  if (response.data.error) {
    error.value = response.data.error
    return
  }

  emit('close')
  location.reload()
}
</script>

<template>
  <v-card>
    <v-card-title>
      <span class='text-4xl text-center'>Eliminar {{ alumno.nombre }} del grupo</span>
    </v-card-title>
    <v-card-text>
      <p>¿Estás seguro de eliminar este alumno del grupo?</p>
    </v-card-text>
    <v-card-actions>
      <div class='mx-auto'>
        <v-btn color='primary' @click='handleDelete'>Eliminar</v-btn>
        <v-btn color='red' @click='emit("close")'>Cancelar</v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>
