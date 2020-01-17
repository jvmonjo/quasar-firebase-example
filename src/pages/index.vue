<template>
  <q-page padding class="bg-grey-2">

    <div v-if="loading">
      <q-spinner size="5.5em" />
    </div>

    <div v-else>
      <q-table
        title="Products"
        :data="products"
        :columns="columns"
        :pagination.sync="pagination"
        row-key="name"
        dense
        wrap-cells
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="image" :props="props">
              <img class="product" :src="props.row.image" alt="">
            </q-td>
            <q-td key="name" style='max-width: 100px' :props="props">
              {{ props.row.name }}
            </q-td>
            <q-td key="variant" style='max-width: 50px' :props="props">
              {{props.row.variant}}
            </q-td>
            <q-td key="price" :props="props">
              {{$n(props.row.price, 'currency')}}
            </q-td>
            <q-td key="quantity" :props="props">
              <q-input
                v-model.number="props.row.quantity"
                type="number"
                filled
                style="max-width: 50px"
              />
            </q-td>
            <q-td key="total" :props="props">
              <span v-if="props.row.quantity > 0">{{$n(props.row.price * props.row.quantity, 'currency')}}</span>
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <div id="subtotal" class="fixed-bottom text-right">
        <q-btn style="margin-right: 1rem" :loading="loading" @click.native="placeOrder" :disable="!items.length > 0" color="primary">Place Order</q-btn>
        <span v-if="items.length > 0">Subtotal {{$n(total, 'currency')}}</span>
      </div>
    </div>
    <!-- <q-btn
      v-if="!products.length && !loading"
      label="Seed Data"
      class="q-mt-md"
      @click="seedData()"
    /> -->

  </q-page>
</template>

<script>
import seedData from '../../data/products.json'
export default {
  name: 'PageIndex',

  data () {
    return {
      loading: false,
      pagination: {
        // sortBy: '',
        // descending: true,
        page: 1,
        rowsPerPage: 0
        // rowsNumber: xx if getting data from a server
      },
      products: [],
      columns: [
        { name: 'image', classes: 'ellipsis', style: 'max-width: 100px', headerClasses: 'bg-primary text-white', align: 'center', label: 'Image', field: 'iamge', sortable: false },
        { name: 'name', classes: 'ellipsis', style: 'max-width: 100px', align: 'left', label: 'Name', field: 'name', sortable: true },
        { name: 'variant', label: 'Variant', align: 'left', field: 'variant', sortable: true },
        { name: 'price', label: 'Price', align: 'left', field: 'price', sortable: false },
        { name: 'quantity', align: 'left', label: 'Quantity', field: 'quantity', sortable: false },
        { name: 'total', align: 'left', label: 'Total', sortable: false }
      ]
    }
  },

  created () {
    this.getData()
  },
  computed: {
    items () {
      const items = this.products.filter(product => {
        return product.quantity > 0
      })
      // console.log('items', items)
      return items
    },
    total () {
      return this.items.map(item => item.price * item.quantity).reduce((prev, curr) => prev + curr)
    },
    order () {
      let itemsString = ''
      this.items.forEach(item => {
        const line = `
        <img src="${item.image}"><br>
        <h2>${item.name}</h2>
        <h3>Variant: ${item.variant}<h3>
        <p>
          Quantity: ${item.quantity}<br>
          Price: ${item.price}
        </p>
        <hr>
        `
        itemsString += line
      })
      const message = `
        Name: ${this.$store.state.auth.user.displayName}<br>
        Email: ${this.$store.state.auth.user.email}<br>
        <h1>
          Order:
        </h1>
        <div>${itemsString}</div>
        `
      const order = {}
      order.client = {}
      order.client.name = this.$store.state.auth.user.displayName
      order.client.email = this.$store.state.auth.user.email
      order.client.uid = this.$store.state.auth.user.uid
      order.items = this.items
      order.to = ['infotsblades@gmail.com']
      order.message = {
        subject: 'New order placed!',
        text: message,
        html: message
      }
      return order
    }
  },
  methods: {
    getData () {
      this.loading = true
      const vm = this
      this.products = []

      let collection = this.$firebase.firestore().collection('products').orderBy('position', 'asc')

      collection.get()
        .then(querySnapshot => {
          querySnapshot.forEach(product => {
            let data = {}
            data = {...product.data()}
            data.quantity = 0
            this.products.push(data)
          })
          vm.loading = false
        })
        .catch(error => console.error(error))
    },
    seedData () {
      let collection = this.$firebase.firestore().collection('products')
      seedData.forEach(todo => {
        collection.doc().set(todo)
          .then(() => {
            console.log('Created', todo.title)
          })
          .catch(error => console.error(error))
      })
      this.getData()
    },
    placeOrder () {
      this.loading = true
      const vm = this
      let orders = this.$firebase.firestore().collection('orders')
      orders.add(this.order)
        .then(function (docRef) {
          console.log('Document written with ID: ', docRef.id)
          vm.loading = false
          vm.$q.notify('Order placed succesfully')
        })
        .catch(function (error) {
          console.error('Error adding document: ', error)
          vm.loading = false
        })
    }
  }
}
</script>

<style scoped>
.q-page{
  margin-bottom: 5rem;
}
img.product {
  width: 80px;
  height: auto;
}
#subtotal {
  min-height: 80px;
  background-color: rgba(255,255,255,0.8);
  padding: 2rem;
  border-top: 1px solid black;
}
</style>
