<template>
  <ul class="sidenav app-sidenav" :class="{open: isOpen}">
    <router-link v-for="link in links" :key="link.url" tag="li" active-class="active" :to="link.url" :exact="link.exact">
      <a class="waves-effect waves-orange pointer">{{link.title}}</a>
    </router-link>
  </ul>
</template>

<script>
  import localizeFilter from "../../filters/localize";
  export default {
    name: "Sidebar",
    props: ['isOpen'],
    data: () => ({
      links: [
        {title: localizeFilter('Menu_Bill'), url: '/', exact: true},
        {title: localizeFilter('Menu_History'), url: '/history'},
        {title: localizeFilter('Menu_Planning'), url: '/planning'},
        {title: localizeFilter('Menu_NewRecord'), url: '/record'},
        {title: localizeFilter('Menu_Categories'), url: '/categories'},
      ]
    })
  }
</script>