<template>
  <el-container class="layout-default">
    <el-header height="197px">
      <m-header />
    </el-header>
    <el-main>
      <nuxt />
    </el-main>
    <el-footer height="100%">
      <m-footer />
    </el-footer>
  </el-container>
</template>

<script>
import MHeader from "@/components/public/header/index";
import MFooter from "@/components/public/footer/index";

export default {
  components: {
    MHeader,
    MFooter
  }
};
</script>



