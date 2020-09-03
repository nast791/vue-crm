export default {
  data() {
    return {
      page: +this.$route.query.page || 1,
      pageSize: 3,
      pageCount: 0,
      allItems: [],
      items: []
    }
  },
  methods: {
    setupPagination(allItems) {
      this.allItems = allItems.reduce((acc, it) => {
        if (acc[acc.length-1].length === this.pageSize) {
          acc.push([]);
        }
        acc[acc.length-1].push(it);
        return acc;
      }, [[]]);
      this.pageCount = this.allItems.length;
      this.items = this.allItems[this.page - 1] || this.allItems[0];
    },
    pageChangeHandler(page) {
      this.$router.push(`${this.$route.path}?page=${page}`);
      this.items = this.allItems[page - 1] || this.allItems[0];
    }
  }
}