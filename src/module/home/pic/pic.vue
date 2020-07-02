<template>
  <div>
    <el-button type="primary" @click="applyAdv(11)">上传我的照片</el-button>
    <!-- 上传我的照片 -->
    <el-dialog
      width="450px"
      class="labels"
      :visible.sync="applyadv.show"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <div slot="title">
        <p style='font-size:17px'>上传我的照片</p>
      </div>
      <el-form>
        <el-form-item>
          <el-input
            v-model="applyadv.reason"
            @focus="ifreason = false"
            type="textarea"
            placeholder="请先填写图片说明"
          ></el-input>
          <p
            v-if="ifreason"
            style="color:#ff0000"
          >请简单先填写图片说明</p>
        </el-form-item>
        <el-form-item>
          <p>上传我的照片（必传）</p>
          <el-upload
            action="/"
            ref="gzhimg"
            :before-remove="beforeRemove"
            :on-success='imgsuccess'
            :on-error='imgerror'
            :on-change="onchange"
            multiple
            :data='imgToken'
            accept='image/*'
            :limit="1"
            :auto-upload="false"
            :on-exceed="handleExceed"
            :file-list="fileList"
            list-type="picture"
          >
            <el-button
              size="small"
              type="primary"
            >点击上传</el-button>
          </el-upload>
        </el-form-item>
        <p
          v-if="ifimg"
          style="color:#ff0000"
        >请上传我的照片</p>
        <el-form-item
          style="text-align:right"
          size="small"
        >
          <el-button @click="applyadv.show = false,fileList=[],applyadv.reason=''">取 消</el-button>
          <el-button
            type="primary"
            @click="sureapplyadv"
          >确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- end 上传我的照片-->
  </div>

</template>

<script>
export default {
  components: {},
  data() {
    return {
      ifreason: false,
      applyadv: {
        url: "",
        mp_id: "",
        reason: "",
        show: false
      },
      fileList: [],
      imgToken: {
        name: "",
        key: "",
        policy: "", // oss上传必须参数 token
        OSSAccessKeyId: "", // oss上传必须参数 keyid
        success_action_status: "", // oss上传必须参数
        signature: "" // oss上传必须参数 署名
      },
      ifimg: false
    };
  },

  computed: {},

  mounted() {
    class Student {
    constructor( firstName,  middleInitial,  lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}


function greeter(person ) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");

console.log(user,'user user')

console.log(greeter(user),'greeter(user)')
  },

  created() {},

  methods: {
    // 上传我的照片显示
    applyAdv(id) {
      this.applyadv.show = true;
      this.applyadv.mp_id = id;
      this.fileList = [];
      this.beforeUpload();
    },

    // 点击最终确认上传
    sureapplyadv() {
      if (this.applyadv.reason && this.fileList && this.fileList.length > 0) {
        this.$refs.gzhimg.submit();
      } else if (!this.applyadv.reason) {
        this.ifreason = true;
      } else if (!this.fileList || !this.fileList.length) {
        this.ifimg = true;
      }
    },

    //提交上传所有字段
    postaxios() {
      this.ifreason = false;
      this.ifimg = false;
      let postval = {
        url: this.fileList && this.fileList.length && this.fileList[0].url,
        mp_id: this.applyadv.mp_id,
        reason: this.applyadv.reason
      };
      this.$axios
        .post("/advantage", postval)
        .then(res => {
          if (res.data && res.data.code == 200) {
            this.$message.success(res.data.msg);
            this.applyadv.show = false;
            this.fileList = [];
            this.applyadv.mp_id = "";
            this.applyadv.reason = "";
          } else {
            this.$message.error(res.data.msg);
            this.applyadv.show = false;
            this.fileList = [];
            this.applyadv.mp_id = "";
            this.applyadv.reason = "";
          }
        })
        .catch(err => {
          this.$message.error(err.data.msg || "网络错误");
          this.applyAdv.show = false;
          this.fileList = [];
          this.applyadv.mp_id = "";
          this.applyadv.reason = "";
        });
    },

    //饿了么组件 this.$refs.gzhimg.submit(); 自动触发图片上传功能
    imgsuccess(response, file, fileList) {
      this.fileList = [
        {
          name: this.imgToken.name,
          url: ``
        }
      ];
      this.postaxios();
    },

    // 上传失败
    imgerror(err, file, fileList) {
      console.log(err, file, fileList);
      this.$message.error("图片上传失败");
    },

    // 上传之前先编译出oss需要的对应格式
    onchange(file, files) {
      console.log(file, files, this.fileList, "onchange");
      this.fileList = files;
      this.ifimg = false;
      (this.imgToken.name =
        this.fileList.length && this.fileList[0] && this.fileList[0].name),
        (this.imgToken.key = `gzh/${this.random_string(10)}.${this.fileList
          .length &&
          this.fileList[0] &&
          this.fileList[0].name.split(".")[1]}`),
        console.log(this.imgToken, file, "imgtoken");
    },

    // oss 对应图片的10位数key， 随机生成，oss里存的也是这个key
    random_string(len) {
      len = len || 32;
      var chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
      var maxPos = chars.length;
      var pwd = "";
      for (var i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return pwd;
    },

    //打开弹框的时候获取oss的token - host - 文件名dir - id
    beforeUpload(file) {
      this.$axios
        .get("")
        .then(res => {
          if (res.data) {
            this.imgToken.policy = res.data.policy;
            this.imgToken.OSSAccessKeyId = res.data.accessid;
            this.imgToken.signature = res.data.signature;
            this.imgToken.success_action_status = 200;
          } else {
            this.$refs.gzhimg.abort();
          }
        })
        .catch(err => {
          this.$refs.gzhimg.abort();
        });
    },

    // 上传限制 自动触发
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },

    //删除提示
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`).then(res => {
        this.fileList = [];
      });
    }
  }
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
.labels {
  display: block;
  text-align: left;
}
</style>
<style rel='stylesheet/less' lang='less'>
</style>
