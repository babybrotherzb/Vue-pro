<template>
  <div class="finance_cancelback">
    <div class="cancelback">
      <div class="title">
        <span class="dot g-fl"></span>&ensp;客户回款数据
      </div>
    </div>
    <el-card>
        <div class="search">
        <el-input v-model="searchData.customer" placeholder="请输入内容" @keyup.enter.native="getListData();searchData.page=1"></el-input>
        </div>
        <div class="th-gray-table table-padding">
        <el-table :data="tableData" v-loading="loading" element-loading-text="请稍后">
            <el-table-column prop="name" label="客户名称" min-width="250px">
            <template slot-scope="scope">
                <p style="color:#1e1e1e">￥ {{100000|formatMoney}}</p>
            </template>
            </el-table-column>

            <el-table-column label="尚未核销金额" min-width="330px">
            <template slot-scope="scope">
                <p style="color:#1e1e1e">{{scope.row.customer_name}}</p>
            </template>
            </el-table-column>
            <el-table-column min-width="150" label="操作">
            <template slot-scope="scope">
                <a :href="'#/finance/cancelback/detail/stay?id='+scope.row.id" style="color:#0099FF">核销排期</a>
            </template>
            </el-table-column>
        </el-table>
        <div class="pagination" style="clear:both">
            <template>
            <el-pagination
                background
                @current-change="handleCurrentChange"
                layout="total,prev, pager, next, jumper"
                :total="total"
                :current-page="searchData.page"
                :page-size="searchData.page_size"
            ></el-pagination>
            </template>
        </div>
        </div>
    </el-card>
    <!-- <modify-dialog :modifyData='modifyData' @back-modify='getListData'></modify-dialog> -->
  </div>
</template>
<script>
// import ModifyDialog from "./dialog/modify";
import clipboard from "@/util/clipboard.js";

export default {
  data() {
    return {
      modifyData: {
        show: false,
        title: "添加"
      },
      total: 0,
      searchData: {
        page: 1,
        page_size: 10,
        customer: ""
      },
      loading: false,
      tableData: []
    };
  },
  methods: {
    //获取列表
    getListData() {
      this.loading = true;
      this.$axios
        .get("/recommend_mp/list", {
          params: this.searchData
        })
        .then(res => {
          this.tableData = res.data.data.data;
          this.total = res.data.data.total;
          this.loading = false;
        })
        .catch(e => {
          this.loading = false;
          this.$message.error("网络错误");
        });
    },
    handleCurrentChange(page) {
      this.searchData.page = page;
      this.getListData();
    }
  },
  mounted() {
    this.getListData();
  }
  //   components:{
  //       ModifyDialog
  //   }
};
</script>

<style lang="less" scoped >
.finance_cancelback {
  .search {
    width: 500px;
    padding: 20px 0 30px 0;
  }
  .th-gray-table {
    // padding: 0px 20px 0 20px;
    // background: #fff;
  }
  .cancelback{
      padding: 20px 0;
  }
  .title {
    font-size: 20px;
    font-weight: 600;
    .dot {
      width: 1px;
      height: 23px;
      background: #409eff;
      border-radius: 2px;
      border: 2px solid #409eff;
      margin-top: 3px;
    }
  }
}
</style>
