<template>
  <div class="echarts_box">
    <a href="/#/vuex">前往vuex</a>
    <div class="tab-box">
      <div style="float:left">
        <label class="label" v-for="(item,index) in tabdata" :key="index">
          {{item.name}}&emsp;
          <span @click="del(index)">X</span>
        </label>
        <el-input
          v-if="showinput"
          class="label"
          size="samll"
          v-model="newname"
          ref="newn"
          @blur="blur"
        ></el-input>
      </div>
      <el-button style="float:left" @click="add">+新增</el-button>
    </div>
    <div class="echart">
      <v-echarts id="echarts" width="800px" height="400px" :option="defaultOption"></v-echarts>
    </div>
  </div>
</template>

<script>
import vEcharts from "../components/echarts";
import data from "../assets/data";

export default {
  data() {
    return {
      defaultOption: {},
      value1: "",
      value: localStorage.getItem("language"),
      options: [
        {
          value: "en",
          label: "英文"
        },
        {
          value: "zh",
          label: "中文"
        }
      ],
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
  components: {
    vEcharts
  },
  methods: {
    languge() {
      this.$i18n.locale = this.value;
      localStorage.setItem("language", this.value);
    },
    add() {
      console.log("add");
      this.showinput = true;
      this.$nextTick(() => {
        this.$refs.newn.focus();
      });
    },

    del(index) {
      console.log("del");
      this.tabdata.splice(index, 1);
    },
    blur() {
      console.log("blur");
      if (this.newname) {
        this.tabdata.push({
          id: this.tabdata[this.tabdata.length - 1].id + 1,
          name: this.newname
        });
      }

      this.newname = "";
      this.showinput = false;
    },
    getdata() {
      this.defaultOption = {
        title: {
          text: "Beijing AQI"
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          data: data.map(function(item) {
            return item[0];
          })
        },
        yAxis: {
          splitLine: {
            show: false
          }
        },
        toolbox: {
          left: "center",
          feature: {
            dataZoom: {
              yAxisIndex: "none"
            },
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: [
          {
            startValue: "2014-06-01"
          },
          {
            type: "inside"
          }
        ],
        visualMap: {
          top: 10,
          right: 10,
          pieces: [
            {
              gt: 0,
              lte: 50,
              color: "#096"
            },
            {
              gt: 50,
              lte: 100,
              color: "#ffde33"
            },
            {
              gt: 100,
              lte: 150,
              color: "#ff9933"
            },
            {
              gt: 150,
              lte: 200,
              color: "#cc0033"
            },
            {
              gt: 200,
              lte: 300,
              color: "#660099"
            },
            {
              gt: 300,
              color: "#7e0023"
            }
          ],
          outOfRange: {
            color: "#999"
          }
        },
        series: {
          name: "Beijing AQI",
          type: "line",
          data: data.map(function(item) {
            return item[1];
          }),
          markLine: {
            silent: true,
            data: [
              {
                yAxis: 50
              },
              {
                yAxis: 100
              },
              {
                yAxis: 150
              },
              {
                yAxis: 200
              },
              {
                yAxis: 300
              }
            ]
          }
        }
      };
    }
  },
  mounted() {
    this.getdata();
  }
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
.echarts_box {
  position: relative;
  top: 60px;
  width: 100%;
  height: calc(~"100vh - 60px");
}
.tab-box {
  display: block;
  padding: 20px;
  width: 500px;
  margin: 30px auto;
}
.echart {
  display: block;
  margin-top: 40px;
}
</style>
<style rel='stylesheet/less' lang='less'>
</style>
