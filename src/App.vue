<template>
  <div class="face-maker">
    <ul class="templates">
      <li v-for="url in tpls" :class="{ selected: tpl === url }" @click="tpl = url">
        <img :src="url" />
      </li>
    </ul>
    <canvas id='canvas' width='300' height='282'>您的浏览器不支持canvas标签。</canvas>
    <div class="action clearfix">
      <input type='text' v-model='text' /><button  @click='saveFile'>保存</button>
    </div>
  </div>
</template>

<style lang="less">
  body {
    margin: 0;
    padding: 0;
  }
  * {
    box-sizing: border-box;
  }
  .face-maker {
    width: 372px;
    height: 500px;
    margin: 100px auto;
  }
  .templates {
    margin: 0;
    padding: 0;
    list-style: none;
    max-height: 284px;
    overflow-y: auto;
    overflow-x: hidden;
    width: 64px;
    display: inline-block;
    vertical-align: top;
    background: rgba(0, 0, 0, 0.1);
    font-size: 0;
    > li {
      // display: inline-block;
      border: 2px solid transparent;
      img {
        width: 60px;
        height: 60px;
      }
      &.selected {
        border-color: #eee;
      }
    }
  }
  #canvas{
    border: 1px solid #111;
  }
  .clearfix{overflow:hidden;_zoom:1;}
  .action {
    text-align: center;
    > input {
      width: 80%;
      float: left;
      height: 30px;
    }
    > button {
      width: 20%;
      float: left;
      height: 30px;
      border: none;
    }
  }
</style>

<script>
  import { fabric } from 'fabric';
  export default {
    data() {
      return {
        tpls: [],
        tpl: '',
        canvas: null,
        data: null,
        text: '老哥稳'
      }
    },
    watch: {
      text() {
        this.draw();
      },
      tpl() {
        this.draw();
      }
    },
    async beforeMount() {
      for(let i = 0 ; i < 24; i++) {
        this.tpls.push(await import(`../templates/${i}.jpg`));
      }
    },
    mounted() {
      this.canvas = document.getElementById('canvas');
      this.draw();
    },
    methods: {
      draw() {
        if(!this.tpl || !this.text) { return; }
        let ctx = canvas.getContext('2d'); // 获取对应的CanvasRenderingContext2D对象(画笔)
        let img = new Image(); // 创建新的图片对象
        img.src = this.tpl; // 指定图片的URL
        img.onload = () => { // 浏览器加载图片完毕后再绘制图片
          console.log(img);
          ctx.drawImage(img, 0, 0, 300, 282); // 以Canvas画布上的坐标(10,10)为起始点，绘制图像 // //图像的宽度和高度分别缩放到350px和100px
          ctx.font = '25px 微软雅黑'; // 设置字体样式
          ctx.fillStyle = 'black'; // 设置字体填充颜色
          ctx.textAlign = 'center'; // 设置文本的水平对对齐方式
          // if(tpl_location==3) {
            ctx.fillText(this.text, canvas.width / 2, 268); // 从坐标点(x,y)开始绘制文字
          // }else if(tpl_location==1) {
            // ctx.fillText(this.text, canvas.width / 2, 30);
          // }
          this.data = canvas.toDataURL('image/png');
        };
      },
      _fixType(type) {
        type = type.toLowerCase().replace(/jpg/i, 'jpeg');
        let r = type.match(/png|jpeg|bmp|gif/)[0];
        return 'image/' + r;
      },
      saveFile() {
        if(!this.data) { return; }
        let ext = 'png';
        let save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
        save_link.href = this.data.replace(this._fixType(ext), 'image/octet-stream');
        save_link.download = `face_${(new Date()).getTime()}.${ext}`;
        let event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        save_link.dispatchEvent(event);
      }
    }
  }
</script>
