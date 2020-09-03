<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{'Edit'|localize}}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field" >
          <select ref="select" v-model="current">
            <option v-for="c in categories" :key="c.id" :value="c.id">{{c.title}}</option>
          </select>
          <label>{{'SelectCategory'|localize}}</label>
        </div>

        <div class="input-field">
          <input id="name" type="text" v-model="title" :class="{invalid: $v.title.$dirty && !$v.title.required}">
          <label for="name">{{'Title'|localize}}</label>
          <span class="helper-text invalid" v-if="$v.title.$dirty && !$v.title.required">{{'Message_CategoryTitle'|localize}}</span>
        </div>

        <div class="input-field">
          <input id="limit" type="number" v-model.number="limit" :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}">
          <label for="limit">{{'Limit'|localize}}</label>
          <span class="helper-text invalid" v-if="$v.limit.$dirty && !$v.limit.minValue">{{'Message_MinLength'| localize}} {{$v.limit.$params.minValue.min}}</span>
          <span class="helper-text invalid" v-if="$v.limit.$dirty && !$v.limit.required">{{'Message_EnterValue' | localize}}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{'Update'|localize}}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
  import {required, minValue} from 'vuelidate/lib/validators';
  import localizeFilter from '../filters/localize';
  export default {
    name: "CategoryEdit",
    data: () => ({
      select: null,
      title: '',
      limit: 1,
      current: null
    }),
    validations: {
      title: {required},
      limit: {minValue: minValue(1)}
    },
    props: {
      categories: {
        type: Array,
        required: true
      }
    },
    created() {
      const {id, title, limit} = this.categories[0];
      this.current = id;
      this.title = title;
      this.limit = limit;
    },
    mounted() {
      window.M.updateTextFields();
      this.select = window.M.FormSelect.init(this.$refs.select);
    },
    watch: {
      current(catId) {
        const {title, limit} = this.categories.find(it => it.id === catId);
        this.title = title;
        this.limit = limit;
      }
    },
    destroyed() {
      if (this.select && this.select.destroy) this.select.destroy();
    },
    methods: {
      async submitHandler() {
        if (this.$v.$invalid) { // если вся форма не валидна
          this.$v.$touch(); // активация валидации
          return;
        }
        const data = {
          id: this.current,
          title: this.title,
          limit: this.limit
        };
        await this.$store.dispatch('updateCategory', data);
        this.$message(localizeFilter('Category_HasBeenUpdated'));
        this.$emit('update', data);
      }
    }
  }
</script>