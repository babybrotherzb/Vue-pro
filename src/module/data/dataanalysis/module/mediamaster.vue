<template>
  <div>
    <ul class="Statistics">
      <li class="g-box-shadow">
        <h1>媒体主总数</h1>
        <p v-if="!isLoading">{{total_media_count?total_media_count:0}}</p>
        <p v-else><i class="el-icon-loading"></i></p>
      </li>
      <li class="g-box-shadow">
        <h1>媒体主三个月利用率</h1>
        <p v-if="!isLoading">{{media_use_rate?media_use_rate:'--'}}</p>
        <p v-else><i class="el-icon-loading"></i></p>
      </li>
    </ul>
      <new-add-num></new-add-num>
      <media-type></media-type>
      <media-put-list></media-put-list>
      <media-main></media-main>
      
  </div>
</template>
<script>
import MediaType from '../echartView/media-type'
import MediaMain from '../echartView/media-main'
import newAddNum from '../echartView/new-add-num'
import mediaPutList from '../echartView/media-put-list'
export default {
  components:{
    MediaType,
    MediaMain,
    newAddNum,
    mediaPutList
  },
  data(){
    return{
      // 媒体主总数
      total_media_count:0,
      // 媒体主三个月利用率
      media_use_rate:0,
      isLoading:true,
    }
  },
  mounted(){
    this.getData()
  },
  methods:{
    // 初始化数据
    getData() {
      this.isLoading = true;
      this.$axios
        .get(`/media_analysis/get_media_statistics`)
        // .get(`/schedule/monitor_data?sch_id=3093`,{params:this.listShearch})
        .then(res => {
          if (res.data.code == 200) {
            this.isLoading = false;
            this.total_media_count=res.data.data.total_media_count
            this.media_use_rate=res.data.data.media_use_rate
          } else {
            this.isLoading = false;
            this.$message({ type: "warning", message: res.data.msg });
          }
        })
        .catch(() => {
          this.isLoading = false;
          this.$message.error("网络错误");
        });
    },
  }
}
</script>
<style lang="less" scoped>
.Statistics{
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
  li{
    margin-right: 20px;
    text-align: center;
    width: 20%;
    min-width: 100px;
    padding: 20px 0px;
    background-color: white;
    border-radius: 3px;
    h1{
      font-weight: normal;
      line-height: 35px;
      font-size: 17px;
    }
    p{
      font-size: 14px;
    }
  }
}
</style>

