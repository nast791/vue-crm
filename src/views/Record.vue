<template>
  <div>
    <div class="page-title">
      <h3>{{'Menu_NewRecord'|localize}}</h3>
    </div>

    <Loader v-if="loading"/>
    <p class="center" v-else-if="!categories.length">{{'NoCategories'|localize}}. <router-link to="/categories">{{'AddFirst'|localize}}</router-link></p>

    <form class="form" @submit.prevent="submitHandler" v-else>
      <div class="input-field" >
        <select ref="select" v-model="category">
          <option v-for="it in categories" :key="it.id" :value="it.id">{{it.title}}</option>
        </select>
        <label>{{'SelectCategory'|localize}}</label>
      </div>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="income" v-model="type"/>
          <span>{{'Income'|localize}}</span>
        </label>
      </p>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="outcome" v-model="type"/>
          <span>{{'Outcome'|localize}}</span>
        </label>
      </p>

      <div class="input-field">
        <input id="amount" type="number" v-model.number="amount" :class="{invalid: ($v.amount.$dirty && !$v.amount.minValue) || ($v.amount.$dirty && !$v.amount.required)}">
        <label for="amount">{{'Amount'|localize}}</label>
        <span class="helper-text invalid" v-if="$v.amount.$dirty && !$v.amount.minValue">{{'Message_MinLength'|localize}} {{$v.amount.$params.minValue.min}}</span>
        <span class="helper-text invalid" v-if="$v.amount.$dirty && !$v.amount.required">{{'Message_EnterValue'|localize}}</span>
      </div>

      <div class="input-field">
        <input id="description" type="text" v-model.trim="description" :class="{invalid: $v.description.$dirty && !$v.description.required}">
        <label for="description">{{'Description'|localize}}</label>
        <span class="helper-text invalid" v-if="$v.description.$dirty && !$v.description.required">{{'Message_EnterDescription'|localize}}</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{'Create'|localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
  import {required, minValue} from 'vuelidate/lib/validators';
  import {mapGetters} from 'vuex';
  import localizeFilter from "../filters/localize";

  export default {
    name: "Record",
    metaInfo() {
      return {title: this.$title('Menu_NewRecord')}
    },
    data: () => ({
      loading: true,
      categories: [],
      category: null,
      select: null,
      type: 'outcome',
      amount: 1,
      description: ''
    }),
    validations: {
      amount: {minValue: minValue(1), required},
      description: {required}
    },
    async mounted() {
      this.categories = await this.$store.dispatch('fetchCategories');
      this.loading = false;
      if (this.categories.length) this.category = this.categories[0].id;
      setTimeout(() => {
        this.select = window.M.FormSelect.init(this.$refs.select);
        window.M.updateTextFields();
      },0);
    },
    destroyed() {
      if (this.select && this.select.destroy) {
        this.select.destroy();
      }
    },
    computed: {
      ...mapGetters(['info']),
      canCreateRecord() {
        if (this.type === 'income') return true;
        return this.info.bill >= this.amount;
      }
    },
    methods: {
      async submitHandler() {
        if (this.$v.$invalid) { // если вся форма не валидна
          this.$v.$touch(); // активация валидации
          return;
        }
        if (this.canCreateRecord) {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          });
          const bill = this.type === 'income' ? this.info.bill + this.amount : this.info.bill - this.amount;
          await this.$store.dispatch('updateInfo', {bill});
          this.$message(localizeFilter('RecordHasBeenCreated'));
          this.$v.$reset();
          this.amount = 1;
          this.description = '';
        } else {
          this.$message(`${localizeFilter('NotEnoughMoney')} (${this.amount - this.info.bill})`);
        }
      }
    },
  }
</script>