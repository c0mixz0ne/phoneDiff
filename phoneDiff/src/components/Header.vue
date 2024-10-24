<script setup lang="ts">
  import { RouterLink } from 'vue-router'
  import IconLogin from './icons/IconLogin.vue';
</script>
<template>
  <header class="header">
    <div class="container">
      <RouterLink to="/">
        Каталог
      </RouterLink>
      <nav>
        <RouterLink to="/">
          Сравнение
        </RouterLink>
        <RouterLink to="/login">
          Личный кабинет
          <IconLogin/>
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
