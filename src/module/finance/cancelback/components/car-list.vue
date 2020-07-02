<template>
  <div class="car_list">
    <div class="c_flex_between title">
      <p>已选排期</p>
      <a href="javascript:void(0)" @click="handDelAll()">清空已选排期</a>
    </div>
    <el-table :data="carData">
      <el-table-column label="排期ID" width="100">
        <template slot-scope="scope">{{scope.row}}</template>
      </el-table-column>
      <el-table-column label="投放公众号">
        <template slot-scope="scope">
          <div class="c_flex_align_center">
            <img src="@/static/img/default_pic.png" class="header_img">
            <p>杭州交通918{{scope.row}}</p>
            <p class="tag-color-basic">头条</p>
            <!-- <img v-else :src="item.mp_logo" class="g-fl header_img"> -->
          </div>
        </template>
      </el-table-column>
      <el-table-column label="投放日期">
        <template slot-scope="scope">{{scope.row}}</template>
      </el-table-column>
      <el-table-column label="报价/税款">
        <template slot-scope="scope">
          <div class="c_flex">
            <p>1800.00</p>
            <p class="tag-color-info">头条{{scope.row}}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="成本/渠道税款">
        <template slot-scope="scope">
          <div class="c_flex">
            <p>1800.00</p>
            <p class="tag-color-danger">未收票{{scope.row}}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column property="address" label="净利润"></el-table-column>
      <el-table-column property="address" label="操作">
        <template slot-scope="scope">
          <a href="javascript:void(0)" @click="handDel(scope)">移除</a>
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
          :current-page="searcharea.page"
          :page-size="searcharea.page_size"
        ></el-pagination>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    carData: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      total:100,
      searcharea:{
        page:1,
        page_size:10,
      }
    }
  },
  methods: {
    handleCurrentChange(val){

    },
    handDel(val) {
      // this.carData.splice(val.$index,1)
      this.$emit("car-list-del", val.row);
      // console.log(val)
    },
    handDelAll() {
      //   this.carData = []
      this.$emit("car-list-del", "");
    }
  }
};
</script>

<style lang="less" scoped>
.car_list {
  .title {
    padding: 10px 20px;
  }
  .el-table {
    * {
      white-space: nowrap;
    }
    .header_img {
      border-radius: 50%;
      margin-right: 10px;
      width: 20px;
      height: 20px;
    }
    .tag-color-info,
    .tag-color-basic,
    .tag-color-danger {
      border-radius: 5px;
      color: #fff;
      padding: 0 2px;
      margin-left: 5px;
    }
  }
}
</style>

