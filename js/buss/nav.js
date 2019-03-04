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
