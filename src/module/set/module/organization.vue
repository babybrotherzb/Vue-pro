<template>
  <div class="organization">
    <div class="tree">
      <p class="title">部门结构</p>
      <el-tree
        :data="data"
        node-key="id"
        draggable
        highlight-current
        @node-click="tree_click"
        default-expand-all
        :expand-on-click-node="false"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>
            <i class="el-icon-document"></i>
            &ensp;{{ data.name }}
          </span>
        </span>
      </el-tree>
      <p class="exit" @click="exit_branch">编辑部门</p>
    </div>
    <div class="list">
      <div class="search">
        <el-form :inline="true" :model="searchform">
          <el-form-item label="角色名称">
            <el-input size="small" v-model="searchform.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="secrch">查找</el-button>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="newper">+新建角色</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="all_list">
        <el-table
          ref="singleTable"
          :data="tableData"
          border
          v-loading="loading"
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column property="name" label="角色名称"></el-table-column>
          <el-table-column property="des" label="角色描述"></el-table-column>
          <el-table-column property="number" label="人数"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div>
                <a @click="list_exit(scope.row,scope.$index)">编辑</a>&ensp;|&ensp;
                <a @click="list_set">设置权限</a>&ensp;|&ensp;
                <a @click="list_del(scope.row,scope.$index)">删除</a>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="page">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="searchform.page"
            :page-size="10"
            background
            layout="prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!-- 新建角色 -->
    <el-dialog
      title="新建角色"
      :visible.sync="exitshow"
      width="30%"
      :show-close="true"
      :close-on-click-modal="false"
    >
      <el-form label-width="80px" :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="角色名称" prop="name">
          <el-input size="small" v-model="ruleForm.name" clearable />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input type="textarea" v-model="ruleForm.des" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="exitshow = false,ruleForm.name = '',ruleForm.des = '',type = 0">取 消</el-button>
        <el-button type="primary" @click="exitFun('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import datas from "./data";
import table from "../../../components/base_m/table";
export default {
  data() {
    return {
      searchform: {
        name: "",
        page: 1
      },
      total: 100,
      ruleForm: {
        name: "",
        des: ""
      },
      exitshow: false,
      type: 0,
      index: 0,
      loading: false,
      rules: {
        name: [{ required: true, message: "角色名称不能为空", trigger: "blur" }]
      },
      data: datas.data,
      tableData: table.data
    };
  },

  components: {},

  computed: {},

  methods: {
    exit_branch() {
      this.$router.push({ path: "/set/exit_branch" });
    },
    tree_click(data, node, dav) {
      console.log(data, node, dav, "data,node,dav");
    },
    secrch() {},
    newper() {
      this.exitshow = true;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    list_exit(data, index) {
      this.type = 1;
      this.index = index;
      this.exitshow = true;
      this.ruleForm.name = data.name;
      this.ruleForm.des = data.des;
    },
    list_set() {
      this.$router.push({ path: `/set/pre_set/operate_set` });
    },
    list_del(data, index) {
      if (data.number == 1) {
        this.$confirm(`确认删除角色 ${data.name} 吗？`, "删除角色", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.tableData.splice(index, 1);
        });
      } else {
        this.$confirm(
          `  该角色下还有人员存在，请先处理角色内员工。`,
          "删除角色",
          {
            confirmButtonText: "好的",
            type: "warning",
            callback: action => {}
          }
        );
      }
    },
    keyupl(data) {
      console.log(this.ruleForm.name, data, "this.ruleForm.name");
    },
    exitFun(formName) {
      this.$refs[formName].validate(val => {
        if (val && this.type) {
          this.$set(this.tableData[this.index], "name", this.ruleForm.name);
          this.$set(this.tableData[this.index], "des", this.ruleForm.des);
          this.type = 0;
          this.exitshow = false;
          this.ruleForm.name = "";
          this.ruleForm.des = "";
          // this.getdata(this.data)
        }
      });
    }
  },

  mounted() {}
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
.organization {
  background: #fff;
  min-height: calc(~"100vh - 120px");
  position: relative;
  .tree {
    min-width: 160px;
    position: absolute;
    left: 0px;
    // min-height: calc(~"100vh - 120px");
    border: 1px solid #409eff52;
    .title {
      background: #409eff52;
      text-align: center;
      padding: 5px;
      font-weight: 600;
    }
    .exit {
      background: #409eff52;
      text-align: center;
      padding: 5px;
      cursor: pointer;
      font-weight: 600;
    }
    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
    }
  }
  .list {
    position: absolute;
    width: calc(~"100% - 220px");
    left: 200px;
    top: 30px;
    .search {
    }
    text-align: left;
    .all_list {
    }
    .page {
      text-align: center;
      margin-top: 20px;
    }
  }
}
</style>
<style rel='stylesheet/less' lang='less'>
.organization {
  .list {
    .has-gutter {
      tr {
        th {
          background: #f6f8f9;
        }
      }
    }
  }
}
</style>