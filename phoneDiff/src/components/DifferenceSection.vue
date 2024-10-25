<script lang="ts">
import { log } from 'console'
import ProductCounter from '../components/ProductCounter.vue'

import { onMounted, computed, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const differences = ref({})
    const show = ref(true)

    onMounted(() => {
      store.dispatch('loadProducts')
    })

    const products = computed(() => store.getters.allProducts)
    console.log(products);
    
    const startShow = computed(() => store.getters.currentCount)
    // console.log(differences);
    return {
      products,
      startShow,
      differences,
      show,
    }
    
  },

  components: {
    ProductCounter,
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

      console.log(this.differences);
      
      return this.differences
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
          <ProductCounter />
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
                v-for="(product, index) in products.slice(0, startShow)"
                :key="index"
              >
                {{ product.name }}
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
