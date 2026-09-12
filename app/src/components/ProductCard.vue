<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <article
    class="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
  >

    <!-- Image / illustration -->
    <div
      class="flex h-52 items-center justify-center bg-gray-100 text-7xl"
    >
      {{ product.icon }}
    </div>

    <!-- Informations -->
    <div class="p-5">

      <span class="text-sm font-medium text-blue-600">
        {{ product.category }}
      </span>

      <RouterLink
        :to="`/produit/${product.id}`"
        class="mt-2 block text-xl font-bold text-gray-900 hover:text-blue-600"
      >
        {{ product.name }}
      </RouterLink>

      <p class="mt-2 line-clamp-2 text-sm text-gray-500">
        {{ product.description }}
      </p>

      <!-- Prix -->
      <div class="mt-5">

        <p class="text-2xl font-bold text-gray-900">
          {{ product.price.toLocaleString('fr-FR') }} FCFA
        </p>

        <p
          v-if="product.availableForRent"
          class="mt-1 text-sm text-gray-500"
        >
          Location :
          <span class="font-semibold text-blue-600">
            {{ product.rentalPrice.toLocaleString('fr-FR') }} FCFA/jour
          </span>
        </p>

      </div>

      <!-- Actions -->
      <div class="mt-5 flex gap-3">

        <button
          v-if="product.availableForSale"
          class="flex-1 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
          @click="cart.addToCart(product)"
        >
          Acheter
        </button>

        <button
          v-if="product.availableForRent"
          class="flex-1 rounded-lg border border-blue-600 px-4 py-3 font-semibold text-blue-600 hover:bg-blue-50"
        >
          Louer
        </button>

      </div>

    </div>

  </article>
</template>