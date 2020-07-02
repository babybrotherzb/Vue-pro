<template>
  <div class="operate">
    <div class="search">
      <el-form :inline="true" :model="searchform">
        <el-form-item label="选择岗位">
          <el-select
            style="width:200px"
            size="small"
            v-model="searchform.group"
            placeholder="请选择岗位"
          >
            <el-option
              v-for="item in group"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tree">
      <div class="title font_20" style="padding-bottom:20px">
        <span class="dot g-fl"></span>
        &ensp; 功能权限配置
      </div>
      <el-tree
        :data="data"
        node-key="id"
        default-expand-all
        show-checkbox
        :default-expanded-keys="[7]"
        :default-checked-keys="[5]"
        :expand-on-click-node="false"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>
            <i class="el-icon-document"></i>
            &ensp;{{ data.name }}
          </span>
        </span>
      </el-tree>
      <div class="fotter">
        <el-button size="small" @click="back">返回</el-button>
        <el-button type="primary" size="small" @click="save">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import datas from "./data";
export default {
  data() {
    return {
      data: null,
      searchform: {
        group: "选项1"
      },
      group: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      datas: datas.data
    };
  },

  components: {},

  computed: {},

  methods: {
    save() {},
    back() {
      this.$router.push({ path: `/set/organization` });
    },
    search() {},
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
.operate {
  background: #fff;
  border-radius: 6px;
  min-height: calc(~"100vh - 200px");
  margin-top: 20px;
  padding: 30px;
  .search {
    text-align: left;
  }
  .tree {
    width: 400px;
    .dot {
      width: 1px;
      height: 16px;
      background: #409eff;
      border-radius: 2px;
      border: 2px solid #409eff;
    }
    .font_20 {
      font-size: 16px;
      font-weight: 600;
    }
    .title {
      display: flex;
      align-items: center;
    }
  }
  .fotter {
    margin-top: 30px;
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
</style>