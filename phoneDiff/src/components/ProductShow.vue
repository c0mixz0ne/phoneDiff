<script lang="ts">
import { computed } from 'vue'
import { useStore, mapActions } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const show = computed(() => store.getters.currentShow)

    return {
        show
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
    ...mapActions(['updateShow']),
    changeShow(e) {
      this.updateShow(Number(e.target.id))
    },
  },
}
</script>
<template>
  <div class="product-show">
    <span> Отобразить товары: </span>
    <div class="show-items">
      <button
        @click="changeShow"
        v-for="index in buttonsRange"
        :key="index"
        :class="{ active: show - 1 === index }"
        :id="String(startPosition + index - 1)"
      >
        {{ startPosition + index - 1 }}
      </button>
    </div>
  </div>
</template>
