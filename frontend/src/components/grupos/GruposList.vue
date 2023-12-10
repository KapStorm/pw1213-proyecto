<script setup>

import { onMounted, ref } from 'vue'
import GruposEditDialog from '@/components/grupos/GruposEditDialog.vue'
import GruposDeleteDialog from '@/components/grupos/GruposDeleteDialog.vue'

const props = defineProps({
  grupos: {
    type: Array,
    required: true
  },
  getGrupos: {
    type: Function,
    required: true
  }
})

const headers = [
  {
    title: 'Clave Grupo',
    value: 'clavegrupo'
  },
  {
    title: 'Clave Materia',
    value: 'clavemateria'
  },
  {
    title: 'Clave Maestro',
    value: 'clavemaestro'
  },
  {
    title: 'Limite Alumnos',
    value: 'limitealumnos'
  },
  {
    title: 'Inscritos',
    value: 'inscritos'
  },
  {
    title: 'Horario Lunes',
    value: 'horariolunes'
  },
  {
    title: 'Horario Martes',
    value: 'horariomartes'
  },
  {
    title: 'Horario Miercoles',
    value: 'horariomiercoles'
  },
  {
    title: 'Horario Jueves',
    value: 'horariojueves'
  },
  {
    title: 'Horario Viernes',
    value: 'horarioviernes'
  },
  {
    title: 'Acciones',
    value: 'action'
  }
]

onMounted(async () => {
  await props.getGrupos()
})

const isEditOpen = ref(false)
const isDeleteOpen = ref(false)
const selectedGrupo = ref()

function handleEdit(grupo) {
  selectedGrupo.value = grupo
  isEditOpen.value = true
}

function handleDelete(grupo) {
  selectedGrupo.value = grupo
  isDeleteOpen.value = true
}

async function handleClose() {
  isEditOpen.value = false
  isDeleteOpen.value = false
  await props.getGrupos()
}
</script>

<template>
  <v-data-table :headers='headers' :items='grupos'>
    <template #top>
      <v-dialog v-model='isEditOpen' max-width='500px'>
        <GruposEditDialog
          :grupo='selectedGrupo'
          :onSubmit='handleClose' />
      </v-dialog>
      <v-dialog v-model='isDeleteOpen' max-width='500px'>
        <GruposDeleteDialog
          :grupo='selectedGrupo'
          :getGrupos='props.getGrupos'
          @close='handleClose' />
      </v-dialog>
    </template>
    <template #[`item.action`]='{item}'>
      <v-icon icon='mdi-pencil' @click='handleEdit(item)' />
      <v-icon icon='mdi-delete' @click='handleDelete(item)' />
    </template>
  </v-data-table>
</template>
