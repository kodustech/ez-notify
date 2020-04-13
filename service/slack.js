import axios from 'axios';
import { orderBy } from 'lodash';
import { fireGet } from '~/service/firebase.js'


async function slackGetBotToken() {
  const organizationId = window.$nuxt.$store.getters['organization/getOrganization'].uid;
  const slack = await fireGet("slack", organizationId);
  if (slack) {
    return slack.botToken;
  }
  return null;
}

async function slackGetMembers() {
  const { data } = await axios.get(
    'https://slack.com/api/users.list?token=' + await slackGetBotToken()
  );
  return data;
}

export {
  slackGetBotToken,
  slackGetMembers
};
