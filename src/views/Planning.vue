<template>
  <div>
    <div class="page-title">
      <h3>{{'Menu_Planning'|localize}}</h3>
      <h4>{{info.bill | currency('RUB')}}</h4>
    </div>

    <Loader v-if="loading"/>
    <p v-else-if="!categories.length" class="center">{{'Menu_Planning'|localize}}.<router-link to="/categories">{{'AddFirst'|localize}}</router-link></p>

    <section v-else>
      <div v-for="it in categories" :key="it.id" v-tooltip="it.tooltip">
        <p>
          <strong>{{it.title}}</strong>
          {{it.spend | currency('RUB')}} {{'Of'|localize}} {{it.limit | currency('RUB')}}
        </p>
        <div class="progress">
          <div class="determinate" :class="[it.progressColor]" :style="{width: it.progressPercent + '%'}"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import currencyFilter from "../filters/currency";
  import localizeFilter from "../filters/localize";

  export default {
    name: "Planning",
    metaInfo() {
      return {title: this.$title('Menu_Planning')}
    },
    data: () => ({
      loading: true,
      categories: []
    }),
    async mounted() {
      const records = await this.$store.dispatch('fetchRecords');
      const categories = await this.$store.dispatch('fetchCategories');
      this.categories = categories.map(item => {
        const spend = records.filter(it => it.categoryId === item.id).filter(it => it.type === 'outcome').reduce((acc, it) => {
          return acc += +it.amount;
        }, 0);

        const percent = 100 * spend / item.limit;
        const progressPercent = percent > 100 ? 100 : percent;
        const progressColor = percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red';
        const tooltipValue = item.limit - spend;
        const tooltip = `${tooltipValue < 0 ? localizeFilter('MoreThan') : localizeFilter('Stayed')} ${currencyFilter(Math.abs(tooltipValue))}`;
        return {
          ...item, progressPercent, progressColor, spend, tooltip
        }
      });
      this.loading = false;
    },
    computed: {
      ...mapGetters(['info'])
    }
  }
</script>