const Router = require("koa-router");
const axios = require("./utils/axios");
const dbConfig = require("../dbs/config");

const router = new Router({
  prefix: "/categroy"
});

let makeUrl = path => `${dbConfig.reqUrl}/categroy/${path}?sign=${dbConfig.sign}`;

router.get("/crumbs", async ctx => {
  let {
    status,
    data: { areas, types }
  } = await axios.get(makeUrl("crumbs"), {
    params: {
      city: ctx.query.city.replace("市", "") || "北京"
    }
  });
  ctx.body = {
    areas:status === 200 ? areas : [],
    types:status === 200 ? types : [],
  };
});

module.exports = router;
