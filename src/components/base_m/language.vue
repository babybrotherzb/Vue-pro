<template>
  <div>
    <el-dropdown>
      <a class="language" target="_blank">语言设置</a>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="languge('zh')" :disabled="$i18n.locale == 'zh'">中文</el-dropdown-item>
        <el-dropdown-item @click.native="languge('en')" :disabled="$i18n.locale == 'en'">English</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    languge(value) {
      this.$i18n.locale = value;
      localStorage.setItem("language", value);
      if (value == "en") {
        this.$message.success("English setting successful!");
      } else {
        this.$message.success("中文设置成功！");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.language {
  color: #409eff;
  border: 1px solid #409eff;
  border-radius: 6px;
  padding: 3px 10px;
}
</style>