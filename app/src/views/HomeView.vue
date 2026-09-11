<script setup>
  import { categories } from '../data/categories'
  import { products } from '../data/products'
  import ProductCard from '../components/ProductCard.vue'

  defineProps({
    categories: {
      type: Array,
      default: () => categories
    },
    products: {
      type: Array,
      default: () => products
    }
  })
</script>

<template>
  <div>

    <!-- HERO -->
    <section class="bg-blue-700">
      <div
        class="mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 md:grid-cols-2"
      >

        <!-- Texte -->
        <div class="text-white">

          <span
            class="inline-block rounded-full bg-blue-600 px-4 py-2 text-sm font-medium"
          >
            🏥 Solutions médicales professionnelles
          </span>

          <h1 class="mt-6 text-4xl font-bold leading-tight md:text-6xl">
            Tout l'équipement médical dont vous avez besoin
          </h1>

          <p class="mt-6 max-w-xl text-lg leading-8 text-blue-100">
            Achetez ou louez vos équipements médicaux et bénéficiez
            de services professionnels d'installation, de formation
            et de maintenance.
          </p>

          <!-- Boutons -->
          <div class="mt-8 flex flex-wrap gap-4">

            <button
              class="rounded-lg bg-white px-6 py-3 font-semibold text-blue-700 shadow hover:bg-gray-100"
            >
              Voir les équipements
            </button>

            <button
              class="rounded-lg border border-white px-6 py-3 font-semibold text-white hover:bg-blue-600"
            >
              Louer un équipement
            </button>

          </div>

        </div>


        <!-- Illustration -->
        <div class="flex justify-center">

          <div
            class="flex h-80 w-full max-w-lg items-center justify-center rounded-3xl bg-blue-600 shadow-xl"
          >

            <div class="text-center text-white">

              <div class="text-8xl">
                🩺
              </div>

              <p class="mt-4 text-xl font-semibold">
                Équipements médicaux
              </p>

              <p class="mt-2 text-blue-100">
                Vente • Location • Installation
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>


    <!-- RECHERCHE -->
    <section class="-mt-8 px-6">

      <div class="mx-auto max-w-5xl">

        <div
          class="rounded-2xl bg-white p-4 shadow-xl"
        >

          <div class="flex flex-col gap-3 md:flex-row">

            <div class="flex flex-1 items-center rounded-lg border px-4">

              <span class="mr-3 text-xl">
                🔎
              </span>

              <input
                type="text"
                placeholder="Rechercher un équipement médical..."
                class="w-full py-3 outline-none"
              />

            </div>

            <button
              class="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Rechercher
            </button>

          </div>

        </div>

      </div>

    </section>


    <!-- CATEGORIES -->
    <section class="mx-auto max-w-7xl px-6 py-20">

      <div class="text-center">

        <p class="font-semibold text-blue-600">
          NOS CATÉGORIES
        </p>

        <h2 class="mt-2 text-3xl font-bold text-gray-900">
          Trouvez rapidement votre équipement
        </h2>

        <p class="mx-auto mt-4 max-w-2xl text-gray-600">
          Découvrez notre catalogue d'équipements médicaux
          adaptés aux professionnels de santé.
        </p>

      </div>


      <!-- Cartes -->
      <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

        <div
          v-for="category in categories"
          :key="category.id"
          class="group cursor-pointer rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >

          <div
            :class="[
              'flex h-14 w-14 items-center justify-center rounded-xl text-3xl',
              category.color
            ]"
          >
            {{ category.icon }}
          </div>

          <h3 class="mt-5 text-xl font-bold">
            {{ category.name }}
          </h3>

          <p class="mt-2 text-sm text-gray-500">
            {{ category.description }}
          </p>

          <p class="mt-4 font-semibold text-blue-600">
            Découvrir →
          </p>

        </div>

      </div>

    </section>

    <!-- PRODUITS -->
    <section class="bg-gray-50 py-20">

      <div class="mx-auto max-w-7xl px-6">

        <!-- Titre -->
        <div class="flex flex-col justify-between gap-4 md:flex-row md:items-end">

          <div>

            <p class="font-semibold text-blue-600">
              NOTRE CATALOGUE
            </p>

            <h2 class="mt-2 text-3xl font-bold text-gray-900">
              Équipements médicaux populaires
            </h2>

            <p class="mt-3 text-gray-600">
              Découvrez une sélection de nos équipements disponibles à la vente
              et à la location.
            </p>

          </div>

          <button
            class="font-semibold text-blue-600 hover:text-blue-800"
          >
            Voir tout le catalogue →
          </button>

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
  </div>
</template>