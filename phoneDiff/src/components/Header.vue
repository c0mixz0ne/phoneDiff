<script setup lang="ts">
  import { RouterLink } from 'vue-router'
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
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
