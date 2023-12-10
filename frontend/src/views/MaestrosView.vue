<script setup>
import axios from 'axios'
import { ref } from 'vue'
import MaestrosList from '@/components/maestros/MaestrosList.vue'

const maestros = ref([])

async function loadMaestros() {
  const res = await axios.get('http://localhost:3000/api/maestros')
  maestros.value = res.data.map(x => ({
    ...x,
    estatus: x.estatus === 'A' ? 'Activo' : 'Baja'
  }))
}
</script>

<template>
  <MaestrosList :load-maestros='loadMaestros' :maestros='maestros' />
</template>

<style scoped>

</style>