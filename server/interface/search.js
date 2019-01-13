const Router = require("koa-router");
const axios = require("./utils/axios");
const dbConfig = require("../dbs/config");
const Poi = require("../dbs/models/poi");

const router = new Router({
  prefix: "/search"
});

let makeUrl = path => `${dbConfig.reqUrl}/search/${path}?sign=${dbConfig.sign}`;

router.get("/top", async ctx => {
  let {
    status,
    data: { top }
  } = await axios.get(makeUrl("top"), {
    params: {
      input: ctx.query.input,
      city: ctx.query.city
    }
  });

  ctx.body = {
    top: status === 200 ? top : []
  };
});

router.get("/hotPlace", async ctx => {
  let city = ctx.store ? ctx.store.geo.position.city : ctx.query.city;
  let {
    status,
    data: { result }
  } = await axios.get(makeUrl("hotPlace"), {
    params: {
      city
    }
  });

  ctx.body = {
    result: status === 200 ? result : []
  };
});

router.get("/resultsByKeywords", async ctx => {
  const { city, keyword } = ctx.query;
  let {
    status,
    data: { count, pois }
  } = await axios.get(makeUrl("resultsByKeywords"), {
    params: {
      keyword,
      city
    }
  });

  ctx.body = {
    count: status === 200 ? count : 0,
    pois: status === 200 ? pois : []
  };
});

module.exports = router;
