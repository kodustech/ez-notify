<template>
  <div>
    <v-row>
      <v-col cols="12" md="12" lg="12">
        <v-tabs v-model="tab" background-color="primary" class="elevation-2" @change="changeTab">
          <v-tabs-slider></v-tabs-slider>

          <v-tab :href="`#scheduled`">Scheduleds</v-tab>
          <v-tab :href="`#sended`">Sended</v-tab>

          <v-tab-item :value="tab">
            <v-data-table
              item-key="uid"
              class="elevation-1"
              :headers="headers"
              :items="itemsFiltered"
              :items-per-page="10"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>{{ getOrganization.name }}</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" class="mb-2" @click="NewMessage">New message</v-btn>
                </v-toolbar>
              </template>

              <template v-slot:item.sended="{ item }">
                <v-chip v-if="item.sended" class="status" color="green">Sended</v-chip>
                <v-chip v-else class="status" color="blue">Scheduled</v-chip>
              </template>

              <template v-slot:item.actions="{ item }">
                <v-icon color="error" @click="openDialog(item)">mdi-delete</v-icon>
              </template>

              <template v-slot:no-data>
                <p>No records found</p>
              </template>
            </v-data-table>
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Delete message</v-card-title>
        <v-card-text>This action cannot be reversed, do you want to continue?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">No</v-btn>
          <v-btn color="green darken-1" text @click="deleteItem()">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { orderBy } from "lodash";
import { fireCollRef, fireDelete } from "~/service/firebase.js";
import { slackGetMembers } from "~/service/slack.js";

export default {
  layout: "default",
  data() {
    return {
      tab: "scheduleds",
      dialog: false,
      itemToDelete: {},
      headers: [
        {
          text: "Date/Hour to send",
          align: "start",
          sortable: false,
          value: "datetime"
        },
        {
          text: "Message",
          align: "start",
          sortable: false,
          value: "message"
        },
        {
          text: "Who receive",
          align: "start",
          sortable: false,
          value: "members"
        },
        {
          text: "Status",
          align: "start",
          sortable: false,
          value: "sended"
        },
        { text: "Actions", value: "actions", sortable: false }
      ],
      items: [],
      itemsFiltered: [],
      slackMembers: []
    };
  },
  computed: {
    ...mapGetters("organization", ["getOrganization"])
  },
  async mounted() {
    this.slackMembers = (await slackGetMembers()).members;
    this.getNotifications();
  },
  methods: {
    async getNotifications() {
      this.items = [];
      const notificationsRef = fireCollRef("notification");
      const snapshot = await notificationsRef
        .where("organizationId", "==", this.getOrganization.uid)
        .orderBy("date")
        .orderBy("hour")
        .get();

      if (!snapshot.empty) {
        snapshot.forEach(doc => {
          const data = { ...doc.data() };
          this.items.push({
            ...data,
            datetime: `${data.date
              .split("-")
              .reverse()
              .join("/")} - ${data.hour}`,
            members: this.getUsersName(data.to),
            uid: doc.id
          });
        });
        this.itemsFiltered = this.items.filter(x => !x.sended);
      }
    },
    getUsersName(ids) {
      return ids
        .map(x => {
          const u = this.slackMembers.find(m => m.id == x);
          return u ? u.real_name : "Deleted User";
        })
        .join(", ");
    },
    openDialog(item) {
      this.itemToDelete = item;
      this.dialog = true;
    },
    deleteItem() {
      fireDelete("notification", this.itemToDelete.uid);
      this.items = this.items.filter(x => x.uid !== this.itemToDelete.uid);
      this.itemsFiltered = this.itemsFiltered.filter(
        x => x.uid !== this.itemToDelete.uid
      );
      this.dialog = false;
    },
    changeTab() {
      this.tab === "sended"
        ? (this.itemsFiltered = this.items.filter(x => x.sended))
        : (this.itemsFiltered = this.items.filter(x => !x.sended));
    },
    NewMessage() {
      this.$router.push("/notify/new");
    }
  }
};
</script>

<style>
.theme--light.v-chip {
  color: #fff;
}
</style>
