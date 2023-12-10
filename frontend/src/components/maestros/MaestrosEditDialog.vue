<script setup>
import { ref } from 'vue'
import axios from 'axios'

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

const estatuss = ['Activo', 'Baja']

const clavemaestro = ref(props.maestro.clavemaestro)
const nombre = ref(props.maestro.nombre)
const departamento = ref(props.maestro.departamento)
const estatus = ref(props.maestro.estatus)

const error = ref('')

async function handleSubmit() {
  await axios.put(`http://localhost:3000/api/maestros/${clavemaestro.value}`, {
    nombre: nombre.value,
    departamento: departamento.value,
    estatus: estatus.value.charAt(0)
  })
    .then(res => {
      if (res.data.error) {
        error.value = res.data.error
      }

      props.onSubmit()
    })
}
</script>

<template>
  <v-card class='w-2/5 max-w-5xl mx-auto'>
    <v-card-title>
      <p class='text-4xl text-center text-wrap'>Editar maestro</p>
    </v-card-title>
    <v-card-text>
      <v-container>
        <form @submit.prevent='handleSubmit'>
          <v-text-field label='Clave Maestro' v-model='clavemaestro' :disabled='true' />
          <v-text-field label='Nombre' v-model='nombre' />
          <v-text-field label='Departamento' v-model='departamento' />
          <v-select label='Estatus' :items='estatuss' v-model='estatus' />
          <v-btn class='mx-auto' color='primary' type='submit'>Guardar</v-btn>
        </form>
      </v-container>
    </v-card-text>
  </v-card>
</template>
