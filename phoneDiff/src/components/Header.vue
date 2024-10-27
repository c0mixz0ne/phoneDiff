<script setup lang="ts">
import { RouterLink } from 'vue-router'
import IconLogin from './icons/IconLogin.vue'
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
    </div>
  </header>
</template>
