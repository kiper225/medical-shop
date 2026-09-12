<script setup>
import { useCartStore } from '../stores/cart'

const cart = useCartStore()

const formatPrice = (price) => {
  return price.toLocaleString('fr-FR')
}
</script>

<template>

  <section class="min-h-screen bg-gray-50 py-16">

    <div class="mx-auto max-w-5xl px-6">

      <h1 class="text-4xl font-bold text-gray-900">
        Mon panier
      </h1>

      <p class="mt-2 text-gray-500">
        {{ cart.totalItems }} article(s)
      </p>


      <!-- Panier vide -->
      <div
        v-if="cart.items.length === 0"
        class="mt-10 rounded-2xl bg-white p-12 text-center shadow-sm"
      >

        <div class="text-6xl">
          🛒
        </div>

        <h2 class="mt-5 text-2xl font-bold">
          Votre panier est vide
        </h2>

        <p class="mt-3 text-gray-500">
          Ajoutez des équipements médicaux pour commencer.
        </p>

      </div>


      <!-- Panier -->
      <div
        v-else
        class="mt-10 grid gap-8 lg:grid-cols-3"
      >

        <!-- Produits -->
        <div class="space-y-4 lg:col-span-2">

          <div
            v-for="item in cart.items"
            :key="item.id"
            class="flex items-center gap-5 rounded-2xl bg-white p-5 shadow-sm"
          >

            <!-- Icône -->
            <div
              class="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-4xl"
            >
              {{ item.icon }}
            </div>


            <!-- Informations -->
            <div class="flex-1">

              <h2 class="font-bold text-gray-900">
                {{ item.name }}
              </h2>

              <p class="mt-1 font-semibold text-blue-600">
                {{ formatPrice(item.price) }} FCFA
              </p>


              <!-- Quantité -->
              <div class="mt-3 flex items-center gap-3">

                <button
                  @click="cart.decreaseQuantity(item.id)"
                  class="flex h-8 w-8 items-center justify-center rounded border"
                >
                  −
                </button>

                <span class="font-semibold">
                  {{ item.quantity }}
                </span>

                <button
                  @click="cart.increaseQuantity(item.id)"
                  class="flex h-8 w-8 items-center justify-center rounded border"
                >
                  +
                </button>

              </div>

            </div>


            <!-- Sous-total -->
            <div class="text-right">

              <p class="font-bold">
                {{ formatPrice(item.price * item.quantity) }}
                FCFA
              </p>

              <button
                @click="cart.removeFromCart(item.id)"
                class="mt-2 text-sm text-red-500 hover:text-red-700"
              >
                Supprimer
              </button>

            </div>

          </div>

        </div>


        <!-- Résumé -->
        <div class="h-fit rounded-2xl bg-white p-6 shadow-sm">

          <h2 class="text-xl font-bold">
            Résumé de la commande
          </h2>

          <div class="mt-6 flex justify-between">
            <span class="text-gray-500">
              Articles
            </span>

            <span>
              {{ cart.totalItems }}
            </span>
          </div>

          <div class="mt-4 flex justify-between border-t pt-4">

            <span class="font-semibold">
              Total
            </span>

            <span class="text-2xl font-bold text-blue-600">
              {{ formatPrice(cart.totalPrice) }} FCFA
            </span>

          </div>

          <button
            class="mt-6 w-full rounded-lg bg-blue-600 px-5 py-4 font-semibold text-white hover:bg-blue-700"
          >
            Passer la commande
          </button>

          <button
            @click="cart.clearCart()"
            class="mt-3 w-full rounded-lg border px-5 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            Vider le panier
          </button>

        </div>

      </div>

    </div>

  </section>

</template>