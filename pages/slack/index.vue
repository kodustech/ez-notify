<template>
  <div>
    <v-row>
      <v-col cols="12" lg="10">
        <v-form ref="form">
          <v-text-field
            v-model="slackBotToken"
            :rules="rulesToken"
            label="Slack bot token *"
            required
          ></v-text-field>
        </v-form>
      </v-col>
      <v-col cols="12" lg="2">
        <div class="my-2">
          <v-btn @click="saveBotToken" color="primary" :loading="loadingAdd">Save</v-btn>
        </div>
      </v-col>
    </v-row>
    <div v-if="hasSlackBotToken">
      <v-row>
        <v-col cols="12" lg="10">
          <v-alert v-if="!permissionTeamInfo" type="error">
            Slack bot with out permission
            <b>
              <a style="color:#0000ff" href="https://api.slack.com/scopes/team:read">team:read</a>
            </b>
          </v-alert>
          <v-alert v-else type="success">
            <div style="display:flex;">
              <img style="border-radius:50%;" width="50" height="50" :src="slackIcon" />
              <p style="margin:10px 15px;font-size:120%;">{{ slackName }}</p>
            </div>
          </v-alert>
        </v-col>

        <v-col cols="12" lg="10">
          <v-alert v-if="!permissionUsersInfo" type="error">
            Slack bot with out permission
            <b>
              <a style="color:#0000ff" href="https://api.slack.com/scopes/users:read">users:read</a>
            </b>
          </v-alert>
          <v-alert v-else type="success">
            <p>{{ slackMembersCount }} active members</p>
          </v-alert>
        </v-col>

        <v-col cols="12" lg="10">
          <v-alert v-if="!permissionsSendMessage" type="error">
            Slack bot with out permission
            <b>
              <a style="color:#0000ff" href="https://api.slack.com/scopes/chat:write">chat:write</a>
            </b>
          </v-alert>
          <v-alert v-else type="success">
            <p color="success">Permission to send message: OK</p>
          </v-alert>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { fireGet, fireSet, fireUpdate } from "~/service/firebase.js";
import { slackGetMembers, slackGetBotToken } from "~/service/slack.js";
import { startsWith, required } from "~/utils/fieldRules.js";

export default {
  async mounted() {
    await this.getSlackBotToken();
    if (this.hasSlackBotToken) {
      this.getSlackTeamInfo();
      this.getSlackUsersInfo();
      this.canSendMessage();
    }
  },
  data() {
    return {
      loadingAdd: false,
      slackBotToken: "",
      hasSlackBotToken: false,
      permissionTeamInfo: true,
      permissionUsersInfo: true,
      permissionsSendMessage: true,
      slackIcon: "",
      slackName: "",
      slackMembersCount: 0,
      rulesToken: [v => startsWith(v, "xoxb-"), required]
    };
  },
  computed: {
    ...mapGetters("organization", ["getOrganization"])
  },
  methods: {
    async getSlackBotToken() {
      const token = await slackGetBotToken();
      if (token) {
        this.hasSlackBotToken = true;
        this.slackBotToken = token;
      }
    },
    async getSlackTeamInfo() {
      if (this.hasSlackBotToken) {
        const { data } = await this.$axios.get(
          "https://slack.com/api/team.info?token=" + this.slackBotToken
        );
        if (!data.ok) {
          this.permissionTeamInfo = false;
        } else {
          this.permissionTeamInfo = true;
          this.slackIcon = data.team.icon.image_102;
          this.slackName = data.team.name;
        }
      }
    },
    async getSlackUsersInfo() {
      if (this.hasSlackBotToken) {
        const data = await slackGetMembers();
        if (!data.ok) {
          this.permissionUsersInfo = false;
        } else {
          this.permissionUsersInfo = true;
          const members = data.members.filter(x => !x.deleted && !x.is_bot);
          this.slackMembersCount = members.length;
        }
      }
    },
    async canSendMessage() {
      if (this.hasSlackBotToken) {
        const { data } = await this.$axios.get(
          "https://slack.com/api/chat.postMessage?token=" +
            this.slackBotToken +
            "&channel=qqq&text=qqq"
        );
        if (!data.ok) {
          if (data.error === "channel_not_found") {
            this.permissionsSendMessage = true;
          } else {
            this.permissionsSendMessage = false;
          }
        } else {
          this.permissionsSendMessage = true;
        }
      }
    },
    async saveBotToken() {
      try {
        const validate = this.$refs.form.validate();
        if (!validate) return;

        this.loadingAdd = true;
        if (this.hasSlackBotToken) {
          await fireUpdate("slack", this.getOrganization.uid, {
            botToken: this.slackBotToken
          });
        } else {
          await fireSet("slack", this.getOrganization.uid, {
            botToken: this.slackBotToken
          });
          this.hasSlackBotToken = true;
        }
        await this.getSlackTeamInfo();
        await this.getSlackUsersInfo();
        await this.canSendMessage();
        this.loadingAdd = false;
      } catch (error) {
        this.loadingAdd = false;
      }
    }
  }
};
</script>
