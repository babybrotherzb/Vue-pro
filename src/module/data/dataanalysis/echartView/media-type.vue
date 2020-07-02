<template>
    <div class="media-type g-box-shadow">
        <header><span class="dot g-fl"></span>&ensp;<span style='font-size:14px'>媒体主分布（已有联系人）</span></header>
        <div class="conter">
          <div>
            <section><el-pagination @current-change="pageChange" :current-page='listShearch.page' :page-size="listShearch.page_size" small layout="prev, pager, next" :total="total"></el-pagination></section>
            <div v-loading="isLoadingLeft"><div id='mediaTypeLeft' :style="{width: '100%', height: '500px'}"></div></div>
          </div>
          <div v-loading="isLoadingRight"><div id='mediaTypeRight' :style="{width: '100%', height: '500px'}"></div> </div>
        </div>
    </div>
</template>

<script>
import echarts from "echarts";
import BrokenLine from '@/static/img/zhexian.png'
import Columnar from '@/static/img/Columnar.png'
export default {
  data() {
    return {
      
      typeLine:'bar',
      BrokenLine:BrokenLine,
      Columnar:Columnar,
      // 总条数
      total:0,
      // 分页查询
       listShearch: {
        page: 1,
        page_size: 10
      },
      // 加载loading left
      isLoadingLeft: true,
      // 加载loading Right
      isLoadingRight: true,
      citiesLeft:null,
      lwlLeft: null,
      mtsLeft: null,
      tfmtsLeft: null,
      nameDataLeft:null,
      citiesRight: null,
      lwlRight:null,
      mtsRight: null,
      tfmtsRight:null,
      nameDataRight:null
    };
  },
  mounted() {
    this.getDataLeft();
    this.getDataRight();
  },
  methods: {
    //   翻页
    pageChange(val) {
      this.listShearch.page = val;
      console.log(this.listShearch,val)
      this.getDataLeft();
    },
    getDataLeft() {
      this.isLoadingLeft = true;
      console.log(this.listShearch)
      this.$axios
        .get("/media_analysis/get_media_type_statistics",{params:this.listShearch})
        .then(res => {
          this.citiesLeft=[];
          this.lwlLeft=[];
          this.mtsLeft=[];
          this.tfmtsLeft= [];
          this.nameDataLeft=[]
          if (res.data.code == 200) {
            this.total=res.data.data.total
            res.data.data.items.map(el=>{
              // 分类名称
              this.nameDataLeft.push(el.type_name)
              this.citiesLeft.push(el.type_name?el.type_name.length > 7?el.type_name.substring(0, 7)+"...":el.type_name:el.type_name)
              // 媒体数
              this.mtsLeft.push(el.media_count)
              // 三月内有投放媒体数
              this.tfmtsLeft.push(el.three_months_usage)
              // 近三月利用率
              this.lwlLeft.push(el.three_months_use_rate)
            })
            this.nameDataLeft=this.nameDataLeft.reverse()
            this.citiesLeft=this.citiesLeft.reverse()
            this.mtsLeft=this.mtsLeft.reverse()
            this.tfmtsLeft=this.tfmtsLeft.reverse()
            this.lwlLeft=this.lwlLeft.reverse()
            this.isLoadingLeft = false;
          } else {
            this.isLoadingLeft = false;
            this.$message({ type: "warning", message: res.data.msg });
          }
          this.mediaTypeLeft();
        })
        .catch(() => {
          // this.mediaTypeLeft();
          this.isLoadingLeft = false;
          // this.$message.error("网络错误");
        });
    },
    getDataRight() {
      this.isLoadingRight = true;
      this.$axios
        .get("/media_analysis/get_media_fans_statistics")
        .then(res => {
          this.lwlRight=[];
          this.mtsRight=[];
          this.tfmtsRight= [];
          this.citiesRight=[];
          this.nameDataRight=[]
          if (res.data.code == 200) {
            for (let i = 0; i < res.data.data.length; i++) {
              let el = res.data.data[i]
              // 分类名称
              this.citiesRight.push(el.fans_count_level?el.fans_count_level.length > 7?el.fans_count_level.substring(0, 7)+"...":el.fans_count_level:el.fans_count_level)
              this.nameDataRight.push(el.fans_count_level)
              // 媒体数
              this.mtsRight.push(el.media_count)
              // 三月内有投放媒体数
              this.tfmtsRight.push(el.three_months_usage)
              // 近三月利用率
              this.lwlRight.push(el.three_months_use_rate)
            }
            
            // this.citiesRight=this.citiesRight.reverse()
            // this.nameDataRight=this.nameDataRight.reverse()
            // this.mtsRight=this.mtsRight.reverse()
            // this.tfmtsRight=this.tfmtsRight.reverse()
            // this.lwlRight=this.lwlRight.reverse()
            this.isLoadingRight = false;
            this.mediaTypeRight();
          } else {
            this.isLoadingRight = false;
            this.$message({ type: "warning", message: res.data.msg });
            this.mediaTypeRight();
          }
          
        })
        .catch(() => {
          // this.mediaTypeRight();
          this.isLoadingRight = false;
          // this.$message.error("网络错误");
        });
    },
    mediaTypeLeft() {
      const that = this;
      let myChart = echarts.init(document.getElementById("mediaTypeLeft"));
      myChart.clear()
      myChart.setOption({
        color: ["#2ec7c9", "#b6a2de", "#fff"],
        toolbox: {
          show: true,
          feature: {
            myTool1: {
                show: true,
                title: '切换成折线图',
                icon: 'image://'+that.BrokenLine,
                onclick: function (){
                  that.typeLine='line'
                  that.mediaTypeLeft()
                }
            },
            myTool2: {
                show: true,
                title: '切换成柱状图',
                icon: 'image://'+that.Columnar,
                onclick: function (){
                  that.typeLine='bar'
                  console.log('q332323232')
                  that.mediaTypeLeft()
                }
            }
            // magicType: { show: true, type: ["line", "bar"] }
          },
          iconStyle: {
            borderColor: "#2ec7c9",
            color: "#2ec7c9"
          }
        },
        title: {
          text: "分类分布",
          textStyle: {
            color: "#1192dd",
            fontSize: "16",
            fontFamily: "微雅软黑"
          }
        },
        tooltip: {
          trigger: "axis",
          formatter: function(params) {
            var id = params[0].dataIndex;
            // console.log(that.nameDataLeft,that.citiesLeft,that.mtsLeft,that.tfmtsLeft)
            return `${that.nameDataLeft[id]} <br>媒体数：${that.mtsLeft[id]}  <br>三个月内有投放媒体数：${that.tfmtsLeft[id]} <br>近三个月利用率：${that.lwlLeft[id]}`;
          }
        },
        legend: {
          data: ["三个月内有投放媒体数", "媒体数"]
        },
        calculable: true,
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          name:'个',
          type: "value"
        },
        yAxis: {
          type: "category",
          data: that.citiesLeft
        },
        series: [
          {
            name: "媒体数",
            type: that.typeLine,
            data: that.mtsLeft,
            itemStyle: {
              normal: {
                //柱形图圆角，初始化效果
                barBorderRadius: [5, 5, 5, 5]
              }
            }
          },
          {
            name: "三个月内有投放媒体数",
            type: that.typeLine,
            data: that.tfmtsLeft,
            itemStyle: {
              normal: {
                //柱形图圆角，初始化效果
                barBorderRadius: [5, 5, 5, 5]
              }
            }
          }
        ]
      });
    },
    mediaTypeRight() {
      const that = this;
      let myChart = echarts.init(document.getElementById("mediaTypeRight"));
      myChart.clear()
      myChart.setOption({
        color: ["#2ec7c9", "#b6a2de", "#fff"],
        toolbox: {
          show: true,
          feature: {
            magicType: { show: true, type: ["line", "bar"] }
          },
          iconStyle: {
            borderColor: "#2ec7c9",
            color: "#2ec7c9"
          }
        },
        title: {
          text: "粉丝分布",
          textStyle: {
            color: "#1192dd",
            fontSize: "16",
            fontFamily: "微雅软黑"
          }
        },
        tooltip: {
          trigger: "axis",
          // textStyle :{
          //   color :'red'
          // },
          formatter: function(params) {
            var id = params[0].dataIndex;
            // console.log(that.nameDataRight,that.citiesRight,that.mtsRight,that.tfmtsRight)
            return `${that.nameDataRight[id]} <br>媒体数：${that.mtsRight[id]}  <br>三个月内有投放媒体数：${that.tfmtsRight[id]} <br>近三个月利用率：${that.lwlRight[id]}`;
          }
        },
        legend: {
          data: ["三个月内有投放媒体数", "媒体数"]
        },
        calculable: true,
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          name:'个',
          type: "value"
        },
        yAxis: {
          type: "category",
          data: that.citiesRight
        },
        series: [
          {
            name: "媒体数",
            type: "bar",
            data: that.mtsRight,
            itemStyle: {
              normal: {
                //柱形图圆角，初始化效果
                barBorderRadius: [5, 5, 5, 5]
              }
            }
          },
          {
            name: "三个月内有投放媒体数",
            type: "bar",
            data: that.tfmtsRight,
            itemStyle: {
              normal: {
                //柱形图圆角，初始化效果
                barBorderRadius: [5, 5, 5, 5]
              }
            }
          }
        ]
      });
    }
  }
};
</script>
<style lang="less" scoped>
.media-type {
  padding: 20px 30px;
  margin-top: 30px;
  background-color: #fff;
  border-radius: 3px;
  // border: 1px solid #e1e4e6;
  header {
    margin-bottom: 15px;
    .dot {
      width: 1px;
      height: 20px;
      background: #409eff;
      border-radius: 2px;
      border: 2px solid #409eff;
    }
  }
  .conter {
    display: flex;
    justify-content: space-between;
    padding-top: 15px;
    border-top: 1px solid rgb(225, 228, 230);
    > div {
      &:first-child {
        padding-right: 30px;
        > div {
          width: 100%;
        }
      }
      &:last-child {
        padding-left: 30px;
      }
      width: 50%;
      position: relative;
      > section {
        position: absolute;
        right: 11%;
        z-index: 999;
      }
    }
  }
}
</style>
