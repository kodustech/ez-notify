<template>
  <v-container fluid fill-height class="login">
    <v-layout>
      <div class="msg-login">
        <img src="~/static/eznotify-logo-login.png" />
      </div>
      <v-flex class="form-login">
        <v-form ref="form" @submit="submit">
          <v-card>
            <div style="width: 400px;"></div>
            <h3>
              <strong>Welcome</strong>
            </h3>
            <v-card-text>
              <!-- Campo de email -->
              <v-text-field v-model="email" :rules="rulesEmail" label="E-mail" maxlength="40"></v-text-field>
              <!-- Campo de password -->
              <v-text-field
                v-model="password"
                :rules="rulesPassword"
                label="Password"
                type="password"
                maxlength="20"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-flex>
                <v-btn type="submit" color="primary" :loading="loading">Login</v-btn>
              </v-flex>
            </v-card-actions>
          </v-card>
        </v-form>
        <div class="register">
          <v-btn to="/new-organization">New organization</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
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

        this.$router.push("/app");
      } catch (error) {
        this.loading = false;
        this.showErrorMessage({ message: error.message });
      }
    }
  }
};
</script>


<style>
.login .container.fill-height {
  padding: 0;
}
.login .form-login {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 0 0 -60px;
  width: 50%;
  background: #f7f7f7;
}
.login .form-login .v-card {
  padding: 60px;
  width: calc(100% - 100px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
}

.login .form-login .v-card button.v-btn {
  background: #00bfa6;
  background: linear-gradient(307deg, #00bfa6 0%, #00937f 100%);
  border-radius: 10px;
  padding: 15px 30px;
  height: auto;
}

.layout img {
  max-width: 330px;
  margin: 0 0 20px 0;
  position: relative;
  z-index: 1;
}
.login h2 {
  font-size: 22px;
  color: #fff;
  font-weight: 300;
  position: relative;
  z-index: 1;
}
.login h2 strong {
  font-weight: 800;
}
.login h3 {
  font-size: 16px;
  color: #464646;
  font-weight: 300;
}
.login h3 strong {
  font-size: 24px;
  font-weight: 800;
  display: block;
  margin: 0 0 15px 0;
}
.login .msg-login {
  background: #00bfa6;
  background: linear-gradient(307deg, #00bfa6 0%, #005ad5 100%);
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding: 20px 100px;
  justify-content: center;
  width: 50%;
  position: relative;
}

.login .v-card__text {
  padding: 40px 0;
}

.login .v-card__actions {
  padding: 0;
}

.login {
  padding: 0;
}

.login i.login-icon {
  position: absolute;
  right: 30px;
  z-index: 2;
  background: #ffffff;
  width: 70px;
  height: 70px;
  text-align: center;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
  border-radius: 100%;
  padding: 18px 0 0 0;
  font-size: 32px;
  color: rgba(142, 68, 173, 1);
}
.login .msg-login::after {
  content: "";
  background: url("https://www.toptal.com/designers/subtlepatterns/patterns/triangle-mosaic.png");
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  mix-blend-mode: multiply;
  z-index: 0;
}

.login .register {
  text-align: left;
  width: 100%;
  padding: 10px 0 10px 60px;
  float: right;
  opacity: 0.5;
}

.login .form-login .register a {
  background: transparent !important;
  box-shadow: none !important;
  padding: 0 10px;
  border-radius: 10px;
}

.login .form-login .register a .v-btn__content {
  font-size: 12px;
  color: #464646;
}

@media only screen and (max-width: 1024px) {
  .login.container.fill-height > .layout {
    flex-direction: column;
    width: 100%;
  }
  .login .msg-login,
  .form-login,
  .form-login .v-card {
    width: 100% !important;
    margin: 0 !important;
    align-items: center !important;
    padding: 20px !important;
    text-align: center;
    line-height: 24px;
  }
  .login .register {
    text-align: center !important;
    padding: 15px 5px;
  }
  .login i.login-icon {
    display: none;
  }
}
</style>
