<script setup>
import { ref } from 'vue'
import axios from 'axios'

const props = defineProps({
  alumno: {
    type: Object,
    required: true
  }
})

const error = ref('')
const snackbar = ref(false)

const emit = defineEmits(['onSubmitAlumnoDelete', 'onSubmitAlumnoDeleteClose'])

async function handleSubmitDelete() {
  await axios.delete(`http://localhost:3000/api/alumnos/${props.alumno.ncontrol}`)
    .then(res => {
      if (res.data.error) {
        error.value = res.data.error
        snackbar.value = true
        return
      }
      emit('onSubmitAlumnoDelete')
    })
}
</script>

<template>
  <v-card class='w-5xl mx-auto'>
    <v-card-title>
      <span class='text-4xl text-center'>Eliminar alumno {{ alumno.nombre }}</span>
    </v-card-title>
    <v-card-text>
      <p>¿Estás seguro de eliminar este alumno?</p>
    </v-card-text>
    <v-card-actions>
      <div class='mx-auto'>
        <v-btn color='primary' @click='handleSubmitDelete'>Eliminar</v-btn>
        <v-btn color='red' @click='emit("onSubmitAlumnoDeleteClose")'>Cancelar</v-btn>
      </div>
    </v-card-actions>
  </v-card>
  <v-snackbar v-model='snackbar' color='red'>
    {{ error }}
  </v-snackbar>
</template>

<style scoped>

</style>