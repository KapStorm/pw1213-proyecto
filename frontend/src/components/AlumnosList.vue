<script>
import axios from "axios";

export default {
  name: "AlumnosList",
  data() {
    return {
      alumnos: []
    }
  },
  created() {
    this.getAlumnos();
  },
  methods: {
    async getAlumnos() {
      const response = await axios.get("http://localhost:3000/api/alumnos");
      this.alumnos = response.data
    }
  },
}
</script>

<template>
  <table>
    <thead>
    <tr>
      <th>N. Control</th>
      <th>Nombre</th>
      <th>Carrera</th>
      <th>Estatus</th>
      <th>Acciones</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="alumno in alumnos" :key="alumno.id">
      <td>{{ alumno.ncontrol }}</td>
      <td>{{ alumno.nombre }}</td>
      <td>{{ alumno.carrera }}</td>
      <td>{{ alumno.estatus === 'V' ? 'Vigente' : 'Baja' }}</td>
      <td>
        <button>Editar</button>
        <button>Eliminar</button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  td {
    text-align: center;
  }
</style>