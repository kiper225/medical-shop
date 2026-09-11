<template>
  <header class="bg-white shadow-sm">
    <nav class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

      <!-- Logo -->
      <div class="flex items-center gap-3">
        <div class="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-xl text-white">
          🏥
        </div>

        <div>
          <h1 class="text-xl font-bold text-blue-700">
            MEDICAL SHOP
          </h1>

          <p class="text-xs text-gray-500">
            Équipements médicaux
          </p>
        </div>
      </div>

      <!-- Navigation -->
      <div class="hidden items-center gap-8 md:flex">

        <RouterLink
          to="/"
          class="font-medium text-gray-700 hover:text-blue-600"
        >
          Accueil
        </RouterLink>

        <RouterLink
          to="/catalogue"
          class="font-medium text-gray-700 hover:text-blue-600"
        >
          Équipements
        </RouterLink>

        <RouterLink
          to="/location"
          class="font-medium text-gray-700 hover:text-blue-600"
        >
          Location
        </RouterLink>

        <RouterLink
          to="/services"
          class="font-medium text-gray-700 hover:text-blue-600"
        >
          Services
        </RouterLink>

        <RouterLink
          to="/a-propos"
          class="font-medium text-gray-700 hover:text-blue-600"
        >
          À propos
        </RouterLink>

      </div>

      <!-- Actions -->
      <div class="flex items-center gap-4">

        <button
          class="hidden rounded-lg border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 md:block"
        >
          Connexion
        </button>

        <button
          class="relative rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          🛒

          <span
            class="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white"
          >
            0
          </span>
        </button>

      </div>

    </nav>
  </header>
</template>