<script lang="ts">
import { computed } from 'vue'
import { useStore, mapActions } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const startShow = computed(() => store.getters.currentCount)

    return {
        startShow
    }
  },
  data() {
    return {
      startPosition: 2,
      endPosition: 6,
    }
  },
  computed: {
    buttonsRange() {
      const count = this.endPosition - this.startPosition + 1
      return count > 0 ? count : 0
    },
  },
  methods: {
    ...mapActions(['updateCount']),
    changeCount(e) {
      this.updateCount(Number(e.target.id))
    },
  },
}
</script>
<template>
  <div class="product-counter">
    <span> Отобразить товары: </span>
    <div class="counter-items">
      <button
        @click="changeCount"
        v-for="index in buttonsRange"
        :key="index"
        :class="{ active: startShow - 1 === index }"
        :id="startPosition + index - 1"
      >
        {{ startPosition + index - 1 }}
      </button>
    </div>
  </div>
</template>
