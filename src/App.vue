
<template>
  <div>
    <h1 class="text-3xl font-bold underline">Hola Admin Shop</h1>
    <RouterView></RouterView>
    <VueQueryDevtools />
  </div>
</template>

<script setup lang="ts">

import { VueQueryDevtools } from '@tanstack/vue-query-devtools'

</script>

<style scoped>

</style>