<template>
  <v-row>
    <v-col cols="12">
      <v-row align="center" justify="center">
        <v-data-table
          item-key="uid"
          class="elevation-1"
          :headers="headers"
          :items="items"
          :items-per-page="10"
        >
          <template v-slot:top>
            <v-toolbar flat color="dark">
              <v-toolbar-title>{{ getOrganization.name }}</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="300px">
                <template v-slot:activator="{ on }">
                  <v-btn color="primary" dark class="mb-2" v-on="on">Novo usuário</v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">Novo Usuário</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field v-model="email" label="E-mail" required></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field v-model="password" label="Senha" type="password" required></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="12" md="12">{{ message }}</v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                    <v-btn color="blue darken-1" text @click="save">Salvar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <!-- <template v-slot:item.actions="{ item }">
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
          </template>-->
          <template v-slot:no-data>
            <p>Nenhum registro encontrado</p>
          </template>
        </v-data-table>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters } from "vuex";
import { auth } from "firebase";
import { fireCollRef, fireSet, fireDelete } from "~/service/firebase.js";

export default {
  layout: "default",
  data() {
    return {
      email: "",
      password: "",
      message: "",
      dialog: false,
      editedItem: {},
      headers: [
        {
          text: "E-mail",
          align: "start",
          sortable: false,
          value: "email"
        }
        /* { text: "Ações", value: "actions", sortable: false } */
      ],
      items: []
    };
  },
  computed: {
    ...mapGetters("organization", ["getOrganization"])
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      this.items = [];
      const userRef = fireCollRef("user");
      const snapshot = await userRef
        .where("organizationId", "==", this.getOrganization.uid)
        .get();

      if (!snapshot.empty) {
        snapshot.forEach(doc => {
          this.items.push({
            ...doc.data(),
            uid: doc.id
          });
        });
      }
    },
    /* async deleteItem(item) {
      console.log("deleteItem -> item", item);
      fireDelete("user", item.uid);
      auth().
      this.items = this.items.filter(x => x.uid !== item.uid);
    }, */
    async save() {
      try {
        const data = await auth().createUserWithEmailAndPassword(
          this.email,
          this.password
        );
        const uid = data.user.uid;
        await fireSet("user", uid, {
          email: this.email,
          organizationId: this.getOrganization.uid
        });
        this.getUsers();
        this.close();
      } catch (error) {
        this.message = error.message;
      }
    },
    close() {
      this.dialog = false;
    }
  }
};
</script>
