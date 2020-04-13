<template>
  <v-app dark>
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
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />

      <v-icon @click="logout">mdi-logout</v-icon>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer :fixed="fixed" app>
      <span>
        <a href="https://ezdevs.com.br/">Ez.devs</a>
        ❤ {{ new Date().getFullYear() }}
      </span>
    </v-footer>
  </v-app>
</template>

<script>
import { auth } from "firebase";

export default {
  middleware: ['authenticated'],
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
          title: 'Usuários',
          to: '/users'
        },
        {
          icon: 'mdi-slack',
          title: 'Slack',
          to: '/slack'
        },
        {
          icon: 'mdi-slack',
          title: 'Mensagens',
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
