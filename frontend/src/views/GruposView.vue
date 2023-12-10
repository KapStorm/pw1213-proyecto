<script setup>
import { ref } from 'vue'
import axios from 'axios'
import GruposList from '@/components/grupos/GruposList.vue'
import GruposFrom from '@/components/grupos/GruposFrom.vue'

const grupos = ref([])

async function getGrupos() {
  const response = await axios.get('http://localhost:3000/api/grupos')
  grupos.value = response.data
}
</script>

<template>
  <GruposFrom :on-submit='getGrupos' />
  <GruposList :get-grupos='getGrupos' :grupos='grupos' />
</template>
