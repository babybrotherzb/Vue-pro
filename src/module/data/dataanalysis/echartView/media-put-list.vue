<template>
<div class="media-type g-box-shadow">
     <div class="adtoptitle">
       <p style="display:flex;align-items:center">
        <span class="dot g-fl"></span>&ensp;<span style='font-size:14px'>媒体主广告占比</span>&ensp;&ensp;
         <el-form :inline="true" :model="filter" size="mini" >
             <el-date-picker
                v-model="filter.time"
                @change="dealwithTimes"
                type="daterange"
                value-format="yyyy-MM-dd"
                size="mini"
                clearable 
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']">
            </el-date-picker>
                <span  style="color:#666666;margin-left:15px">媒介</span>&emsp;
                <el-cascader
                    placeholder="所有组员"
                    expand-trigger="hover"
                    :options="team"
                    clearable 
                    size="mini"
                    v-model="filter.sales_id"
                    @change="dealwithTime">
                </el-cascader>


                <el-select
                  v-model="filter.name"
                  filterable
                  remote
                  clearable 
                  size="mini"
                  reserve-keyword
                  placeholder="请输入公众号"
                  :loading="selectloading"
                  :remote-method="querySearchAsync1"
                  @change="getDatabefor"
                  >
                  <el-option
                    v-for="item in customerNames"
                    :key="item.names"
                    :label="item.value"
                    :value="item.names">
                  </el-option>
                </el-select>
        </el-form>
       </p>
      </div>
       <div class="conter">
            <div style="width:100%;overflow:hidden;zoom:1">
                <el-row :gutter="20">
                    <el-col :span="6" style="width:20%">
                        <div  class="topbox">
                            <img  src="@/static/img/pull1.png" >
                            <div>
                              <p>优粉吧投放公众号数</p>
                              <i v-show="num_show" class="el-icon-loading bigp" ></i>
                              <p v-show="!num_show" class="bigp">{{topdata&&topdata.yfb_push_mp_num?topdata.yfb_push_mp_num:0}}</p>
                              
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6" style="width:20%">
                        <div  class="topbox">
                            <img  src="@/static/img/pull2.png" >
                            <div>
                              <p>公众号推文总数</p>
                               <i v-show="num_show" class="el-icon-loading bigp" ></i>
                              <p v-show="!num_show" class="bigp">{{topdata&&topdata.mp_articles_num?topdata.mp_articles_num:0}}</p>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6" style="width:20%">
                        <div  class="topbox">
                            <img  src="@/static/img/pull3.png" >
                            <div>
                              <p>公众号广告总数</p>
                               <i v-show="num_show" class="el-icon-loading bigp" ></i>
                              <p v-show="!num_show" class="bigp">{{topdata&&topdata.mp_ad_num?topdata.mp_ad_num:0}}</p>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6" style="width:20%">
                        <div  class="topbox">
                            <img  src="@/static/img/pull4.png" >
                            <div>
                              <p>公众号广告占比</p>
                               <i v-show="num_show" class="el-icon-loading bigp" ></i>
                              <p v-show="!num_show" class="bigp">{{topdata&&topdata.mp_ad_ratio?topdata.mp_ad_ratio:0}}</p>
                            </div>
                        </div>
                    </el-col>

                    <el-col :span="6" style="width:20%">
                        <div  class="topbox">
                            <img  src="@/static/img/pull4.png" >
                            <div>
                              <p>优粉吧投放广告数</p>
                               <i v-show="num_show" class="el-icon-loading bigp" ></i>
                              <p v-show="!num_show" class="bigp">{{topdata&&topdata.yfb_ad_num?topdata.yfb_ad_num:0}}</p>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                 <el-row :gutter="20">
                    <el-col :span="6" style="width:20%">
                        <div  class="topbox">
                            <img  src="@/static/img/pull5.png" >
                            <div>
                              <p>优粉吧投放数占比</p>
                              <i v-show="num_show" class="el-icon-loading bigp" ></i>
                              <p v-show="!num_show" class="bigp">{{topdata&&topdata.yfb_push_num_ratio?topdata.yfb_push_num_ratio:'0.00%'}}</p>
                              
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6" style="width:20%">
                        <div  class="topbox">
                            <img  src="@/static/img/pull6.png" >
                            <div>
                              <p>公众号广告总额</p>
                               <i v-show="num_show" class="el-icon-loading bigp" ></i>
                              <p v-show="!num_show" class="bigp">{{topdata&&topdata.mp_ad_amount?topdata.mp_ad_amount:0}}</p>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6" style="width:20%">
                        <div  class="topbox">
                            <img  src="@/static/img/pull7.png" >
                            <div>
                              <p>优粉吧投放总额</p>
                               <i v-show="num_show" class="el-icon-loading bigp" ></i>
                              <p v-show="!num_show" class="bigp">{{topdata&&topdata.yfb_push_amount?topdata.yfb_push_amount:0}}</p>
                            </div>
                        </div>
                    </el-col>

                    <el-col :span="6" style="width:20%">
                        <div  class="topbox">
                            <img  src="@/static/img/pull7.png" >
                            <div>
                              <p>优粉吧投放额占比</p>
                               <i v-show="num_show" class="el-icon-loading bigp" ></i>
                              <p v-show="!num_show" class="bigp">{{topdata&&topdata.yfb_push_ratio?topdata.yfb_push_ratio:0}}</p>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div style="margin-bottom:25px">
                <span class="dot g-fl"></span>&ensp;<span style='font-size:14px'>明细汇总</span>&ensp;&ensp;
                <el-button class="g-fr"  :loading="btnLoading" type="primary" size="mini"  @click="exportExcel()">导出EXCEL</el-button>
            </div>

            <el-table
                :data="tableData"
                v-loading="bigloading"
                style="width: 100%;margin-top:10px"
                @sort-change="sortChange"
                >

                <el-table-column label="公众号" width="200px">
                    <template slot-scope="scope">
                      <div style="display:flex;align-items:center">
                        <img :src="scope.row.mp_images" alt="" style="height:40px;width:40px;border-radius:50%;margin-right:8px">
                        <span style="margin-right:8px">{{scope.row.mp_name}}</span>
                        <span v-if="scope.row.mp_type" style="display:block;height:20px;line-height:18px" class="tag-color tag-color-blue">自营</span>
                      </div>
                    </template>
                </el-table-column>

                <el-table-column
                label="推文总数"
                width="100px"
                prop="mp_push_num" />

                <el-table-column
                label="广告总数"
                width="100px"
                sortable="mp_ad_num"
                prop="mp_ad_num" />

                <el-table-column
                label="广告占比"
                width="110px"
                sortable="ad_ratio"
                prop="ad_ratio" />

                <el-table-column
                label="优粉吧投放数"
                width="120px"
                sortable="yfb_ad_num"
                prop="yfb_ad_num" />

                 <el-table-column
                label="优粉吧投放数占比"
                width="140px"
                sortable="yfb_push_ratio"
                prop="yfb_push_ratio" />

                <el-table-column
                label="公众号广告总额（刊例）"
                width="180px"
                sortable="mp_total_amount"
                prop="mp_total_amount" />

                <el-table-column
                label="优粉吧投放总额"
                width="180px"
                sortable="yfb_total_amount"
                prop="yfb_total_amount" />

                <el-table-column
                label="优粉吧投放额占比"
                width="140px"
                sortable="yfb_push_amount_ratio"
                prop="yfb_push_amount_ratio" />

                <el-table-column
                label="跟进媒介"
                width="110px"
                prop="media_name" >
                    <template slot-scope="scope">
                      <p>
                        <img style="width:25px;height:25px;border-radius:25px;vertical-align: middle;" :src="scope.row.media_image" />
                        <span>{{scope.row.media_name}}</span>
                      </p>
                    </template>
                </el-table-column>

                <el-table-column align="right">
                    <template slot-scope="scope">
                      <div @click="openMpInfo(scope)" style="cursor:pointer"><i class="el-icon-arrow-right"></i></div>
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
        <div class="dialog1">
        <el-dialog
            :visible.sync="dialogVisible"
            width="40%"
            @open="addScroll"
            @close="closeDialog"
            >
            <div slot="title" style="display:flex">
              <span style="font-size: 14px;display: inline-block;margin-right:10px">只看广告</span>
              <el-switch
              v-model="value2"
              @change="isSeeAll"
              active-color="#409eff" 
              inactive-color="#ccc">
            </el-switch>
          </div>
          <div
            v-loading="loading3"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
          >
            <div class="scroll_box" v-if="mp_info.length>0">
            <ul class="article_container" v-for="(items,index) in mp_info" :key="index">
                <li class="article_title">
                  发文日期：{{items.send_time}}
                </li>
                <li class="article_info" v-for="(item,index) in items.article_info" :key="index" style="justify-content: space-between; display:flex;align-items:center">
                  <div style="display:flex;align-items:center">
                    <span class="tag-color tag-color-basic" style="display:block;height:20px;line-height:18px;font-size:14px" v-if="item.position==1">头条</span>
                    <span class="tag-color tag-color-basic" style="display:block;height:20px;line-height:18px;font-size:14px" v-else-if="item.position==2">次条</span>
                    <span class="tag-color tag-color-basic" style="display:block;height:20px;line-height:18px;font-size:14px" v-else-if="item.position==3">三条</span>
                    <span class="tag-color tag-color-basic" style="display:block;height:20px;line-height:18px;font-size:14px" v-else-if="item.position==4">四条</span>
                    <span class="tag-color tag-color-basic" style="display:block;height:20px;line-height:18px;font-size:14px" v-else-if="item.position==5">五条</span>
                    <span class="tag-color tag-color-basic" style="display:block;height:20px;line-height:18px;font-size:14px" v-else-if="item.position==6">六条</span>
                    <span class="tag-color tag-color-basic" style="display:block;height:20px;line-height:18px;font-size:14px" v-else-if="item.position==7">七条</span>
                    <span class="tag-color tag-color-basic" style="display:block;height:20px;line-height:18px;font-size:14px" v-else-if="item.position==8">八条</span>
                    <a :href="item.url" target="_blank" style="padding-left:4px;display:inline-block;overflow:hidden;width:300px;text-overflow:ellipsis;white-space:nowrap;font-size:14px">{{item.title}}</a>
                    <span class="tag-color tag-color-blue" style="display:block;height:20px;line-height:18px;margin: 0 8px;font-size:14px" v-show="item.is_ad">广告</span>
                    <img v-if="item.business_id" src="@/static/img/yfblogo.png" style="width:20px;height:20px;vertical-align:middle" >
                    <img v-if="item.business_image" :src="item.business_image" style="width:20px;height:20px;vertical-align:middle;margin: 0 8px;border-radius: 50%;" >
                    <span v-if="item.business_name" style="font-size:14px">{{item.business_name}}</span>

                  </div>
                  <div>
                    <img  src="@/static/img/view.png" style="width:24px;height:24px;vertical-align:middle" >
                    <span style="margin-right:4px;color:#409eff;font-size:14px">{{item.read_num}}</span>


                    <img  src="@/static/img/RMB.png" style="width:20px;height:20px;vertical-align:middle" >
                    <span :style="item.price_type==1? 'color:#409eff;font-size:14px':'font-size:14px'">{{item.price}}</span>

                  </div>
                </li>
            </ul>
            <div
              v-if="loading2"
              style="padding:40px 0;"
              v-loading="loading2"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
            ></div>
            <p v-if="noMore" style="height:60px;line-height:60px;text-align:center;border-top: 1px solid #e6ebf5;">没有更多数据了</p>
           </div>
           <div v-else style="padding:40px 0;text-align:center;height:60px;line-height:60px">
             暂无数据
           </div>
           </div>
        </el-dialog>
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
  components:{
    vExportexcel
  },
  data() {
    return {
        btnLoading:false,
        team:[],
        showDialog:{
          show:false
        },
        selectloading:false,
        loading2:false,
        loading3:false,
        value2: false,
        noMore:false,
        mp_info:[],
        dialogVisible:false,
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
        customerNames:[],
        listShearchm: {
            page: 1,
            page_size: 10,
            total:null
        },
        listShearchMp:{
          page: 1,
          page_size: 10,
          total:null
        },
        mp_id:null,
        listShearchl: {
            page: 1,
            page_size: 10,
            total:null
        },
        tableList:[],
        sort:'',
        field:'',
        tableData:[],
        topdata:{},
        order_type:0,//筛选类型
        customer_id:null,//展开的id
    };
  },
  mounted() {
    this.getDefaultDate()
    this.querySearchAsync1()
    this.getData();
    this.getOther();
  },
  computed: {
    ...mapActions(["userInfo","getExcelNum"]),
    userInfoData() {
      return this.$store.state.userData; //权限判断
    }
  },
  methods: {
    closeDialog(){
      this.mp_info=[]
      let latoutNode = document.getElementsByClassName("el-dialog__wrapper")[0];
      latoutNode.removeEventListener('scroll', this.scrollLoad)
    },
    getDefaultDate(){
      var date = new Date();
      let year=date.getFullYear();
      let month=date.getMonth()+1; //获取当前月份(0-11,0代表1月)
      if(month-1==0){
        this.filter.time=[`${year-1}-12-01`,`${year}-12-01`]
      }
      else if(month-1==2){
        this.filter.time=[`${year}-${month-1}-01`,`${year}-${month-1}-28`]
      }else if(month-1==1||month-1==3||month-1==5||month-1==7||month-1==8||month-1==10||month-1==12){
        this.filter.time=[`${year}-${month-1}-01`,`${year}-${month-1}-31`]
      }else{
        this.filter.time=[`${year}-${month-1}-01`,`${year}-${month-1}-30`]
      }

    },
    isSeeAll(){
      this.getMpInfo()
    },
    getMpInfo(){
      this.loading3=true
      this.$axios.get('/media_analysis/mp_ad_articles_detail',
        {
          params:{
            mp_id:this.mp_id,//;;;;;;
            start:this.filter.time[0],
            end:this.filter.time[1],
            is_ad:this.value2?1:0,
            page:1,
            page_size:this.listShearchMp.page_size
          }
        }
      ).then(res=>{
        this.loading3=false
        this.listShearchMp.page = 1
        this.mp_info=res.data.data.data
        this.listShearchMp.total=res.data.data.total
      })
    },
    openMpInfo(scope){
      this.mp_id=scope.row.mp_id
      this.dialogVisible = true
      this.getMpInfo()
    },
    addScroll(){
      let latoutNode = document.getElementsByClassName("el-dialog__wrapper")[0];
      latoutNode.addEventListener("scroll", this.scrollLoad);
    },
    scrollLoad (e) {

      
      if(e.target.scrollTop + e.target.clientHeight == e.target.scrollHeight && this.mp_info.length < this.listShearchMp.total && this.loading2 == false) {

              console.log(this.listShearchMp.page, 'this.listShearchMp.page');
              
              this.loading2=true
              this.listShearchMp.page = this.listShearchMp.page + 1

            this.$axios.get('/media_analysis/mp_ad_articles_detail',
              {
                params:{
                  mp_id:this.mp_id,
                  start:this.filter.time[0],
                  end:this.filter.time[1],
                  is_ad:this.value2?1:0,
                  page:this.listShearchMp.page,
                  page_size:this.listShearchMp.page_size
                }
              }
            ).then(res=>{
              res.data.data.data.forEach(element => {
                this.mp_info.push(element)  
              });
              this.loading2=false
            })
          }
          this.noMore=false
          if(this.mp_info.length>=this.listShearchMp.total){
            this.noMore=true
          }
    },
    
   
      //客户选择前获取id
    getDatabefor(e){
      this.filter.customer_id = e
      this.getData();
    },
    //获取公众号
    querySearchAsync1(query){
      this.selectloading=true
      this.customerNames = [];
      this.$axios
        .get("/medium_mp/search", {
          params: {
            type:1,
            names:query
          }
        })
        .then(res => {
          this.selectloading=false
          res.data&&res.data.data?res.data.data.map(el => {
            let obj = {
              value: el.names,
              names: el.id
            };
            this.customerNames.push(obj);
          }):'';
          this.isLoading = false;
          // this.getData()
        });
    },
    //销售人员
    getOther() {
      this.$axios
        .get("/customer/medium_group")
        .then(res => {
          if (res && res.data) this.team = res.data;
        })
        .catch(err => {});
    },
    dealwithTimes(val){
      if(val){
        this.filter.time=val
      }else{
        this.filter.time=[]
      }
      this.listShearchl.page = 1;
      this.listShearchm.page = 1;
      this.getData();
    },
    dealwithTime(val){
        console.log(val)
        this.listShearchl.page = 1;
        this.listShearchm.page = 1;
        this.getData();
      },
    exportExcel(){
      if(!this.tableData.length){
        this.$message.error('没有可导出的表格')
        return
      }
      this.btnLoading=true
      this.$axios.post('/kapi/import/mp_mediadate',{
        user_id:this.userInfoData.business_id,
        start:this.filter.time&&this.filter.time.length>0?this.filter.time[0]:'',
        end:this.filter.time&&this.filter.time.length>0?this.filter.time[1]:'',
        sales_id:JSON.stringify(this.filter.sales_id),
        page:1,
        page_size:10,
        mp_id:this.filter.customer_id}).then(e=>{
        console.log(e,'eeeeeeeeeeee')
        this.showDialog.show=true
        this.$store.dispatch("getExcelNum");
        this.btnLoading=false
        
      })
      //  window.location.href = `/data_analysis/export_article_excel?date_from=${this.filter.time[0]}&date_to=${this.filter.time[1]}&sale_id=${JSON.stringify(this.filter.sales_id)}&order_type=${this.order_type}&customer_id=${this.filter.customer_id}`;
    },
    // 分页查询
    
    pageChangel(val) {
      this.listShearchl.page = val;
      this.getData();
    },

    sortChange(column,prop,order){
      if(column.prop=='mp_ad_num'&&column.order=='ascending'){
        this.field='mp_ad_num';
        this.sort='asc';
      }else if(column.prop=='mp_ad_num'&&column.order=='descending'){
        this.field='mp_ad_num';
        this.sort='desc';
      }

      if(column.prop=='ad_ratio'&&column.order=='ascending'){
        this.field='ad_ratio';
        this.sort='asc';
      }else if(column.prop=='ad_ratio'&&column.order=='descending'){
        this.field='ad_ratio';
        this.sort='desc';
      }

      if(column.prop=='yfb_ad_num'&&column.order=='ascending'){
        this.field='yfb_ad_num';
        this.sort='asc';
      }else if(column.prop=='yfb_ad_num'&&column.order=='descending'){
        this.field='yfb_ad_num';
        this.sort='desc';
      }

      if(column.prop=='yfb_push_ratio'&&column.order=='ascending'){
        this.field='yfb_push_ratio';
        this.sort='asc';
      }else if(column.prop=='yfb_push_ratio'&&column.order=='descending'){
        this.field='yfb_push_ratio';
        this.sort='desc';
      }

      if(column.prop=='mp_total_amount'&&column.order=='ascending'){
        this.field='mp_total_amount';
        this.sort='asc';
      }else if(column.prop=='mp_total_amount'&&column.order=='descending'){
        this.field='mp_total_amount';
        this.sort='desc';
      }

      if(column.prop=='yfb_total_amount'&&column.order=='ascending'){
        this.field='yfb_total_amount';
        this.sort='asc';
      }else if(column.prop=='yfb_total_amount'&&column.order=='descending'){
        this.field='yfb_total_amount';
        this.sort='desc';
      }

      if(column.prop=='yfb_push_amount_ratio'&&column.order=='ascending'){
        this.field='yfb_push_amount_ratio';
        this.sort='asc';
      }else if(column.prop=='yfb_push_amount_ratio'&&column.order=='descending'){
        this.field='yfb_push_amount_ratio';
        this.sort='desc';
      }

      this.getData();
    },
    //获取顶部数据
    gettop(){
      this.num_show = true
      let postval = {
        start:this.filter.time&&this.filter.time.length>0?this.filter.time[0]:'',
        end:this.filter.time&&this.filter.time.length>0?this.filter.time[1]:'',
        sales_id:JSON.stringify(this.filter.sales_id),
        mp_id:this.filter.customer_id
      }
      if(!this.filter.customer_id){
        delete postval.mp_id
      }
      // {params:postval}
        this.$axios.get('/media_analysis/mp_ad_info',{params:postval})
        .then(res =>{ 
          if(res.data.code ==200){
            this.num_show = false
            this.topdata = res.data.data
          }else{
          this.num_show = false
          }
          
        })
    },
    //获取列表数据
    getData() {
      this.bigloading = true
      let postval = {
        start:this.filter.time.length>0?this.filter.time[0]:'',
        end:this.filter.time.length>0?this.filter.time[1]:'',
        sales_id:JSON.stringify(this.filter.sales_id),
        mp_id:this.filter.customer_id,
        page:this.listShearchl.page,
        page_size:this.listShearchl.page_size,
        field:this.field,
        sort:this.sort
        // order_type:this.order_type
      }
      if(!this.field){
        delete postval.field
      }
      if(!this.sort){
        delete postval.sort
      }
       this.$axios
        .get("/media_analysis/ad_data_list", {params:postval})
        .then(res => {
          if(res.data.code == 200){
            this.tableData = res.data.data.data;
            this.listShearchl.total = res.data.data.total;
            this.bigloading = false;
            this.gettop();  
          }else{
            this.bigloading = false;
          }
        })
    },
  }
}
</script>

<style lang="less" scoped>
.media-type {
  padding: 20px 30px;
  margin-top: 30px;
  background-color: #fff;
  border-radius: 3px;
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

.article_container{
  .article_title{
    font-size: 14px;
    padding: 0 20px;
    background: rgb(247,247,247);
    border-top: 1px solid #e6ebf5;
    height: 38px;
    line-height: 38px;
  }

  .article_info{
    padding: 0 20px;
    height: 38px;
    border-top: 1px solid #e6ebf5;
    line-height: 38px;
  }
}
}
</style>
<style lang="less">
  .media-type{
    .dialog1{
      .el-dialog{
        margin-top:0!important;
        margin-bottom:0;
        width:900px!important;
        min-height:100%;
      }
      .el-dialog__body{
        padding: 0!important;
        
      }
    
  }
  }
</style>
