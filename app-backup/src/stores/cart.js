import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),

  getters: {
    totalItems: (state) => {
      return state.items.reduce((total, item) => {
        return total + item.quantity
      }, 0)
    },

    totalPrice: (state) => {
      return state.items.reduce((total, item) => {
        return total + item.price * item.quantity
      }, 0)
    }
  },

  actions: {
    addToCart(product) {
      const existingProduct = this.items.find(
        (item) => item.id === product.id
      )

      if (existingProduct) {
        existingProduct.quantity++
      } else {
        this.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          icon: product.icon,
          quantity: 1
        })
      }
    },

    removeFromCart(productId) {
      this.items = this.items.filter(
        (item) => item.id !== productId
      )
    },

    increaseQuantity(productId) {
      const item = this.items.find(
        (item) => item.id === productId
      )

      if (item) {
        item.quantity++
      }
    },

    decreaseQuantity(productId) {
      const item = this.items.find(
        (item) => item.id === productId
      )

      if (item && item.quantity > 1) {
        item.quantity--
      }
    },

    clearCart() {
      this.items = []
    }
  }
})