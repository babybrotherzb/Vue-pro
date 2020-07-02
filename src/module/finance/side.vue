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
        <template v-for="(item,i) in getroles">
                <el-menu-item 
                :key="i" 
                v-if="item.id==44||item.id==45&&(useinfo.group_id<0||useinfo.is_leader)"
                :index="item.url"
                style="padding-left:53px;font-size:12px;min-width:auto;"
                >
                {{ item.name }}
                </el-menu-item>
        </template>
        </el-menu>
    </div>
</template>


<script>
export default {
  data() {
    return {
      activeNav: this.$route.matched[2].path,
      openNav: ["/finance/customerback"],
      isCollapse: true,
      getroles: [
          {
          name: "客户回款",
          index: "/finance/customerback",
          level: 1
        },
        {
          name: "回款核销",
          index: "/finance/cancelback",
          level: 1
        }
      ],
      useinfo:{},
      use_show: true
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
    }
    //获取管理员身份
  },
  mounted() {
    //  console.log(this.$route)
  },
  created() {
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