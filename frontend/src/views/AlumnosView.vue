<script>
import AlumnoForm from "@/components/AlumnoForm.vue";
import AlumnosList from "@/components/AlumnosList.vue";

export default {
  name: "AlumnosView",
  components: {
    AlumnoForm,
    AlumnosList,
  },
};
</script>

<template>
  <main>
    <AlumnoForm />
    <AlumnosList />
  </main>
</template>

<style scoped></style>
