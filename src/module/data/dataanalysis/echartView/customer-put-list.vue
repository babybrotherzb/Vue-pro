<template>
<div>
     <div class="adtoptitle">
       <p style="display:flex;align-items:center">
        <span class="dot g-fl"></span>&ensp;<span style='font-size:14px'>客户投放占比</span>&ensp;&ensp;
         <el-form :inline="true" :model="filter" size="mini" >
             <el-date-picker
                v-model="filter.time"
                @change="dealwithTime"
                type="daterange"
                value-format="yyyy-MM-dd"
                size="mini"
                clearable 
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']">
            </el-date-picker>
                <span  style="color:#666666;margin-left:15px">销售</span>&emsp;
                <el-cascader
                    placeholder="所有组员"
                    expand-trigger="hover"
                    :options="team"
                    clearable 
                    size="mini"
                    v-model="filter.sales_id"
                    @change="dealwithTime">
                </el-cascader>
                 <el-autocomplete
                  size="mini"
                  clearable 
                  v-model="filter.name"
                  style="width:300px"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="请选择客户"
                  @select="getDatabefor"
                  :select-when-unmatched="true"
                  @keyup.enter.native="getData"
                  @clear="clearCustomer"
                  >
              </el-autocomplete>
        </el-form>
       </p>
      </div>
       <div class="conter">
            <div style="width:100%;overflow:hidden;zoom:1">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div  class="topbox">
                            <img  src="@/static/img/pull1.png" >
                            <div>
                              <p>优粉吧总投放客户数</p>
                              <i v-show="num_show" class="el-icon-loading bigp" ></i>
                              <p v-show="!num_show" class="bigp">{{topdata&&topdata.total_customer_count?topdata.total_customer_count:0}}</p>
                              
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div  class="topbox">
                            <img  src="@/static/img/pull2.png" >
                            <div>
                              <p>客户投放总阅读量</p>
                               <i v-show="num_show" class="el-icon-loading bigp" ></i>
                              <p v-show="!num_show" class="bigp">{{topdata&&topdata.total_read_count?topdata.total_read_count:0}}</p>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div  class="topbox">
                            <img  src="@/static/img/pull3.png" >
                            <div>
                              <p>优粉吧投放阅读量</p>
                               <i v-show="num_show" class="el-icon-loading bigp" ></i>
                              <p v-show="!num_show" class="bigp">{{topdata&&topdata.yfb_read_count?topdata.yfb_read_count:0}}</p>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div  class="topbox">
                            <img  src="@/static/img/pull4.png" >
                            <div>
                              <p>优粉吧阅读占比</p>
                               <i v-show="num_show" class="el-icon-loading bigp" ></i>
                              <p v-show="!num_show" class="bigp">{{topdata&&topdata.yfb_read_ratio?topdata.yfb_read_ratio:0}}</p>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                 <el-row :gutter="20">
                    <el-col :span="6">
                        <div  class="topbox">
                            <img  src="@/static/img/pull5.png" >
                            <div>
                              <p>客户市场总额</p>
                              <i v-show="num_show" class="el-icon-loading bigp" ></i>
                              <p v-show="!num_show" class="bigp">{{topdata&&topdata.total_price?topdata.total_price:'0.00%'}}</p>
                              
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div  class="topbox">
                            <img  src="@/static/img/pull6.png" >
                            <div>
                              <p>优粉吧投放总额</p>
                               <i v-show="num_show" class="el-icon-loading bigp" ></i>
                              <p v-show="!num_show" class="bigp">{{topdata&&topdata.yfb_price?topdata.yfb_price:0}}</p>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div  class="topbox">
                            <img  src="@/static/img/pull7.png" >
                            <div>
                              <p>优粉吧投放占比</p>
                               <i v-show="num_show" class="el-icon-loading bigp" ></i>
                              <p v-show="!num_show" class="bigp">{{topdata&&topdata.yfb_price_ratio?topdata.yfb_price_ratio:0}}</p>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div style="margin-bottom:25px">
                <span class="dot g-fl"></span>&ensp;<span style='font-size:14px'>明细汇总</span>&ensp;&ensp;
                <el-button class="g-fr" :loading="btnLoading" type="primary" size="mini"  @click="exportExcel()">导出EXCEL</el-button>
            </div>

            <el-table
                :data="tableData"
                v-loading="bigloading"
                style="width: 100%;margin-top:10px"
                @expand-change="expandChange"
                @sort-change="sortChange"
                >
                <el-table-column
                label="品牌名称"
                width="160px"
                prop="customer_brand" />

                <el-table-column
                label="市场总投放数"
                width="140px"
                prop="total_push" />

                <el-table-column
                label="优粉吧投放数"
                width="140px"
                prop="yfb_push" />

                <el-table-column
                label="投放总阅读"
                width="110px"
                prop="total_read" />

                <el-table-column
                label="优粉吧阅读数"
                width="120px"
                sortable="custom"
                prop="yfb_read" />

                 <el-table-column
                label="优粉吧阅读占比"
                width="140px"
                prop="yfb_read_ratio" />

                <el-table-column
                label="投放总额"
                width="110px"
                prop="total_price" />

                <el-table-column
                label="优粉吧投放总额"
                width="140px"
                prop="yfb_price" />

                <el-table-column
                label="优粉吧投放量占比"
                width="140px"
                prop="yfb_price_ratio" />

                <el-table-column
                label="销售"
                prop="sale_info" >
                    <template slot-scope="scope">
                      <p>
                        <img style="width:25px;height:25px;border-radius:25px;vertical-align: middle;" :src="scope.row.sale_info.avatar" />
                        <span>{{scope.row.sale_info.username}}</span>
                      </p>
                    </template>
                </el-table-column>

                <el-table-column  type="expand">
                    <template slot-scope="props" style="background:#ccc" class="demo-table-expand">
                      <el-table
                          v-loading="minloading"
                          :data="tableList"
                          style="width: 100%;margin-top:10px">

                          <el-table-column
                          label="投放文案"
                          prop="title" >
                            <template slot-scope="scope">
                              <a :href="scope.row.url" target="_blank" >{{scope.row.title}}</a>
                            </template>
                          </el-table-column>

                          <el-table-column
                          label="投放公众号"
                          prop="id" >
                            <template slot-scope="scope" >
                                <p>
                                  <img style="width:25px;height:25px;border-radius:25px;vertical-align: middle;" :src="scope.row.mp_avatar">
                                  <span>{{scope.row.mp_name}}</span>
                                  <span style="background:bule;padding:2px 5px" v-if="scope.row.mp_type==1">自营</span>
                                </p>
                            </template>
                          </el-table-column>

                          <el-table-column
                          label="投放位置"
                          prop="show_position" />

                          <el-table-column
                          label="阅读量"
                          prop="read_count" />

                          <el-table-column
                          label="投放时间"
                          prop="published_at" />

                          <el-table-column
                          label="投放价格"
                          prop="price" >
                            <template slot-scope="scope">
                              <p v-if="scope.row.price_estimated">{{scope.row.price}}</p>
                              <p v-else style="color:#409eff">{{scope.row.price}}</p>
                            </template>
                          </el-table-column>

                          <el-table-column
                          label="是否优粉吧投放" >
                            <template slot-scope="scope">
                                <p>{{scope.row.is_yfb==1?'是':'否'}}</p>
                            </template>
                          </el-table-column>


                          <el-table-column
                          label="销售"
                          prop="sale_info" >
                           <template slot-scope="scope">
                                <p>
                                  <img style="width:25px;height:25px;border-radius:25px;vertical-align: middle;" :src="scope.row.sale_info.avatar" />
                                  <span>{{scope.row.sale_info.username}}</span>
                                </p>
                              </template>
                          </el-table-column>

                          <el-table-column
                          label="媒介"
                          prop="medium_info" >
                           <template slot-scope="scope">
                                <p>
                                  <img style="width:25px;height:25px;border-radius:25px;vertical-align: middle;" :src="scope.row.medium_info.avatar" />
                                  <span>{{scope.row.medium_info.username}}</span>
                                </p>
                              </template>
                          </el-table-column>
                      </el-table>
                      <el-pagination 
                          class="g-fr" 
                          @current-change="pageChangem" 
                          :current-page='listShearchm.page' 
                          :page-size="listShearchm.page_size" 
                          small 
                          layout="prev, pager, next" 
                          :total="listShearchm.total">
                      </el-pagination>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination 
                class="g-fr" 
                background 
                @current-change="pageChangel" 
                :current-page='listShearchl.page' 
                :page-size="listShearchl.page_size" 
                small 
                layout="prev, pager, next" 
                :total="listShearchl.total">
            </el-pagination>

        </div>

        <div class="export">
          <v-exportexcel :showDialog="showDialog"></v-exportexcel>
        </div>
</div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import moment from "moment";
import vExportexcel from '@/components/common/ExportExcel.vue';
export default {
  data() {
    return {
        showDialog:{
          show:false
        },
        team:[],
        filter: {
            sales_id:['-1'],
            time: [],
            name:null,
            customer_id:''
        },
        isLoading:false,
        topdata:null,
        num_show:true,
        bigloading:true,
        minloading:true,
        listShearchm: {
            page: 1,
            page_size: 10,
            total:null
        },
        listShearchl: {
            page: 1,
            page_size: 10,
            total:null
        },
        tableList:[],
        tableData:[],
        topdata:{},
        order_type:0,//筛选类型
        customer_id:null,//展开的id
        smallPage:1,
        id:[],
        total:0,
        btnLoading:false
    };
  },
  components: {
    vExportexcel
  },
  mounted() {
    this.getDefaultDate();
    this.getData();
    this.gettop();
    this.getOther();
    // this.getDataId();
  },
  computed: {
    ...mapActions(["userInfo","getExcelNum"]),
    userInfoData() {
      return this.$store.state.userData; //权限判断
    }
  },

  methods: {

    getDefaultDate(){
      var date = new Date();
      console.log(moment().subtract(1, 'months').format('YYYY-MM-DD'),moment().format("YYYY-MM-DD"),'sdasfdsfsgfdgret435')
      this.filter.time=[moment().subtract(1, 'months').format('YYYY-MM-DD'),moment().format("YYYY-MM-DD")]
    },

    clearCustomer(){
      this.filter.customer_id=''
      this.getData()
      this.gettop()
    },

    expandChange(row,expandedRows){
      if(expandedRows&&expandedRows.length>0){
        this.customer_id = row.customer_id;
        this.listShearchm.page = 1;
        this.getList()
      }else{
        this.customer_id = null;
        this.listShearchm.page = 1;
      }
        if(expandedRows&&expandedRows.length>1){
            this.listShearchm.page = 1;
             expandedRows.shift()
        }

      },
      //客户选择前获取id
    getDatabefor(){
      this.customerNames.map(item =>{
        if(item.value == this.filter.name){
          this.filter.customer_id = item.names
        }
      })
      this.id=[]
      this.total=0
      this.smallPage=1
      // this.getDataId();
      this.getData();
      this.gettop();
    },
        //获取客户
      querySearchAsync(queryString, cb) {
      if (this.isLoading) {
        return;
      }
      // this.isLoading = true;
      this.customer_id = '',
      this.$axios
        .get("/data_analysis/get_customer_selections", {
          params: {
            sale_id:JSON.stringify(this.filter.sale_id),
            name:this.filter.name
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
    //销售人员
    getOther() {
      this.$axios
        .get("/customer/group")
        .then(res => {
          if (res && res.data) this.team = res.data;
        })
        .catch(err => {});
    },
    dealwithTime(val){
        this.listShearchl.page = 1;
        this.listShearchm.page = 1;
        
        this.getData();
        this.id=[]
        this.total=0
        this.smallPage=1
        // this.getDataId();
        this.gettop();
      },
    exportExcel(){
      var that=this
      this.btnLoading=true
      this.$axios.get("/data_analysis/get_push_list_customerIds", {params:{
        date_from:this.filter.time[0],
        date_to:this.filter.time[1],
        sale_id:JSON.stringify(this.filter.sales_id),
        customer_id:this.filter.customer_id,
        page:this.smallPage,
        page_size:this.listShearchl.page_size,
        order_type:this.order_type
      }}).then(res=>{
        console.log(res,'ressssss')
        if(res.data.code==200){
          this.id=res.data.data
          if(!this.tableData.length){
            this.$message.error('没有可导出的表格');
            return
          }
          let copySales_id=[]
          this.userInfoData.business_info.forEach(element => {
              if(!element){
                  copySales_id.push('')    
              }else{
                  copySales_id.push(`${element}`)
              }
              
          });
          this.$axios.get('/export/list',{params:
            {
              sales_id:JSON.stringify(copySales_id)

            }
              }).then(res=>{
            if(res.data.code==200){
              if(res.data.data.customer_count<=2){
                this.$axios.post('/kapi/import/mp_addate',{
                  user_id:this.userInfoData.business_id,
                  date_from:this.filter.time[0],
                  date_to:this.filter.time[1],
                  total: this.listShearchl.total,
                  sale_id:JSON.stringify(this.filter.sales_id),
                  page:1,
                  page_size:10,
                  order_type:this.order_type,
                  customer_id:this.filter.customer_id,
                  }).then(e=>{
                      this.showDialog.show=true
                      this.$store.dispatch("getExcelNum");
                      this.btnLoading=false
                })

                this.$axios.post('/kapi/import/get_article_lists',{
                    user_id:this.userInfoData.business_id,
                    date_from:this.filter.time[0],
                    date_to:this.filter.time[1],
                    sale_id:JSON.stringify(this.filter.sales_id),
                    page:1,
                    page_size:10,
                    order_type:this.order_type,
                    customer_id: JSON.stringify(this.id),
                  }).then(res=>{
                    this.showDialog.show=true
                    this.$store.dispatch("getExcelNum");
                    this.btnLoading=false
                  })
              }else{
                this.$message.error('客户投放占比（附表）个数大于2');
                this.btnLoading=false
              }
            }
          })
        }
      })

      
      console.log(this.tableData,'llllllllll')
      
      
    },
    // 分页查询
    pageChangem(val) {//小table
      this.listShearchm.page = val;
      this.getList();
    },
    pageChangel(val) {//大table
      this.listShearchl.page = val;
      this.getData();
    },
    sortChange(column,prop,order){
      if(column.prop=='yfb_read'&&column.order=='ascending')this.order_type = 1;
      if(column.prop=='yfb_read'&&column.order=='descending')this.order_type = 2;
      if(column.prop=='yfb_price_ratio'&&column.order=='ascending')this.order_type = 3;
      if(column.prop=='yfb_price_ratio'&&column.order=='ascending')this.order_type = 4;
      this.getData();
    },
    clearInfo(){
      this.filter.customer_id=''
      this.getData()
    },
    //获取顶部数据
    gettop(){
      this.btnLoading=true
      console.log(this.filter.time,'dasdafdsgdfhg')
      this.num_show = true
      let postval = {
        date_from:this.filter.time[0],
        date_to:this.filter.time[1],
        sale_id:JSON.stringify(this.filter.sales_id),
        customer_id:this.filter.customer_id
      }
        this.$axios.get('/data_analysis/get_push_list_statistics',{params:postval})
        .then(res =>{ 
          if(res.data.code ==200){
            this.btnLoading=false
            this.num_show = false
            this.listShearchl.total = res.data.data.total_customer_count;
            this.topdata = res.data.data
          }else{
          this.num_show = false
          this.btnLoading=false
          }
          
        })
    },
    //获取大列表所有id
    getDataId() {
      // this.btnLoading=true
      //  this.$axios
      //   .get("/data_analysis/get_customer_push_list", {params:{
      //       date_from:this.filter.time[0],
      //       date_to:this.filter.time[1],
      //       sale_id:JSON.stringify(this.filter.sales_id),
      //       customer_id:this.filter.customer_id,
      //       page:this.smallPage,
      //       page_size:this.listShearchl.page_size,
      //       order_type:this.order_type
      //   }})
      //   .then(res => {
      //     if(res.data.code == 200){
      //       res.data.data.items.forEach(element => {
      //         this.id.push(element.customer_id)  
      //       });
      //       this.smallPage
      //       this.total=res.data.data.total_count
      //       console.log(this.total,this.smallPage,this.smallPage*this.listShearchl.page, this.id,'ssssssssssssssss')

      //       if(this.total>this.smallPage*10){
      //         this.smallPage++
      //         console.log('ttttttttttttttt')
      //         this.getDataId()
      //       }else{
      //         this.btnLoading=false
      //       }
      //     }else{

      //     }
      //   })
      
        
    },

    //获取大列表数据
    getData() {
      this.bigloading = true
      console.log(this.filter.time,'asdsfdsfsdfs')
      let postval = {
        date_from:this.filter.time[0],
        date_to:this.filter.time[1],
        sale_id:JSON.stringify(this.filter.sales_id),
        customer_id:this.filter.customer_id,
        page:this.listShearchl.page,
        page_size:this.listShearchl.page_size,
        order_type:this.order_type
      }
       this.$axios
        .get("/data_analysis/get_customer_push_list", {params:postval})
        .then(res => {
          if(res.data.code == 200){
            this.tableData = res.data.data.items;
            // this.listShearchl.total = res.data.data.total_count;
            // if(res.data.data.date_from&&res.data.data.date_to){
            //   this.filter.time= [moment().format(res.data.data.date_from),moment().format(res.data.data.date_to)];
            // }else{
            //   this.filter.time= [moment().format('YYYY-MM-DD'),moment().format('YYYY-MM-DD')];
            // }
            
            this.bigloading = false;
            // this.gettop();  
          }else{
            this.bigloading = false;
          }
        })
    },
    //获取小列表数据
    getList() {
      this.minloading = true;
      let postval = {
        date_from:this.filter.time[0],
        date_to:this.filter.time[1],
        customer_id:this.customer_id,
        page:this.listShearchm.page,
        page_size:this.listShearchm.page_size,
      }
        this.$axios.get('/data_analysis/get_article_list',{params:postval})
        .then(res =>{
          if(res.data.code == 200){
            this.tableList = res.data.data.items;
            this.listShearchm.total = res.data.data.total_count;
            this.minloading = false;
          }else{
            this.minloading = false;
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
.topbox {
  margin-bottom: 20px;
  border-width: 0px;
  // width: 90%;
  height: 100px;
  background: inherit;
  background-color: #fff;
  border: none;
  border-radius: 6px;
  -moz-box-shadow: 0px 3px 10px rgba(158, 157, 157, 0.349);
  -webkit-box-shadow: 0px 3px 10px rgba(158, 157, 157, 0.349);
  box-shadow: 0px 3px 10px rgba(158, 157, 157, 0.349);
  img {
    width: 45px;
    margin: 28px;
    height: 45px;
    float: left;
  }
  div {
    margin-top: 25px;
    float: left;
    color: #888888;
    .bigp {
      font-family: monospace;
      font-size: 20px;
      color: #222222;
      font-weight: bold;
      padding-top: 7px;
    }
  }
  &:hover {
    -moz-box-shadow: 0px 3px 10px rgba(104, 104, 104, 0.349);
    -webkit-box-shadow: 0px 3px 10px rgba(104, 104, 104, 0.349);
    box-shadow: 0px 3px 10px rgba(104, 104, 104, 0.349);
  }
}
.adtoptitle {
  border-bottom: 1px solid #e1e4e6;
  height: 50px;
  padding-top: 10px;
}
  .dot {
    width: 1px;
    height: 20px;
    background: #409eff;
    border-radius: 2px;
    border: 2px solid #409eff;
  }
.conter {
//   display: flex;
  justify-content: space-between;
  width: 100%;
  position: relative;
  padding-top: 15px;
  overflow: hidden;
  zoom: 1;
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

