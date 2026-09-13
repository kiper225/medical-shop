<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits([
  'saved',
  'cancel',
])

const categories = [
  'Diagnostic',
  'Oxygen Therapy',
  'Mobility',
  'Medical Furniture',
  'Monitoring',
  'Surgery',
]

const conditions = [
  'New',
  'Used',
  'Refurbished',
]

const form = ref(createEmptyForm())

const imagePreview = ref(null)
const imageFile = ref(null)
const imageError = ref('')

const fileInput = ref(null)

function createEmptyForm() {
  return {
    name: '',
    reference: '',
    category: '',
    brand: '',
    image: null,
    price: null,
    rentalPrice: null,
    stock: 0,
    condition: 'New',
    saleAvailable: true,
    rentalAvailable: false,
    installationRequired: false,
    maintenanceRequired: false,
  }
}

/**
 * Nettoie l'image actuellement affichée.
 */
function clearImage() {
  if (imagePreview.value?.startsWith('blob:')) {
    URL.revokeObjectURL(imagePreview.value)
  }

  imagePreview.value = null
  imageFile.value = null
  imageError.value = ''
}

/**
 * Réinitialise le champ fichier.
 */
function resetFileInput() {
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

/**
 * Charge les informations du produit.
 */
function loadProduct(product) {
  clearImage()

  if (!product) {
    form.value = createEmptyForm()
    return
  }

  form.value = {
    name: product.name ?? '',
    reference: product.reference ?? '',
    category: product.category ?? '',
    brand: product.brand ?? '',
    image: product.image ?? null,
    price: product.price ?? null,
    rentalPrice: product.rentalPrice ?? null,
    stock: product.stock ?? 0,
    condition: product.condition ?? 'New',
    saleAvailable: product.saleAvailable ?? true,
    rentalAvailable: product.rentalAvailable ?? false,
    installationRequired: product.installationRequired ?? false,
    maintenanceRequired: product.maintenanceRequired ?? false,
  }

  // ⭐ Important : récupérer l'image existante
  if (product.image) {
    imagePreview.value = product.image
  }
}

/**
 * IMPORTANT :
 * Le watch est placé après les fonctions
 * utilisées par loadProduct().
 */
watch(
  () => props.product,
  product => loadProduct(product),
  {
    immediate: true,
  },
)

const isEditMode = () => Boolean(props.product)

/**
 * Ouvre le sélecteur de fichiers.
 */
const openFilePicker = () => {
  fileInput.value?.click()
}

/**
 * Gestion de la sélection de l'image.
 */
const handleImageChange = event => {
  const file = event.target.files?.[0]

  imageError.value = ''

  if (!file) {
    return
  }

  /*
   * Vérification du format.
   */
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
  ]

  if (!allowedTypes.includes(file.type)) {
    imageError.value =
      'Format non accepté. Utilisez JPG, PNG ou WEBP.'

    resetFileInput()

    return
  }

  /*
   * Limite de 5 Mo.
   */
  const maxSize = 5 * 1024 * 1024

  if (file.size > maxSize) {
    imageError.value =
      'L’image ne doit pas dépasser 5 Mo.'

    resetFileInput()

    return
  }

  /*
   * Libère l'ancien aperçu.
   */
  if (imagePreview.value?.startsWith('blob:')) {
    URL.revokeObjectURL(imagePreview.value)
  }

    imageFile.value = file

    imagePreview.value = URL.createObjectURL(file)

    // On garde temporairement l'aperçu comme image
    form.value.image = imagePreview.value
}

/**
 * Supprime l'image.
 */
const removeImage = () => {
  clearImage()

  form.value.image = null

  resetFileInput()
}

/**
 * Enregistrement du produit.
 */
const saveProduct = () => {
  if (
    !form.value.name ||
    !form.value.reference ||
    !form.value.category
  ) {
    return
  }

  emit('saved', {
    ...form.value,

    // Nouvelle image seulement si l'utilisateur en a choisi une
    imageFile: imageFile.value,
  })
}

/**
 * Nettoyage lors de la destruction du composant.
 */
onBeforeUnmount(() => {
  clearImage()
})
</script>

<template>
  <VCard>
    <!-- Header -->
    <VCardItem>
      <VCardTitle>
        {{ isEditMode() ? 'Modifier un équipement' : 'Ajouter un équipement' }}
      </VCardTitle>

      <VCardSubtitle>
        {{
          isEditMode()
            ? 'Modifier les informations de cet équipement'
            : 'Enregistrer un nouvel équipement médical'
        }}
      </VCardSubtitle>
    </VCardItem>

    <VDivider />

    <VCardText>
      <VForm @submit.prevent="saveProduct">
        <VRow>

          <!-- ================================= -->
          <!-- IMAGE -->
          <!-- ================================= -->

          <VCol cols="12">
            <div class="text-subtitle-1 font-weight-medium mb-3">
              Image de l'équipement
            </div>

            <div class="product-image-upload">

              <!-- Image preview -->
              <div
                v-if="imagePreview"
                class="product-image-preview"
              >
                <VImg
                  :src="imagePreview"
                  aspect-ratio="1"
                  cover
                  class="rounded-lg"
                />

                <div class="product-image-actions">
                  <VBtn
                    size="small"
                    color="error"
                    variant="flat"
                    icon="ri-delete-bin-line"
                    @click="removeImage"
                  />
                </div>
              </div>

              <!-- Upload placeholder -->
              <div
                v-else
                class="product-image-placeholder"
                @click="openFilePicker"
              >
                <VIcon
                  icon="ri-image-add-line"
                  size="48"
                  class="mb-2"
                />

                <div class="text-subtitle-1 font-weight-medium">
                  Ajouter une image
                </div>

                <div class="text-body-2 text-medium-emphasis">
                  JPG, JPEG, PNG ou WEBP
                </div>

                <div class="text-caption text-medium-emphasis mt-1">
                  Taille maximale : 5 Mo
                </div>
              </div>

              <!-- Hidden file input -->
              <input
                ref="fileInput"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                class="d-none"
                @change="handleImageChange"
              >
            </div>

            <!-- Select image button -->
            <div class="mt-3">
              <VBtn
                variant="outlined"
                prepend-icon="ri-upload-2-line"
                @click="openFilePicker"
              >
                {{ imagePreview ? 'Changer l’image' : 'Choisir une image' }}
              </VBtn>
            </div>

            <!-- Error -->
            <VAlert
              v-if="imageError"
              type="error"
              variant="tonal"
              class="mt-3"
            >
              {{ imageError }}
            </VAlert>
          </VCol>

          <!-- ================================= -->
          <!-- BASIC INFORMATION -->
          <!-- ================================= -->

          <VCol cols="12">
            <VDivider class="my-2" />

            <div class="text-subtitle-1 font-weight-medium mt-4">
              Informations générales
            </div>
          </VCol>

          <!-- Product name -->
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="form.name"
              label="Nom du produit"
              placeholder="Ex : Concentrateur d'oxygène"
              :rules="[
                value => !!value || 'Le nom est obligatoire',
              ]"
              required
            />
          </VCol>

          <!-- Reference -->
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="form.reference"
              label="Référence"
              placeholder="Ex : MED-OXY-003"
              :rules="[
                value => !!value || 'La référence est obligatoire',
              ]"
              required
            />
          </VCol>

          <!-- Category -->
          <VCol
            cols="12"
            md="6"
          >
            <VSelect
              v-model="form.category"
              :items="categories"
              label="Catégorie"
              placeholder="Sélectionner une catégorie"
              :rules="[
                value => !!value || 'La catégorie est obligatoire',
              ]"
              required
            />
          </VCol>

          <!-- Brand -->
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="form.brand"
              label="Marque"
              placeholder="Ex : Philips"
            />
          </VCol>

          <!-- ================================= -->
          <!-- PRICING -->
          <!-- ================================= -->

          <VCol cols="12">
            <VDivider class="my-2" />

            <div class="text-subtitle-1 font-weight-medium mt-4">
              Tarification
            </div>
          </VCol>

          <!-- Sale price -->
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model.number="form.price"
              label="Prix de vente"
              type="number"
              min="0"
              suffix="FCFA"
            />
          </VCol>

          <!-- Rental price -->
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model.number="form.rentalPrice"
              label="Prix de location"
              type="number"
              min="0"
              suffix="FCFA / jour"
            />
          </VCol>

          <!-- ================================= -->
          <!-- STOCK -->
          <!-- ================================= -->

          <VCol cols="12">
            <VDivider class="my-2" />

            <div class="text-subtitle-1 font-weight-medium mt-4">
              Stock et état
            </div>
          </VCol>

          <!-- Stock -->
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model.number="form.stock"
              label="Stock"
              type="number"
              min="0"
            />
          </VCol>

          <!-- Condition -->
          <VCol
            cols="12"
            md="6"
          >
            <VSelect
              v-model="form.condition"
              :items="conditions"
              label="État de l'équipement"
            />
          </VCol>

          <!-- ================================= -->
          <!-- AVAILABILITY -->
          <!-- ================================= -->

          <VCol cols="12">
            <VDivider class="my-2" />

            <div class="text-subtitle-1 font-weight-medium mt-4">
              Disponibilité
            </div>

            <div class="d-flex flex-wrap ga-4">
              <VCheckbox
                v-model="form.saleAvailable"
                label="Disponible à la vente"
              />

              <VCheckbox
                v-model="form.rentalAvailable"
                label="Disponible à la location"
              />
            </div>
          </VCol>

          <!-- ================================= -->
          <!-- SERVICES -->
          <!-- ================================= -->

          <VCol cols="12">
            <div class="text-subtitle-1 font-weight-medium mt-2">
              Services associés
            </div>

            <div class="d-flex flex-wrap ga-4">
              <VCheckbox
                v-model="form.installationRequired"
                label="Installation nécessaire"
              />

              <VCheckbox
                v-model="form.maintenanceRequired"
                label="Maintenance nécessaire"
              />
            </div>
          </VCol>

          <!-- ================================= -->
          <!-- BUTTONS -->
          <!-- ================================= -->

          <VCol cols="12">
            <VDivider class="my-2" />

            <div class="d-flex flex-wrap ga-3 mt-4">
              <VBtn
                type="submit"
                color="primary"
              >
                <VIcon
                  icon="ri-save-line"
                  class="me-2"
                />

                {{
                  isEditMode()
                    ? 'Enregistrer les modifications'
                    : 'Enregistrer'
                }}
              </VBtn>

              <VBtn
                variant="outlined"
                @click="emit('cancel')"
              >
                Annuler
              </VBtn>
            </div>
          </VCol>

        </VRow>
      </VForm>
    </VCardText>
  </VCard>
</template>

<style scoped>
.product-image-upload {
  width: 220px;
  max-width: 100%;
}

.product-image-preview {
  position: relative;
  overflow: hidden;
  width: 220px;
  height: 220px;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 12px;
}

.product-image-actions {
  position: absolute;
  top: 10px;
  right: 10px;
}

.product-image-placeholder {
  display: flex;
  width: 220px;
  height: 220px;
  padding: 20px;
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 12px;
  text-align: center;
  transition: 0.2s ease;
}

.product-image-placeholder:hover {
  border-color: rgb(var(--v-theme-primary));
  background: rgba(var(--v-theme-primary), 0.04);
}
</style>