<script setup>
import { products } from '../data/products'
import ProductCard from '../components/ProductCard.vue'
</script>

<template>

  <section class="min-h-screen bg-gray-50 py-16">

    <div class="mx-auto max-w-7xl px-6">

      <!-- En-tête -->
      <div class="text-center">

        <p class="font-semibold text-blue-600">
          NOTRE CATALOGUE
        </p>

        <h1 class="mt-2 text-4xl font-bold text-gray-900">
          Équipements médicaux
        </h1>

        <p class="mx-auto mt-4 max-w-2xl text-gray-600">
          Découvrez nos équipements disponibles à la vente
          et à la location.
        </p>

      </div>


      <!-- Produits -->
      <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />

      </div>

    </div>

  </section>

</template>