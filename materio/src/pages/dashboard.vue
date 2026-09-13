<script setup>
import CardStatisticsVertical from '@core/components/cards/CardStatisticsVertical.vue'

const statistics = [
  {
    title: 'Produits',
    color: 'primary',
    icon: 'ri-medicine-bottle-line',
    stats: '248',
    change: 12,
    subtitle: 'Produits disponibles',
  },
  {
    title: 'Commandes',
    color: 'success',
    icon: 'ri-shopping-cart-line',
    stats: '36',
    change: 8,
    subtitle: 'Ce mois-ci',
  },
  {
    title: 'Locations',
    color: 'warning',
    icon: 'ri-hospital-line',
    stats: '12',
    change: 5,
    subtitle: 'Locations en cours',
  },
  {
    title: 'Revenus',
    color: 'info',
    icon: 'ri-money-dollar-circle-line',
    stats: '4.8M FCFA',
    change: 18,
    subtitle: 'Chiffre d’affaires',
  },
]
</script>

<template>
  <div>
    <!-- En-tête -->
    <div class="mb-6">
      <h1 class="text-h4 font-weight-bold">
        Tableau de bord
      </h1>

      <p class="text-body-1 text-medium-emphasis">
        Bienvenue dans votre espace d'administration Medical Shop.
      </p>
    </div>

    <!-- Statistiques -->
    <VRow>
      <VCol
        v-for="stat in statistics"
        :key="stat.title"
        cols="12"
        sm="6"
        lg="3"
      >
        <CardStatisticsVertical v-bind="stat" />
      </VCol>
    </VRow>

    <!-- Section suivante -->
    <VRow class="mt-2">
      <VCol cols="12" md="8">
        <VCard>
          <VCardItem>
            <VCardTitle>
              Activité commerciale
            </VCardTitle>

            <VCardSubtitle>
              Vue générale des ventes et locations
            </VCardSubtitle>
          </VCardItem>

          <VCardText>
            <div class="text-center py-10">
              <VIcon
                icon="ri-bar-chart-2-line"
                size="48"
                class="mb-3"
              />

              <p class="text-body-1">
                Le graphique des ventes sera ajouté prochainement.
              </p>
            </div>
          </VCardText>
        </VCard>
      </VCol>

      <VCol cols="12" md="4">
        <VCard>
          <VCardItem>
            <VCardTitle>
              Alertes
            </VCardTitle>

            <VCardSubtitle>
              Éléments nécessitant votre attention
            </VCardSubtitle>
          </VCardItem>

          <VCardText>
            <VAlert
              type="warning"
              variant="tonal"
              class="mb-3"
            >
              8 produits ont un stock faible.
            </VAlert>

            <VAlert
              type="info"
              variant="tonal"
            >
              3 installations sont programmées.
            </VAlert>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>