<template>
<div class="adtop-num">
    <div class="adtoptitle">
       <p style="display:flex;align-items:center">
         <span class="dot g-fl"></span>&ensp;<span style='font-size:14px'>投放量占比和统计(分行业)</span>&ensp;
         <el-select v-model="listShearch.year" clearable placeholder="请选择年份" size="mini"  @change="getData">
                <el-option v-for="(item,i) in yearData" :key="i" :label="item" :value="item"></el-option>
         </el-select>
        <el-select v-model="listShearch.month" clearable placeholder="请选择月份" size="mini"  @change="getData">
            <el-option label="一月" value="1"></el-option>
            <el-option label="二月" value="2"></el-option>
            <el-option label="三月" value="3"></el-option>
            <el-option label="四月" value="4"></el-option>
            <el-option label="五月" value="5"></el-option>
            <el-option label="六月" value="6"></el-option>
            <el-option label="七月" value="7"></el-option>
            <el-option label="八月" value="8"></el-option>
            <el-option label="九月" value="9"></el-option>
            <el-option label="十月" value="10"></el-option>
            <el-option label="十一月" value="11"></el-option>
            <el-option label="十二月" value="12"></el-option>
        </el-select>
         <el-cascader
            placeholder="所有组员"
            expand-trigger="hover"
            :options="team"
            clearable 
            size="mini"
            v-model="listShearch.sale_id"
            @change="getData">
        </el-cascader>
       </p>
    </div>
    <div v-loading="isLoading" class="conter">
        <echarts id='adtopLeft' height="400px" :option='echartsOptionLeft' v-if="!isLoading"/>
        <div id='adtopRight' :style="{ width:'50%',height: '400px'}"></div>
        <!-- <echarts id='adtopRight' height="400px" :option='echartsOptionRight' v-if="!isLoading"/> -->
    </div>
</div>
</template>

<script>
import Echarts from "@/components/echarts/index";
import echarts from "echarts";
export default {
  data() {
    return {
      getdata:'',
      team:[],
      // 饼状图数据
      echartsOptionLeft: {
        color: ["#2ec7c9", "#b6a2de","#ff7f50", "#8ec7fa", "#da7076", "#32cd32", "#6495ed", '#9BCA63','#FAD860','#F3A43B','#60C0DD','#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
],
        title: {
          text: "广告主行业投放量占比与统计",
          subtext: "库内数据",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/> {b} : {d}% / ￥ {c}"
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: ["电商", "品牌商", "教育", "微商", "休闲旅游"]
        },
        toolbox: {
          show: true,
          feature: {
            magicType: {
              show: true,
              type: ["pie"],
              option: {
                funnel: {
                  x: "25%",
                  width: "50%",
                  funnelAlign: "left"
                }
              }
            }
          }
        },
        calculable: true,
        series: [
          {
            name: "行业投放量占比 / 统计",
            type: "pie",
            radius: "55%",
            label: {
                normal: {
                    formatter: `{b}： {d}% ￥{c}`
                }
            },
            center: ["50%", "60%"],
            data: null
          }
        ]
      },
      // 柱状图数据
      echartsOptionRight: {
        
      },
      // s搜索条件
      listShearch: {
        year:'',
        month:'',
        sale_id:['-1']
      },
      //   加载loading
      isLoading: true,
      leftdata:[],//左侧名字值
      leftlegend:[],//左侧标签
      rightXaxis:[] ,//右侧横坐标
      rightdata:[],//右侧名字值,
      legendDataRight:null,   
      seriesDataRight:null,  
      xAxisDataRight:null,
      yearData:null
    };
  },
  components: {
    Echarts
  },
  mounted() {

    this.getData();
    this.getOther();
    let date = new Date();
      let year = date.getFullYear();
      this.listShearch.year= date.getFullYear()
      this.yearData = [year];
      for (let i = 0; i < year - 2015; i++) {
        this.yearData.push(date.getFullYear() - i - 1);
      }
  },
  methods: {
      //销售人员
    getOther() {
      this.$axios
        .get("/customer/group")
        .then(res => {
          if (res && res.data) this.team = res.data;
        })
        .catch(err => {});
    },
    getViewRight(){
      const that = this;
      let myChart = echarts.init(document.getElementById("adtopRight"));
      myChart.clear();
      myChart.setOption({
      color: ["#2ec7c9", "#b6a2de","#ff7f50", "#8ec7fa", "#da7076", "#32cd32", "#6495ed", '#9BCA63','#FAD860','#F3A43B','#60C0DD','#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: that.legendDataRight
        },
        toolbox: {
          show: true,
          feature: {
            magicType: { show: true, type: ["line", "bar"] }
          }
        },
    //     title : {
    //     subtext: '投放金额/元',
        
    // },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        yAxis: {
          name: '投放金额/元',
          type: "value",
          textStyle: {
            color: "#1192dd",
            fontSize: "16",
            fontFamily: "微雅软黑",
        }
        },
        xAxis: {
          type: "category",
          data: that.xAxisDataRight
        },
        series: that.seriesDataRight
      })
    },
    //  初始化数据
    getData() {
      this.isLoading = true;
      let postval = {
         year:this.listShearch.year,
        month:this.listShearch.month,
        sale_id:JSON.stringify(this.listShearch.sale_id)
      }
      this.$axios
        .get("/data_analysis/push_industry_analysis",{params:postval})
        .then(res => {
          this.echartsOptionLeft.series[0].data=[]
          this.echartsOptionLeft.legend.data=[]
          this.xAxisDataRight=[];
          this.seriesDataRight=[];
          this.legendDataRight=[]
          if (res.data.code == 200) {
            res.data.all.map(e =>{
              this.echartsOptionLeft.series[0].data.push({value:e.price,name:e.name});
              this.echartsOptionLeft.legend.data.push(e.name)
              this.legendDataRight.push(e.name)
            })
            let priceData=[]
            res.data.data.map(el =>{
              this.xAxisDataRight.push(el.name)
                priceData.push(...el.price);
            })
            for (let k = 0; k < this.echartsOptionLeft.legend.data.length; k++) {
              const item = this.echartsOptionLeft.legend.data[k]
              this.seriesDataRight.push({name: item,type: "bar",stack: "总量",data: []})
              for (let r = 0; r < priceData.length; r++) {
                if(item==priceData[r].name){
                  this.seriesDataRight[k].data.push(priceData[r].price)
                }
              }
            }
            // console.log(this.seriesDataRight,this.xAxisDataRight,this.legendDataRight)
            this.getViewRight()
            this.isLoading = false;
          } else {
            this.isLoading = false;
            this.$message({ type: "warning", message: res.data.msg });
          }
        })
        .catch(() => {
          this.isLoading = false;
          // this.$message.error("网络错误");
        });
    }
  }
};
</script>

<style lang="less" scoped>
.adtop-num {
  .adtoptitle {
    border-bottom: 1px solid #e1e4e6;
    height: 50px;
    padding-top: 10px;
    margin-bottom: 10px;
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
    width: 100%;
    min-height: 400px;
  }
}
</style>

