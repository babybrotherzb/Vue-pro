<template>
  <div class="echarts_box">
    <a href="/#/echarts">前往echarts</a>
    <input v-model="counts" />
    <button @click.stop="add">增加1</button>
    <button @click.stop="reduce">减少1</button>
    <button @click.stop="add1000">增加1000</button>
    <button @click.stop="reduce1000">减少1000</button>
    <div v-cloak v-text="name"></div>
    <div v-html="html"></div>
    <div v-pre>v-pre跳过渲染</div>
    <input v-model.number.trim="number" placeholder="model修饰符" />
    <!-- <img src="./assets/logo.png"> -->
    <tree :model="root" :length="length"></tree>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import tree from "./tree.vue";

export default {
  components: {
    tree
  },
  data() {
    return {
      name: "大家好",
      html: "<h2>才是真的好</h2>",
      number: "",

      root: {
        name: "根节点",
        level: 0,
        isOpen: true,
        children: [
          {
            name: "节点1",
            level: 1,
            url: "/homePage/middle/navLeftFirst",
            isOpen: true,
            children: [
              {
                name: "节点1-1",
                level: 2,
                isOpen: true,
                children: []
              },
              {
                name: "节点1-2",
                level: 2,
                isOpen: true,
                children: []
              }
            ]
          },
          {
            name: "节点2",
            level: 1,
            url: "/homePage/middle/navLeftSecond",
            isOpen: true,
            children: [
              {
                name: "节点2-1",
                level: 2,
                isOpen: true,
                children: []
              },
              {
                name: "节点2-2",
                level: 2,
                isOpen: true,
                children: []
              }
            ]
          }
        ]
      },
      length: 2
    };
  },
  computed: {
    ...mapState({
      counts: state => state.count
    }),
    ...mapGetters({
      getternum: "docount"
    })
  },
  methods: {
    ...mapMutations({
      addnum: "SET_COUMT_ADD",
      reducenum: "SET_COUMT_REDUCE"
    }),
    ...mapActions({
      addmore: "ADD1000",
      reducemore: "REdUCE1000"
    }),
    add() {
      this.addnum();
      console.log(this.counts, "+1");
    },
    reduce() {
      this.reducenum();
      console.log(this.counts, "-1");
    },
    add1000() {
      this.addmore();
      console.log(this.counts, "+1000");
    },
    reduce1000() {
      this.reducemore();
      console.log(this.counts, "-1000");
    }
  },

  mounted() {
    // console.log(this.counts, this.$store.state.count, 111111111);
    // this.addmore()
  }
};
</script>

<style lang="less" scoped>
[v-cloak] {
  display: none;
}
.echarts_box {
  height: calc(~"100vh - 60px");
  position: relative;
  top: 60px;
}
</style>
