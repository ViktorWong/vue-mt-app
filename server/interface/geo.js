const Router = require("koa-router");
const axios = require("./utils/axios");
const dbConfig = require("../dbs/config");
const Province = require("../dbs/models/province");
const Menu = require("../dbs/models/menu");

const router = new Router({
  prefix: "/geo"
});

let makeUrl = path => `${dbConfig.reqUrl}/geo/${path}?sign=${dbConfig.sign}`;

router.get("/getPosition", async ctx => {
  let {
    status,
    data: { city, province }
  } = await axios.get(makeUrl("getPosition"));
  if (status === 200) {
    ctx.body = {
      code: 0,
      province,
      city
    };
  } else {
    ctx.body = {
      code: -1,
      province: "",
      city: ""
    };
  }
});

router.get("/menu", async ctx => {
  // ----本地数据库----
  // const { menu } = await Menu.findOne();
  // ctx.body = {
  //   menu
  // };

  // ----远程线上数据----
  let {
    status,
    data: { menu }
  } = await axios.get(makeUrl("menu"));
  if (status === 200) {
    ctx.body = {
      menu
    };
  } else {
    ctx.body = {
      menu: []
    };
  }
});

router.get("/province", async ctx => {
  // ----本地数据库----
  // const province = await Province.find();
  // ctx.body = {
  //   province: province.map(v => {
  //     return {
  //       id: v.id,
  //       name: v.value
  //     };
  //   })
  // };

  // ----线上数据----
  const {
    status,
    data: { province }
  } = await axios.get(makeUrl("province"));
  ctx.body = {
    province: status === 200 ? province : []
  };
});

router.get("/province/:id", async ctx => {
  // let city = await City.findOne({ id: ctx.params.id });

  // ctx.body = {
  //   code: 0,
  //   city: city.value.map(item => {
  //     return { province: item.province, id: item.id, name: item.name };
  //   })
  // };
  let {
    status,
    data: { city }
  } = await axios.get(makeUrl(`province/${ctx.params.id}`));
  if (status === 200) {
    ctx.body = {
      city
    };
  } else {
    ctx.body = {
      city: []
    };
  }
});

router.get('/city', async ctx => {
  // let city = []
  // let result = await City.find()
  // result.forEach(item => {
  //   city = city.concat(item.value)
  // })
  // ctx.body = {
  //   code: 0,
  //   city: city.map(item => {
  //     return {
  //       province: item.province,
  //       id: item.id,
  //       name: item.name === '市辖区' || item.name === '省直辖县级行政区划'
  //         ? item.province
  //         : item.name
  //     }
  //   })
  // }
  let {
    status,
    data: { city }
  } = await axios.get(makeUrl('city'))
  if (status === 200) {
    ctx.body = {
      city
    }
  } else {
    ctx.body = {
      city: []
    }
  }
})

router.get('/hotCity', async ctx => {
  // let list = [
  //   '北京市',
  //   '上海市',
  //   '广州市',
  //   '深圳市',
  //   '天津市',
  //   '西安市',
  //   '杭州市',
  //   '南京市',
  //   '武汉市',
  //   '成都市'
  // ]
  // let result = await City.find()
  // let nList = []
  // result.forEach(item => {
  //   nList = nList.concat(item.value.filter(k => list.includes(k.name) || list.includes(k.province)))
  // })
  // ctx.body = {
  //   hots: nList
  // }
  let {
    status,
    data: { hots }
  } = await axios.get(makeUrl('hotCity'))
  if (status === 200) {
    ctx.body = {
      hots
    }
  } else {
    ctx.body = {
      hots: []
    }
  }
})

module.exports = router;
