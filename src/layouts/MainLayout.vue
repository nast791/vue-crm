<template>
  <div>
    <Loader v-if="loading"/>
    <template v-else>
      <Navbar v-on:click="isOpen = !isOpen"/>
      <Sidebar :isOpen="isOpen"/>

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
      if (!Object.keys(this.$store.getters.info).length) {
        await this.$store.dispatch('fetchInfo');
      }
      this.loading = false;
    }
  }
</script>