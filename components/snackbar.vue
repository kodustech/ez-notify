<template>
  <div class="text-center ma-2">
    <v-snackbar
      v-model="getMessage.open"
      :color="getMessage.type"
      :bottom="getMessage.position === 'bottom'"
      :left="getMessage.position === 'left'"
      :right="getMessage.position === 'right'"
      :top="getMessage.position === 'top'"
      :timeout="getMessage.timeout"
    >
      {{ getMessage.message }}
      <v-btn
        color="primary"
        text
        @click="close"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>
<script>
  export default {
    methods: {
      close() {
        this.closeMessage()
      }
    }
  }
</script>
