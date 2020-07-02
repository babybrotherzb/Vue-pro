<template>
 <div class="month_list">
     <div class="search">
         <el-form :inline="true" :model="searchform" class="demo-form-inline">
            <el-form-item >
                <el-select style="width:100px" size="small" v-model="searchform.group" placeholder="请选择">
                    <el-option
                    v-for="item in group"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                 <el-select style="width:150px" size="small" v-model="searchform.person" placeholder="请选择">
                    <el-option
                    v-for="item in persons"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="选择时间段：">
                 <el-date-picker
                    v-model="searchform.year"
                    type="year"
                    size="small"
                    style="width:150px"
                    clearable
                    placeholder="选择年">
                </el-date-picker>
               <el-select style="width:150px" size="small" v-model="searchform.month" placeholder="选择月">
                    <el-option
                    v-for="item in month"
                    :key="item.value"
                    clearable
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>

             <el-form-item label="客户名称：">
                  <el-input  
                    clearable 
                    size="small" 
                    v-model="searchform.name"
                    @keyup.enter.native="getData"
                    placeholder="请选择客户"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            </el-form-item>

            <el-form-item>
                <el-button size="small"  @click="excel">导出报表</el-button>
            </el-form-item>
         </el-form>

     </div>
     <p class="price">业绩：<span style="color:#409eff">￥50000</span></p>
     <div class="list">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="name"
                label="员工姓名">
            </el-table-column>
             <el-table-column
                prop="name"
                label="客户名称">
            </el-table-column>
             <el-table-column
                prop="date"
                label="投放当月市场占比">
            </el-table-column>
            <el-table-column
                prop="name"
                label="已核销金额">
                <template slot-scope="scope">
                    <a>￥{{scope.row.date}}</a>
                </template>
            </el-table-column>
            <el-table-column
                prop="address"
                label="业绩">
            </el-table-column>
        </el-table>
        <div class="page">
            <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="searchform.page"
            :page-size="10"
            background
            layout="prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </div>
     </div>
</div>
</template>

<script>
import months from '../../../components/base_m/month'
import selects from '../../../components/base_m/select'
import tables from '../../../components/base_m/table'
export default {
  data () {
    return {
        month:months.data,
        group: selects.data,
        persons:selects.data,
        tableData:tables.data,
        searchform:{
            group:'选项1',
            person:'选项1',
            year:'',
            month:'',
            customer_id:'',
            name:'',
            page:1
        },
        total:100,
        customerNames:[],
        customer_id:'',
    }
  },
  components: {},

  computed: {},

  methods: {
       handleChange(value) {
        console.log(value);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      //搜索
      search(){
          console.log(this.searchform,'searchform')
      },
      //excel导出
      excel(){
          if (this.total) {
          } else {
            this.$message.error("暂无数据可以导出");
          }
      },
    
    getData(){

    }
  },

 mounted() {},
}

</script>
<style lang='less' rel='stylesheet/less' scoped>
.month_list{
    background: #fff;
    padding: 30px;
    margin-top: 15px;
    border-radius: 6px;
    .search{
      text-align: left;
    }
    .price{
        text-align:right;
        margin-right:"30px"
    }
    .list{
        .page{
            text-align:center;
            margin-top:20px
        }
    }
}
</style>
<style rel='stylesheet/less' lang='less'>
</style>