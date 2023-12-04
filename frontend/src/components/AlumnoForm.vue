<script>
import axios from "axios";

export default {
  name: "AlumnoForm",
  data() {
    return {
      ncontrol: "",
      nombre: "",
      carrera: "Sistemas",
      estatus: "Vigente",
      error: "",
    };
  },
  methods: {
    async submit() {
      const response = await axios.post("http://localhost:3000/api/alumnos", {
        ncontrol: parseInt(this.ncontrol),
        nombre: this.nombre,
        carrera: this.carrera,
        estatus: this.estatus.charAt(0)
      });
      if (response.data.error) {
        this.error = response.data.error;
      } else {
        this.error = "";
        this.ncontrol = "";
        this.nombre = "";
        this.carrera = "Sistemas";
        this.estatus = "Vigente";
        window.location.reload();
      }
    },
  },
};
</script>

<template>
  <section>
    <form @submit.prevent="submit">
      <label for="ncontrol">N. Control</label>
      <input v-model="ncontrol" name="ncontrol" required>
      <label for="nombre">Nombre</label>
      <input v-model="nombre" name="nombre" required>
      <label for="carrera">Carrera</label>
      <select name="carrera">
        <option v-model="carrera">Sistemas</option>
        <option>Industrial</option>
        <option>Electronica</option>
        <option>Gestion Empresarial</option>
      </select>
      <label for="estatus">Estatus</label>
      <select v-model="estatus" name="estatus">
        <option>Vigente</option>
        <option>Baja</option>
      </select>
      <button type="submit">Submit</button>
    </form>
    {{ error }}
  </section>
</template>

<style scoped>
form {
  display: grid;
  grid-template-columns: auto 1fr;
}

form > * {
  margin: 4px 0;
}

label {
  padding: 0 0.5rem;
}

input {
  width: 196px;
}

select {
  width: 128px;
}
</style>