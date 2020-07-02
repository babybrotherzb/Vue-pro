<template>
    <canvas :width="Width" :height="Height"  :id="Id"></canvas>
</template>

<script>
export default {
    props:['Width','Height','Id'],
  data() {
    return {
    };
  },
  mounted() {
    this.drawcanvas()
  },
  methods: {
      drawcanvas(){
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        var s = window.screen;
        var w = s.width;
        var h = s.height;
        canvas.width = w;
        canvas.height = h;
        var fontSize = 14;
        var clos = Math.floor(w / fontSize);
        var drops = [];
        // var str = "zhangbaoxihuanmishasha";
        var str = "张宝喜欢米莎莎";
        for (var i = 0; i < clos; i++) {
        drops.push(0);
        }
        function drawString() {
        ctx.fillStyle = "rgba(0,0,0,0.05)";
        ctx.fillRect(0, 0, w, h);
        ctx.font = "600 " + Math.round(Math.random() * 30) + "px";
        var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop("0", "#ff0000");
        gradient.addColorStop("0.2", "#ec00ff");
        gradient.addColorStop("0.4", "#00dfff");
        gradient.addColorStop("0.6", "#00ff10");
        gradient.addColorStop("0.8", "#cfff00");
        gradient.addColorStop("1.0", "#ff7e00");
        ctx.fillStyle = gradient;
        for (var i = 0; i < clos; i++) {
            var x = i * fontSize;
            var y = drops[i] * fontSize;
            ctx.fillText(str[Math.floor(Math.random() * str.length)], x, y);
            if (y > h && Math.random() > 0.99) {
            drops[i] = 0;
            }
            drops[i]++;
        }
        window.requestAnimationFrame(drawString);
        }
        // setInterval(drawString,2000);
        window.requestAnimationFrame(drawString);
      }
  }
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
#canvas{
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background: #000000;
}
</style>
<style rel='stylesheet/less' lang='less'>
</style>