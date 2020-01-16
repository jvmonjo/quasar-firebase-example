<template>
  <q-page padding>

    <div v-if="loading">
      <q-spinner /> Fetching data...
    </div>

    <div v-else>
      <div v-for="(product, index) in products"
          :key="index">
<img :src="product.image">
{{ product.name }}
      </div>

    </div>

  </q-page>
</template>

<style>
</style>

<script>

export default {
  name: 'PageIndex',

  data () {
    return {
      loading: true,
      products: []
    }
  },

  created () {
    this.getData()
  },

  methods: {
    getData () {
      this.loading = true
      this.products = []

      let collection = this.$firebase.firestore().collection('products')

      collection.get()
        .then(querySnapshot => {
          querySnapshot.forEach(product => {
            this.products.push(product.data())
          })
          this.loading = false
        })
        .catch(error => console.error(error))
    }
  }
}
</script>
