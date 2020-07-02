<template>
  <el-card class="finance_cancelback_detail">
    <div class="title"><h1 class="c_title_line">核销排期</h1> <p>客户：杭州和中</p><p>品牌：杭州和中</p></div>
    <el-tabs v-model="activeName" @tab-click="handleClick" :before-leave="beforeLeave">
      <el-tab-pane label="待核销" name="/finance/cancelback/detail/stay"></el-tab-pane>
      <el-tab-pane label="核销记录" name="/finance/cancelback/detail/record"></el-tab-pane>
    </el-tabs>
    <transition name="move" mode="out-in">
      <router-view></router-view>
    </transition>
  </el-card>
</template>

<script>
export default {
    data() {
        return {
            activeName:this.$route.path
        }
    },
    methods: {
      beforeLeave(activeName, oldActiveName){
        console.log(activeName, oldActiveName,'asasas')
        this.$router.push({ path: activeName, query: { id: this.$route.query.id }})
      },
        handleClick(tab, event){
            // console.log(this.$route, event,'.///././././.')
            // this.$router.push({ path: tab.name, query: { id: this.$route.query.id }})
        }
    },
    mounted() {
        console.log(this.$route,'///')
    },
    watch: {
        $route: function(n, o) {
            this.activeName = this.$route.path;
        }
    }
};
</script>

<style lang="less" scoped>
.finance_cancelback_detail{
  .title{
    display: flex;
    align-items: center;
    padding: 20px 0;
    h1{
      font-size: 20px;    
      font-weight: 600;
    }
    p{
      padding-left: 20px;
    }
  }
}
</style>
