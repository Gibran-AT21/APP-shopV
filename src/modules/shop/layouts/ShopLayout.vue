<template>
    <!-- component -->
<!-- Create By Joker Banny -->

  <!-- Header Navbar -->
  <TopMenu />

<!-- Title -->
<!-- Tab Menu -->
<!-- Product List -->
 <RouterView />


<!-- Footer -->
<CustomFooter />


</template>

<script setup lang="ts">

import TopMenu from '@/modules/shop/components/TopMenu.vue';
import CustomFooter from '../components/CustomFooter.vue';


</script>

<style scoped>

</style>