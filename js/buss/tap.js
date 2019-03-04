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

