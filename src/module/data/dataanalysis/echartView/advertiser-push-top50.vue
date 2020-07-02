<template>
<div>
     <div class="adtoptitle">
       <p style="display:flex;align-items:center">
        <span class="dot g-fl"></span>&ensp;<span style='font-size:14px'>TOP50客户投放量统计</span>&ensp;&ensp;
         <el-select v-model="listShearch.year" clearable placeholder="请选择年份" size="mini"  @change="getData">
                <el-option v-for="(item,i) in yearData" :key="i" :label="item" :value="item"></el-option>
            </el-select>
            <el-select v-model="listShearch.month" placeholder="请选择月份" size="mini" clearable @change="getData">
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
              clearable 
              :options="team"
              size="mini"
              v-model="listShearch.sale_id"
              @change="getData">
          </el-cascader>
       </p>
      </div>
       <div class="conter">
            <section>
              <el-pagination @current-change="pageChange" :current-page='listShearch.page' :page-size="listShearch.page_size" small layout="prev, pager, next" :total="50">
                </el-pagination>
            </section>
            <div v-loading="isLoading" :style="{width: '100%'}">
              <div id='adtopMain' :style="{width: '100%', height: '500px'}"></div> 
              <!-- <echarts id='adtopMain' height="400px" :option='echartsOptionMain'  v-if="!isLoading"/> -->
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
      team:[],
      // 搜索条件
      listShearch: {
        page: 1,
        page_size: 10,
        year:'',
        month:'',
        sale_id:['-1']
      },
      // 初始化loading
      isLoading: true,
      firstdata:null,
      seconddata:null,
      // 名字 截取的后的
      yname:null,
      // 名字 没有截取的
      nameData:null,
      fristname:'',
      lastname:'',
      twoname:null,
      yearData:null
    };
  },
  components: {
    Echarts
  },
  mounted() {
    this.getData();
    this.getYear();
    this.getOther();
  },
  methods: {
    // 获取年份
    getYear() {
      let date = new Date();
      let year = date.getFullYear();
      this.listShearch.year= date.getFullYear()
      this.yearData = [year];
      for (let i = 0; i < year - 2014; i++) {
        this.yearData.push(date.getFullYear() - i - 1);
      }
    },
       //销售人员
    getOther() {
      this.$axios
        .get("/customer/group")
        .then(res => {
          if (res && res.data) this.team = res.data;
        })
        .catch(err => {});
    },
    // 获取视图
     echartsOptionMain(){
       const that = this;
      let myChart = echarts.init(document.getElementById("adtopMain"));
      myChart.clear();
      myChart.setOption({
          color: ["#2ec7c9", "#b6a2de"],
        title: {
          text: "TOP50客户投放量统计",
          subtext: "库内数据",
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
            return `${that.nameData[id]?that.nameData[id]:'---'}<br>${that.fristname}：${that.firstdata[id]} <br>${that.lastname}：${that.seconddata[id]}`;
          }
        },
        legend: {
          data: [that.fristname,that.lastname]
        },
        toolbox: {
          show: true,
           feature: {
             myTool1: {
                show: true,
                title: '切换成折线图',
                icon: 'image://'+that.BrokenLine,
                onclick: function (){
                  that.typeLine='line'
                  that.echartsOptionMain()
                }
            },
            myTool2: {
                show: true,
                title: '切换成柱状图',
                icon: 'image://'+that.Columnar,
                onclick: function (){
                  that.typeLine='bar'
                  that.echartsOptionMain()
                }
            }
          },
        },
        calculable: true,
        xAxis: [
          {
            name: '投放金额/万元',
            type: "value",
            boundaryGap: [0, 0.01],
          }
        ],
        yAxis: [
          {
            type: "category",
            data: that.yname
          }
        ],
        series: [
          {
            name: that.fristname,
            type: that.typeLine,
            data: that.firstdata,
            itemStyle: {
              normal: {
                //柱形图圆角，初始化效果
                barBorderRadius: [5, 5, 5, 5]
              }
            }
          },
          {
            name: that.lastname,
            type: that.typeLine,
            data: that.seconddata,
            itemStyle: {
              normal: {
                //柱形图圆角，初始化效果
                barBorderRadius: [5, 5, 5, 5]
              }
            }
          }
        ]
      })
    },
    // 分页查询
    pageChange(val) {
      this.listShearch.page = val;
      this.getData();
    },
    getData() {
      this.isLoading = true;
      let postval = {
         page: this.listShearch.page,
        page_size: this.listShearch.page_size,
        year:this.listShearch.year,
        month:this.listShearch.month,
        sale_id:JSON.stringify(this.listShearch.sale_id)
      }
      this.$axios
        .get("/data_analysis/top50_analysis", { params: postval })
        .then(res => {
           this.firstdata=[]
          this.seconddata=[]
          this.fristname=''
          this.lastname=''
          this.yname = [];
          this.nameData=[]
          if (res.data.code == 200) {
            this.fristname = `${res.data.data.name}`;
            this.lastname = `${res.data.data.last_name}`;
            this.twoname = [`${res.data.data.name},${res.data.data.last_name}`];
            res.data.data.list.map(e =>{
              this.firstdata.unshift(e.price)
              this.seconddata.unshift(e.last_price)
              this.yname.unshift(e.name?e.name.length > 7?e.name.substring(0, 7)+"...":e.name:'---') 
              this.nameData.unshift(e.name)
            })
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
  display: flex;
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

