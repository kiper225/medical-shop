<script setup>
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'
import VerticalNavGroup from '@layouts/components/VerticalNavGroup.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
</script>

<template>

  <!-- Dashboard -->
  <VerticalNavLink
    :item="{
      title: 'Dashboard',
      icon: 'ri-dashboard-line',
      to: '/dashboard',
    }"
  />

  <!-- Catalogue -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'Catalogue',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'Produits',
      icon: 'ri-medicine-bottle-line',
      to: '/products',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'Catégories',
      icon: 'ri-folder-2-line',
      to: '/categories',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'Stocks',
      icon: 'ri-archive-line',
      to: '/stocks',
    }"
  />


  <!-- Ventes -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'Ventes',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'Commandes',
      icon: 'ri-shopping-cart-line',
      to: '/commandes',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'Clients',
      icon: 'ri-user-line',
      to: '/clients',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'Paiements',
      icon: 'ri-bank-card-line',
      to: '/paiements',
    }"
  />


  <!-- Location -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'Location',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'Équipements',
      icon: 'ri-hospital-line',
      to: '/locations',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'Disponibilité',
      icon: 'ri-calendar-check-line',
      to: '/locations/disponibilite',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'Contrats',
      icon: 'ri-file-text-line',
      to: '/locations/contrats',
    }"
  />


  <!-- Services -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'Services',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'Installations',
      icon: 'ri-tools-line',
      to: '/installations',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'Maintenance',
      icon: 'ri-settings-3-line',
      to: '/maintenance',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'Techniciens',
      icon: 'ri-user-settings-line',
      to: '/techniciens',
    }"
  />


  <!-- Gestion -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'Gestion',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'Devis',
      icon: 'ri-file-list-3-line',
      to: '/devis',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'Rapports',
      icon: 'ri-bar-chart-line',
      to: '/rapports',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'Paramètres',
      icon: 'ri-settings-line',
      to: '/parametres',
    }"
  />

</template>