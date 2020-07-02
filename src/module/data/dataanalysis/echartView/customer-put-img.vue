<template>
<div>
     <div class="adtoptitle">
       <p style="display:flex;align-items:center">
        <span class="dot g-fl"></span>&ensp;<span style='font-size:14px'>客户投放占比走势</span>&ensp;&ensp;
         <el-select v-model="listShearch.year" clearable placeholder="请选择年份" size="mini"  @change="getData">
                <el-option v-for="(item,i) in yearData" :key="i" :label="item" :value="item"></el-option>
            </el-select>
            <el-select v-model="listShearch.month"  placeholder="请选择月份" size="mini" clearable @change="getData">
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
            <el-select v-model="listShearch.week"  placeholder="请选择周" size="mini" clearable @change="getData">
                <el-option label="第一周" :value="1"></el-option>
                <el-option label="第二周" :value="2"></el-option>
                <el-option label="第三周" :value="3"></el-option>
                <el-option label="第四周" :value="4"></el-option>
                <el-option label="第五周" :value="5"></el-option>
            </el-select> 
             <el-cascader
                placeholder="请选择销售"
                expand-trigger="hover"
                clearable 
                :options="salesteam"
                size="mini"
                v-model="listShearch.sale_id"
                @change="getData">
            </el-cascader>
            <el-autocomplete
                  size="mini"
                  clearable 
                  style="width:300px"
                  v-model="listShearch.name"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="请选择客户"
                  @select="getDatabefor"
                  :select-when-unmatched="true"
                  @keyup.enter.native="getData"
                  >
              </el-autocomplete>
       </p>
      </div>
       <div class="conter">
            <el-radio-group v-model="listShearch.type" size="small"  @change="releaseChange">
                  <el-radio-button :label="1">投放量占比走势</el-radio-button>
                  <el-radio-button :label="2">阅读量占比走势</el-radio-button>
            </el-radio-group>
            <div v-loading="isLoading" :style="{width: '100%'}">
              <div id='pullecharts' :style="{width: '100%', height: '500px'}"></div> 
              <!-- <echarts id='adtopMains' height="400px" :option='pullechart'  v-if="!isLoading"/> -->
              </div>
        </div>
</div>
</template>

<script>
import Echarts from "@/components/echarts/index";
import BrokenLine from '@/static/img/zhexian.png'
import Columnar from '@/static/img/Columnar.png'
import echarts from "echarts";
import { extname } from 'path';
export default {
  data() {
    return {
      
      typeLine:'bar',
      BrokenLine:BrokenLine,
      Columnar:Columnar,
      salesteam:[],
      customerteam:[],
      // 搜索条件
      listShearch: {
        year:'',
        month:'',
        week:'',
        type:1,
        sale_id:['-1'],
        customer_id:null,
        name:null,
      },
      // 初始化loading
      // isLoading: true,
      isLoading: false,
      firstdata:null,
      seconddata:null,
      lastdata:null,
      // 名字 截取的后的
      // yname:null,
      // 名字 没有截取的
      nameData:null,
      firstname:'优粉吧投放量',
      secondname:'客户总量',
      lastname:'优粉吧占比',
      yearData:null,
      // 按年份数据
      monthData:null,
      // 按周查询数据
      weekData:null,
      // 按月份数据
      dayData:null,
      customerNames:[]
    };
  },
  components: {
    Echarts
  },
  mounted() {
    // this.echartsOptionMain();
    this.getYear();
    this.getOther();
    this.getData();
  },
  methods: {
    //客户选择前获取id
    getDatabefor(){
      this.customerNames.map(item =>{
        if(item.value == this.listShearch.name){
          this.listShearch.customer_id = item.names
        }
      })
      this.getData();
    },
    //获取客户
      querySearchAsync(queryString, cb) {
      if (this.isLoading) {
        return;
      }
      // this.isLoading = true;
      this.listShearch.customer_id = '',
      this.$axios
        .get("/data_analysis/get_customer_selections", {
          params: {
            sale_id:JSON.stringify(this.listShearch.sale_id),
            name:this.listShearch.name
          }
        })
        .then(res => {
          this.customerNames = [];
          res.data.data.map(el => {
            let obj = {
              value: el.company,
              names: el.id
            };
            this.customerNames.push(obj);
          });
          cb(this.customerNames);
          // this.isLoading = false;
          // this.getData()
        });
    },
    // 获取数据
    getcusdata(name){
      this.listShearch.name = name
    },
    //销售人员
    getOther() {
      this.$axios
        .get("/customer/group")
        .then(res => {
          if (res && res.data) this.salesteam = res.data;
        })
        .catch(err => {});
    },
    // 获取年份
    getYear() {
       let date = new Date();
       let year = date.getFullYear();
       this.listShearch.year= date.getFullYear()
      //  this.listShearch.month=date.getMonth()+1
       this.yearData = [year];
        for (let i = 0; i < year - 2015; i++) {
            this.yearData.push(date.getFullYear() - i - 1);
        }
    },
    releaseChange(){
      if(this.listShearch.type!=1){
        this.firstname = '优粉吧投放阅读量';
        this.secondname = '客户投放总阅读量';
        this.lastname = '优粉吧占比'; 
      }else{
        this.firstname = '优粉吧投放量';
        this.secondname = '客户总量';
        this.lastname = '优粉吧占比';
      }
      this.getData();
      // console.log('234567890oijhvb, ')
      // this.echartsOptionMain()
    },
    // 获取视图
     echartsOptionMain(){
      const that = this;
      let myChart = echarts.init(document.getElementById("pullecharts"));
      let colors = ['#5793f3', '#d14a61', '#675bba'];
      myChart.clear();
      myChart.setOption({
        color: ['#5793f3', '#d14a61', '#675bba'],
        grid: {
            right: '15%',
            left:'5%'
        },
        tooltip: {
          trigger: "axis",
           axisPointer: {
            type: 'cross'
        }
        },
        legend: {
          data: [that.firstname,that.secondname,that.lastname]
        },
         toolbox: {
            // feature: {
            //     dataView: {show: true, readOnly: false},
            //     restore: {show: true},
            //     saveAsImage: {show: true}
            // }
        },
        xAxis: [
           {
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            data: that.monthData
        }
        ],
        yAxis: [
           {
            type: 'value',
            name: that.firstname,
            // min: 0,
            // max: 300,
            position: 'right',
            axisLine: {
                lineStyle: {
                    color: colors[0]
                }
            },
            axisLabel: {
                formatter: '{value}万元'
            }
        },
        {
            type: 'value',
            name: that.secondname,
            // min: 0,
            // max: 300,
            position: 'right',
            offset: 100,
            axisLine: {
                lineStyle: {
                    color: colors[1]
                }
            },
            axisLabel: {
                formatter: '{value}万元'
            }
        },
        {
            type: 'value',
            name: that.lastname,
            // min: 0,
            // max: 25,
            position: 'left',
            axisLine: {
                lineStyle: {
                    color: colors[2]
                }
            },
            axisLabel: {
                formatter: '{value}%'
            }
        }
        ],
        series: [
          {
            name: that.firstname,
            type:'bar',
            data: that.firstdata,
            // itemStyle: {
            //   normal: {
            //     //柱形图圆角，初始化效果
            //     barBorderRadius: [5, 5, 5, 5]
            //   }
            // }
          },
           {
            name: that.secondname,
            type:'bar',
            yAxisIndex: 1,
            data: that.seconddata,
          },
          {
            name: that.lastname,
            type:'line',
            yAxisIndex: 2,
            data: that.lastdata,
          }
        ]
      })
    },
    getData() {
      this.isLoading = true;
      let postval = {
        year:this.listShearch.year,
        month:this.listShearch.month,
        week:this.listShearch.week,
        type:this.listShearch.type,
        sale_id:JSON.stringify(this.listShearch.sale_id),
        customer_id:this.listShearch.customer_id==null?0:this.listShearch.customer_id,
      }
      this.$axios
        .get("/data_analysis/get_customer_push_trend", { params: postval })
        .then(res => {
          // console.log(res.data.data,'//////res.data.data')
           this.firstdata=[]
          this.seconddata=[]
          this.lastdata=[]
          this.monthData=[]
          this.weekData=[]
          this.dayData=[]
          // this.firstname=''
          // this.lastname=''
          // this.yname = [];
          // this.nameData=[]
          if (res.data.code == 200) {
            let dayArr=[],weekArr=[],monthArr=[]
            res.data.data.map(e =>{
              this.firstdata.push(e.yfb_count)
              this.seconddata.push(e.total_count)
              this.lastdata.push(e.yfb_ratio)
              monthArr.push(e.month?e.month:'')
              weekArr.push(e.week?e.week:'')
              dayArr.push(e.day?e.day:'')
            })
            // console.log(dayArr,weekArr,monthArr,'/////')
            let monthList = [...new Set(monthArr)].map(el=>{
              return el+'月'
            }), weekList = [...new Set(weekArr)].map(week=>{
              // console.log(week)
              return week+'周'
            }), dayList = [...new Set(dayArr)].map(day=>{
              return day
            })
            // console.log(monthList,'////month')
            this.monthData=[...new Set(monthArr)].length&&[...new Set(monthArr)].length!=1?monthList:[...new Set(weekArr)].length&&[...new Set(weekArr)].length!=1?weekList:[...new Set(dayArr)].length&&[...new Set(dayArr)].length!=1?dayList:[]
            // console.log([...new Set(dayArr)],[...new Set(weekArr)],[...new Set(monthArr)],'/////')
            this.isLoading = false;
          } else {
            this.isLoading = false;
            this.$message({ type: "warning", message: res.data.msg });
          }
          this.echartsOptionMain();
        })
        .catch(() => {
          this.isLoading = false;
          // this.$message.error("网络错误");
          // this.echartsOptionMain()
        });
    }
  }
};
</script>

<style lang="less" scoped>
.adtoptitle {
  border-bottom: 1px solid #e1e4e6;
  height: 50px;
  padding-top: 10px;
  .dot {
    width: 1px;
    height: 20px;
    background: #409eff;
    border-radius: 2px;
    border: 2px solid #409eff;
  }
}
.conter {
  // display: flex;
  justify-content: space-between;
  width: 100%;
  position: relative;
  padding-top: 15px;
  > section {
    position: absolute;
    right: 11%;
    z-index: 9;
  }
  > p {
    position: absolute;
    left: 0px;
    color: #1192dd;
    font-size: 18px;
    font-family: "微雅软黑";
  }
}
</style>

