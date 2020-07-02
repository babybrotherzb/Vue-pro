<template>
<div>
    <el-menu 
        :default-active="activeNav" 
        class="el-menu-demo"   
        router
        @open="handleOpen"
        @close="handleClose"
        @select="selectNav"
        mode="horizontal"
       >
    <el-menu-item index="/data/monthly/pre_month">业绩月报</el-menu-item>
    </el-menu>
    <template>
      <div>
            <router-view></router-view>
      </div>
    </template>
</div>
 
</template>
<script>
import {mapState,mapGetters,mapMutations,mapActions} from "vuex";

export default {
  data() {
    return {
      activeNav:this.$route.path,
      userInfoData:{}
    };
  },
  created() {
    let objuserInfo=JSON.parse(localStorage.getItem('userInfo'))
    this.userInfoData=objuserInfo

    // this.$store.dispatch("userInfo");
  },
  //  computed: {
  //   ...mapActions(["userInfo"]),
  //   userInfoData() {
  //     return this.$store.state.userData;
  //   }
  // },
  methods: {
    handleOpen(key, keyPath) {
    },
    handleClose(key, keyPath) {
    },
    selectNav(key, keyPath) {
    }
  },
  watch:{
    '$route':function(n,o){
      this.activeNav = this.$route.path
    }
  },
  mounted(){
  }

};
</script>

<style lang="less" scoped>
.datalist_cont {
  min-width: 903px;
  margin-top: 20px;
  padding: 20px 30px;
  border-radius: 3px;
  background: #fff;
  -webkit-box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 2px solid #409eff;
  color: #409eff;
}
</style>

<style lang="less">
.el-table th {
  background: #f6f8f9;
}
</style>

