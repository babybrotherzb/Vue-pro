<template>
  <div>
    <div class="">
      <releasestatistics></releasestatistics>
    </div>
    <div class="pushnum g-box-shadow">
      <ad-push-num></ad-push-num>
    </div>
    <div class="pushtop g-box-shadow">
      <ad-push-top50></ad-push-top50>
    </div>
    <div class="pushtop g-box-shadow">
      <cusPutList></cusPutList>
    </div>
    <div class="pushtop g-box-shadow">
      <cusPutImg></cusPutImg>
    </div>
  </div>
</template>
<script>
import adPushNum from '../echartView/advertiser-push-num.vue'
import newaddnum from '../echartView/new-add-num.vue'
import releasestatistics from '../echartView/release-statistics.vue'
import adPushTop50 from '../echartView/advertiser-push-top50.vue'
import cusPutImg from '../echartView/customer-put-img'
import cusPutList from '../echartView/customer-put-list'
export default {
  components:{
    adPushNum,
    adPushTop50,
    newaddnum,
    releasestatistics,
    cusPutImg,
    cusPutList
  },
  data(){
    return{

    }
  }
}
</script>
<style lang="less" scoped>
  .pushnum,.pushtop{
    // overflow: auto;
    zoom: 1;
    padding:15px 20px;
    border-width: 0px;
    margin-top:30px;
    background: inherit;
    background-color: rgba(255, 255, 255, 1);
    box-sizing: border-box;
    border-radius: 4px;
    
  }
</style>
