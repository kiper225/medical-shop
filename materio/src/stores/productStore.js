import { defineStore } from 'pinia'
import { products as initialProducts } from '@/data/products'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [...initialProducts],

    loading: false,

    error: null,
  }),

  getters: {
    productCount: state => state.products.length,

    availableProducts: state =>
      state.products.filter(product => product.stock > 0),

    lowStockProducts: state =>
      state.products.filter(product => product.stock <= 3),

    rentalProducts: state =>
      state.products.filter(product => product.rentalAvailable),

    saleProducts: state =>
      state.products.filter(product => product.saleAvailable),
  },

  actions: {
    addProduct(productData) {
      this.loading = true
      this.error = null

      try {
        const {
          imageFile,
          ...product
        } = productData

        const newProduct = {
          ...product,
          id: Date.now(),
        }

        this.products.push(newProduct)

        return newProduct
      } catch (error) {
        this.error = 'Impossible d’ajouter le produit.'

        console.error(error)

        return null
      } finally {
        this.loading = false
      }
    },

    updateProduct(id, productData) {
      this.loading = true
      this.error = null

      try {
        const index = this.products.findIndex(
          product => product.id === id,
        )

        if (index === -1) {
          this.error = 'Produit introuvable.'

          return null
        }

        const {
          imageFile,
          ...product
        } = productData

        this.products[index] = {
          ...this.products[index],
          ...product,
        }

        return this.products[index]
      } catch (error) {
        this.error = 'Impossible de modifier le produit.'

        console.error(error)

        return null
      } finally {
        this.loading = false
      }
    },

    deleteProduct(id) {
      this.loading = true
      this.error = null

      try {
        const productExists = this.products.some(
          product => product.id === id,
        )

        if (!productExists) {
          this.error = 'Produit introuvable.'

          return false
        }

        this.products = this.products.filter(
          product => product.id !== id,
        )

        return true
      } catch (error) {
        this.error = 'Impossible de supprimer le produit.'

        console.error(error)

        return false
      } finally {
        this.loading = false
      }
    },

    getProductById(id) {
      return this.products.find(
        product => product.id === id,
      )
    },

    clearError() {
      this.error = null
    },
  },
})