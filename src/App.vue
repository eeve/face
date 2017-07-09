<template>
  <div class="face-maker">
    <yd-scrolltab v-show="openTplChoose">
      <yd-scrolltab-panel :label="`模版${index+1}`" icon="demo-icons-category1" v-for="url, index in tpls">
        <div><img class="tpl-img-item" :src="url" @click="openTplChoose = false; tpl = url; tplName = `模版${index+1}`; done = false;" :class="{ selected: tpl === url }"/></div>
      </yd-scrolltab-panel>
    </yd-scrolltab>
    <yd-flexbox v-show="!openTplChoose" direction="vertical">
        <div class="header"><a href="/">{{ brand }}</a></div>
        <yd-flexbox-item>
          <div class="content">
            <canvas v-show="!done" id='canvas' width='300' height='282'
              @touchstart="mousedown" @touchmove="mousemove" @touchend="mouseup"
              @mousedown='mousedown' @mousemove='mousemove' @mouseup='mouseup'>您的浏览器不支持canvas标签。</canvas>
            <img class="preview" v-show="done" ref="img" />
            <yd-cell-group title=" ">
              <yd-cell-item arrow @click.native="openTplChoose = true">
                <span slot="left">{{ tplName ? `已选模版：${tplName}` : '选择模版' }}</span>
              </yd-cell-item>
            </yd-cell-group>
            <yd-cell-group title="在图片中可拖动改变文字位置">
              <yd-cell-item>
                <span slot="left">配图文字：</span>
                <yd-input slot="right" v-model="text" required :showClearIcon="false" placeholder="这位老司机请输入文字"></yd-input>
              </yd-cell-item>
            </yd-cell-group>
            <yd-button-group>
              <yd-button size="large" @click.native='saveFile' v-if="!isMobile">保存表情</yd-button>
              <yd-button size="large" v-if="isMobile && !done" @click.native="setDone">完成制作</yd-button>
              <yd-button size="large" v-if="isMobile && done" @click.native="reset">再来一个</yd-button>
            </yd-button-group>

            <yd-grids-group class="share">
              <yd-grids-item @click.native.prevent="showPay = true">
                <yd-icon slot="icon" name="good"></yd-icon>
                <span slot="text">点赞</span>
              </yd-grids-item>
            </yd-grids-group>

            <yd-popup v-model="showPay" position="bottom" height="50%" class="pay-box">
              <yd-grids-group :rows="2">
                <yd-grids-item link="javascript:;">
                  <div slot="text">
                    <img src="./wepay.png" class="wepay"/>
                    <p>微信</p>
                  </div>
                </yd-grids-item>
                <yd-grids-item link="javascript:;">
                  <div slot="text">
                    <img src="./pay.png" class="alipay"/>
                    <p>支付宝</p>
                  </div>
                </yd-grids-item>
              </yd-grids-group>
              <div>
                <p class="qrcode-help-text">长按识别二维码，请作者喝杯茶🍵</p>
              </div>
              <yd-button type="warning" style="margin: 10px 0;" @click.native.stop="showPay = false">我仅仅是来点赞的</yd-button>
            </yd-popup>
          </div>
        </yd-flexbox-item>
    </yd-flexbox>
  </div>
</template>

<style lang='less'>
  @header-color: #333;
  @border-color: #eee;
  @padding: 20px;

  *, *:before, *:after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .header {
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    background: @header-color;
    color: #fefefe;
    padding: 0 20px;
    font-size: 0.5rem;
  }

  .content {
    padding-bottom: 15px;
    text-align: center;
    > .m-cell-box:first-child {
      margin-bottom: 0;
    }
  }

  #canvas, .preview{
    border: 1px solid @border-color;
    margin: .2rem auto;
    text-align: center;
  }

  .tpl-img-item {
    width: 100%;
  }

  @media screen and (min-width: 760px) {
    .tpl-img-item {
      width: 500px;
    }
  }

  .share {
    color: #cecece;
    margin-top: .6rem;
    .grids-item {
      padding: .1rem 0;
      width: 100%;
    }
    .grids-icon {
      height: .48rem;
    }
    i {
      font-size: 0.4rem!important;
    }
    .grids-txt {
      color: #888;
    }
  }
  .pay-box {
    text-align: center;
  }
  .wepay, .alipay {
    width: 100%;
    height: 100%;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
  }
  .qrcode-help-text {
    width: auto;
    display: inline-block;
    padding: 2px 5px;
    background: #eee;
    margin-top: 5px;
    border-radius: 4px;
    color: #888;
  }
</style>

<script>
  //判断访问终端
  var browser={
    versions: function() {
      var u = navigator.userAgent, app = navigator.appVersion;
      return {
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
        iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
        weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
        qq: u.match(/\sQQ/i) == " qq" //是否QQ
      };
    }(),
    language:(navigator.browserLanguage || navigator.language).toLowerCase()
  };
  export default {
    data() {
      return {
        showPay: false,
        brand: '老司机斗图',
        isMobile: browser.versions.mobile||browser.versions.android||browser.versions.ios,
        openTplChoose: false,
        done: false,
        placeholder: '请在下方选择模版，并输入文字',
        fontSize: 16,
        tpls: [],
        tpl: '',
        tplName: '',
        canvas: null,
        ctx: null,
        data: null,
        text: '老哥稳',
        dragok: false,
        startPos: {},
        x: 0,
        y: 0,
        canvasBuffer: null,
        disableTouchMoveEventFn: function (event) { // 移动端禁用页面滚动
          event.preventDefault();
        }
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
      for(let i = 0 ; i < 58; i++) {
        this.tpls.push(await import(`../templates/${i}.png`));
      }
    },
    mounted() {
      this.canvas = document.getElementById('canvas');
      this.ctx = this.canvas.getContext('2d'); // 获取对应的CanvasRenderingContext2D对象(画笔)
      this.ctx.font = `${this.fontSize}px 微软雅黑`;
      this.ctx.fillText(this.placeholder, (this.canvas.width / 2) - (this.placeholder.length * this.fontSize) / 2, this.canvas.height / 2);
      this.canvasBuffer = document.createElement("canvas");
      this.canvasBuffer.width = this.canvas.width;
      this.canvasBuffer.height = this.canvas.height;
      this.ctxBuffer = this.canvasBuffer.getContext('2d');
      this.x = this.canvas.width / 2;
      this.y = 268;
      setInterval(this.draw, 10);
    },
    methods: {
      clear(ctx) {
        // 清空ctx所在画板
        ctx && ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      },
      rect() {
        this.ctxBuffer.font = '25px 微软雅黑';
        this.ctxBuffer.fillStyle = 'black'; // 设置字体填充颜色
        this.ctxBuffer.textAlign = 'center'; // 设置文本的水平对对齐方式
        this.ctxBuffer.fillText(this.text, this.x, this.y);
      },
      draw() {
        if(!this.tpl || !this.text) { return; }
        // 清空buffer画板
        this.clear(this.ctxBuffer);
        // 创建新的图片对象
        let img = new Image();
        // 指定图片的URL
        img.src = this.tpl;
        // 浏览器加载图片完毕后再绘制图片
        img.onload = () => {
          // 以Canvas画布上的坐标(0,0)为起始点，绘制图像。图像的宽度和高度分别缩放到300px和282px
          this.ctxBuffer.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
          // 从坐标点(this.x, this.y)开始绘制文字
          this.rect();
          // 更新图片数据
          this.data = this.canvasBuffer.toDataURL('image/png');
          // 将图片数据同步到预览图上
          if(this.isMobile && this.$refs.img) {
            this.$refs.img.src = this.data;
          }
          // 清空主画板
          this.clear(this.ctx);
          // 从缓冲画板上复制内容到主画板
          this.ctx.drawImage(this.canvasBuffer, 0, 0, this.canvas.width, this.canvas.height);
        };
      },
      mousedown(e) {
        if(!this.tpl || !this.text) { return; }
        e = 'ontouchstart' in document && e.touches ? e.touches[0] : e;
        document.body.addEventListener('touchmove', this.disableTouchMoveEventFn, false);
        if(!this.isMobile) {
          document.body.style.cursor='move';
        }
        this.x = e.pageX - this.canvas.offsetLeft;
        this.y = e.pageY - this.canvas.offsetTop;
        this.dragok = true;
      },
      mousemove(e) {
        if(!this.tpl || !this.text) { return; }
        e = 'ontouchmove' in document && e.touches ? e.touches[0] : e;
        if ( this.dragok ){
          this.x = e.pageX - this.canvas.offsetLeft;
          this.y = e.pageY - this.canvas.offsetTop;
        }
      },
      mouseup() {
        if(!this.tpl || !this.text) { return; }
        this.dragok = false;
        document.body.removeEventListener('touchmove', this.disableTouchMoveEventFn, false);
        if(!this.isMobile) {
          document.body.style.cursor='auto';
        }
      },
      _fixType(type) {
        type = type.toLowerCase().replace(/jpg/i, 'jpeg');
        let r = type.match(/png|jpeg|bmp|gif/)[0];
        return 'image/' + r;
      },
      setDone() {
        if(!this.tpl || !this.text) {
          return this.$dialog.toast({
            mes: '一看就不是老司机',
            timeout: 1500,
            icon: 'error'
          });
        }
        this.done = true;
        this.$dialog.notify({
          mes: browser.versions.weixin ? '长按图片可发送给微信好友' : '长按图片可以保存到相册！',
          timeout: 5000
        });
      },
      saveFile() {
        if(!this.data) {
          return this.$dialog.toast({
            mes: '一看就不是老司机',
            timeout: 1500,
            icon: 'error'
          });
        }
        let ext = 'png';
        let save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
        save_link.href = this.data.replace(this._fixType(ext), 'image/octet-stream');
        save_link.download = `face_${(new Date()).getTime()}.${ext}`;
        let event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        save_link.dispatchEvent(event);
      },
      reset() {
        this.done = false;
        this.$dialog.toast({
          mes: '👌 老哥，请继续操作',
          timeout: 1500
        });
      }
    }
  }
</script>
