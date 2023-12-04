<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const alumnos = ref([])

onMounted(async () => {
  const res = await axios.get('http://localhost:3000/api/alumnos')
  alumnos.value = res.data.map(x => ({
    ...x,
    estatus: x.estatus === 'A' ? 'Activo' : 'Baja'
  }))
})
</script>

<template>
  <v-data-table :items='alumnos' />
</template>

<style scoped>

</style>