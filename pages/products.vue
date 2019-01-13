<template>
  <el-row class="page-product">
    <el-col :span="19">
      <Crumbs :keyword="keyword" />
      <Categroy
        :types="types"
        :areas="areas"
      />
      <List :list="list" />
    </el-col>
    <el-col :span="5">2</el-col>
  </el-row>
</template>

<script>
import Crumbs from "@/components/products/crumbs.vue";
import Categroy from "@/components/products/categroy.vue";
import List from "@/components/products/list.vue";

export default {
  components: {
    Crumbs,
    Categroy,
    List
  },
  data() {
    return {
      keyword: "",
      list: [],
      types: [],
      areas: [],
      point: []
    };
  },
  async asyncData(ctx) {
    let keyword = ctx.query.keyword;
    let city = ctx.store.state.geo.position.city;
    let {
      status,
      data: { count, pois }
    } = await ctx.$axios.get("/search/resultsByKeywords", {
      params: {
        keyword,
        city
      }
    });
    let {
      status: status1,
      data: { areas, types }
    } = await ctx.$axios.get("/categroy/crumbs", {
      params: {
        city
      }
    });

    if (status === 200 && count > 0 && status1 === 200) {
      return {
        list: pois
          .filter(v => v.photos.length)
          .map(v => {
            return {
              type: v.type,
              img: v.photos[0].url,
              name: v.name,
              comment: Math.floor(Math.random() * 1000),
              rate: Number(v.biz_ext.cost),
              scene: v.tag,
              tel: v.tel,
              status: "可定明日",
              module: v.type.split(";")[0],
              location: v.location
            };
          }),
        keyword,
        areas: areas.filter(v => v.type !== "").slice(0, 5),
        types: types.filter(v => v.type !== "").slice(0, 5),
        point: (pois.find(v => v.location).location || "").split(",")
      };
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/products/index.scss";
</style>
