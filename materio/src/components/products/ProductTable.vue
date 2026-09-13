<script setup>
defineProps({
  products: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits([
  'edit',
  'delete',
])

const getProductImage = product => {
  /*
   * Si une nouvelle image a été sélectionnée,
   * imageFile contient un objet File.
   */
  if (product.imageFile instanceof File) {
    return URL.createObjectURL(product.imageFile)
  }

  /*
   * Si l'image existe déjà sous forme d'URL
   * ou de chemin.
   */
  if (product.image) {
    return product.image
  }

  /*
   * Aucune image.
   */
  return null
}

const getInitials = name => {
  if (!name) {
    return 'PM'
  }

  return name
    .split(' ')
    .slice(0, 2)
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
}
</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>
        Liste des équipements
      </VCardTitle>

      <VCardSubtitle>
        {{ products.length }} équipement(s)
      </VCardSubtitle>
    </VCardItem>

    <VDivider />

    <VTable class="text-no-wrap">
      <thead>
        <tr>
          <th>
            IMAGE
          </th>

          <th>
            PRODUIT
          </th>

          <th>
            RÉFÉRENCE
          </th>

          <th>
            CATÉGORIE
          </th>

          <th>
            MARQUE
          </th>

          <th>
            PRIX
          </th>

          <th>
            STOCK
          </th>

          <th>
            ÉTAT
          </th>

          <th class="text-center">
            ACTIONS
          </th>
        </tr>
      </thead>

      <tbody>

        <!-- Products -->
        <tr
          v-for="product in products"
          :key="product.id"
        >

          <!-- ============================== -->
          <!-- IMAGE -->
          <!-- ============================== -->

          <td>
            <div class="product-image">

              <VImg
                v-if="getProductImage(product)"
                :src="getProductImage(product)"
                :alt="product.name"
                width="56"
                height="56"
                cover
                class="rounded-lg"
              />

              <VAvatar
                v-else
                size="56"
                color="primary"
                variant="tonal"
                rounded="lg"
              >
                <span class="text-body-1 font-weight-medium">
                  {{ getInitials(product.name) }}
                </span>
              </VAvatar>

            </div>
          </td>

          <!-- ============================== -->
          <!-- PRODUCT -->
          <!-- ============================== -->

          <td>
            <div class="d-flex align-center">

              <div>
                <div class="font-weight-medium">
                  {{ product.name }}
                </div>

                <div class="text-caption text-medium-emphasis">
                  {{ product.condition }}
                </div>
              </div>

            </div>
          </td>

          <!-- ============================== -->
          <!-- REFERENCE -->
          <!-- ============================== -->

          <td>
            <span class="text-body-2">
              {{ product.reference }}
            </span>
          </td>

          <!-- ============================== -->
          <!-- CATEGORY -->
          <!-- ============================== -->

          <td>
            <VChip
              size="small"
              variant="tonal"
              color="primary"
            >
              {{ product.category }}
            </VChip>
          </td>

          <!-- ============================== -->
          <!-- BRAND -->
          <!-- ============================== -->

          <td>
            {{ product.brand || '-' }}
          </td>

          <!-- ============================== -->
          <!-- PRICE -->
          <!-- ============================== -->

          <td>
            <div class="font-weight-medium">
              {{ Number(product.price || 0).toLocaleString('fr-FR') }}
              FCFA
            </div>

            <div
              v-if="product.rentalAvailable"
              class="text-caption text-primary"
            >
              Location :
              {{ Number(product.rentalPrice || 0).toLocaleString('fr-FR') }}
              FCFA/jour
            </div>
          </td>

          <!-- ============================== -->
          <!-- STOCK -->
          <!-- ============================== -->

          <td>
            <VChip
              size="small"
              :color="product.stock <= 3 ? 'warning' : 'success'"
              variant="tonal"
            >
              {{ product.stock }}
            </VChip>
          </td>

          <!-- ============================== -->
          <!-- STATUS -->
          <!-- ============================== -->

          <td>
            <VChip
              size="small"
              :color="product.stock <= 3 ? 'warning' : 'success'"
              variant="tonal"
            >
              {{
                product.stock <= 3
                  ? 'Stock faible'
                  : 'Disponible'
              }}
            </VChip>
          </td>

          <!-- ============================== -->
          <!-- ACTIONS -->
          <!-- ============================== -->

          <td>
            <div class="d-flex justify-center">

              <VBtn
                icon
                size="small"
                variant="text"
                color="primary"
                @click="emit('edit', product)"
              >
                <VIcon icon="ri-edit-line" />
              </VBtn>

              <VBtn
                icon
                size="small"
                variant="text"
                color="error"
                @click="emit('delete', product)"
              >
                <VIcon icon="ri-delete-bin-line" />
              </VBtn>

            </div>
          </td>

        </tr>

        <!-- ============================== -->
        <!-- EMPTY STATE -->
        <!-- ============================== -->

        <tr v-if="products.length === 0">
          <td
            colspan="9"
            class="text-center py-10"
          >
            <VIcon
              icon="ri-inbox-line"
              size="48"
              class="mb-3"
            />

            <div class="text-h6">
              Aucun équipement trouvé
            </div>

            <div class="text-body-2 text-medium-emphasis">
              Aucun produit ne correspond aux critères actuels.
            </div>
          </td>
        </tr>

      </tbody>
    </VTable>
  </VCard>
</template>

<style scoped>
.product-image {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
}
</style>