import { defineStore } from 'pinia'
import api from '@/services/api'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [],
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
      state.products.filter(product => product.rental_available),

    saleProducts: state =>
      state.products.filter(product => product.sale_available),
  },

  actions: {
    async fetchProducts() {
      this.loading = true
      this.error = null

      try {
        const response = await api.get('/products')

        this.products = response.data.data

        return this.products
      } catch (error) {
        console.error(error)

        this.error = 'Impossible de charger les produits.'

        return []
      } finally {
        this.loading = false
      }
    },

    async addProduct(productData) {
      this.loading = true
      this.error = null

      try {
        const formData = new FormData()

        Object.entries(productData).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            formData.append(key, value)
          }
        })

        const response = await api.post(
          '/products',
          formData,
        )

        const newProduct = response.data.data

        this.products.unshift(newProduct)

        return newProduct
      } catch (error) {
        console.error(error)

        this.error =
          error.response?.data?.message ||
          'Impossible d’ajouter le produit.'

        return null
      } finally {
        this.loading = false
      }
    },

    async updateProduct(id, productData) {
      this.loading = true
      this.error = null

      try {
        const formData = new FormData()

        Object.entries(productData).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            formData.append(key, value)
          }
        })

        // Laravel reçoit le fichier avec POST
        // et interprète la requête comme PUT
        formData.append('_method', 'PUT')

        const response = await api.post(
          `/products/${id}`,
          formData,
        )

        const updatedProduct = response.data.data

        const index = this.products.findIndex(
          product => product.id === id,
        )

        if (index !== -1) {
          this.products[index] = updatedProduct
        }

        return updatedProduct
      } catch (error) {
        console.error(error)

        this.error =
          error.response?.data?.message ||
          'Impossible de modifier le produit.'

        return null
      } finally {
        this.loading = false
      }
    },

    async deleteProduct(id) {
      this.loading = true
      this.error = null

      try {
        await api.delete(`/products/${id}`)

        this.products = this.products.filter(
          product => product.id !== id,
        )

        return true
      } catch (error) {
        console.error(error)

        this.error =
          error.response?.data?.message ||
          'Impossible de supprimer le produit.'

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