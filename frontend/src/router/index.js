import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AlumnosView from '@/views/AlumnosView.vue'
import MaestrosView from '@/views/MaestrosView.vue'
import MateriasView from '@/views/MateriasView.vue'
import GruposView from '@/views/GruposView.vue'
import GruposAlumnosView from '@/views/GruposAlumnosView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/alumnos',
      name: 'alumnos',
      component: AlumnosView
    },
    {
      path: '/maestros',
      name: 'maestros',
      component: MaestrosView
    },
    {
      path: '/materias',
      name: 'materias',
      component: MateriasView
    },
    {
      path: '/grupos',
      name: 'grupos',
      component: GruposView
    },
    {
      path: '/grupos-alumnos',
      name: 'grupos-alumnos',
      component: GruposAlumnosView
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

export default router
