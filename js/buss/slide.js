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

