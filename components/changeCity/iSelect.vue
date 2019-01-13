<template>
  <div class="m-iselect">
    <span class="name">按省份选择：</span>
    <el-select
      v-model="pvalue"
      placeholder="省份"
    >
      <el-option
        v-for="item in province"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select
      v-model="cvalue"
      :disabled="!city.length"
      placeholder="城市"
    >
      <el-option
        v-for="item in city"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <span class="name">直接搜索：</span>
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文"
      @select="handleSelect"
    />
  </div>
</template>

<script>
import _ from "lodash";

export default {
  data() {
    return {
      pvalue: "",
      province: [],
      cvalue: "",
      city: [],
      cities: [], //全国的城市总列表
      input: ""
    };
  },

  watch: {
    async pvalue(newVal) {
      let {
        status,
        data: { city }
      } = await this.$axios.get(`/geo/province/${newVal}`);
      if (status === 200) {
        this.city = city.map(v => {
          return {
            value: v.id,
            label: v.name
          };
        });
        this.cvalue = "";
      }
    }
  },

  async mounted() {
    let {
      status,
      data: { province }
    } = await this.$axios.get("/geo/province");
    if (status === 200) {
      this.province = province.map(v => {
        return {
          value: v.id,
          label: v.name
        };
      });
    }
  },
  methods: {
    querySearchAsync: _.debounce(async function(query, cb) {
      if (this.cities.length) {
        cb(this.cities.filter(v => v.value.indexOf(query) > -1));
      } else {
        let {
          status,
          data: { city }
        } = await this.$axios.get("/geo/city");
        if (status === 200) {
          this.cities = city.map(v => ({
            value: v.name
          }));
          cb(this.cities.filter(v => v.value.indexOf(query) > -1));
        } else {
          cb([]);
        }
      }
    }, 200),
    handleSelect(item) {
      console.log(item.value)
      this.$router.replace('/')
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/changeCity/iselect.scss";
</style>
