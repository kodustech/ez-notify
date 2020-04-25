<template>
  <v-app dark>
    <v-content>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <v-row align="center" justify="center">
              <v-card class="ma-4 pa-6" outlined tile min-width="400">
                <v-form ref="form" @submit="submit">
                  <v-text-field
                    v-model="name"
                    :rules="rulesName"
                    label="Organization name *"
                    maxlength="40"
                  ></v-text-field>
                  <v-text-field v-model="email" :rules="rulesEmail" label="E-mail *" maxlength="40"></v-text-field>
                  <v-text-field
                    v-model="password"
                    :rules="rulesPassword"
                    label="Password *"
                    type="password"
                    maxlength="20"
                  ></v-text-field>
                  <div class="my-2">
                    <v-btn type="submit" color="primary" :loading="loading">Create organization</v-btn>
                  </div>
                </v-form>
                <nuxt-link to="/login">Back to login</nuxt-link>
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
import { emailValidation, minLength, required } from "~/utils/fieldRules.js";

export default {
  layout: "login",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      loading: false,
      rulesName: [value => minLength(value, 3), required],
      rulesEmail: [emailValidation, required],
      rulesPassword: [value => minLength(value, 6), required]
    };
  },
  methods: {
    async submit(e) {
      try {
        e.preventDefault();
        const validate = this.$refs.form.validate();
        if (!validate) return;

        this.loading = true;
        this.message = "";
        const data = await auth().createUserWithEmailAndPassword(
          this.email,
          this.password
        );
        const uid = data.user.uid;
        await fireSet("organization", uid, { name: this.name });
        await fireSet("user", uid, { email: this.email, organizationId: uid });

        this.showSuccessMessage({
          message: "Organization successfully created"
        });

        this.$router.push("/login");
      } catch (error) {
        this.loading = false;
        this.showErrorMessage({ message: error.message });
      }
    }
  }
};
</script>
