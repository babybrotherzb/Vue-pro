<template>
    <div class="release g-box-shadow">
        <div class="adtoptitle">
            <p style="display:flex;align-items:center">
                <span class="dot g-fl"></span>&ensp;<span style='font-size:14px'>投放量统计(新老客户)</span>
                <el-select v-model="year" clearable placeholder="请选择年份" size="mini" @change="getReleaseData">
                    <el-option v-for="(item,i) in yearData" :key="i" :label="item" :value="item"></el-option>
                </el-select>

        <el-select v-model="month" clearable placeholder="请选择月份" size="mini" @change="getReleaseData"> 
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
         <el-cascader
            placeholder="所有组员"
            expand-trigger="hover"
            clearable 
            :options="team"
            size="mini"
            v-model="sales_id"
            @change="getReleaseData">
        </el-cascader>
        
        </p>
        </div>
        <div class="conter" v-loading="loading">
           <div> <echarts id='articleData' height="400px" :option='echartsOption1' v-if="!loading"/></div>
        </div>
    </div>
</template>
<script>
import Echarts from "@/components/echarts/index";
export default {
   components: {
    Echarts,
  },
  data() {
   
    return {
        yearData:null,
        loading:true,
        getDate:'',
        year:'',
        month:'',
        team:[],
        sales_id:['-1'],
      echartsOption1: {
        color:[
          "#2ec7c9",
          "#b6a2de",
          "#6495ed",
          ],
        title : {
        text: '广告主投放统计',
        subtext: '投放金额/万元',
        textStyle: {
            color: "#1192dd",
            fontSize: "16",
            fontFamily: "微雅软黑"
        }
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['新签','老客户','总计']
    },
    toolbox: {
        show : true,
        feature : {
            // dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            // restore : {show: true},
            // saveAsImage : {show: true}
        }
    },
    // calculable : true,
    xAxis : [
        {
            type : 'category',
            data : []
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'新签',
            type:'bar',
            data:[],
            markPoint : {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name: '平均值'}
                ]
            },
            itemStyle:{
                normal:{
                    barBorderRadius:[5,5,5,5]
                }
            },
            smooth:true
        },
        {
            name:'老客户',
            type:'bar',
            data:[],
            markPoint : {
                data : [
                    {name : '年最高', type:'max'},
                    {name : '年最低', type:'min'}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name : '平均值'}
                ]
            },
            itemStyle:{
                normal:{
                    barBorderRadius:[5,5,5,5]
                }
            },
            smooth:true
        },
        {
            name:'总计',
            type:'bar',
            data:[],
            markPoint : {
                data : [
                    {name : '年最高', type:'max'},
                    {name : '年最低', type:'min'}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name : '平均值'}
                ]
            },
            itemStyle:{
                normal:{
                    barBorderRadius:[5,5,5,5]
                }
            },
            smooth:true
        }
    ]
      }
    }
  },
  methods: {
      // 获取年份
    getYear(){
    let date = new Date()
    let year = date.getFullYear()
    this.yearData=[year]
    for (let i = 0; i < year-2015; i++) {
        this.yearData.push(date.getFullYear()-i-1)
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
      getReleaseData() {
          this.loading=true
              let postval={
                  year:this.year,
                  month:this.month,
                  sale_id:JSON.stringify(this.sales_id)
              }
              this.$axios.get('/data_analysis/push_analysis',{params:postval}).then(e=>{
                  this.echartsOption1.series[0].data=[]
                  this.echartsOption1.series[1].data=[]
                  this.echartsOption1.series[2].data=[]
                  this.echartsOption1.xAxis[0].data=[]
                  if(e.data.code==200){
                      this.loading=false
                      let newCustomer=[],
                      oldCustomer=[],
                      allCustomer=[],
                        xAxis=[]
                      e.data.data.forEach(element => {
                          newCustomer.push(element.new)
                          oldCustomer.push(element.old)
                          allCustomer.push(element.all)
                          xAxis.push(element.name)
                      });
                      this.echartsOption1.series[0].data=newCustomer
                      this.echartsOption1.series[1].data=oldCustomer
                      this.echartsOption1.series[2].data=allCustomer
                      this.echartsOption1.xAxis[0].data=xAxis
                  }else{
                      this.$message.error(e.data.code)
                      this.echartsOption1.series[0].data=[]
                      this.echartsOption1.series[1].data=[]
                      this.echartsOption1.series[2].data=[]
                      this.loading=false
                  }
              }).catch(err=>{
                  this.loading=false
                //   this.$message.error('网络错误')
              })
      }
  },
  mounted(){
      this.getDate=new Date()
      this.month=this.getDate.getMonth()+1
      this.year=this.getDate.getFullYear()
      this.getReleaseData()
      this.getYear()
      this.getOther()
  }
}
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
 .release {
  padding: 20px 30px;
  margin-top: 20px;
  background-color: #fff;
  border: 1px solid #eee;
  header {
    padding: 0px 0px 0px 10px;
    margin-bottom: 15px;
    display: flex;
    .dot {
      width: 1px;
      height: 20px;
      background: #409eff;
      border-radius: 2px;
      border: 2px solid #409eff;
    }
    span{
      line-height: 20px;
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
    // border-top: 1px solid rgb(225, 228, 230);
    > section {
      position: absolute;
      right: 11%;
    }
    > div {
      width: 100%;
      min-height: 400px;
    }
    >p{
        position: absolute;
      left:0px;
      color: #1192dd;
      font-size: 18px;
      font-family: "微雅软黑";
    }
  }
}
</style>
