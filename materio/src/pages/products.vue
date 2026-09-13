<script setup>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'

import ProductFilters from '@/components/products/ProductFilters.vue'
import ProductForm from '@/components/products/ProductForm.vue'
import ProductTable from '@/components/products/ProductTable.vue'

import { useProductStore } from '@/stores/productStore'

const productStore = useProductStore()

const { products } = storeToRefs(productStore)

const showForm = ref(false)
const showDeleteDialog = ref(false)

const selectedProduct = ref(null)

const search = ref('')
const selectedCategory = ref('All')

const categories = [
  'All',
  'Diagnostic',
  'Oxygen Therapy',
  'Mobility',
  'Medical Furniture',
  'Monitoring',
  'Surgery',
]

/*
|--------------------------------------------------------------------------
| FILTER PRODUCTS
|--------------------------------------------------------------------------
*/

const filteredProducts = computed(() => {
  const searchValue = search.value.trim().toLowerCase()

  return products.value.filter(product => {
    const matchesSearch =
      !searchValue ||
      product.name?.toLowerCase().includes(searchValue) ||
      product.reference?.toLowerCase().includes(searchValue) ||
      product.brand?.toLowerCase().includes(searchValue)

    const matchesCategory =
      selectedCategory.value === 'All' ||
      product.category === selectedCategory.value

    return matchesSearch && matchesCategory
  })
})

/*
|--------------------------------------------------------------------------
| CREATE PRODUCT
|--------------------------------------------------------------------------
*/

const openCreateForm = () => {
  selectedProduct.value = null
  showForm.value = true
}

/*
|--------------------------------------------------------------------------
| EDIT PRODUCT
|--------------------------------------------------------------------------
*/

const openEditForm = product => {
  selectedProduct.value = { ...product }
  showForm.value = true
}

/*
|--------------------------------------------------------------------------
| CLOSE FORM
|--------------------------------------------------------------------------
*/

const closeForm = () => {
  showForm.value = false
  selectedProduct.value = null
}

/*
|--------------------------------------------------------------------------
| SAVE PRODUCT
|--------------------------------------------------------------------------
*/

const handleSaved = productData => {
  const product = {
    ...productData,

    status: productData.stock <= 3
      ? 'Low Stock'
      : 'Available',
  }

  if (selectedProduct.value) {
    productStore.updateProduct(
      selectedProduct.value.id,
      product,
    )
  } else {
    productStore.addProduct(product)
  }

  console.log('Produit reçu :', productData)
  console.log('Image sélectionnée :', productData.imageFile)

  closeForm()
}

/*
|--------------------------------------------------------------------------
| DELETE PRODUCT
|--------------------------------------------------------------------------
*/

const openDeleteDialog = product => {
  selectedProduct.value = product
  showDeleteDialog.value = true
}

const deleteProduct = () => {
  if (!selectedProduct.value) {
    return
  }

  productStore.deleteProduct(
    selectedProduct.value.id,
  )

  showDeleteDialog.value = false
  selectedProduct.value = null
}

const closeDeleteDialog = () => {
  showDeleteDialog.value = false
  selectedProduct.value = null
}
</script>

<template>
  <div>

    <!-- ===================================================== -->
    <!-- HEADER -->
    <!-- ===================================================== -->

    <div class="d-flex flex-wrap justify-space-between align-center mb-6">
      <div>
        <h1 class="text-h4 font-weight-bold">
          Produits
        </h1>

        <p class="text-body-1 text-medium-emphasis mb-0">
          Gestion des équipements médicaux
        </p>
      </div>

      <VBtn
        color="primary"
        prepend-icon="ri-add-line"
        @click="openCreateForm"
      >
        Ajouter un produit
      </VBtn>
    </div>

    <!-- ===================================================== -->
    <!-- FILTERS -->
    <!-- ===================================================== -->

    <ProductFilters
      v-model:search="search"
      v-model:category="selectedCategory"
      :categories="categories"
    />

    <!-- ===================================================== -->
    <!-- PRODUCTS TABLE -->
    <!-- ===================================================== -->

    <ProductTable
      :products="filteredProducts"
      @edit="openEditForm"
      @delete="openDeleteDialog"
    />

    <!-- ===================================================== -->
    <!-- ADD / EDIT PRODUCT MODAL -->
    <!-- ===================================================== -->

    <VDialog
      v-model="showForm"
      max-width="900"
      scrollable
    >
      <ProductForm
        :product="selectedProduct"
        @saved="handleSaved"
        @cancel="closeForm"
      />
    </VDialog>

    <!-- ===================================================== -->
    <!-- DELETE CONFIRMATION -->
    <!-- ===================================================== -->

    <VDialog
      v-model="showDeleteDialog"
      max-width="500"
    >
      <VCard>

        <VCardItem>
          <VCardTitle>
            Confirmer la suppression
          </VCardTitle>
        </VCardItem>

        <VCardText>
          Êtes-vous sûr de vouloir supprimer :

          <strong>
            {{ selectedProduct?.name }}
          </strong>

          ?

          <div class="text-body-2 text-medium-emphasis mt-2">
            Cette action supprimera le produit de la liste actuelle.
          </div>
        </VCardText>

        <VCardActions class="justify-end">

          <VBtn
            variant="outlined"
            @click="closeDeleteDialog"
          >
            Annuler
          </VBtn>

          <VBtn
            color="error"
            @click="deleteProduct"
          >
            Supprimer
          </VBtn>

        </VCardActions>

      </VCard>
    </VDialog>

  </div>
</template>