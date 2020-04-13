<template>
  <v-app dark>
    <v-content>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <v-row align="center" justify="center">
              <v-card class="ma-4 pa-6" outlined tile>
                <v-form @submit="submit">
                  <img
                    alt="Ez"
                    src="https://i2.wp.com/ezdevs.com.br/wp-content/uploads/2020/03/ezdevs-logo-fd-escuro-semdisrup.png?resize=300%2C83&ssl=1"
                  />
                  <v-text-field v-model="email" label="E-mail" required></v-text-field>
                  <v-text-field v-model="password" label="Senha" type="password" required></v-text-field>
                  <div class="my-2">
                    <v-btn type="submit" color="primary" :loading="loading">Login</v-btn>
                  </div>
                  <p>{{ message }}</p>
                </v-form>
                <nuxt-link to="/new-organization">Nova organização</nuxt-link>
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
import { fireGet } from "~/service/firebase.js";
import { mapMutations } from "vuex";

export default {
  layout: "login",
  data() {
    return {
      email: "",
      password: "",
      message: "",
      loading: false
    };
  },
  methods: {
    ...mapMutations("user", ["setUser"]),
    ...mapMutations("organization", ["setOrganization"]),
    async submit(e) {
      try {
        e.preventDefault();
        this.loading = true;
        this.message = "";
        const data = await auth().signInWithEmailAndPassword(
          this.email,
          this.password
        );

        const user = await fireGet("user", data.user.uid);
        this.setUser({
          uid: data.user.uid,
          email: user.email,
          organizationId: user.organizationId
        });

        const organization = await fireGet("organization", user.organizationId);
        this.setOrganization({
          uid: user.organizationId,
          name: organization.name
        });

        /* const { uid, refreshToken, email } = auth().currentUser;
        localStorage.setItem('currentUser', JSON.stringify({ uid, refreshToken, email })); */

        this.$router.push("/");
      } catch (error) {
        console.log("submit -> error", error);
        this.loading = false;
        this.message = "Usuário ou senha inválida";
      }
    }
  }
};
</script>
