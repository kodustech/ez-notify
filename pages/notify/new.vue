<template>
  <v-row>
    <v-col cols="12">
      <v-row align="center" justify="center">
        <v-card-text>
          <v-container>
            <v-form ref="form">
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-select
                    v-model="slackMembersSelecteds"
                    chips
                    multiple
                    label="Who will receive? *"
                    :rules="rulesRequired"
                    :items="slackMembers"
                    :append-icon="'mdi-plus'"
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-switch v-model="recurrent" class="ma-2" label="Recurrent?"></v-switch>
                </v-col>
              </v-row>

              <v-row v-if="!recurrent">
                <v-col cols="12" lg="3">
                  <v-menu
                    ref="menu1"
                    v-model="menu1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="dateFormatted1"
                        label="When? *"
                        persistent-hint
                        :rules="rulesRequired"
                        @blur="date = parseDate(dateFormatted1)"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" lg="3">
                  <v-select v-model="hour" :rules="rulesRequired" :items="hours" label="Hour *" />
                </v-col>
              </v-row>
              <v-row v-else>
                <v-col cols="12" lg="3">
                  <v-menu
                    ref="menu2"
                    v-model="menu2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="dateFormatted2"
                        label="Start date *"
                        persistent-hint
                        :rules="rulesRequired"
                        @blur="startAt = parseDate(dateFormatted2)"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="startAt" no-title @input="menu2 = false"></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" lg="3">
                  <v-menu
                    ref="menu3"
                    v-model="menu3"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="dateFormatted3"
                        label="End date *"
                        persistent-hint
                        :rules="rulesRequired"
                        @blur="endAt = parseDate(dateFormatted3)"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="endAt" no-title @input="menu3 = false"></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" lg="3">
                  <v-select v-model="hour" :rules="rulesRequired" :items="hours" label="Hour *" />
                </v-col>
                <v-col cols="12" lg="3">
                  <v-select
                    v-model="period"
                    :rules="rulesRequired"
                    :items="periods"
                    label="Frequency *"
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" lg="12">
                  <v-textarea
                    v-model="message"
                    counter="300"
                    maxlength="300"
                    :rules="rulesRequired"
                    label="Message *"
                  ></v-textarea>
                </v-col>
              </v-row>

              <v-row>
                <!-- <v-col cols="12" sm="12" md="12">{{ message }}</v-col> -->
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" class="mb-2" @click="save">Save</v-btn>
        </v-card-actions>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters } from "vuex";
import { orderBy } from "lodash";
import moment from "moment";

import {
  fireCollRef,
  fireSet,
  fireDelete,
  fireGet,
  fireAdd
} from "~/service/firebase.js";
import { slackGetMembers, slackGetBotToken } from "~/service/slack.js";
import { required } from "~/utils/fieldRules.js";

export default {
  layout: "default",
  data() {
    return {
      slackBotToken: null,

      slackMembers: [],
      slackMembersSelecteds: null,

      recurrent: false,

      hour: null,
      hours: [],

      date: new Date().toISOString().substr(0, 10),
      startAt: new Date().toISOString().substr(0, 10),
      endAt: new Date().toISOString().substr(0, 10),

      dateFormatted1: this.formatDate(new Date().toISOString().substr(0, 10)),
      dateFormatted2: this.formatDate(new Date().toISOString().substr(0, 10)),
      dateFormatted3: this.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false,
      menu2: false,
      menu3: false,

      message: "",

      period: null,
      periods: [
        {
          text: "Daily",
          value: "d"
        },
        {
          text: "Weekly",
          value: "w"
        },
        {
          text: "Monthly",
          value: "M"
        }
      ],

      rulesRequired: [required]
    };
  },
  computed: {
    ...mapGetters("organization", ["getOrganization"]),
    computedDateFormatted() {
      return this.formatDate(this.date);
    }
  },
  watch: {
    date(val) {
      this.dateFormatted1 = this.formatDate(this.date);
    },
    startAt(val) {
      this.dateFormatted2 = this.formatDate(this.startAt);
    },
    endAt(val) {
      this.dateFormatted3 = this.formatDate(this.endAt);
    }
  },
  async mounted() {
    this.hours = this.getHours();
    this.slackBotToken = await slackGetBotToken();
    this.slackMembers = await this.getSlackMembers();
  },
  methods: {
    async getSlackMembers() {
      if (this.slackBotToken) {
        const data = await slackGetMembers();
        if (!data.ok) {
          return [];
        } else {
          const members = data.members.filter(x => !x.deleted && !x.is_bot);
          return orderBy(
            members.map(x => ({
              text: x.real_name,
              value: x.id
            })),
            ["text"],
            ["asc"]
          );
        }
      }
    },
    formatDate(date) {
      try {
        if (!date) return null;
        const [year, month, day] = date.split("-");
        return `${day}/${month}/${year}`;
      } catch (error) {
        return null;
      }
    },
    parseDate(date) {
      try {
        if (!date) return null;
        const [day, month, year] = date.split("/");
        return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      } catch (error) {
        return null;
      }
    },
    getHours() {
      return [...Array(24).keys()].map(x => (`${x}`.padStart(2, "0") + ':00'));
    },
    async save() {
      try {
        const validate = this.$refs.form.validate();
        if (!validate) return;

        if (this.recurrent) {
          const schedules = this.generateRecurrent(
            this.period,
            this.startAt,
            this.endAt,
            this.message,
            this.slackMembersSelecteds,
            this.hour
          );
          for (let index = 0; index < schedules.length; index++) {
            const schedule = schedules[index];
            fireAdd("notification", schedule);
          }
        } else {
          const schedule = {
            message: this.message,
            to: this.slackMembersSelecteds,
            hour: this.hour,
            date: this.date,
            sended: false,
            organizationId: this.getOrganization.uid
          };
          fireAdd("notification", schedule);
        }
        this.$router.push("/notify");
      } catch (error) {}
    },
    generateRecurrent(period, startAt, endAt, message, to, hour) {
      let lastDate = moment(startAt);
      const messages = [];
      while (
        lastDate.isBefore(moment(endAt)) ||
        lastDate.isSame(moment(endAt))
      ) {
        messages.push({
          message,
          to,
          hour,
          sended: false,
          date: lastDate.format("YYYY-MM-DD"),
          organizationId: this.getOrganization.uid
        });
        lastDate = lastDate.add(1, period);
      }
      return messages;
    }
  }
};
</script>
