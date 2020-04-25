import { mapGetters, mapActions } from 'vuex'

const SnackbarMixin = {
  computed: {
    ...mapGetters('snackbar', ['getMessage'])
  },
  methods: {
    ...mapActions('snackbar', [
      'showErrorMessage',
      'showSuccessMessage',
      'showInfoMessage',
      'closeMessage'
    ])
  }
}

export default SnackbarMixin
