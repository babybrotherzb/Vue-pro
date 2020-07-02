<template>
  <div class="exit_branch">
    <p class="title">
      部门结构&emsp;&emsp;
      <span class="back" @click="back">
        <i class="el-icon-d-arrow-left"></i>返回用户管理列表
      </span>
    </p>
    <div class="tree">
      <el-tree :data="data" node-key="id" default-expand-all :expand-on-click-node="false">
        <span
          class="custom-tree-node"
          @mouseenter="enter(data)"
          @mouseleave="leave()"
          slot-scope="{ node, data }"
        >
          <span>
            <i class="el-icon-document"></i>
            &ensp;{{ data.name }}
          </span>
          <span :class="mouseid==data.id?'block':'none'">
            <el-button
              v-show="data.children?false:true"
              type="text"
              size="mini"
              @click="() => remove(node, data)"
            >删除</el-button>
            <el-button type="text" size="mini" @click="() => exit(node,data)">编辑部门</el-button>
            <el-button type="text" size="mini" @click="() => append(node,data)">添加子部门</el-button>
          </span>
        </span>
      </el-tree>
    </div>
    <!-- 编辑提示 -->
    <el-dialog
      title="提示"
      :visible.sync="exitshow"
      width="30%"
      :show-close="true"
      :close-on-click-modal="false"
    >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="编辑部门" prop="exitval">
          <el-input v-model="ruleForm.exitval" clearable />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="exitshow = false,ruleForm.exitval = ''">取 消</el-button>
        <el-button type="primary" @click="exitFun('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
let id = 1000;
import datas from "./data";
export default {
  data() {
    return {
      loading: false,
      exitshow: false,
      ruleForm: {
        exitval: "",
        node: null
      },
      mouseid: "",
      datas: datas.data,
      data: null,
      rules: {
        exitval: [
          { required: true, message: "部门名称不为空", trigger: "blur" }
        ]
      }
    };
  },

  components: {},

  computed: {},

  methods: {
    back() {
      this.$router.push({ path: `/set/organization` });
    },
    exit(node, data) {
      this.ruleForm.exitval = data.name;
      this.ruleForm.node = node;
      console.log(node, data, "aaaaaaaaa");
      this.exitshow = true;
    },
    enter(data) {
      this.mouseid = data.id;
    },
    leave() {
      this.mouseid = "";
    },
    exitFun(formName) {
      this.$refs[formName].validate(val => {
        if (val) {
          this.exitshow = false;
          const parent = this.ruleForm.node.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex(
            d => d.id === this.ruleForm.node.data.id
          );
          this.$set(children[index], "name", this.ruleForm.exitval);
          // this.getdata(this.data)
        }
      });
    },
    append(node, data) {
      const newChild = { id: id++, name: "新部门" };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
      console.log(data, node, this.data, "append");
    },

    remove(node, data) {
      this.$confirm(`确认删除,${data.name}？`)
        .then(_ => {
          const parent = node.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex(d => d.id === data.id);
          children.splice(index, 1);
          console.log(data, node, this.data, "remove");
          // this.getdata(this.data)
        })
        .catch(_ => {});
    },
    getdata(data) {
      if (data) {
        this.data = data;
        this.$set(this.data, data);
      } else {
        this.data = this.datas;
      }
    }
  },

  mounted() {
    this.getdata();
  }
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
.exit_branch {
  background: #fff;
  border-radius: 6px;
  min-height: calc(~"100vh - 120px");
  .title {
    font-size: 16px;
    text-align: left;
    padding: 10px;
    background: #ececec;
    .back {
      color: #bf6c23;
      cursor: pointer;
    }
  }
  .tree {
    width: 400px;
    padding: 20px 10px;
    .none {
      display: none;
    }
    .block {
      display: block;
    }
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
</style>
<style rel='stylesheet/less' lang='less'>
.exit_branch {
  .tree {
    .expanded {
      color: #5f5f5f;
    }
    .el-icon-caret-right:before {
      margin: 22px 0;
      border-left: 1px solid #c7c7c7;
    }
  }
}
</style>