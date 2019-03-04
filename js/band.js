(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var wrapNode = document.querySelector("#wrap");

wrapNode.addEventListener("touchstart", function (ev) {
ev = ev || event;
ev.preventDefault();
})

var styleNode = document.createElement("style");
var w = document.documentElement.clientWidth / 16;
styleNode.innerHTML = "html{font-size:" + w + "px!important}"
document.head.appendChild(styleNode);





},{}],2:[function(require,module,exports){
var btn = document.querySelector("#wrap > .head .head-top .btn");
var mask = document.querySelector("#wrap > .head .mask");
var wrap = document.querySelector("#wrap");
var input=document.querySelector("#wrap > .head .head-bottom form > input[type='text']");

var isMask = false;
btn.addEventListener("touchstart", function (ev) {
ev = ev || event;
isMask = !isMask;
if (isMask) {
    this.classList.add("active");
    mask.style.display = "block";
    console.log(isMask)
} else {
    this.classList.remove("active");
    mask.style.display = "none";
}
ev.stopPropagation();
ev.preventDefault();
})
wrap.addEventListener("touchstart", function (ev) {
ev = ev || event;
if (isMask) {
    btn.classList.remove("active");
    mask.style.display = "none";
    isMask = !isMask;
}
})


mask.addEventListener("touchstart", function (ev) {
ev = ev || event;
ev.stopPropagation();
})

input.addEventListener("touchstart", function (ev) {
ev = ev || event;
this.focus();
ev.stopPropagation();
})

wrap.addEventListener("touchstart", function (ev) {
ev = ev || event;
input.blur();

})


},{}],3:[function(require,module,exports){
var tools = require("../common/tools.js");
var transform = require("../common/transform.js");


var nav = document.querySelector("#wrap .content .nav");
var list = document.querySelector("#wrap .content .nav .list");

// 元素一开始的位置
var eleStartX = 0;
// 手指一开始的位置
var szStartX = 0;
// 最小的距离  视口-ul 的宽度  负值
var minX = nav.clientWidth - list.offsetWidth;
var lastPoint = 0;
var lastTime = 0;
var disPoint = 0;
var disTime = 0;

nav.addEventListener("touchstart", function (ev) {
  ev = ev || event;
  // 2d状态清零
  list.style.transition = "";
  // 拿到第一根手指
  var touchC = ev.changedTouches[0];
  // 元素一开始的位置
  eleStartX = transform.css(list, "translateX");
  szStartX = touchC.clientX;
  lastPoint = touchC.clientX;

  lastTime = new Date().getTime();

  list.handMove = false;
  disPoint = 0;
  disTime = 1;
});

nav.addEventListener("touchmove", function (ev) {
  ev = ev || event;
  var touchC = ev.changedTouches[0];
  var nowX = touchC.clientX;

  var disX = nowX - szStartX;
  var translateX = eleStartX + disX;

  nowPoint = touchC.clientX;
  nowTime = new Date().getTime();

  disPoint = nowPoint - lastPoint;
  disTime = nowTime - lastTime;

  lastPoint = nowPoint;
  lastTime = nowTime;

  var scale = 0;
  if (translateX > 0) {
    list.handMove = true;
    scale =
      document.documentElement.clientWidth /
      ((document.documentElement.clientWidth + translateX) * 2);

    translateX = transform.css(list, "translateX") + disPoint * scale;
  } else if (translateX < minX) {
    list.handMove = true;
    var over = minX - translateX;

    scale =
      document.documentElement.clientWidth /
      ((document.documentElement.clientWidth + over) * 2);

    translateX = transform.css(list, "translateX") + disPoint * scale;
  }
  transform.css(list, "translateX", translateX);
});

nav.addEventListener("touchend", function (ev) {
  ev = ev || event;

  if (!list.handMove) {
    fast(list, disPoint, disTime);
  } else {
    var translateX = transform.css(list, "translateX");
    if (translateX > 0) {
      translateX = 0;
    } else if (translateX < minX) {
      translateX = minX;
    }
    list.style.transition = "1s transform";
    transform.css(list, "translateX", translateX);
  }
});

function fast(list, disPoint, disTime) {
  var speed = disPoint / disTime;
  var time = 0;
  speed = Math.abs(speed) < 0.3 ? 0 : speed;
  time = Math.abs(speed) * 0.2;
  time = time > 2 ? 2 : time;
  time = time < 0.5 ? 0.5 : time;
  // console.log(speed);

  var translateX = transform.css(list, "translateX");
  var targetX = translateX + speed * 200;
  translateX = targetX;

  var bsr = "";
  if (translateX > 0) {
    translateX = 0;
    bsr = "cubic-bezier(.28,.57,.23,1.43)";
  } else if (translateX < minX) {
    translateX = minX;
    bsr = "cubic-bezier(.28,.57,.23,1.43)";
  }
  list.style.transition = time + "s " + bsr + " transform";
  transform.css(list, "translateX", translateX);
}

changeColor()
function changeColor() {
  var nav = document.querySelector("#wrap .content .nav");
  var list = document.querySelector("#wrap .content .nav >.list");
  var liNodes = document.querySelectorAll("#wrap > .content .nav >.list li");

  nav.addEventListener("touchstart", function () {

    nav.isMoved = false;
  })
  nav.addEventListener("touchmove", function () {

    nav.isMoved = true;
  })
  list.addEventListener("touchend", function (ev) {
    ev = ev || event;
    if (!nav.isMoved) {
      for (var i = 0; i < liNodes.length; i++) {
        tools.removeClass(liNodes[i], "active");

      }
      if (ev.target.nodeName.toUpperCase() === "LI") {
        tools.addClass(ev.target, "active");
      } else if (ev.target.nodeName.toUpperCase() === "A") {
        tools.addClass(ev.target.parentNode, "active");
      }
    }
  })
}

},{"../common/tools.js":7,"../common/transform.js":8}],4:[function(require,module,exports){
var transform = require("../common/transform.js");
function course(arr) {
    var wrapC = document.querySelector(".course-wrap");
    if(!wrapC){
        return;
    }

    //����html�ṹ
    var wrapC = document.querySelector(".course-wrap");
    var ulNode = document.createElement("ul");

    transform.css(ulNode,"translateZ",0);
    var liNodes = document.querySelectorAll(".course-wrap > .list > li")
    var wrapP = document.querySelector(".course-wrap > .course-point");



    //�޷� && �Զ��ֲ�
    var pointsLength = arr.length;
    var needWF = wrapC.getAttribute("needWF")
    var needAuto = wrapC.getAttribute("needAuto");
    needAuto= needAuto==null?false:true;
    needWF  = needWF==null?false:true;
    if(needWF){
        arr = arr.concat(arr);
        
    }
    ulNode.size =arr.length;

    //����ͼƬ�б�
    ulNode.classList.add("list");
    for(var i=0;i<arr.length;i++){
        ulNode.innerHTML+="<li><img src= "+(arr[i])+"></li>";
    }
    wrapC.appendChild(ulNode);

    //��̬����ʽ
    var styleNode = document.createElement("style");
    styleNode.innerHTML=".course-wrap > .list{width: "+arr.length+"00%}";
    styleNode.innerHTML+=".course-wrap > .list > li{width: "+(100/arr.length)+"%;}";
    document.head.appendChild(styleNode);


    //�����߼�
    var eleStartX = 0; // Ԫ��һ��ʼ��λ��
    var eleStartY = 0; // Ԫ��һ��ʼ��λ��
    var startX = 0;    // ��ָһ��ʼ��λ��
    var startY = 0;    // ��ָһ��ʼ��λ��
    var index = 0;    //  ��ָ̧��ʱul��λ��

    //������
    var isFirst = true;
    var isX = true;  // true:x   false:y

    wrapC.addEventListener("touchstart",function (ev) {
        //�嶨ʱ��
        clearInterval(ulNode.timer);

        //�����
        ulNode.style.transition="";
        ev = ev || event;
        var touchC = ev.changedTouches[0];


        /*�޷��߼�
            �����һ���һ��ʱ �����ڶ���ĵ�һ��
            ����ڶ������һ��ʱ ������һ������һ��*/
        if(needWF){
            var whichPic = transform.css(ulNode,"translateX") / document.documentElement.clientWidth;
            if(whichPic === 0){
                whichPic = -pointsLength;
            }else if (whichPic === 1-arr.length){
                whichPic = 1-pointsLength;
            }
            transform.css(ulNode,"translateX",whichPic*document.documentElement.clientWidth)
        }

        //Ԫ��һ��ʼλ�õĻ�ȡһ��Ҫ���޷�λ�ó�ʼ�����
        eleStartX =transform.css(ulNode,"translateX");
        eleStartY =transform.css(ulNode,"translateY");
        startX = touchC.clientX;
        startY = touchC.clientY;

        isX = true;
        isFirst = true;
    })
    wrapC.addEventListener("touchmove",function (ev) {

        //���Ź�   ���Ķ��ǵڶ���֮��Ķ���
        if(!isX){
            //ҧס
            return;
        }


        ev = ev || event;
        var touchC = ev.changedTouches[0];
        var nowX = touchC.clientX;
        var nowY = touchC.clientY;

        var disX = nowX - startX;
        var disY = nowY - startY;

        /*������:
            ���ֲ�ͼ�� ����û��״λ����ķ�����x��  ���ֲ�ͼ��������������������
            ���ֲ�ͼ�� ����û��״λ����ķ�����y��  ������ҳ���������������������*/


        if(isFirst){
            isFirst = false;
            if(Math.abs(disY) > Math.abs(disX)){
                //��y���ϻ�
                isX=false;
                    return; // �״���Y���ϻ�  �״η�����
            }
        }

        transform.css(ulNode,"translateX",eleStartX + disX);
    })
    wrapC.addEventListener("touchend",function () {
        ulNode.style.transition=".5s transform";
        //index ����ul��λ��
        index = Math.round(transform.css(ulNode,"translateX") / document.documentElement.clientWidth);

        //���Ƴ���
        if(index>0){
            index=0;
        }else if(index < 1-arr.length){
            index =  1-arr.length;
        }

        //СԲ��
        smallPointMove(index);

        //index ����ul��λ��
        transform.css(ulNode,"translateX",index*document.documentElement.clientWidth);

        //���¿����Զ��ֲ�
        if(needAuto&&needWF){
            autoMove(ulNode,index);
        }
    })


    //СԲ��
    smallPoint(pointsLength);

    //�Զ��ֲ�
    if(needAuto&&needWF){
        autoMove(ulNode,index);
    }
}

function autoMove(ulNode,autoFlag) {
    //var timer = 0;
    //var autoFlag = 0; // ����ul��λ��

    move();
    function move() {
        clearInterval(ulNode.timer);
        ulNode.timer = setInterval(function () {
            autoFlag--;
            ulNode.style.transition=".7s transform linear";
            transform.css(ulNode,"translateX",autoFlag*document.documentElement.clientWidth);

            //СԲ��
            smallPointMove(autoFlag)
        },2000)
    }

    ulNode.addEventListener("transitionend",function () {
        if(autoFlag <= 1-ulNode.size){
            autoFlag=-((ulNode.size)/2-1);
            ulNode.style.transition="";
            transform.css(ulNode,"translateX",autoFlag*document.documentElement.clientWidth);
        }
    })
}
function smallPoint(pointsLength){
    var wrapP = document.querySelector(".course-wrap > .course-point");
    wrapP.pointsLength =pointsLength;
    if(wrapP){
        for(var i=0;i<pointsLength;i++){
            if(i==0){
                wrapP.innerHTML+="<span class='active'></span>";
            }else {
                wrapP.innerHTML+="<span></span>";
            }
        }
    }
}
function smallPointMove(index){
    var wrapP = document.querySelector(".course-wrap > .course-point");
    if(wrapP){
        var points = wrapP.querySelectorAll("span");
        for(var i=0;i<points.length;i++){
            points[i].classList.remove("active");
        }
        points[-index%wrapP.pointsLength].classList.add("active")
    }
}

module.exports={
    course:course,
}


},{"../common/transform.js":8}],5:[function(require,module,exports){
var transform = require("../common/transform.js");
var wrap = document.querySelector("#wrap .content .tap-wrap");
var contentNodes = document.querySelectorAll(
  "#wrap .content .tap-wrap .tap-content"
);
var loadings = document.querySelectorAll("#wrap .content .tap-content > ul.loading")

// 给每个loading添加高度
for (var i = 0; i < loadings.length; i++) {
  loadings[i].style.height = contentNodes[0].offsetHeight + "px";
}

for (var i = 0; i < contentNodes.length; i++) {
  contentNodes[i].index = 0;
  move(contentNodes[i]);
}

// 基本的滑屏逻辑 (防抖动)
function move(contentNode) {
  transform.css(contentNode, "translateX", -wrap.clientWidth);

  var elePoint = { x: 0, y: 0 };
  var startPoint = { x: 0, y: 0 };
  var dis = { x: 0, y: 0 };

  var isX = true;
  var isFirst = true;

  contentNode.addEventListener("touchstart", function (ev) {
    ev = ev || event;
    if (contentNode.isJump) {
      return;
    }
    contentNode.style.transition = "";
    var touchC = ev.changedTouches[0];
    elePoint.x = transform.css(contentNode, "translateX");
    elePoint.y = transform.css(contentNode, "translateY");
    startPoint.x = touchC.clientX;
    startPoint.y = touchC.clientY;
    isX = true;
    isFirst = true;
  });
  contentNode.addEventListener("touchmove", function (ev) {
    ev = ev || event;
    if (contentNode.isJump) {
      return;
    }
    if (!isX) {
      return;
    }

    var touchC = ev.changedTouches[0];
    var nowPoint = { x: 0, y: 0 };
    nowPoint.x = touchC.clientX;
    nowPoint.y = touchC.clientY;
    dis.x = nowPoint.x - startPoint.x;
    dis.y = nowPoint.y - startPoint.y;
    translateX = elePoint.x + dis.x;

    if (isFirst) {
      isFirst = false;
      if (Math.abs(dis.y) > Math.abs(dis.x)) {
        isX = false;
        return;
      }
    }

    transform.css(contentNode, "translateX", translateX);
    jump(dis.x, contentNode);
  });

  contentNode.addEventListener("touchend", function (ev) {
    ev = ev || event;
    if (contentNode.isJump) {
      return;
    }
    if (Math.abs(dis.x) <= wrap.clientWidth / 2) {
      contentNode.style.transition = "1s transform";
      transform.css(contentNode, "translateX", -wrap.clientWidth);
    }
  });
}

// 1/2 跳转(手指没有抬起)
function jump(disX, contentNode) {

  if (Math.abs(disX) > wrap.clientWidth / 2) {
    // console.log("jump")
    contentNode.isJump = true;
    contentNode.style.transition = "1s transform";
    var translateX = disX > 0 ? 0 : -2 * wrap.clientWidth;

    transform.css(contentNode, "translateX", translateX);

    var loading = contentNode.querySelectorAll(".loading");
    var smallG = contentNode.parentNode.querySelector(" .tap-nav .smallG");
    var aNodes = contentNode.parentNode.querySelectorAll(" .tap-nav a");
    contentNode.addEventListener("transitionend", end)

    // 1/2完成之后loading涂才显示出来
    function end() {
      contentNode.removeEventListener("transitionend", end)
      for (var i = 0; i < loading.length; i++) {
        loading[i].style.opacity = 1
      }

      disX > 0 ? contentNode.index-- : contentNode.index++;

      if (contentNode.index < 0) {
        contentNode.index = aNodes.length - 1;
      } else if (contentNode.index > aNodes.length - 1) {
        contentNode.index = 0;
      }

      smallG.style.width = aNodes[contentNode.index].offsetWidth + "px";
      transform.css(smallG, "translateX", aNodes[contentNode.index].offsetLeft);

    //   for(var i=0;i<aNodes.length;i++){
    //       aNodes[i].addEventListener("touchend",function(ev){
    //         transform.css(smallG, "translateX", aNodes[i].offsetLeft);
    //  })
    //   }
      

      setTimeout(function () {
        var arr = [
          ["./img/a.jpg", "./img/b.jpg", "./img/c.jpg", "./img/d.jpg", "./img/e.jpg", "./img/f.jpg"],
          ["./img/2/a2.jpg", "./img/2/b2.png", "./img/2/c2.png", "./img/2/d2.png", "./img/2/e2.jpg", "./img/2/f2.jpg"],
          ["./img/a.jpg", "./img/b.jpg", "./img/c.jpg", "./img/d.jpg", "./img/e.jpg", "./img/f.jpg"],
          ["./img/2/a2.jpg", "./img/2/b2.png", "./img/2/c2.png", "./img/2/d2.png", "./img/2/e2.jpg", "./img/2/f2.jpg"],
          ["./img/a.jpg", "./img/b.jpg", "./img/c.jpg", "./img/d.jpg", "./img/e.jpg", "./img/f.jpg"],
          ["./img/2/a2.jpg", "./img/2/b2.png", "./img/2/c2.png", "./img/2/d2.png", "./img/2/e2.jpg", "./img/2/f2.jpg"],
        
        ];
        var imgs = contentNode.querySelectorAll("ul.list li .top a img ")
        for (var i = 0; i < imgs.length; i++) {
          imgs[i].src = arr[contentNode.index][i];
        }
        contentNode.style.transition = "";
        transform.css(contentNode, "translateX", -wrap.clientWidth);
        contentNode.isJump = false;
      }, 1000)

    }
  }
}


},{"../common/transform.js":8}],6:[function(require,module,exports){
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


},{"../common/transform.js":8}],7:[function(require,module,exports){
function trim(str) {
    // var reg = /^\s+|\s+$/g;
    var reg = /^\s*|\s*$/g;
    str = str.replace(reg,"")
    return str;
}
function addClass(node,className) {
    if(node){
        if(node.className){
            //代表className不为空
            var reg = new RegExp("\\s+"+className+"\\s+","i");
            var classStr = " "+node.className+" ";
            if(reg.test(classStr)){
                //包含目标class
            }else {
                //不包含目标class
                node.className += " "+className;
            }
        }else {
            // 代表className为空
            node.className=className;
        }
    }else {
        throw new Error("当前节点不存在")
    }
}
function removeClass(node,className) {
    if(node){
        if(node.className){
            var classStr = " "+node.className+" ";
            var reg = new RegExp("\\s+"+(className)+"\\s+","ig");
            node.className =  trim(classStr.replace(reg," "))
            if(!node.className){
                node.removeAttribute("class")
            }
        }
    }else {
        throw new Error("当前节点不存在");
    }
}

module.exports={
    addClass:addClass,
    removeClass:removeClass,
    trim:trim,
}


},{}],8:[function(require,module,exports){
function css(node, type, val) {
    if (arguments.length >= 3) {
        //设置操作
        var text = "";
        if (!node.transform) {
            node.transform = {}
        }
        node.transform[type] = val;

        for (var item in node.transform) {
            switch (item) {
                case "translateX":
                case "translateY":
                case "translateZ":
                    text += item + "(" + node.transform[item] + "px)";
                    break;

                case "rotateX":
                case "rotateY":
                case "rotateZ":
                case "rotate":
                    text += item + "(" + node.transform[item] + "deg)";
                    break;

                case "scale":
                    text += item + "(" + node.transform[item] + ")";
                    break;
            }
        }

        node.style.transform = text;
    } else if (arguments.length === 2) {
        //读取操作
        val = node.transform ? node.transform[type] : undefined;

        if (val === undefined) {
            val = 0;
            if (type === "scale") {
                val = 1;
            }
        }
        return val;
    } else {
        throw new Error("该函数至少需要2个参数")
    }
}
module.exports = {
    css: css,
}


},{}],9:[function(require,module,exports){
require("./buss/base.js");
require("./buss/head.js");
require("./buss/nav.js");
var slide = require("./buss/slide.js");
var vertical = require("./buss/vertical.js");
require("./buss/tap.js");
var transform = require("./common/transform.js");

window.onload = function () {
    var arr = [
        "./img/1.jpg",
        "./img/2.jpg",
        "./img/3.jpg",
        "./img/4.jpg",
        "./img/5.jpg"
    ];
    slide.course(arr);
    var scrollBar = document.querySelector("#wrap .bar");
    var content = document.querySelector("#wrap .content");
    var list = document.querySelector("#wrap .content > div");

    var scale = 0;
    setTimeout(function () {
        scale = content.clientHeight / list.offsetHeight;
        scrollBar.style.height = scale * document.documentElement.clientHeight + "px";
    }, 200)

    var callBack = {
        start: function () {
            scrollBar.style.opacity = 1;
            console.log("start")
        },
        move: function () {
            scrollBar.style.opacity = 1;

            var scale = transform.css(this, "translateY") / (content.clientHeight - this.offsetHeight);

            var translateY = scale * (document.documentElement.clientHeight - scrollBar.offsetHeight);
            transform.css(scrollBar, "translateY", translateY);
            console.log("move")
        },
        end: function () {
            scrollBar.style.opacity = 0;
            console.log("end")
        },
        over: function () {
            scrollBar.style.opacity = 0;
            console.log("over")
        },
    }

    
    vertical.move(callBack);
}

},{"./buss/base.js":1,"./buss/head.js":2,"./buss/nav.js":3,"./buss/slide.js":4,"./buss/tap.js":5,"./buss/vertical.js":6,"./common/transform.js":8}]},{},[9]);
