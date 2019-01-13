<template>
  <div class="s-item">
    <dt>
      <img
        :src="meta.img"
        alt="商品图片"
      >
    </dt>
    <dd>
      <h3>dd</h3>
    </dd>
  </div>
</template>

<script>
export default {
  props: {
    meta: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
</style>
