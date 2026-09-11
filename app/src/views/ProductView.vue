<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { products } from '../data/products'

const route = useRoute()

const productId = Number(route.params.id)

const product = computed(() => {
  return products.find((item) => item.id === productId)
})
</script>

<template>

  <section class="min-h-screen bg-gray-50 py-16">

    <div class="mx-auto max-w-7xl px-6">

      <!-- Produit trouvé -->
      <div
        v-if="product"
        class="grid gap-10 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-2 md:p-10"
      >

        <!-- Illustration -->
        <div
          class="flex min-h-[400px] items-center justify-center rounded-2xl bg-gray-100"
        >
          <span class="text-9xl">
            {{ product.icon }}
          </span>
        </div>


        <!-- Informations -->
        <div>

          <!-- Catégorie -->
          <p class="font-semibold text-blue-600">
            {{ product.category }}
          </p>

          <!-- Nom -->
          <h1 class="mt-3 text-4xl font-bold text-gray-900">
            {{ product.name }}
          </h1>

          <!-- Description -->
          <p class="mt-6 leading-7 text-gray-600">
            {{ product.description }}
          </p>


          <!-- Prix -->
          <div class="mt-8">

            <p class="text-3xl font-bold text-gray-900">
              {{ product.price.toLocaleString('fr-FR') }} FCFA
            </p>

            <p
              v-if="product.availableForRent"
              class="mt-2 text-gray-500"
            >
              Location :
              <span class="font-semibold text-blue-600">
                {{ product.rentalPrice.toLocaleString('fr-FR') }}
                FCFA / jour
              </span>
            </p>

          </div>


          <!-- Disponibilité -->
          <div class="mt-6">

            <span
              v-if="product.stock > 0"
              class="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700"
            >
              ✓ Disponible
            </span>

            <span
              v-else
              class="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700"
            >
              Rupture de stock
            </span>

          </div>


          <!-- Actions -->
          <div class="mt-8 flex flex-col gap-4 sm:flex-row">

            <button
              v-if="product.availableForSale"
              class="rounded-lg bg-blue-600 px-6 py-4 font-semibold text-white hover:bg-blue-700"
            >
              🛒 Ajouter au panier
            </button>

            <button
              v-if="product.availableForRent"
              class="rounded-lg border border-blue-600 px-6 py-4 font-semibold text-blue-600 hover:bg-blue-50"
            >
              📅 Louer cet équipement
            </button>

          </div>


          <!-- Services -->
          <div class="mt-10 border-t pt-8">

            <h2 class="text-xl font-bold text-gray-900">
              Services disponibles
            </h2>

            <div class="mt-5 grid gap-4 sm:grid-cols-2">

              <div class="rounded-lg bg-gray-50 p-4">
                <p class="font-semibold">
                  🚚 Livraison
                </p>
                <p class="mt-1 text-sm text-gray-500">
                  Livraison de votre équipement.
                </p>
              </div>

              <div class="rounded-lg bg-gray-50 p-4">
                <p class="font-semibold">
                  🔧 Installation
                </p>
                <p class="mt-1 text-sm text-gray-500">
                  Installation par un technicien.
                </p>
              </div>

              <div class="rounded-lg bg-gray-50 p-4">
                <p class="font-semibold">
                  🎓 Formation
                </p>
                <p class="mt-1 text-sm text-gray-500">
                  Formation à l'utilisation.
                </p>
              </div>

              <div class="rounded-lg bg-gray-50 p-4">
                <p class="font-semibold">
                  🛠️ Maintenance
                </p>
                <p class="mt-1 text-sm text-gray-500">
                  Assistance et maintenance.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>


      <!-- Produit inexistant -->
      <div
        v-else
        class="rounded-2xl bg-white p-10 text-center shadow-sm"
      >

        <h1 class="text-3xl font-bold text-gray-900">
          Produit introuvable
        </h1>

        <p class="mt-4 text-gray-500">
          L'équipement demandé n'existe pas.
        </p>

      </div>

    </div>

  </section>

</template>