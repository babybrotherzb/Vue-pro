<template>
  <div class="finance_cancelback_detail_stay">
    <div class="box">
      <el-row class="search-area ifshow">
        <el-col :span="4">
          <el-input size="mini" clearable v-model="searcharea.id" placeholder="排期ID"></el-input>
        </el-col>
        <el-col :span="2">
          <el-select size="mini" clearable v-model="searcharea.data" placeholder="请选择">
            <el-option v-for="item in 2" :key="item" :label="item==1?'创建时间':'投放时间'" :value="item"></el-option>
          </el-select>
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
      <div v-loading="isLoading" ref="scroll" class="list">
        <div class="table-head">
          <table style="min-width:1200px;overflow:hidden;text-align:left;width: 100%;">
            <colgroup>
              <col width="5%">
              <col width="15%">
              <col width="15%">
              <col width="15%">
              <col width="15%">
              <col width="15%">
              <col width="10%">
              <col width="10%">
            </colgroup>
            <thead>
              <tr>
                <th></th>
                <th>客户</th>
                <th>投放公众号</th>
                <th>报价/税款</th>
                <th>成本/渠道税款</th>
                <th>净利润/其他利润数据</th>
                <th>销售/媒介</th>
                <th>款项状态</th>
              </tr>
            </thead>
          </table>
        </div>
        <el-checkbox-group v-model="checkAllSelect" @change="handleCheckedCitiesChange">
          <div class="original-table" v-for="(item,index) in tableData" :key="index">
            <div
              style="background:#f7f7f7;color:#bbbbbb;min-width:1200px;line-height:33px;height:33px"
            >
              <p class="g-fl" style="padding:0px 30px">{{item.created_at}} {{item.creator}}</p>
              <p class="g-fl" style="padding:0px 30px">客户合同号：&ensp;{{item.consumer_contract_no}}</p>
              <p class="g-fl" style="padding:0px 30px">媒体合同号:&ensp;{{item.media_contract_no}}</p>
              <p class="g-fl" style="padding:0px 30px">备注：&ensp;{{item.remark?item.remark:'---'}}</p>
              <p
                class="g-fl"
                style="padding:0px 30px"
              >媒介备注:&ensp;{{item.medium_remark?item.medium_remark:'---'}}</p>
              <p
                class="g-fl"
                style="padding:0px 30px;color:#409eff"
              >财务注明:&ensp;{{item.finance_remark?item.finance_remark:'---'}}</p>
            </div>
            <table style="min-width:1200px;heigth:120px;overflow:hidden;text-align:left;">
              <colgroup>
                <col width="5%">
                <col width="15%">
                <col width="15%">
                <col width="15%">
                <col width="15%">
                <col width="15%">
                <col width="10%">
                <col width="10%">
              </colgroup>
              <thead>
                <tr class="table_tr" style="line-height:26px">
                  <td style>
                    <el-checkbox :label="item.id">&nbsp;</el-checkbox>
                  </td>
                  <td>
                    <div>
                      ID:{{item.id}}
                      <span v-if="item.is_advance != ''" class="span_dian">垫</span>
                      <el-tooltip
                        v-if="item.rebate_price != 0.00&&item.rebate_price !=''"
                        class="item"
                        effect="dark"
                        placement="top"
                      >
                        <div slot="content">{{item.rebate_price}}</div>
                        <span class="span_back point">返</span>
                      </el-tooltip>
                      <el-tooltip
                        class="item"
                        v-if="item.update_logs.length"
                        effect="dark"
                        placement="right-start"
                      >
                        <div slot="content">
                          <div v-for="(history,index) in item.update_logs" :key="index">
                            <div v-html="history"></div>
                          </div>
                        </div>
                        <span class="span_change point">改</span>
                      </el-tooltip>
                    </div>
                    <p class="font_14">{{item.brand?item.brand:''}}</p>
                    <p class="font_12">{{item.company?item.company:''}}</p>
                  </td>
                  <td>
                    <div class="c_flex_align_center">
                      <img
                        v-if="!item.mp_logo"
                        src="@/static/img/default_pic.png"
                        class="g-fl header_img"
                      >
                      <img v-else :src="item.mp_logo" class="g-fl header_img">

                      <div class="table-conter">
                        <div class="table-conter-title font_14">
                          {{ item.mp_title?item.mp_title:"无公众号名"}}
                          <section>
                            <!-- <img v-if="!item.is_original" src="../../../static/img/approve.png"> -->
                            <span v-if="item.mp_mp_type == '1'" class="zy">自营</span>
                            <span v-if="item.mp_is_brush == '1'" class="sh">刷号</span>
                          </section>
                        </div>
                        <p>{{item.mp_weixinname?item.mp_weixinname:'---'}}</p>
                        <p>{{item.subject?item.subject:"---"}}</p>
                      </div>
                    </div>
                    <div class="discount">
                      <p>
                        {{item.send_time}}
                        <span>{{item.show_position}} {{item.discount}}</span>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p class="font_122">
                      {{item.price}}
                      <span v-if="item.consumer_invoice == '0' " class="bg_grey">无票</span>
                      <span v-else-if="item.consumer_invoice == '2'" class="point bg_green">已开票</span>
                      <span v-else class="point bg_red">未开票</span>
                    </p>
                    <p
                      v-if="item.consumer_invoice != '0'"
                    >{{item.invoice_type == 1?'专票':'普票'}}{{item.tax_point?`/税点:${item.tax_point}`:''}}</p>
                    <p>{{item.tax?`税款:${item.tax}`:''}}</p>
                  </td>
                  <td>
                    <p class="font_122">
                      {{item.cost_price}}
                      <span v-if="item.channel_invoice == '0'" class="bg_grey">无票</span>
                      <span v-else-if="item.channel_invoice == '2'" class="point bg_green">已收票</span>
                      <span v-else class="point bg_red">未收票</span>
                    </p>
                    <p
                      v-if="item.channel_invoice != '0'"
                    >{{item.qd_invoice_type == 1?'专票':'普票'}}{{item.channel_tax_point?`/税点：${item.channel_tax_point}`:''}}</p>
                    <p>{{item.channel_tax?`税款：${item.channel_tax}`:''}}</p>
                  </td>
                  <td>
                    <div>
                      <p class="g-text-color-basic">{{item.m_profit}}</p>
                      <p>{{item.m_profit_rate?`利润率：${item.m_profit_rate}`:''}}</p>
                    </div>
                  </td>
                  <td>
                    <!-- 销售媒介 -->
                    <p class="font_122">{{item.sales_name}}/{{item.channel_name}}</p>
                  </td>
                  <td>
                    <el-tooltip class="item table-tooltip" effect="dark" placement="top">
                      <div slot="content">
                        <p>{{item.paid_money}}</p>
                      </div>
                      <span v-if="item.paid_status == 2" class="font_122 g-text-color_0c3">
                        <span class="R_green"></span>
                        已付{{item.paid_type?`(${item.paid_type})`:''}}
                        <i
                          v-if="item.paid_img"
                          class="el-icon-picture"
                        ></i>
                      </span>
                      <span v-if="item.paid_status == 1" class="font_122 g-text-color_0c3">
                        <span class="R_green"></span>
                        部分已付{{item.paid_type?`(${item.paid_type})`:''}}
                        <i
                          v-if="item.paid_img"
                          class="el-icon-picture"
                        ></i>
                      </span>
                    </el-tooltip>
                    <span v-if="item.paid_status == 0" class="font_122">
                      <span class="R_red"></span>
                      未付{{item.paid_type?`(${item.paid_type})`:''}}
                      <i
                        v-if="item.paid_img"
                        class="el-icon-picture"
                      ></i>
                    </span>
                    <el-tooltip class="item table-tooltip" effect="dark" placement="top">
                      <div slot="content">
                        <p>{{item.returned_money}}</p>
                      </div>
                      <span v-if="item.received_status == 2" class="font_122 g-text-color_0c3">
                        <span class="R_green"></span>
                        已回{{item.return_type?`(${item.return_type})`:''}}
                        <i
                          v-if="item.return_img"
                          class="el-icon-picture"
                        ></i>
                      </span>
                      <span v-if="item.received_status == 1" class="font_122 g-text-color_0c3">
                        <span class="R_green"></span>
                        部分已回{{item.return_type?`(${item.return_type})`:''}}
                        <i
                          v-if="item.return_img"
                          class="el-icon-picture"
                        ></i>
                      </span>
                    </el-tooltip>
                    <span v-if="item.received_status == 0" class="font_122">
                      <span class="R_red"></span>
                      未回{{item.return_type?`(${item.return_type})`:''}}
                      <i
                        v-if="item.return_img"
                        class="el-icon-picture"
                      ></i>
                    </span>
                  </td>
                </tr>
              </thead>
            </table>
          </div>
        </el-checkbox-group>
        <div v-show="tableData.length==0" style="text-align:center;color:#bbbbbb">暂无数据</div>
      </div>
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
    <div class="bottom c_flex_between">
      <div>
        合计：￥
        <span class="g-text-color-basic">8000.00</span>/￥8800.00
      </div>
      <el-popover placement="top" width="1200" v-model="stayCarShow">
        <car-list :carData="checkAllSelect" @car-list-del="handCardel"></car-list>
        <div @click="handStayCar" slot="reference" style="cursor: pointer;padding: 10px">
          已选
          <span
            class="g-text-color-basic"
          >{{checkAllSelect&&checkAllSelect.length?checkAllSelect.length:0}}</span> 个排期
          <i class="iconfont icon-arrow-down"></i>
        </div>
        <!-- <el-button>click 激活</el-button> -->
      </el-popover>

      <el-button size="mini" type="primary" @click="handSubWriteOff(checkAllSelect.length)">确认核销</el-button>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import CarList from "../components/car-list";
export default {
  components: {},
  data() {
    return {
      // 是否显示选号车
      stayCarShow: false,
      // 支付状态  回款状态
      userInfoData: {},
      move_tol: [],
      searcharea: {
        page: 1,
        page_size: 10,
        // 开始时间 结束时间
        time: [],
        // 排期id
        id: "",
        // 选择
        data: 1
      },
      checkAllSelect: [
        24178,
        24180,
        26089,
        26088,
        25648,
        26087,
        26086,
        26085,
        26084,
        26083
      ], //   全选选中的值累加
      checkAllSelectOld: [
        24178,
        24180,
        26089,
        26088,
        25648,
        26087,
        26086,
        26085,
        26084,
        26083
      ], //   全选选中的值累加
      // 获取列表的loading
      isLoading: true,
      tableData: [], // 数据列表
      total: 0 //   总页数
    };
  },
  components: {
    CarList
  },
  methods: {
    addCar(id) {
      this.$axios
        .post(`/schedule/add_schedule_cart`,{sch_id:id})
        .then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            return false;
          }
          this.$message({
            message: "添加失败",
            type: "warning"
          });
        })
        .catch(function(err) {
          this.$message({
            message: "添加失败",
            type: "error"
          });
        });
    },
    delCar(id) {
      this.$axios
        .post(`/schedule/delete_schedule_cart`,{sch_id:id})
        .then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            return false;
          }
          this.$message({
            message: "删除失败",
            type: "warning"
          });
        })
        .catch(function(err) {
          this.$message({
            message: "删除失败",
            type: "error"
          });
        });
    },
    clearCar(){
      this.$axios
        .post(`/schedule/clear_schedule_cart`)
        .then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            return false;
          }
          this.$message({
            message: "删除成功",
            type: "warning"
          });
        })
        .catch(function(err) {
          this.$message({
            message: "删除成功",
            type: "error"
          });
        });
    },
    // 核销排期
    handSubWriteOff(val) {
      const h = this.$createElement;
      this.$msgbox({
        title: "核销排期",
        message: h("div", null, [
          h("p", { class: "c_flex_align_center", style: "padding-left:10px" }, [
            h( "i", { class: "el-icon-warning", style: "font-size:20px;color: #409eff;margin-right: 10px;" }, ""),
            h( "span", { style: "font-size: 14px;" }, "请在确认无误后进行核销操作！" )
          ]),
          h( "p", { style: "font-size: 14px;padding-left:20px;padding-top: 15px;" }, `客户公司：杭州和中` ),
          h("p",{ style: "font-size: 14px;padding-left:20px" },`核销排期：${val}个` ),
          h("p",{ style: "font-size: 14px;padding-left:20px" },`核销总额： 8000.00元`)
        ]),
        showCancelButton: true,
        confirmButtonText: "立即核销",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          console.log(action, "///");
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            setTimeout(() => {
              done();
              // setTimeout(() => {
              instance.confirmButtonLoading = false;
              // }, 300);
            }, 3000);
          } else {
            done();
          }
        }
      }).then(action => {
        console.log(action);
        // this.$message({
        //   type: "info",
        //   message: "action: " + action
        // });
      });
    },
    //   选号车删除
    handCardel(val) {
      // 没有值删除全部 有值删除一个
      if (!val) {
        this.checkAllSelect = [];
        return false;
      }
      let arr = [];
      this.checkAllSelect.map((el, i) => {
        if (el == val) {
          this.checkAllSelect.splice(i, 1);
        }
      });
    },
    //   点击显示选号车
    handStayCar() {
      console.log(this.stayCarShow, "/////");
      if (this.stayCarShow) {
        document
          .querySelectorAll(".icon-arrow-down")[0]
          .setAttribute("style", "transform:rotate(-180deg);");
        return;
      }
      document
        .querySelectorAll(".icon-arrow-down")[0]
        .setAttribute("style", "transform:rotate(0deg);");
    },
    // 单选
    handleCheckedCitiesChange(value) {
      this.checkAllSelect = value;
      if (this.checkAllSelectOld.length > this.checkAllSelect.length) {
        this.checkAllSelectOld.map(el => {
          if (!this.checkAllSelect.includes(el)) {
            console.log(el, ".///.删除/../.");
          }
        });
      } else {
        this.checkAllSelect.map(el => {
          if (!this.checkAllSelectOld.includes(el)) {
            console.log(el, ".///./添加../.");
          }
        });
      }
      this.checkAllSelectOld = value;
    },

    // 获取数据列表
    getMainList() {
      const that = this;
      this.tableData = [];
      this.isLoading = true;
      //   let postval = {};, { params: postval }
      that.$axios
        .get(
          `/schedule/get_list?page=${
            this.searcharea.page
          }&page_size=10&type=0&search_key=3&search_val=&search_key_2=2&search_val_2=&search_key_3=1&search_val_3=&time_type=1&time_start=2019-01-01&time_end=2019-05-21&has_consumer_invoice=&has_channel_invoice=&is_advance=&remit_type=&account_type=&refund_status=&pay_status=&has_sale_cost=&schedule_status=&sort_key=&sort_type=&creator_id=[]&sale_id=[]&media_id=[]&contract_type=&is_self=&pay_today=`
        )
        .then(res => {
          if (res.data && res.data.data && res.data.code == 200) {
            this.tableData = res.data.data.data;
            this.total = res.data.data.total;
            this.getCheckData(res.data.data.data);
            that.isLoading = false;
          } else {
            that.total = 0;
            that.tableData = [];
            that.isLoading = false;
            return;
          }
        })
        .catch(function(err) {
          that.total = 0;
          that.tableData = [];
          that.isLoading = false;
        });
    },
    getCheckData(data) {
      // 当前页的数据
      // checkAllSelect 选择的所有数据
      // 对所有数据去重id
      this.checkAllSelectOld = [...new Set(this.checkAllSelectOld)];
      this.checkAllSelect = [...new Set(this.checkAllSelect)];
    },
    // 分页查询
    handleCurrentChange(val) {
      this.searcharea.page = val;
      this.getMainList();
    }
  },
  created() {
    // this.$store.dispatch("userInfo");
    let objuserInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.userInfoData = objuserInfo;
  },

  //   初始化数据
  mounted() {
    const that = this;
    that.getMainList();
  }
};
</script>
<style scoped lang='less' rel='stylesheet/less'>
.finance_cancelback_detail_stay {
  padding-bottom: 50px;
  position: relative;
  .bottom {
    position: fixed;
    bottom: 0;
    left: 170px;
    right: 0px;
    background: #fff;
    box-shadow: 0px 2px 8px rgba(5, 41, 66, 0.08);
    width: calc(~"100% - 200px ");
    padding: 20px 30px;
    align-items: center;
    z-index: 9;
    > div {
      font-size: 14px;
      color: #1e1e1e;
      &:nth-of-type(2) {
        cursor: pointer;
      }
      span {
        font-size: 14px;
      }
    }
    .icon-arrow-down {
      transition: all 0.5s;
      display: inline-block;
      transform: rotate(-180deg);
    }
    .icon-arrow-down:before {
      color: #1e1e1e;
    }
  }
  // 颜色样式
  .R_green {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 10px;
    border-radius: 50%;
    background: #35e168;
    -webkit-box-shadow: 0px 2px 6px #428054;
    box-shadow: 0px 2px 6px #428054;
  }
  .R_red {
    display: inline-block;
    width: 10px;
    margin-right: 10px;
    // border: 1px solid #e1e1e1;
    height: 10px;
    border-radius: 50%;
    background: red;
    -webkit-box-shadow: 0px 2px 6px #993333;
    box-shadow: 0px 2px 6px #993333;
  }
  .bg_green {
    background: #0099ff;
    // border: 1px solid #e1e1e1;
    border-radius: 4px;
    color: #fff;
    display: inline-block;
    padding: 0px 3px;
    line-height: normal;
    // -webkit-box-shadow: 2px 2px 5px #428054;
    // box-shadow:2px 2px 5px #428054;
  }
  .bg_grey {
    background: #bfbfbf;
    // border: 1px solid #e1e1e1;
    border-radius: 4px;
    color: #fff;
    display: inline-block;
    padding: 0px 3px;
    line-height: normal;
    // -webkit-box-shadow: 2px 2px 5px #727272;
    // box-shadow:2px 2px 5px #727272;
  }
  .bg_red {
    background: red;
    // border: 1px solid #e1e1e1;
    border-radius: 4px;
    color: #fff;
    display: inline-block;
    padding: 0px 3px;
    line-height: normal;
    // -webkit-box-shadow: 2px 2px 5px #993333;
    // box-shadow: 2px 2px 5px #993333;
  }
  .point {
    cursor: pointer;
  }

  .header_img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    padding: 10px;
  }
  .dot {
    width: 1px;
    height: 23px;
    background: #409eff;
    border-radius: 2px;
    border: 2px solid #409eff;
  }
  .font_20 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
  }
  .span_dian {
    padding: 2px 3px;
    color: #fff;
    // border: 1px solid #e1e1e1;
    background: red;
    border-radius: 5px;
    // -webkit-box-shadow: 2px 2px 5px #993333;
    // box-shadow: 2px 2px 5px #993333;
  }
  .span_back {
    padding: 2px 3px;
    color: #fff;
    // border: 1px solid #e1e1e1;
    border-radius: 5px;
    background: #409eff;
    // -webkit-box-shadow: 2px 2px 5px #926028;
    // box-shadow:2px 2px 5px #926028;
  }
  .span_change {
    padding: 2px 3px;
    // border: 1px solid #e1e1e1;
    color: #fff;
    border-radius: 5px;
    background: #35e168;
    //  -webkit-box-shadow: 2px 2px 5px #428054;
    // box-shadow:2px 2px 5px #428054;
  }
  .font_12 {
    font-size: 12px;
    color: #999999;
  }
  .font_122 {
    display: block;
    font-size: 12px;
    color: #1e1e1e;
  }
  .font_14 {
    font-size: 14px;
    color: #1e1e1e;
  }
  .discount {
    span {
      border: 1px solid #409eff;
      border-radius: 6px;
      color: #409eff;
      display: inline-block;
      padding: 0px 3px;
      line-height: normal;
      margin-left: 15px;
    }
  }
  .content_more {
    span {
      display: inline-block;
      width: 70px;
    }
  }
  .search-area {
    padding: 20px 0;
    .el-col {
      margin-right: 20px;
    }
  }
  .table-head {
    box-sizing: border-box;
    margin-bottom: 25px;
    color: #878d99;
    font-weight: bold;
    table {
      border: 1px solid #e6ebf5;
      background-color: #f8f9fb;
      thead th {
        padding: 15px 10px;
        box-sizing: border-box;
        text-align: left;
      }
    }
  }

  .original-table {
    margin: 15px 0;
    box-sizing: border-box;
    position: relative;
    // &:hover {
    //   box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
    //     0 2px 4px 0 rgba(232, 237, 250, 0.5);
    // }
    tr {
      position: relative;
      .table-tag {
        position: absolute;
        left: 0;
        top: 33px;
        font-size: 0px;
        span {
          display: inline-block;
          padding: 0px 10px;
          line-height: normal;
        }
      }
    }
    .table-conter {
      .table-conter-title {
        display: block;
        position: relative;

        section {
          position: absolute;
          display: inline-block;
          padding-left: 20px;
          img {
            position: absolute;
            top: 4px;
            left: 2px;
          }
          .sh {
            border: 1px solid #e1e1e1;
            border-radius: 6px;
            color: #fff;
            background: #878d99;
            display: inline-block;
            padding: 0px 3px;
            line-height: normal;
          }
          .zy {
            border: 1px solid #e1e1e1;
            border-radius: 6px;
            color: #fff;
            background: #0099ff;
            display: inline-block;
            padding: 0px 3px;
            line-height: normal;
          }
        }
      }
    }
    th {
      padding: 10px 15px;
      background-color: #f8f9fb;
      border-bottom: 1px solid #e6ebf5;
      color: #878d99;
      box-sizing: border-box;
      font-weight: normal;
      span {
        margin-right: 20px;
      }
    }
    table {
      width: 100%;
      border: 1px solid #e6ebf5;
      box-sizing: border-box;
      border-spacing: 0;
      border-collapse: collapse;
      th {
        padding: 10px 15px;
        background-color: #f8f9fb;
        border-bottom: 1px solid #e6ebf5;
        color: #878d99;
        box-sizing: border-box;
        font-weight: normal;
        span {
          margin-right: 20px;
        }
      }
      td {
        vertical-align: middle;
        color: #878d99;
        padding: 20px 10px;
        box-sizing: border-box;
      }
    }
  }
  .list {
    table {
      border-collapse: collapse;
      border-spacing: 0;
    }
  }
}
</style>
