var wrapNode = document.querySelector("#wrap");

wrapNode.addEventListener("touchstart", function (ev) {
ev = ev || event;
ev.preventDefault();
})

var styleNode = document.createElement("style");
var w = document.documentElement.clientWidth / 16;
styleNode.innerHTML = "html{font-size:" + w + "px!important}"
document.head.appendChild(styleNode);




