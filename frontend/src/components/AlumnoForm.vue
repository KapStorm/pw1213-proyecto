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
      error: ""
    }
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
        window.location.reload()
      }
    }
  }
}
</script>

<template>
  <section>
    <form @submit.prevent="submit">
      <section>
        <label>N. Control <input v-model="ncontrol" required></label>
      </section>
      <section>
        <label>Nombre <input v-model="nombre" required></label>
      </section>
      <section>
        <label>Carrera
          <select>
            <option v-model="carrera">Sistemas</option>
            <option>Industrial</option>
            <option>Electronica</option>
            <option>Gestion Empresarial</option>
          </select>
        </label>
      </section>
      <section>
        <label>Estatus
          <select v-model="estatus">
            <option>Vigente</option>
            <option>Baja</option>
          </select>
        </label>
      </section>
      <button type="submit">Submit</button>
    </form>
    {{ error }}
  </section>
</template>

<style scoped>

</style>