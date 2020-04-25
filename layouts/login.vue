<template>
  <v-app dark>
    <nuxt />
    <snackbar />
  </v-app>
</template>

<script>
import Snackbar from "~/components/snackbar";
export default {
  components: { Snackbar }
};
</script>
