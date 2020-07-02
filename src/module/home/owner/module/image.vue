<template>
  <div>
    <el-dialog
      :visible.sync="alldata.showimgs"
      @close="toggleshow"
      width="50%"
    >
      <div
        class="bigimg toggleshow"
        slot="title"
      >
        <img
          :src="alldata.data[alldata.firstIndex]"
          class="imgstyle"
          :style="'transform:translate(-50% ,-50%) rotate('+
                    R +'deg) scale('+ SS +','+ SS +')'"
          ref="imgstyle"
        />
        <p
          class="left"
          @click="leftshow"
        >
          <i
            class="icon icon-left"
            style='font-size:30px'
          ></i>
        </p>
        <p
          class="right"
          @click="rightshow"
        >
          <i
            class="icon icon-right"
            style='font-size:30px'
          ></i>
        </p>
        <p
          class="rotateright"
          @click="rotateright"
        >
          <i
            class="icon icon-rturn"
            style='font-size:30px'
          ></i>
        </p>
        <p
          class="rotateleft"
          @click="rotateleft"
        >
          <i
            class="icon icon-lturn"
            style='font-size:30px'
          ></i>
        </p>
        <p
          class="showbig"
          @click="showbig"
        >
          <i
            class="icon icon-imgbig"
            style='font-size:30px'
          ></i>
        </p>
        <p
          class="showmin"
          @click="showmin"
        >
          <i
            class="icon icon-imgmin"
            style='font-size:30px'
          ></i>
        </p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    alldata: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      R: 0,
      S: 1,
      i: 0,
      SS: 1
    };
  },
  methods: {
    // 关闭弹框的回调
    toggleshow() {
      this.$emit("toggleshow");
    },
    // 向左预览
    leftshow() {
      if (this.alldata.firstIndex == 0) {
        this.alldata.firstIndex = this.alldata.data.length - 1;
        this.R = 0;
        this.S = 1;
        this.i = 0;
        this.SS = 1;
      } else {
        this.alldata.firstIndex = this.alldata.firstIndex - 1;
        this.R = 0;
        this.S = 1;
        this.i = 0;
        this.SS = 1;
      }
      this.$refs.imgstyle.setAttribute("src", this.alldata.data[this.alldata.firstIndex]);
    },

    // 向右预览
    rightshow() {
      if (this.alldata.firstIndex == 4) {
        this.alldata.firstIndex = 0;
        this.R = 0;
        this.S = 1;
        this.i = 0;
        this.SS = 1;
      } else {
        this.alldata.firstIndex = this.alldata.firstIndex + 1;
        this.R = 0;
        this.S = 1;
        this.i = 0;
        this.SS = 1;
      }
      this.$refs.imgstyle.setAttribute("src", this.alldata.data[this.alldata.firstIndex]);
    },

    // 顺时针旋转
    rotateright() {
      this.R = this.R + 90;
      this.$refs.imgstyle.style.transform =
        "translate(-50% ,-50%) rotate(" +
        this.R +
        "deg) scale(" +
        this.SS +
        "," +
        this.SS +
        ")";
    },

    // 逆时针旋转
    rotateleft() {
      this.R = this.R - 90;
      this.$refs.imgstyle.style.transform =
        "translate(-50% ,-50%) rotate(" +
        this.R +
        "deg) scale(" +
        this.SS +
        "," +
        this.SS +
        ")";
    },

    // 放大
    showbig() {
      if (this.i >= 0) {
        this.S = this.S + 1;
        this.i = this.i + 1;
        this.SS = 1 * this.S;
      } else {
        this.S = this.S - 1;
        this.i = this.i + 1;
        this.SS = 1 / this.S;
      }
      this.$refs.imgstyle.style.transform =
        "translate(-50% ,-50%) rotate(" +
        this.R +
        "deg) scale(" +
        this.SS +
        "," +
        this.SS +
        ")";
    },

    // 缩小
    showmin() {
      if (this.i <= 0) {
        this.S = this.S + 1;
        this.i = this.i - 1;
        this.SS = 1 / this.S;
      } else {
        this.S = this.S - 1;
        this.i = this.i - 1;
        this.SS = 1 * this.S;
      }
      this.$refs.imgstyle.style.transform =
        "translate(-50% ,-50%) rotate(" +
        this.R +
        "deg) scale(" +
        this.SS +
        "," +
        this.SS +
        ")";
    }
  }
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
@font-face {
  font-family: "icon"; /* project id 942104 */
  src: url("//at.alicdn.com/t/font_942104_lhzztf6om6j.eot");
  src: url("//at.alicdn.com/t/font_942104_lhzztf6om6j.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_942104_lhzztf6om6j.woff") format("woff"),
    url("//at.alicdn.com/t/font_942104_lhzztf6om6j.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_942104_lhzztf6om6j.svg#iconfont") format("svg");
}
.icon {
  font-family: "icon" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.icon-close:before {
  content: "\eaf2";
}
.icon-left:before {
  content: "\e77f";
}
.icon-right:before {
  content: "\e783";
}
.icon-lturn:before {
  content: "\e787";
}
.icon-rturn:before {
  content: "\e788";
}
.icon-imgbig:before {
  content: "\e781";
}
.icon-imgmin:before {
  content: "\e780";
}


.dilong {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background: #000;
  opacity: 0.4;
  z-index: 2;
}
.bigimg {
  overflow: hidden;
  width: 790px;
  height: 467px;
  background: #fff;
  z-index: 3;
}
.bigimg p i {
  cursor: pointer;
}
.close {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 66;
}
.left {
  position: absolute;
  top: 50%;
  left: 5%;
  transform: translate(-50%, -50%);
  z-index: 66;
}
.right {
  position: absolute;
  top: 50%;
  left: 95%;
  transform: translate(-50%, -50%);
  z-index: 66;
}
.rotateright {
  position: absolute;
  top: 95%;
  left: 45%;
  transform: translate(-50%, -50%);
  z-index: 66;
}
.rotateleft {
  position: absolute;
  top: 95%;
  left: 35%;
  transform: translate(-50%, -50%);
  z-index: 66;
}
.showbig {
  position: absolute;
  top: 95%;
  left: 55%;
  transform: translate(-50%, -50%);
  z-index: 66;
}
.showmin {
  position: absolute;
  top: 95%;
  left: 65%;
  transform: translate(-50%, -50%);
  z-index: 66;
}
.imgstyle {
  width: 500px;
  height: 300px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(0deg) scale(1, 1);
  z-index: 6;
}
</style>
<style rel='stylesheet/less' lang='less'>
</style>