<template>
  <div>
    <!-- 此处无关紧要  -->
    <div class="title">
      baby张的vue+css3图片预览demo,缩放，旋转，切换
      <p>Github地址：
        <a
          href="https://github.com/babybrotherzb"
          target="_blank"
        >
          https://github.com/babybrotherzb
        </a>
      </p>
      <p>博客地址：
        <a
          href="https://blog.csdn.net/weixin_43648947"
          target="_blank"
        >
          https://blog.csdn.net/weixin_43648947
        </a>
      </p>
    </div>
    <!-- 此处无关紧要  -->

    <div class="custcontent">
      <!-- 图片正常的列表显示  -->
      <div class="showimg">
        <img
          v-for="(item,index) in data"
          :key="index"
          style="width:200px;height:100px"
          :src="item"
          @click="showimg(index)"
        />
      </div>
      <!-- 图片正常的列表显示  -->

      <!-- {/* 引入的image组件 */} -->
      <ShowImg
        :alldata="{'data':data,'firstIndex':firstIndex,'showimgs':showimgs}"
        @toggleshow="toggleshow"
      ></ShowImg>
      <!-- {/* 引入的image组件 */} -->

    </div>
  </div>
</template>

<script>
import ShowImg from "./module/image.vue";

export default {
  components: {
    ShowImg: ShowImg
  },
  data() {
    return {
      data: [
        "http://img.s.youfenba.com/material_thumb/BYX6Mm67ba.jpg",
        "http://img.s.youfenba.com/material_thumb/8nzxJwpsPX.jpg",
        "http://img.s.youfenba.com/material_thumb/SaNktASjmp.jpg",
        "http://img.s.youfenba.com/material_thumb/cTma2FTPEC.jpg",
        "http://img.s.youfenba.com/material_thumb/KnNc6D4sGs.jpg"
      ],
      _html: "",
      showimgs: false, //必须字段控制弹框显示隐藏
      firstIndex: 0 //点击时默认下标
    };
  },

  computed: {},

  mounted() {},

  created() {},

  methods: {
    showimg(i) {
      this.showimgs = true;
      this.firstIndex = i;
      console.log(this.firstIndex);
    },
    toggleshow() {
      this.showimgs = false;
    }
  }
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
.title {
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  p{
      margin-top: 20px;
      font-size: 16px;
  }
}

.custcontent {
  text-align: center;
  margin-top: 40px;
}

</style>
<style rel='stylesheet/less' lang='less'>
</style>