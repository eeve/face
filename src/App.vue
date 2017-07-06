<template>
  <div>
    <canvas id="canvas" width="800" height="800"></canvas>
  </div>
</template>

<script>
  import { fabric } from 'fabric';
  import test from './0.jpg';

  export default {
    mounted() {
      var canvas = new fabric.Canvas('canvas', {
        backgroundColor: '#222',
        selectionColor: 'transparent',
        selectionLineWidth: 0,
        HOVER_CURSOR: 'pointer'
      });
      canvas.setBackgroundImage(test, canvas.renderAll.bind(canvas), {
        width: canvas.width,
        height: canvas.height,
        originX: 'left',
        originY: 'top'
      });

      var comicSansText = new fabric.Text("老哥稳", {
        fontFamily: 'Source Sans Pro,Helvetica Neue,Helvetica,Arial,sans-serif',
        fontSize: 20,
        fontWeight: 'bold',
        fill: '#222',
        left: 10,
        top: 270,
        height: 20,
        width: 300
      });
      canvas.add(comicSansText);

      // canvas.on({
      //   'touch:gesture': function() {
      //     var text = document.createTextNode(' Gesture ');
      //     info.insertBefore(text, info.firstChild);
      //   },
      //   'touch:drag': function() {
      //     var text = document.createTextNode(' Dragging ');
      //     info.insertBefore(text, info.firstChild);
      //   },
      //   'touch:orientation': function() {
      //     var text = document.createTextNode(' Orientation ');
      //     info.insertBefore(text, info.firstChild);
      //   },
      //   'touch:shake': function() {
      //     var text = document.createTextNode(' Shaking ');
      //     info.insertBefore(text, info.firstChild);
      //   },
      //   'touch:longpress': function() {
      //     var text = document.createTextNode(' Longpress ');
      //     info.insertBefore(text, info.firstChild);
      //   }
      // });
    }
  }
</script>
