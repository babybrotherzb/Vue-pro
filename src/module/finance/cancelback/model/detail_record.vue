<template>
  <div class="finance_cancelback_detail_record">
    <el-row class="search-area ifshow">
      <el-col :span="4">
        <el-input size="mini" clearable v-model="searcharea.id" placeholder="排期ID"></el-input>
      </el-col>
      <el-col :span="5">
        <el-date-picker
          size="mini"
          v-model="searcharea.time"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
    </el-row>
    <el-collapse v-model="activeName" accordion v-loading="isLoading">
      <div class="c_flex top">
        <div>操作时间</div>
        <div>核销排期数</div>
        <div>核销总额</div>
        <div>核销人</div>
        <div>操作</div>
      </div>
      <div v-for="(item, index) in tableData" :key="index" class="collapse-list">
        <div class="c_flex">
          <div>操作时间{{index}}</div>
          <div>核销排期数</div>
          <div>核销总额</div>
          <div>核销人</div>
        </div>
        <el-collapse-item title="排期详情" :name="index" @change="handChange">
          <el-table :data="item.data" style="width: 100%" header-row-class-name='table_active'>
            <el-table-column label="排期ID" prop="id"></el-table-column>
            <el-table-column label="投放公众号" prop="name">
              <template slot-scope="scope">
                <span>杭州交通918{{scope.row}}</span>
                <span class="tag">头条</span>
              </template>
            </el-table-column>
            <el-table-column label="投放日期" prop="name"></el-table-column>
            <el-table-column label="报价" prop="name"></el-table-column>
            <el-table-column label="操作" prop="name">
              <template slot-scope="scope">
                <a href="javascript:void(0)" @click="handRevocation(scope.row)">撤销回款</a>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </div>
    </el-collapse>
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
  mounted() {
    this.getData()
  },
  data() {
    return {
      // loading
      isLoading:false,
      activeName: "",
      // 总条数
      total: 30,
      searcharea: {
        page: 1,
        page_size: 10
      },
      tableData: [
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
          data: [
            {
              id: "12987123",
              name: "好滋好味鸡蛋仔",
              category: "江浙小吃、小吃零食",
              desc: "荷兰优质淡奶，奶香浓而不腻",
              address: "上海市普陀区真北路",
              shop: "王小虎夫妻店",
              shopId: "10333"
            },
            {
              id: "12987123",
              name: "好滋好味鸡蛋仔",
              category: "江浙小吃、小吃零食",
              desc: "荷兰优质淡奶，奶香浓而不腻",
              address: "上海市普陀区真北路",
              shop: "王小虎夫妻店",
              shopId: "10333"
            },
            {
              id: "12987123",
              name: "好滋好味鸡蛋仔",
              category: "江浙小吃、小吃零食",
              desc: "荷兰优质淡奶，奶香浓而不腻",
              address: "上海市普陀区真北路",
              shop: "王小虎夫妻店",
              shopId: "10333"
            }
          ]
        },
        {
          id: "12987123",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
          data: [
            {
              id: "12987123",
              name: "好滋好味鸡蛋仔",
              category: "江浙小吃、小吃零食",
              desc: "荷兰优质淡奶，奶香浓而不腻",
              address: "上海市普陀区真北路",
              shop: "王小虎夫妻店",
              shopId: "10333"
            },
            {
              id: "12987123",
              name: "好滋好味鸡蛋仔",
              category: "江浙小吃、小吃零食",
              desc: "荷兰优质淡奶，奶香浓而不腻",
              address: "上海市普陀区真北路",
              shop: "王小虎夫妻店",
              shopId: "10333"
            },
            {
              id: "12987123",
              name: "好滋好味鸡蛋仔",
              category: "江浙小吃、小吃零食",
              desc: "荷兰优质淡奶，奶香浓而不腻",
              address: "上海市普陀区真北路",
              shop: "王小虎夫妻店",
              shopId: "10333"
            }
          ]
        },
        {
          id: "12987125",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
          data: [
            {
              id: "12987123",
              name: "好滋好味鸡蛋仔",
              category: "江浙小吃、小吃零食",
              desc: "荷兰优质淡奶，奶香浓而不腻",
              address: "上海市普陀区真北路",
              shop: "王小虎夫妻店",
              shopId: "10333"
            },
            {
              id: "12987123",
              name: "好滋好味鸡蛋仔",
              category: "江浙小吃、小吃零食",
              desc: "荷兰优质淡奶，奶香浓而不腻",
              address: "上海市普陀区真北路",
              shop: "王小虎夫妻店",
              shopId: "10333"
            },
            {
              id: "12987123",
              name: "好滋好味鸡蛋仔",
              category: "江浙小吃、小吃零食",
              desc: "荷兰优质淡奶，奶香浓而不腻",
              address: "上海市普陀区真北路",
              shop: "王小虎夫妻店",
              shopId: "10333"
            },
            {
              id: "12987123",
              name: "好滋好味鸡蛋仔",
              category: "江浙小吃、小吃零食",
              desc: "荷兰优质淡奶，奶香浓而不腻",
              address: "上海市普陀区真北路",
              shop: "王小虎夫妻店",
              shopId: "10333"
            }
          ]
        },
        {
          id: "12987126",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
          data: [
            {
              id: "12987123",
              name: "好滋好味鸡蛋仔",
              category: "江浙小吃、小吃零食",
              desc: "荷兰优质淡奶，奶香浓而不腻",
              address: "上海市普陀区真北路",
              shop: "王小虎夫妻店",
              shopId: "10333"
            },
            {
              id: "12987123",
              name: "好滋好味鸡蛋仔",
              category: "江浙小吃、小吃零食",
              desc: "荷兰优质淡奶，奶香浓而不腻",
              address: "上海市普陀区真北路",
              shop: "王小虎夫妻店",
              shopId: "10333"
            },
            {
              id: "12987123",
              name: "好滋好味鸡蛋仔",
              category: "江浙小吃、小吃零食",
              desc: "荷兰优质淡奶，奶香浓而不腻",
              address: "上海市普陀区真北路",
              shop: "王小虎夫妻店",
              shopId: "10333"
            },
            {
              id: "12987123",
              name: "好滋好味鸡蛋仔",
              category: "江浙小吃、小吃零食",
              desc: "荷兰优质淡奶，奶香浓而不腻",
              address: "上海市普陀区真北路",
              shop: "王小虎夫妻店",
              shopId: "10333"
            },
            {
              id: "12987123",
              name: "好滋好味鸡蛋仔",
              category: "江浙小吃、小吃零食",
              desc: "荷兰优质淡奶，奶香浓而不腻",
              address: "上海市普陀区真北路",
              shop: "王小虎夫妻店",
              shopId: "10333"
            },
            {
              id: "12987123",
              name: "好滋好味鸡蛋仔",
              category: "江浙小吃、小吃零食",
              desc: "荷兰优质淡奶，奶香浓而不腻",
              address: "上海市普陀区真北路",
              shop: "王小虎夫妻店",
              shopId: "10333"
            }
          ]
        }
      ]
    };
  },
  methods: {
    handChange(){
      console.log(document.querySelectorAll('.finance_cancelback_detail_record .collapse-list .c_flex'))
    },
    // 获取数据
    getData(){
      this.isLoading = true
      this.$axios
        .get("/customer/medium_group")
        .then(res => {
          this.isLoading = false
          // if (res && res.data) this.media_tol = res.data;
        })
        .catch(err => {
          this.isLoading = false
        });
    },
    // 翻页
    handleCurrentChange(val) {
      this.searcharea.page = val;
    },
    // 撤销回款
    handRevocation() {
      this.$confirm(
        "撤销回款后，相应核销资金将退回至待核销资金，确定这样做吗？",
        "撤销回款",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$confirm(
            "该排期为非垫付且已支付，无法撤销回款，若要撤销，请先取消支付",
            "",
            {
              confirmButtonText: "好的",
              type: "warning"
            }
          )
            .then(() => {
              // this.$message({
              //   type: 'success',
              //   message: '删除成功!'
              // });
            })
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style lang="less" scoped>
.finance_cancelback_detail_record {
  .search-area {
    padding: 20px 0;
    .el-col {
      margin-right: 20px;
    }
  }
  .top {
    border-bottom: 1px solid #ebeef5;
    > div {
      width: calc(~"( 100% - 150px ) / 4");
      padding: 20px 20px;
      color: #909399;
      white-space: nowrap;
      background: #f5f7fa;
      &:last-child {
        max-width: 150px;
        min-width: 150px;
      }
    }
  }
  .el-collapse {
    border: 0;
    .el-table {
      padding: 0 30px;
    }
  }
  .collapse-list {
    position: relative;
      border-bottom: 1px solid #ebeef5;
    .c_flex {
      width: 100%;
      > div {
        width: calc(~"( 100% - 150px ) / 4");
        padding: 20px 20px;
        white-space: nowrap;
      }
    }
  }
}
</style>
<style lang="less">
.finance_cancelback_detail_record {
  .collapse-list {
    .table_active {
      th {
        background: #f5f7fa;
      }
    }
    .el-collapse-item__header {
      text-align: right;
      height: auto;
      line-height: normal;
      position: absolute;
      right: 0;
      top: 20px;
      width: 150px;
      border-bottom: 0;
      display: flex;
      align-items: center;
      i {
        line-height: normal;
      }
    }
    .el-collapse-item__wrap {
      border-bottom: 0;
    }
  }
}
</style>

