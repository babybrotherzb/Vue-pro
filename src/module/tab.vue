<template>
  <div>
    <div style="float:left">
      <label
        class="label"
        v-for="(item,index) in tabdata"
        :key="index"
      >{{item.name}}&emsp;<span @click="del(index)">X</span></label>
      <el-input
        v-if="showinput"
        class="label"
        size="samll"
        v-model="newname"
        ref="newn"
        @blur="blur"
      ></el-input>
    </div>
    <el-button
      style="float:left"
      @click="add"
    >+新增</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabdata: [
        { id: 0, name: "tab11" },
        { id: 1, name: "tab22" },
        { id: 2, name: "tab33" },
        { id: 3, name: "tab44" }
      ],
      newname: "",
      showinput: false
    };
  },
  methods: {
    add() {
      console.log("add");
      this.showinput = true;
      this.$refs.newn.focus();
    },
    del(index) {
      console.log("del");
      this.tabdata.splice(index, 1);
    },
    blur() {
      console.log("blur");
      if (newname) {
        this.tabdata.push({
          id: this.tabdata[this.tabdata.length - 1].id + 1,
          name: this.newname
        });
      }
      this.newname = "";
      this.showinput = false;
    }
  },
  mounted() {}
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
.label {
  width: 50px;
  border: 1px solid #ccc;
  padding: 10px 0px;
  text-align: center;
  margin: 0px 10px;
}
</style>
<style rel='stylesheet/less' lang='less'>
</style>
