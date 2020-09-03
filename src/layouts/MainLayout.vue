<template>
  <div>
    <Loader v-if="loading"/>
    <template v-else>
      <Navbar v-on:click="isOpen = !isOpen"/>
      <Sidebar :isOpen="isOpen" :key="locale"/>

      <div class="app-main-layout">
        <main class="app-content" :class="{full: !isOpen}">
          <div class="app-page">
            <router-view/>
          </div>
        </main>

        <div class="fixed-action-btn">
          <router-link class="btn-floating btn-large blue" to="/record">
            <i class="large material-icons">add</i>
          </router-link>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import messages from "../utils/messages";
  import localizeFilter from "../filters/localize";

  export default {
    name: 'main-layout',
    data: () => ({
      isOpen: true,
      loading: true
    }),
    components: {
      Navbar: () => import('@/components/app/Navbar'),
      Sidebar: () => import('@/components/app/Sidebar')
    },
    async mounted() {
      if (!this.$store.getters.info.bill || !this.$store.getters.info.name) {
        await this.$store.dispatch('fetchInfo');
      }
      this.loading = false;
    },
    computed: {
      error() {
        return this.$store.getters.error;
      },
      locale() {
        return this.$store.getters.info.locale;
      }
    },
    watch: {
      error(fbError) {
        this.$error(localizeFilter(messages[fbError.code]) || localizeFilter('RandomError'));
      }
    }
  }
</script>