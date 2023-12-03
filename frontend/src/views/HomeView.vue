<script>

export default {
  name: 'HomeView',
  data() {
    return {
      count: 0,
    }
  },
  methods: {
    increment() {
      this.count++;
    }
  },
}
</script>

<template>
  <main>
    <button @click="increment">Increment</button>
    <h1>{{count}}</h1>
  </main>
</template>
