<script setup>

import { onMounted, ref } from 'vue'
import MaestrosEditDialog from '@/components/maestros/MaestrosEditDialog.vue'

const props = defineProps({
  maestros: {
    type: Array,
    required: true
  },
  loadMaestros: {
    type: Function,
    required: true
  }
})

onMounted(async () => {
  await props.loadMaestros()
})

const headers = [
  {
    title: 'Clave Maestro',
    value: 'clavemaestro'
  },
  {
    title: 'Nombre',
    value: 'nombre'
  },
  {
    title: 'Departamento',
    value: 'departamento'
  },
  {
    title: 'Estatus',
    value: 'estatus'
  },
  {
    title: 'Acciones',
    value: 'action'
  }
]

const selectedMaestro = ref()
const isEditOpen = ref(false)

function editMaestro(maestro) {
  selectedMaestro.value = { ...maestro }
  console.log(maestro)
  isEditOpen.value = true
}
</script>

<template>
  <v-data-table :headers='headers' :items='maestros'>
    <template #top>
      <v-dialog v-model='isEditOpen'>
        <MaestrosEditDialog :on-submit='loadMaestros' :maestro='selectedMaestro' />
      </v-dialog>
    </template>
    <template v-slot:[`item.action`]='{ item }'>
      <v-icon icon='mdi-pencil' @click='editMaestro(item)' />
      <v-icon icon='mdi-delete' />
    </template>
  </v-data-table>
</template>

<style scoped>

</style>