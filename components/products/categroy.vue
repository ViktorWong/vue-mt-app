<template>
  <div class="m-product-categroy">
    <dl class="classic">
      <dt>全部</dt>
      <dt>分类</dt>
      <dd
        v-for="(item,index) in types"
        :key="index"
      >
        <iSelect
          :name="item.type"
          :list="item.module"
        />
      </dd>
    </dl>
    <dl class="classic">
      <dt>全部</dt>
      <dt>分类</dt>
      <dd
        v-for="(item,index) in areas"
        :key="index"
      >
        <iSelect
          :name="item.type"
          :list="item.module"
        />
      </dd>
    </dl>
  </div>
</template>

<script>
import iSelect from "./iselect.vue";

export default {
  components: {
    iSelect
  },
  props: {
    types: {
      type: Array,
      default: () => {
        return [];
      }
    },
    areas: {
      type: Array,
      default: () => {
        return [];
      }
    }
  }
};
</script>

<style scoped lang="scss">
</style>
