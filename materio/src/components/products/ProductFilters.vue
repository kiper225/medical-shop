<script setup>
defineProps({
  search: {
    type: String,
    default: '',
  },

  category: {
    type: String,
    default: 'All',
  },

  categories: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits([
  'update:search',
  'update:category',
])
</script>

<template>
  <VCard class="mb-6">
    <VCardText>
      <VRow>
        <!-- Search -->
        <VCol
          cols="12"
          md="8"
        >
          <VTextField
            :model-value="search"
            label="Rechercher"
            placeholder="Nom, référence ou marque..."
            prepend-inner-icon="ri-search-line"
            clearable
            @update:model-value="emit('update:search', $event)"
          />
        </VCol>

        <!-- Category -->
        <VCol
          cols="12"
          md="4"
        >
          <VSelect
            :model-value="category"
            :items="categories"
            label="Catégorie"
            @update:model-value="emit('update:category', $event)"
          />
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>