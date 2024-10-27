<script lang="ts">
import ProductShow from '../components/ProductShow.vue'

import IconChevron from './icons/IconChevron.vue'
import IconChange from './icons/IconChange.vue'
import IconCheck from './icons/IconCheck.vue'
import IconCross from './icons/IconCross.vue'

import { onMounted, computed, ref, onUnmounted, watch } from 'vue'
import { useStore } from 'vuex'

import { IProduct } from '../types/types'

export default {
  setup() {
    const store = useStore()
    const differences = ref({})
    const showDifferences = ref(false)
    const inputData = ref('')

    onMounted(() => {
      store.dispatch('loadProducts')
    })

    onUnmounted(() => {
      store.dispatch('updateCurrentModal', '')
    })

    const products = computed<IProduct[]>(() => store.getters.allProducts)
    const startShow = computed(() => store.getters.currentShow)
    const currentModal = computed(() => store.getters.currentModal)

    watch([startShow, currentModal], () => {
      actionDiffirence()
    })

    const actionDiffirence = () => {
      if (!showDifferences.value) return

      differences.value = {}

      const keys = Object.keys(products.value[0] || {})

      // Сравниваем свойства всех продуктов
      keys.forEach(key => {
        const values = products.value
          .slice(0, startShow.value)
          .map(product => product[key as keyof IProduct])

        const uniqueValues = [...new Set(values)]

        if (uniqueValues.length > 1) {
          differences.value[key] = values
        }
      })

      return differences.value
    }

    return {
      products,
      startShow,
      differences,
      showDifferences,
      currentModal,
      inputData,
      actionDiffirence,
      // activeChanger
    }
  },

  components: {
    ProductShow,
    IconChevron,
    IconChange,
    IconCheck,
    IconCross,
  },

  methods: {
    openModal(index) {
      if (index === this.currentModal) {
        this.$store.dispatch('updateCurrentModal', '')
        return
      }
      this.$store.dispatch('updateCurrentModal', index)
      this.inputData = ''
    },

    changeProduct(index) {
      this.productSwap(this.products, index, this.currentModal)
      this.$store.dispatch('updateCurrentModal', '')
      this.inputData = ''
    },

    productSwap(products, a, b) {
      const replaceable = products.findIndex(item => item.id === a) // Заменяющий
      const replacing = products.findIndex(item => item.id === b) // Заменяемый

      if (replaceable === -1 || replacing === -1) {
        throw new Error('Один из ID не найден')
      } else {
        ;[products[replaceable], products[replacing]] = [
          products[replacing],
          products[replaceable],
        ]
      }
    },

    inputFilter(productName) {
      if (this.inputData === '') {
        return true
      }
      if (productName.toLowerCase().includes(this.inputData.toLowerCase())) {
        return true
      } else {
        return false
      }
    },
  },
}
</script>

<template>
  <section class="difference">
    <div class="title-wrapper">
      <div class="container">
        <div class="title">
          <h1>Смартфоны</h1>
          <ProductShow />
        </div>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="container">
        <table class="phone-table">
          <thead>
            <tr>
              <th>
                <input
                  @change="actionDiffirence"
                  v-model="showDifferences"
                  id="show-diff"
                  type="checkbox"
                />
                <label for="show-diff">Показать различия</label>
              </th>
              <th
                class="product"
                v-for="(product, index) in products.slice(0, startShow)"
                :key="index"
              >
                <img
                  class="product-image"
                  :src="`/data/photo/` + product.photo"
                  alt="Фото"
                />
                <span class="product-title">{{ product.name }} </span>
                <!-- <span
                  v-if="startShow === 6"
                  class="all"
                  >
                  Отображены все устройства
                </span> -->
                <button
                  :key="index"
                  @click="openModal(product.id)"
                  :class="{ active: currentModal === product.id }"
                  v-if="startShow !== 6"
                  class="product-changer"
                >
                  <IconChevron />
                </button>
                <!-- Здесь можно отрефакторить и сделать одну модалку в body или использовать teleport -->
                <div
                  v-show="currentModal === product.id"
                  class="product-modal"
                  v-if="startShow !== 6"
                >
                  <input
                    v-model="inputData"
                    v-if="startShow < 3"
                    placeholder="Поиск"
                    type="text"
                  />
                  <div class="other-products">
                    <div
                      class="product"
                      v-for="(product, index) in products.slice(startShow)"
                      :key="index"
                      v-show="inputFilter(product.name)"
                    >
                      <button
                        class="change-button"
                        @click="changeProduct(product.id)"
                      >
                        <IconChange />
                      </button>
                      <img
                        class="image-modal"
                        :src="`/data/photo/` + product.photo"
                        alt="Фото"
                      />
                      <span class="name-modal">{{ product.name }}</span>
                    </div>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <!-- Или в цикле -->
          <tbody>
            <tr v-show="!this.showDifferences || this.differences.manufacturer">
              <td>производитель</td>
              <td
                v-for="(product, index) in products.slice(0, startShow)"
                :key="index"
              >
                {{ product.manufacturer }}
              </td>
            </tr>
            <tr v-show="!this.showDifferences || this.differences.year">
              <td>год релиза</td>
              <td
                v-for="(product, index) in products.slice(0, startShow)"
                :key="index"
              >
                {{ product.year }}
              </td>
            </tr>
            <tr v-show="!this.showDifferences || this.differences.diag">
              <td>диагональ экрана(дюйм)</td>
              <td
                v-for="(product, index) in products.slice(0, startShow)"
                :key="index"
              >
                {{ product.diag }}
              </td>
            </tr>
            <tr v-show="!this.showDifferences || this.differences.country">
              <td>страна производитель</td>
              <td
                v-for="(product, index) in products.slice(0, startShow)"
                :key="index"
              >
                {{ product.country }}
              </td>
            </tr>
            <tr v-show="!this.showDifferences || this.differences.memory">
              <td>объем памяти</td>
              <td
                v-for="(product, index) in products.slice(0, startShow)"
                :key="index"
              >
                {{ product.memory }}
              </td>
            </tr>
            <tr v-show="!this.showDifferences || this.differences.hertz">
              <td>частота обновления экрана</td>
              <td
                v-for="(product, index) in products.slice(0, startShow)"
                :key="index"
              >
                {{ product.hertz }}
              </td>
            </tr>
            <tr v-show="!this.showDifferences || this.differences.nfc">
              <td>nfc</td>
              <td
                v-for="(product, index) in products.slice(0, startShow)"
                :key="index"
              >
                <IconCheck v-if="product.nfc" />
                <IconCross v-else />
              </td>
            </tr>
            <tr v-show="!this.showDifferences || this.differences.esim">
              <td>поддержка esim</td>
              <td
                v-for="(product, index) in products.slice(0, startShow)"
                :key="index"
              >
                <IconCheck v-if="product.esim" />
                <IconCross v-else />
              </td>
            </tr>
            <tr v-show="!this.showDifferences || this.differences.wlcharge">
              <td>поддержка безпроводной зарядки</td>
              <td
                v-for="(product, index) in products.slice(0, startShow)"
                :key="index"
              >
                <IconCheck v-if="product.wlcharge" />
                <IconCross v-else />
              </td>
            </tr>
            <tr v-show="!this.showDifferences || this.differences.price">
              <td>стоимость</td>
              <td
                v-for="(product, index) in products.slice(0, startShow)"
                :key="index"
              >
                {{ product.price }} ₽
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
