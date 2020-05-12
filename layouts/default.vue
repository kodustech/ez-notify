<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app class="nav-bar">
      <v-app-bar-nav-icon color="white" @click.stop="drawer = !drawer" />
      <!-- <v-toolbar-title v-text="title" /> -->
      <img
        alt="Ez"
        width="150"
        src="~/static/eznotify-white.png"
      />
      <v-spacer />

      <v-icon @click="logout" color="white">mdi-logout</v-icon>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer :fixed="fixed" app>
      <span>
        Make with
        <span style="color:red">❤</span>
        by
        <a href="https://ezdevs.com.br/">Ez.devs</a> - 
        {{ new Date().getFullYear() }}
      </span>
    </v-footer>

    <snackbar />
  </v-app>
</template>

<script>
import { auth } from "firebase";

import Snackbar from '~/components/snackbar'

export default {
  middleware: ['authenticated'],
  components: { Snackbar },
  data () {
    return {
      clipped: true,
      drawer: false,
      fixed: true,
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-account',
          title: 'Users',
          to: '/users'
        },
        {
          icon: 'mdi-slack',
          title: 'Slack',
          to: '/slack'
        },
        {
          icon: 'mdi-message-text-clock',
          title: 'Messages',
          to: '/notify'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Ez.notify'
    }
  },
  methods: {
    async logout() {
      await auth().signOut();
      this.$router.push('/login');
    }
  }
}
</script>

<style>
.nav-bar {
  background: linear-gradient(
    307deg,
    #00BFA6 0%,
    #00BFA6 100%
  );
}
</style>
