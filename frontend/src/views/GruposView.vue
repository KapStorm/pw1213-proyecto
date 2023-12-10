<script setup>
import { ref } from 'vue'
import axios from 'axios'
import GruposList from '@/components/grupos/GruposList.vue'

const grupos = ref([])

async function getGrupos() {
  const response = await axios.get('http://localhost:3000/grupos')
  grupos.value = response.data
}
</script>

<template>
  <GruposList :get-grupos='getGrupos' :grupos='grupos' />
</template>
