<template>
  <div class="grey darken-1 empty-layout">
    <router-view/>
  </div>
</template>

<script>
  import messages from "../utils/messages";
  import localizeFilter from "../filters/localize";

  export default {
    computed: {
      error() {
        return this.$store.getters.error
      }
    },
    watch: {
      error(fbError) {
        this.$error(localizeFilter(messages[fbError.code]) || localizeFilter('RandomError'));
      }
    }
  }
</script>