<template>
  <v-app dark>
    <v-content>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <v-row align="center" justify="center">
              <v-card class="ma-4 pa-6" outlined tile>
                <v-form ref="form" @submit="submit">
                  <img
                    alt="Ez"
                    src="https://i2.wp.com/ezdevs.com.br/wp-content/uploads/2020/03/ezdevs-logo-fd-escuro-semdisrup.png?resize=300%2C83&ssl=1"
                  />
                  <v-text-field v-model="email" :rules="rulesEmail" label="E-mail" maxlength="40"></v-text-field>
                  <v-text-field
                    v-model="password"
                    :rules="rulesPassword"
                    label="Password"
                    type="password"
                    maxlength="20"
                  ></v-text-field>
                  <div class="my-2">
                    <v-btn type="submit" color="primary" :loading="loading">Login</v-btn>
                  </div>
                  <p>{{ message }}</p>
                </v-form>
                <nuxt-link to="/new-organization">New organization</nuxt-link>
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
import { mapMutations } from "vuex";

import { fireGet } from "~/service/firebase.js";
import { emailValidation, minLength, required } from "~/utils/fieldRules.js";

export default {
  layout: "login",
  data() {
    return {
      email: "",
      password: "",
      message: "",
      loading: false,
      rulesEmail: [emailValidation, required],
      rulesPassword: [value => minLength(value, 6), required]
    };
  },
  methods: {
    ...mapMutations("user", ["setUser"]),
    ...mapMutations("organization", ["setOrganization"]),
    async submit(e) {
      try {
        e.preventDefault();
        const validate = this.$refs.form.validate();
        if (!validate) return;

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
        this.loading = false;
        this.message = error.message;
      }
    }
  }
};
</script>
