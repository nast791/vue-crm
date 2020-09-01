<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <Loader v-if="loading" />
    <p class="center" v-else-if="!records.length">Записей пока нет</p>

    <section v-else>
      <HistoryTable :records="records"/>
    </section>
  </div>
</template>

<script>
  export default {
    name: "History",
    data: () => ({
      loading: true,
      records: [],
      categories: []
    }),
    async mounted() {
      // this.records = await this.$store.dispatch('fetchRecords');
      const records = await this.$store.dispatch('fetchRecords');
      this.categories = await this.$store.dispatch('fetchCategories');
      this.records = records.map(it => {
        return {
          ...it,
          categoryName: this.categories.find(item => item.id = it.categoryId).title,
          typeClass: it.type === 'income' ? 'green' : 'red',
          typeText: it.type === 'income' ? 'Доход' : 'Расход'
        }
      });
      this.loading = false;
    },
    components: {
      HistoryTable: () => import('../components/HistoryTable')
    }
  }
</script>