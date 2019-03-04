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
