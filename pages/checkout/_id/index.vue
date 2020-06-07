<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <CardForm
        @submit-card="submitCard"
        @invalid-card="invalidCard"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import CardForm from "@/components/CardForm/CardForm";
export default {
  layout: "login",
  name: "app",
  components: {
    CardForm
  },
  data() {
    return {};
  },
  methods: {
    submitCard(val) {
      console.log("submitCard -> val", val);
    },
    invalidCard() {
      this.showErrorMessage({ message: "Invalid card number." });
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/styleCard.scss";
</style>
