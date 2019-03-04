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

