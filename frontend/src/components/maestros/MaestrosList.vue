<script setup>
defineProps({
  maestros: {
    type: Array,
    required: true
  },
  loadMaestros: {
    type: Function,
    required: true
  }
})
</script>

<template>
  {{ maestros }}
</template>

<style scoped>

</style>