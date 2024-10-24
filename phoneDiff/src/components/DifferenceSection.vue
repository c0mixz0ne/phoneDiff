<script lang="ts">
  import ProductCounter from '../components/ProductCounter.vue'

  export default {
      components: {
        ProductCounter,
      },
    };

</script>

<template>
  <section class="difference">
    <div class="title-wrapper">
      <div class="container">
        <div class="title">
          <h1>
            Смартфоны
          </h1>
          <ProductCounter />
        </div>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="container">
        1
      </div>
    </div>
  </section>
</template>
