<template>
  <div class="m-product-select">
    <dl class="tab">
      <dt>{{ name }} <i class="el-icon-arrow-down el-icon--right" /></dt>
      <dd>
        <h3>{{ name }}</h3>
        <span
          v-for="(item,index) in list"
          :key="index"
        >{{ item }}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ""
    },
    list: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {};
  }
};
</script>

