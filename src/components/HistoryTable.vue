<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>Сумма</th>
      <th>Дата</th>
      <th>Категория</th>
      <th>Тип</th>
      <th>Открыть</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="item of records" :key="item.id">
      <td>{{item.index}}</td>
      <td>{{item.amount | currency('RUB')}}</td>
      <td>{{item.date | date('datetime')}}</td>
      <td>{{item.categoryName}}</td>
      <td>
        <span class="white-text badge" :class="[item.typeClass]">{{item.typeText}}</span>
      </td>
      <td>
        <button class="btn-small btn" @click="$router.push(`/detail/${item.id}`)" v-tooltip="'Посмотреть запись'">
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    name: "HistoryTable",
    props: {
     records: {
       required: true,
       type: Array
     }
    }
  }
</script>