var transform = require("../common/transform.js");
function move(callBack){
  var wrap = document.querySelector("#wrap .content");
  var content = document.querySelector("#wrap .content >div");

  // 元素一开始的位置
  var eleStartY = 0;
  // 手指一开始的位置
  var szStartY = 0;
  // 最小的距离  视口-ul 的宽度  负值

  setTimeout(function () {
    minY = wrap.clientHeight - content.offsetHeight;
},200) 
    
  var lastPoint = 0;
  var lastTime = 0;
  var disPoint = 0;
  var disTime = 0;
  var isY=true;
  var isFirst=true;
  var cleartime=0; 

  wrap.addEventListener("touchstart", function (ev) {
    ev = ev || event;
    // 2d状态清零
    clearInterval(cleartime);
    content.style.transition = "";
    // 拿到第一根手指
    var touchC = ev.changedTouches[0];
    // 元素一开始的位置
    eleStartY = transform.css(content, "translateY");
    eleStartX = transform.css(content, "translateX");
    szStartX = touchC.clientX;
    szStartY = touchC.clientY;
    
    lastPoint = touchC.clientY;

    lastTime = new Date().getTime();

    content.handMove = false;
    disPoint = 0;
    disTime = 1;
    isY=true;
    isFirst=true; 

      //组装外部逻辑
    if(callBack&&(typeof callBack["start"]).toLowerCase()==="function"){
        callBack["start"].call(content);
    }
  })
  wrap.addEventListener("touchmove", function (ev) {
    ev = ev || event;
    if(!isY){
      return;
    }
    var touchC = ev.changedTouches[0];
    var nowY = touchC.clientY;
    var nowX = touchC.clientX;

    var disX= nowX - szStartX;
    var disY = nowY - szStartY;
    var translateY = eleStartY + disY;

    nowPoint = touchC.clientY;
    nowTime = new Date().getTime();

    disPoint = nowPoint - lastPoint;
    disTime = nowTime - lastTime;

    lastPoint = nowPoint;
    lastTime = nowTime;

    if(isFirst){
      isFirst=false;
      if(Math.abs(disX)>Math.abs(disY)){
        isY=false;
        return;
      }
    }

    var scale = 0;
    if (translateY > 0) {
      content.handMove = true;
      scale =
        document.documentElement.clientHeight /
        ((document.documentElement.clientHeight + translateY) * 2);

      translateY = transform.css(content, "translateY") + disPoint * scale;
    } else if (translateY < minY) {
      content.handMove = true;
      var over = minY - translateY;

      scale =
        document.documentElement.clientHeight /
        ((document.documentElement.clientHeight + over) * 2);

      translateY = transform.css(content, "translateY") + disPoint * scale;
    }
    transform.css(content, "translateY", translateY);
    
    // 组件外部逻辑
    if(callBack&&(typeof callBack["move"]).toLowerCase()==="function"){
      callBack["move"].call(content);
    }
  });

  wrap.addEventListener("touchend", function (ev) {
    ev = ev || event;

    if (!content.handMove) {
      fast(content, disPoint, disTime);
    } else {
      var translateY = transform.css(content, "translateY");
      if (translateY > 0) {
        translateY = 0;
      } else if (translateY < minY) {
        translateY = minY;
      }
      content.style.transition = "1s transform";
      transform.css(content, "translateY", translateY);
    }
      // 组件外部逻辑
    if(callBack&&(typeof callBack["end"]).toLowerCase()==="function"){
      callBack["end"].call(content);
  }
  });

    var Tween ={
      Linear: function(t,b,c,d){ return c*t/d + b; },
      Back:function(t,b,c,d,s){
          if (s == undefined) s = 1.70158;
          return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
      }
  }
  function fast(content, disPoint, disTime) {
    var speed = disPoint / disTime;
    var time = 0;
    speed = Math.abs(speed) < 0.3 ? 0 : speed;
    time = Math.abs(speed) * 0.2;
    time = time > 2 ? 2: time;
    time = time < 0.5 ? 0.5 : time;
    // console.log(speed);

    var translateY = transform.css(content, "translateY");
    var targetY = translateY + speed * 200;
    translateY = targetY;

      var type = "Linear";
    if (translateY > 0) {
      translateY = 0;
      type = "Back";
    } else if (translateY < minY) {
      translateY = minY;
      type = "Back";
    }
    // content.style.transition = time + "s " + bsr + " transform";
    // transform.css(content, "translateY", translateY);

    move(content,translateY,time,type)
  }

  

  function move(node,translateY,time,type){
    clearInterval(cleartime);

    var t=0;
    var b=transform.css(content, "translateY");
    var c=translateY-b;
    var d=(time*1000*2)/(1000/60);

    cleartime=setInterval(function(){
      t++;
      if(t>d){
        clearInterval(cleartime);
        // 组件外部逻辑
    if(callBack&&(typeof callBack["over"]).toLowerCase()==="function"){
      callBack["over"].call(content);
  }
  return;
      }
      transform.css(node,"translateY",Tween[type](t,b,c,d));
      // 组件外部逻辑
    if(callBack&&(typeof callBack["move"]).toLowerCase()==="function"){
      callBack["move"].call(content);
  }
    },1000/60);
  }
}
module.exports={
  move:move,
}

