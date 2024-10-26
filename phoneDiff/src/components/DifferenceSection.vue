<script lang="ts">
import ProductShow from '../components/ProductShow.vue'

import IconChevron from './icons/IconChevron.vue';
import IconChange from './icons/IconChange.vue';

import { onMounted, computed, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const differences = ref({})
    const show = ref(true)
    const activeButton = ref('')
    const inputData = ref('')

    onMounted(() => {
      store.dispatch('loadProducts')
    })

    const products = computed(() => store.getters.allProducts)
    const startShow = computed(() => store.getters.currentShow)

    // console.log(differences);

    return {
      products,
      startShow,
      differences,
      show,
      activeButton,
      inputData
      // activeChanger
    }

  },

  components: {
    ProductShow,
    IconChevron,
    IconChange,
  },

  methods: {
    showDiffirence(e) {
      this.show = !this.show

      const keys = Object.keys(this.products[0] || {})

      // Сравниваем свойства всех продуктов
      keys.forEach(key => {
        const values = this.products.map(product => product[key])

        const uniqueValues = [...new Set(values)]

        if (uniqueValues.length > 1) {
          this.differences[key] = values
        }
      })

      console.log(this.differences, this.products)

      return this.differences
    },

    openModal(index){
      if (index === this.activeButton){
        this.activeButton = ''
        return
      }

      this.activeButton = index
      console.log(this.activeButton)
    },

    changeProduct(index){
      this.productSwap(this.products, index, this.activeButton)
      this.activeButton = ''
    },

    productSwap(products, a, b){

      const replaceable = products.findIndex(item => item.id === a) // Заменяющий
      const replacing = products.findIndex(item => item.id === b) // Заменяемый

      if (replaceable !== -1 && replacing !== -1) {
        [products[replaceable], products[replacing]] = [products[replacing], products[replaceable]]

      } else {
          throw new Error("Один из ID не найден")
      }
    },

    inputShow(e){
      this.inputData = e.target.value.toLowerCase()

      for (const product of e.target.nextSibling.children) {

        if (this.inputData === '') {
          product.classList.remove('filtered')
        }

        if (!product.querySelector('.name-modal').textContent.toLowerCase().includes(this.inputData)){
          product.classList.add('filtered')
        }

        else {
          product.classList.remove('filtered')
        }
      }
    }
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
                  @change="showDiffirence"
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
                <img class="product-image" :src="`/data/photo/`+ product.photo" alt="Фото">
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
                  :class="{ 'active': activeButton === product.id }"
                  v-if="startShow !== 6"
                  class="product-changer"
                  >
                  <IconChevron />
                </button>
                <div
                v-show="activeButton === product.id"
                class="product-modal"
                v-if="startShow !== 6"
                >
                  <input @input="inputShow" v-if="startShow < 3" placeholder="Поиск" type="text">
                  <div class="other-products">
                    <div
                    class="product"
                    v-for="(product, index) in products.slice(startShow)"
                    :key="index"
                    >
                      <button
                      class="change-button"
                      @click="changeProduct(product.id)"
                      >
                        <IconChange />
                      </button>
                      <img class="image-modal" :src="`/data/photo/`+ product.photo" alt="Фото">
                      <span class="name-modal">{{ product.name }}</span>
                    </div>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>производитель</td>
              <td
                v-for="(product, index) in products.slice(0, startShow)"
                :key="index"
              >
                {{ product.manufacturer }}
              </td>
            </tr>
            <tr>
              <td>год релиза</td>
              <td
                v-for="(product, index) in products.slice(0, startShow)"
                :key="index"
              >
                {{ product.year }}
              </td>
            </tr>
            <tr>
              <td>диагональ экрана(дюйм)</td>
              <td
                v-for="(product, index) in products.slice(0, startShow)"
                :key="index"
              >
                {{ product.diag }}
              </td>
            </tr>
            <tr>
              <td>страна производитель</td>
              <td
                v-for="(product, index) in products.slice(0, startShow)"
                :key="index"
              >
                {{ product.country }}
              </td>
            </tr>
            <tr>
              <td>объем памяти</td>
              <td
                v-for="(product, index) in products.slice(0, startShow)"
                :key="index"
              >
                {{ product.memory }}
              </td>
            </tr>
            <tr>
              <td>частота обновления экрана</td>
              <td
                v-for="(product, index) in products.slice(0, startShow)"
                :key="index"
              >
                {{ product.hertz }}
              </td>
            </tr>
            <tr>
              <td>nfc</td>
              <td
                v-for="(product, index) in products.slice(0, startShow)"
                :key="index"
              >
                {{ product.nfc }}
              </td>
            </tr>
            <tr>
              <td>поддержка esim</td>
              <td
                v-for="(product, index) in products.slice(0, startShow)"
                :key="index"
              >
                {{ product.esim }}
              </td>
            </tr>
            <tr>
              <td>поддержка безпроводной зарядки</td>
              <td
                v-for="(product, index) in products.slice(0, startShow)"
                :key="index"
              >
                {{ product.wlcharge }}
              </td>
            </tr>
            <tr>
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
