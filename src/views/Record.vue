<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <Loader v-if="loading"/>
    <p class="center" v-else-if="!categories.length">Категорий пока нет. <router-link to="/categories">Добавьте новую категорию</router-link></p>

    <form class="form" @submit.prevent="submitHandler" v-else>
      <div class="input-field" >
        <select ref="select" v-model="category">
          <option v-for="it in categories" :key="it.id" :value="it.id">{{it.title}}</option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="income" v-model="type"/>
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="outcome" v-model="type"/>
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input id="amount" type="number" v-model.number="amount" :class="{invalid: ($v.amount.$dirty && !$v.amount.minValue) || ($v.amount.$dirty && !$v.amount.required)}">
        <label for="amount">Сумма</label>
        <span class="helper-text invalid" v-if="$v.amount.$dirty && !$v.amount.minValue">Минимальное значение {{$v.amount.$params.minValue.min}}</span>
        <span class="helper-text invalid" v-if="$v.amount.$dirty && !$v.amount.required">Введите значение</span>
      </div>

      <div class="input-field">
        <input id="description" type="text" v-model.trim="description" :class="{invalid: $v.description.$dirty && !$v.description.required}">
        <label for="description">Описание</label>
        <span class="helper-text invalid" v-if="$v.description.$dirty && !$v.description.required">Введите описание</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
  import {required, minValue} from 'vuelidate/lib/validators';
  import {mapGetters} from 'vuex';

  export default {
    name: "Record",
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
          this.$message(`Запись успешно создана`);
          this.$v.$reset();
          this.amount = 1;
          this.description = '';
        } else {
          this.$message(`Недостаточно средств на счете (${this.amount - this.info.bill})`);
        }
        // const formData = {
        //   email: this.email,
        //   password: this.password
        // };
        // await this.$store.dispatch('login', formData);
        // this.$router.push('/')
      }
    },
  }
</script>