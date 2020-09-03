<template>
  <div>
    <div class="page-title">
      <h3>{{'History_Title'|localize}}</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <Loader v-if="loading" />
    <p class="center" v-else-if="!records.length">{{'NoRecords'|localize}}</p>

    <section v-else>
      <HistoryTable :records="items"/>
      <Paginate v-model="page" :page-count="pageCount" :click-handler="pageChangeHandler" :prev-text="'Back' | localize" :next-text="'Forward' | localize" :container-class="'pagination'" :page-class="'waves-effect'"/>
    </section>
  </div>
</template>

<script>
  import paginationMixin from '../mixins/pagination';
  import {Pie} from 'vue-chartjs';
  import localizeFilter from "../filters/localize";

  export default {
    name: "History",
    metaInfo() {
      return {title: this.$title('Menu_History')}
    },
    data: () => ({
      loading: true,
      records: []
    }),
    mixins: [paginationMixin],
    extends: Pie,
    async mounted() {
      this.records = await this.$store.dispatch('fetchRecords');
      const categories = await this.$store.dispatch('fetchCategories');
      this.setup(categories);
      this.loading = false;
    },
    methods: {
      setup(categories) {
        this.setupPagination(this.records.map((it, idx) => {
          return {
            ...it,
            categoryName: categories.find(item => item.id === it.categoryId).title,
            typeClass: it.type === 'income' ? 'green' : 'red',
            typeText: it.type === 'income' ? localizeFilter('Income') : localizeFilter('Outcome') ,
            index: idx + 1
          }
        }));

        this.renderChart({
          labels: categories.filter(it => {
            return this.records.reduce((acc, item) => {
              if (item.categoryId === it.id && item.type === 'outcome') {
                acc = it.title;
              }
              return acc;
            }, '');
          }).map(it => it.title),
          datasets: [{
            label: localizeFilter('CostsForCategories'),
            data: categories.map(it => {
              return this.records.reduce((acc, item) => {
                if (item.categoryId === it.id && item.type === 'outcome') {
                  acc += +item.amount;
                }
                return acc;
              }, 0);
            }),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
            hoverBackgroundColor: [
              'rgba(255, 99, 132, 0.1)',
              'rgba(54, 162, 235, 0.1)',
              'rgba(255, 206, 86, 0.1)',
              'rgba(75, 192, 192, 0.1)',
              'rgba(153, 102, 255, 0.1)',
              'rgba(255, 159, 64, 0.1)',
            ],
          }]
        });
      }
    },
    components: {
      HistoryTable: () => import('../components/HistoryTable')
    }
  }
</script>