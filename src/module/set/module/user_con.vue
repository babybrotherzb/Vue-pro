<template>
  <div class="usermanagent">
    <div class="title font_20" style="padding-bottom:20px">
      <span class="dot g-fl"></span>
      &ensp;用户管理
    </div>
    <div class="g-container">
      <el-form :model="form" style="text-align:left" size="small" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item label="账户">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="姓名">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="部门">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-button @click="newBack" size="small" type="primary">新增用户</el-button>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item label="绑定">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="岗位">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="状态">
              <el-select v-model="form.name" style="width:100%" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-button size="small" type="primary">搜索</el-button>
          </el-col>
        </el-row>
      </el-form>
      <div class="th-gray-table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="account" label="账户"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="wxname" label="绑定微信"></el-table-column>
          <el-table-column prop="department" label="部门"></el-table-column>
          <el-table-column prop="station" label="岗位"></el-table-column>
          <el-table-column prop="created_time" label="创建时间"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <p>
                <a>修改信息</a>
                <a @click="frozen">冻结</a>
              </p>
              <p>
                <a>绑定微信</a>
                <a>删除</a>
              </p>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="pagination">
        <template>
          <el-pagination
            @current-change="handleCurrentChange"
            layout="total,prev, pager, next, jumper"
            :total="total"
            :current-page="listQuery.page"
            :page-size="listQuery.page_size"
          ></el-pagination>
        </template>
      </div>

      <el-dialog title="用户信息" :visible.sync="dialogVisible" width="30%">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="账户">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="部门">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="岗位">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">保 存</el-button>
        </span>
      </el-dialog>

      <el-dialog :visible.sync="dialogVisible1" width="20%">
        <div slot="title"></div>
        <div>
          <p style="font-size:24px;">
            <i class="el-icon-warning" style="font-size:24px;color:red"></i>
            <span style="font-size:20px;">确定冻结改账户？</span>
          </p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import table from "../../../components/base_m/table";
export default {
  data() {
    return {
      state: "",
      form: {
        name: ""
      },
      activeName: "first",
      options: [
        {
          value: 0,
          label: "不限"
        },
        {
          value: 1,
          label: "正常"
        },
        {
          value: 2,
          label: "冻结"
        }
      ],
      dialogVisible: false,
      dialogVisible1: false,
      total: 1,
      listQuery: {
        page: 1,
        page_size: 10
      },
      tableData: table.data
    };
  },
  methods: {
    querySearchAsync(queryString) {
      console.log(queryString);
    },
    handleSelect() {},
    handleCurrentChange() {},
    newBack() {
      this.dialogVisible = true;
    },
    handleClick() {},
    frozen() {
      this.dialogVisible1 = true;
    }
  },
  mounted() {}
};
</script>

<style scoped lang='less' rel='stylesheet/less'>
.usermanagent {
  overflow: hidden;
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
  }
  .title {
    display: flex;
    align-items: center;
  }
  .cleanfloat:after {
    display: block;
    clear: both;
    height: 0;
    content: "";
    visibility: hidden;
    overflow: hidden;
  }
  .pd-20 {
    padding: 20px 0;
  }
}
</style>