<template>
  <v-row>
    <v-col cols="12" md="12" lg="12">
      <v-data-table
        item-key="uid"
        class="elevation-1"
        :headers="headers"
        :items="items"
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

        <template v-slot:no-data>
          <p>No records found</p>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters } from "vuex";
import { orderBy } from "lodash";
import { fireCollRef } from "~/service/firebase.js";
import { slackGetMembers } from "~/service/slack.js";

export default {
  layout: "default",
  data() {
    return {
      editedItem: {},
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
        }
        /* { text: "Ações", value: "actions", sortable: false } */
      ],
      items: [],
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
      }
    },
    getUsersName(ids) {
      return ids
        .map(x => {
          return this.slackMembers.find(m => m.id == x).real_name;
        })
        .join(", ");
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
