<template>
    <div class="media-type g-box-shadow">
        <header>
            <p><span class="dot g-fl"></span>&ensp;<span style='font-size:14px'>TOP50媒体主</span></p>
            <el-select v-model="listShearch.type" placeholder="投放次数" size="mini" @change="DeliveryChange(listShearch.type),getData()"> 
                <el-option label="投放次数" :value="1"></el-option>
                <el-option label="投放金额" :value="2"></el-option>
            </el-select>
            <el-select v-model="listShearch.year" placeholder="请选择年份" size="mini"   @change="getData()">
                <el-option v-for="(item,i) in yearData" :key="i" :label="item" :value="item"></el-option>
            </el-select>
            <el-select v-model="listShearch.month" placeholder="请选择月份" size="mini" clearable @change="getData()">
                <el-option label="一月" :value="1"></el-option>
                <el-option label="二月" :value="2"></el-option>
                <el-option label="三月" :value="3"></el-option>
                <el-option label="四月" :value="4"></el-option>
                <el-option label="五月" :value="5"></el-option>
                <el-option label="六月" :value="6"></el-option>
                <el-option label="七月" :value="7"></el-option>
                <el-option label="八月" :value="8"></el-option>
                <el-option label="九月" :value="9"></el-option>
                <el-option label="十月" :value="10"></el-option>
                <el-option label="十一月" :value="11"></el-option>
                <el-option label="十二月" :value="12"></el-option>
            </el-select>
        </header>
        <div class="conter">
            <section><el-pagination @current-change="pageChange" :current-page='listShearch.page' :page-size="listShearch.page_size" small layout="prev, pager, next" :total="total"></el-pagination></section>
            <p>{{titleText}}</p>
            <div v-loading="isLoading"> 
              <div id='mediaTypeMain' :style="{width: '100%', height: '500px'}"></div> 
              <!-- <echarts id='mediaTypeMain' height="500px" :option='echartsOptionMain' v-if="!isLoading" /> -->
            </div>
        </div>
    </div>
</template>

<script>
import Echarts from "@/components/echarts/index";
import echarts from "echarts";
import BrokenLine from '@/static/img/zhexian.png'
import Columnar from '@/static/img/Columnar.png'
export default {
  components: {
    Echarts
  },
  data() {
    return {
      typeLine:'bar',
      BrokenLine:BrokenLine,
      Columnar:Columnar,
      // 横坐标单位
      xAxisName:'次',
      // 总条数
      total:0,
      // 数据
      seriesNameTwo:'', 
      seriesNameOne:'',  
      legendData:null,  
      yAxisData:null,  
      nameData:null,  
      seriesDataOne:null,  
      seriesDataTwo:null,
      // 年份
      yearData: null,
      // 加载loading
      isLoading: true,
      // 搜素条件
      listShearch: {
        page: 1,
        page_size: 10,
        type: 1,
        year: 0
      },
      //   标题
      titleText: "投放次数TOP50媒体主",
    };
  },
  mounted() {
    this.getData();
    this.getYear();
    let date=new Date()
    this.listShearch.month=date.getMonth()+1
  },
  methods: {
    // 获取年份
    getYear() {
      let date = new Date();
      let year = date.getFullYear();
      this.listShearch.year= date.getFullYear()
      this.yearData = [year];
      for (let i = 0; i < year - 2015; i++) {
        this.yearData.push(date.getFullYear() - i - 1);
      }
      console.log(this.yearData);
    },
    //   翻页
    pageChange(val) {
      this.listShearch.page = val;
      this.getData();
    },
    mediaTypeMain() {
      const that = this;
      let myChart = echarts.init(document.getElementById("mediaTypeMain"));
      myChart.clear()
      myChart.setOption({
        color: ["#2ec7c9", "#b6a2de"],
        toolbox: {
          show: true,
          feature: {
            myTool1: {
                show: true,
                title: '切换成折线图',
                icon: 'image://'+that.BrokenLine,
                onclick: function (){
                  that.typeLine='line'
                  that.mediaTypeMain()
                }
            },
            myTool2: {
                show: true,
                title: '切换成柱状图',
                icon: 'image://'+that.Columnar,
                onclick: function (){
                  that.typeLine='bar'
                  console.log('q332323232')
                  that.mediaTypeMain()
                }
            }
            // magicType: { show: true, type: ["line", "bar"] }
          },
          iconStyle: {
            borderColor: "#2ec7c9",
            color: "#2ec7c9"
          }
        },
        tooltip: {
          trigger: "axis",
          formatter: function(params) {
            // console.log(that.seriesNameOne,that.seriesNameTwo,that.seriesDataOne)
            var id = params[0].dataIndex;
            return `${that.nameData[id]?that.nameData[id]:'---'} <br> ${that.seriesNameOne}：${that.seriesDataOne[id]} <br> ${that.seriesNameTwo}：${that.seriesDataTwo[id]}`;
          }
        },
        legend: {
          data: that.legendData
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          name: that.xAxisName,
          type: "value",
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: "category",
          data: that.yAxisData
        },
        series: [
          {
            name: that.seriesNameOne,
            type: that.typeLine,
            data: that.seriesDataOne,
            itemStyle: {
              normal: {
                //柱形图圆角，初始化效果
                barBorderRadius: [5, 5, 5, 5]
              }
            }
          },
          {
            name: that.seriesNameTwo,
            type: that.typeLine,
            data: that.seriesDataTwo,
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
    // 初始化数据
    getData() {
      this.isLoading = true;
      this.$axios
        .get(`/media_analysis/get_top_media_statistics`, {
          params: this.listShearch
        })
        .then(res => {
          this.seriesDataOne  = [];
          this.seriesDataTwo = [];
          this.yAxisData = [];
          this.nameData = [];
          if (res.data.code == 200) {
            // console.log(res.data.data.total)
            this.total=res.data.data.total>=50?50:res.data.data.total
            res.data.data.items.map(el => {
              // 媒体名称
              this.seriesDataOne.push(el.last_val);
              // 上一时间的值
              this.seriesDataTwo.push(el.selected_val);
              // 所选时间的值
              this.nameData.push(el.media_name);
              this.yAxisData.push(el.media_name?el.media_name.length > 7?el.media_name.substring(0, 7)+"...":el.media_name:'---' );
            });
            this.seriesDataOne=this.seriesDataOne.reverse()
            this.seriesDataTwo=this.seriesDataTwo.reverse()
            this.nameData=this.nameData.reverse()
            this.yAxisData=this.yAxisData.reverse()
            this.legendData = [`${res.data.data.last_show_time}`,`${res.data.data.selected_show_time}`];
            this.seriesNameOne = res.data.data.last_show_time;
            this.seriesNameTwo = res.data.data.selected_show_time;
            this.isLoading = false;
            this.mediaTypeMain()
          } else {
            this.isLoading = false;
            this.$message({ type: "warning", message: res.data.msg });
            this.mediaTypeMain()
          }
        })
        .catch(() => {
          this.isLoading = false;
          // this.$message.error("网络错误");
        });
    },
    // 投放次数和投放金额切换
    DeliveryChange(val) {
      console.log(val,'//////')
      if (val == 1) {
        this.xAxisName='次'
        this.titleText = "投放次数TOP50媒体主";
      } else {
        this.xAxisName='万元'
        this.titleText = "投放金额TOP50媒体主";
      }
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
    padding: 0px 0px 0px 10px;
    margin-bottom: 15px;
    display: flex;
    .dot {
      width: 1px;
      height: 20px;
      background: #409eff;
      border-radius: 2px;
      margin-top: 1.5px;
      border: 2px solid #409eff;
    }
    span {
      line-height: 25px;
    }
    .el-select {
      padding-left: 10px;
    }
  }
  .conter {
    display: flex;
    justify-content: space-between;
    width: 100%;
    position: relative;
    padding-top: 15px;
    border-top: 1px solid rgb(225, 228, 230);
    > section {
      position: absolute;
      right: 11%;
      z-index: 9;
    }
    > div {
      width: 100%;
      min-height: 500px;
    }
    > p {
      position: absolute;
      left: 0px;
      color: #1192dd;
      font-size: 18px;
      font-family: "微雅软黑";
    }
  }
}
</style>
