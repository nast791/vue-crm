<template>
  <div>
    <div class="page-title">
      <h3>{{'Bill'|localize}}</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading"/>

    <div class="row" v-else>
      <HomeBill :rates="currency.rates"/>
      <HomeCurrency :rates="currency.rates" :date="new Date(currency.timestamp * 1000)"/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  metaInfo() {
    return {title: this.$title('Menu_Bill')}
  },
  data: () => ({
    loading: true,
    currency: null
  }),
  components: {
    HomeBill: () => import('../components/HomeBill'),
    HomeCurrency: () => import('../components/HomeCurrency'),
  },
  methods: {
    async refresh() {
      this.loading = true;
      this.currency = await this.$store.dispatch('fetchCurrency');
      this.loading = false;
    }
  },
  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency');
    this.loading = false;
  }
}
</script>
