<template>
  <v-app dark>
    <v-content>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <v-row align="center" justify="center">
              <v-card class="ma-4 pa-6" outlined tile min-width="400">
                <v-form @submit="submit">
                  <v-text-field v-model="name" label="Nome da organização" required></v-text-field>
                  <v-text-field v-model="email" label="E-mail" required></v-text-field>
                  <v-text-field v-model="password" label="Senha" type="password" required></v-text-field>
                  <div class="my-2">
                    <v-btn type="submit" color="primary" :loading="loading">Criar organização</v-btn>
                  </div>
                  <p>{{ message }}</p>
                </v-form>
                <nuxt-link to="/login">Voltar</nuxt-link>
              </v-card>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import { auth } from "firebase";
import { fireSet } from "~/service/firebase.js";

export default {
  layout: "login",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      message: "",
      loading: false
    };
  },
  methods: {
    async submit(e) {
      try {
        e.preventDefault();
        this.loading = true;
        this.message = "";
        const data = await auth().createUserWithEmailAndPassword(
          this.email,
          this.password
        );
        const uid = data.user.uid;
        await fireSet("organization", uid, { name: this.name });
        await fireSet("user", uid, { email: this.email, organizationId: uid });

        this.$router.push("/login");
      } catch (error) {
        this.loading = false;
        this.message = "Erro ao criar organização";
      }
    }
  }
};
</script>
