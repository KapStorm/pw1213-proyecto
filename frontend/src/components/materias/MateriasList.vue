<script setup>
import { onMounted, ref } from 'vue'
import MateriasEditDialog from '@/components/materias/MateriasEditDialog.vue'

const props = defineProps({
  materias: {
    type: Array,
    required: true
  },
  loadMaterias: {
    type: Function,
    required: true
  }
})

onMounted(async () => {
  await props.loadMaterias()
})

const headers = [
  {
    title: 'Clave Materia',
    value: 'clavemateria'
  },
  {
    title: 'Nombre',
    value: 'nombre'
  },
  {
    title: 'Creditos',
    value: 'creditos'
  },
  {
    title: 'Acciones',
    value: 'action'
  }
]

const currentMateria = ref({})
const isEditOpen = ref(false)

async function onSubmit() {
  await props.loadMaterias()
  isEditOpen.value = false
}

function handleEdit(materia) {
  currentMateria.value = materia
  isEditOpen.value = true
}
</script>

<template>
  <v-data-table :headers='headers' :items='materias'>
    <template #top>
      <v-dialog v-model='isEditOpen'>
        <MateriasEditDialog :materia='currentMateria' :on-submit='onSubmit' />
      </v-dialog>
    </template>
    <template v-slot:[`item.action`]='{item}'>
      <v-icon icon='mdi-pencil' @click='handleEdit(item)' />
      <v-icon icon='mdi-delete' />
    </template>
  </v-data-table>
</template>
