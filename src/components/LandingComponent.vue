<template>
  <v-container
    class="fill-height d-flex flex-column justify-center align-center"
  >
    <v-row class="text-center" justify="center">
      <v-col cols="12">
        <h1 class="display-2 font-weight-bold mb-4">
          Dobrodošli u moju aplikaciju
        </h1>
        <p class="subtitle-1 mb-8">
          CRUD sučelje izrađeno s Vue 3, Vue Routerom i Vuetifyjem.
        </p>
      </v-col>

      <v-col cols="12" md="6" lg="4">
        <v-btn block large color="primary" @click="go('create')">
          Kreiraj novi unos
        </v-btn>
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <v-btn block large color="secondary" @click="go('view')">
          Pogledaj sve unose
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
function go(name) {
  router.push({ name });
}
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
</style>
