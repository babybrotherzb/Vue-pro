<template>
  <div class="header">
    <div id="logo" style="display:flex;align-items: center;">
      <h1 class="g-fl">
        <img
          class
          src="https://s-q.mxcdn.cn/2019/12/27/FpVswdleyJCmumR5XPikGHBJn7Rx.jpg?time=1577430517969"
          alt="代理商平台"
        />
      </h1>
      <div class="g-fl shu"></div>
      <p class="g-fl">baby张后台</p>
    </div>
    <div class="topMenu header_class">
      <el-menu :default-active="navActive" :router="true" mode="horizontal" @select="handleSelect">
        <template class v-for="(item,index) in topData">
          <el-menu-item :index="item.url" :key="index">{{ item.name }}</el-menu-item>
        </template>
      </el-menu>
    </div>

    <p class="exitimg" @click="loginOut()">
      <img style="width:15px" src="../../static/img/exit.png" />
    </p>
    <div class="user-info">
      <span class="el-dropdown-link" style="height:50px;">
        <img class="user-logo" :src="userHead" />
        <span
          style="display:block;float:left;height:50px;line-height:50px;color:#bdbdbd;"
        >{{userName}}</span>
      </span>
    </div>
    <!-- <el-divider direction="vertical"></el-divider> -->
    <div class="myMessage g-fr">
      <i class="icon"></i>
      <el-dropdown trigger="hover">
        <span class="el-dropdown-link">
          <img class="top-other-icon" src="../../static/img/message.png" />
          消息
          <span
            class="g-text-color-danger"
          >{{mediummes.pending_ask_price + mediummes.pending_destine + sellmes.pending_ask_price + sellmes.pending_destine}}</span>
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" style="margin-top:8px;">
          <el-dropdown-item class="clearfix">
            <a>
              老朋友
              <el-badge class="mark" type="primary" :value="sellmes.pending_ask_price" />
            </a>
          </el-dropdown-item>
          <el-dropdown-item class="clearfix">
            <a>
              新朋友
              <el-badge class="mark" type="primary" :value="sellmes.pending_destine" />
            </a>
          </el-dropdown-item>
          <el-dropdown-item class="clearfix">
            <a>
              女朋友
              <el-badge class="mark" type="primary" :value="mediummes.pending_ask_price" />
            </a>
          </el-dropdown-item>
          <el-dropdown-item class="clearfix">
            <a>
              男朋友
              <el-badge class="mark" type="primary" :value="mediummes.pending_destine" />
            </a>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <div class="myMessage g-fr">
      <v-language></v-language>
    </div>
    <div class="theme g-fr">
      <v-theme-picker></v-theme-picker>
    </div>
    <!-- <div class="myMessage g-fr">
          <span @click="exportExcel()" style="cursor:pointer">
             <i class="el-icon-sold-out" style="font-size:16px"></i>导出
             <span class="g-text-color-danger">{{1000|formatMoney}}</span>
          </span>
    </div>-->
  </div>
</template>
<script>
import topData from "./nav.json";
import defaultImg from "../../static/img/bao.png";
import vThemePicker from "./ThemePicker";
import vLanguage from "./language";
export default {
  components: {
    vThemePicker,
    vLanguage
  },
  data() {
    return {
      showDialog: {
        show: false,
        business_info: []
      },
      topData: topData.data,
      sellmes: {
        pending_ask_price: 10,
        pending_destine: 5
      },
      mediummes: {
        pending_ask_price: 6,
        pending_destine: 2
      },
      collectList: [],
      carList: [],
      userHead: defaultImg,
      userName: "管理员",
      navActive: "/" + this.$route.matched[1].path.split("/")[1]
    };
  },
  computed: {},

  mounted() {
    console.log(topData, this.$route, "topData");
  },
  methods: {
    exportExcel() {
      this.showDialog.show = true;
    },
    // 退出登录
    loginOut() {
      sessionStorage.removeItem("user");
      // this.$router.push({ path: "/login" });
      history.go(0);
      // window.location.href = '/Vue-pro/dist/index.html'
    },

    handleCommand(command) {},
    handleSelect(e) {
      console.log(e, "handleSelect");
    },
    getSelfPosition(ev) {},
    handleCarMp(command) {},
    handleCollectMp(command) {}
  },
  watch: {
    $route: function(n, o) {
      this.navActive = "/" + this.$route.matched[1].path.split("/")[1];
    }
  }
};
</script>
<style scoped lang='less' >
.exitimg {
  width: 20px;
  float: right;
  margin-right: 15px;
  margin-top: 17px;
  cursor: pointer;
}
.header {
  position: fixed;
  box-sizing: border-box;
  min-width: 510px;
  width: 100%;
  height: 50px;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  z-index: 1000;
  #logo {
    float: left;
    width: 300px;
    text-align: center;
    h1 {
      float: left;
      height: 50px;
      margin-left: 20px;
      img {
        float: left;
        height: 34px;
        margin-top: 8px;
      }
    }
    .shu {
      height: 30px;
      width: 1px;
      background: #e5e5e5;
      margin: 0 20px;
    }
    p {
      float: left;
      height: 50px;
      line-height: 50px;
      margin-top: 0px;
      // padding-left: 10px;
      font-size: 16px;
      color: #414141;
    }
  }
  .topMenu {
    float: left;
    height: 50px;
    ul {
      background: none;
      .el-menu-item {
        color: #bdbdbd;
        height: 50px;
        line-height: 50px;
        border-bottom: 2px solid transparent;
        &.is-active {
          border-bottom: 2px solid #409eff;
        }
        &:hover {
          color: #868686;
          background-color: none !important;
          border-bottom: 2px solid #409eff;
        }
      }
    }
  }

  .myMessage {
    float: left;
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
    margin-right: 10px;
    color: #bdbdbd;
    font-size: 14px;
    .el-dropdown-link {
      color: #bdbdbd;
    }
    .top-other-icon {
      vertical-align: text-bottom;
    }
  }
  .theme {
    padding: 8px 10px;
  }
}

.user-info {
  float: right;
  padding-right: 20px;
  font-size: 16px;
  color: #fff;
}
.user-info .el-dropdown-link {
  position: relative;
  display: inline-block;
  padding-left: 50px;
  color: #fff;
  cursor: pointer;
  vertical-align: middle;
}
.user-info .user-logo {
  position: absolute;
  left: 10px;
  top: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.el-dropdown-menu__item {
  text-align: center;
}
.mp-scale {
  float: left;
  height: 28px;
  width: 28px;
  margin-top: 4px;
  margin-right: 5px;
  overflow: hidden;
}
</style>
<style lang="less">
.header {
  .topMenu {
    ul {
      background: none;
      .el-menu-item {
        color: #bdbdbd;
        height: 50px;
        line-height: 50px;
        border-bottom: 2px solid transparent;
        // &.is-active {
        //   border-bottom: 2px solid #ff9d00;
        // }
        // &:hover {
        //   color: #868686;
        //   background-color: none !important;
        //   border-bottom: 2px solid #ff9d00;
        // }
      }
    }
    ul .el-menu-item:active {
      color: #fff !important;
      background: #409eff !important;
      border-radius: 20px !important;
      border-bottom: 0px solid transparent;
      line-height: 20px !important;
      // padding: 5px 20px!important;
    }
    ul .el-menu-item.is-active {
      color: #fff !important;
      background: #409eff !important;
      border-radius: 20px !important;
      border-bottom: 0px solid transparent;
      line-height: 22px !important;
      // padding: 5px 20px!important;
    }
    ul {
      margin-top: 15px;
      color: #bdbdbd;
      height: 50px !important;
      line-height: 50px;
      border-bottom: 0px solid transparent;
    }
    .el-menu--horizontal > .el-menu-item {
      float: left;

      margin: 0;
      color: #909399;
    }
    .el-menu-item {
      height: 22px !important;
      line-height: 22px !important;
      font-size: 14px;
      color: #303133;
      padding: 0 20px;
      list-style: none;
      cursor: pointer;
      position: relative;
      transition: border-color 0s, background-color 0s, color 0s;
      box-sizing: border-box;
      white-space: nowrap;
    }
  }
}
</style>
