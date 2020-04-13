export const state = () => ({
  organization: {
    uid: '',
    name: ''
  }
})

export const getters = {
  getOrganization: ({ organization }) => organization
}

export const mutations = {
  setOrganization(state, payload) {
    state.organization = payload
  }
}

export const actions = {
  teste({state}) {
    console.log('to na action', state.organization)
  }
}
