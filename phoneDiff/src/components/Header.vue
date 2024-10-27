<script lang="ts">
import { RouterLink } from 'vue-router'
import IconLogin from './icons/IconLogin.vue'

export default {
  components: {
    RouterLink,
    IconLogin,
  },
  methods: {
    toggleMenu() {
      this.$store.dispatch('toggleMenu')
    },
  },
}
</script>
<template>
  <header class="header">
    <div class="container">
      <span class="title"> Каталог </span>
      <nav class="nav">
        <RouterLink class="link" to="/"> Сравнение </RouterLink>
        <RouterLink class="link" to="/login">
          Личный кабинет
          <IconLogin />
        </RouterLink>
      </nav>
      <nav class="mobile-nav">
        <button @click="toggleMenu">Меню</button>
      </nav>
    </div>
  </header>
</template>
