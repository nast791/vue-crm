<template>
  <div>
    <div class="page-title">
      <h3>{{'Categories'|localize}}</h3>
    </div>
    <section>
      <Loader v-if="loading"/>
      <div class="row" v-else>
        <CategoryCreate @created="addNewCategory"/>
        <CategoryEdit v-if="categories.length" :categories="categories" @update="updateCategories" :key="categories.length + updateCount"/>
        <p v-else class="center">{{'NoCategories'|localize}}</p>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: "Categories",
    metaInfo() {
      return {title: this.$title('Menu_Categories')}
    },
    components: {
      CategoryCreate: () => import('../components/CategoryCreate'),
      CategoryEdit: () => import('../components/CategoryEdit')
    },
    data: () => ({
      categories: [],
      loading: true,
      updateCount: 0
    }),
    methods: {
      addNewCategory(category) {
        this.categories.push(category);
      },
      updateCategories(category) {
        const idx = this.categories.findIndex(it => it.id === category.id);
        this.categories[idx].title = category.title;
        this.categories[idx].limit = category.limit;
        this.updateCount++;
      }
    },
    async mounted() {
      this.categories = await this.$store.dispatch('fetchCategories');
      this.loading = false;
    }
  }
</script>