<script lang="ts">
import { RouterLink } from 'vue-router'
import IconLogin from './icons/IconLogin.vue'

export default {
  components: {
    RouterLink,
    IconLogin,
  },
  computed: {
    isMenuVisible() {
      return this.$store.getters.isMenuVisible
    },
  },
  methods: {
    hideMenu() {
      this.$store.dispatch('toggleMenu')
    },
  },
}
</script>

<template>
  <transition name="fade">
    <div v-if="isMenuVisible" class="mobile-menu">
      <RouterLink @click="hideMenu" class="link" to="/"> Сравнение </RouterLink>
      <RouterLink @click="hideMenu" class="link" to="/login">
        Личный кабинет
        <IconLogin />
      </RouterLink>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
