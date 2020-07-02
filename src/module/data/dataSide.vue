<template>
  <div class="navBox">
    <el-menu
      :default-active="activeNav"
      :default-openeds="openNav"
      class="el-menu-customer"
      @open="handleOpen"
      @close="handleClose"
      @select="selectNav"
      :router="true"
      background-color="#0F1014"
      text-color="#777c85"
      
    >
      <div>
        <!-- <p v-if="useof<=0||useof==2" style="margin-top:20px" class="title_style">
          <span class="el-icon-setting" style="margin-right:10px;font-size:16px"></span>媒介端
        </p> -->
        <template
          v-for="(item,i) in navList"
        >
          <el-menu-item
            :key="i"
            :index="item.index"
            style="font-size:12px;min-width:auto;"
          >{{ item.name }}</el-menu-item>
        </template>
      </div>
    </el-menu>
  </div>
</template>


<script>
export default {
  data() {
    return {
      activeNav: this.$route.matched[2].path,
      openNav: ["/data/dataanalysis"],
      isCollapse: true,
      navList: [
        {
          name: "数据分析",
          index: "/data/dataanalysis",
          level: 1
        },
        {
          name: "月报",
          index: "/data/monthly",
          level: 1
        }
      ],
      useof: "",
      is_leader: "",
      use_show: true,
      user_name: "",
      isvipmaster: ""
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    selectNav(key, keyPath) {
      // console.log(key, keyPath);
    },
    //获取管理员身份
    getuseof() {
      let objuserInfo = JSON.parse(localStorage.getItem("userInfo"));
    }
  },
  mounted() {
    this.getuseof();
  },
  watch: {
    $route: function(n, o) {
      this.activeNav = this.$route.matched[2].path;
    }
  }
};
</script>

<style scoped lang='less' rel='stylesheet/less'>
.title_style {
  color: #777c85;
  font-size: 14px;
  text-align: center;
  margin-left: -30px;
}
.navBox {
  height: 100%;
  overflow-y: auto;
}
.el-menu-customer {
  border-right: none;
}
</style>