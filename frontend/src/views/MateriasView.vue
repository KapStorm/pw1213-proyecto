<script setup>
import { ref } from 'vue'
import axios from 'axios'
import MateriasList from '@/components/materias/MateriasList.vue'
import MateriasForm from '@/components/materias/MateriasForm.vue'

const materias = ref([])

async function loadMaterias() {
  const res = await axios.get('http://localhost:3000/api/materias')
  materias.value = res.data.map(x => ({
    ...x,
    estatus: x.estatus === 'A' ? 'Activo' : 'Baja'
  }))
}
</script>

<template>
  <MateriasForm :on-submit='loadMaterias' />
  <MateriasList :load-materias='loadMaterias' :materias='materias' />
</template>
