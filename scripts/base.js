$(function() {
    var platform = "pc"; //设置默认平台
    var dataNum = 8; //设置句子模块默认获取数据数量
    var width = $(window).width(); //获取屏幕宽度
    var height = $(window).height(); //获取屏幕高度
    if (width < 1080 && width > 810) {
        dataNum = 6;
        if (height < 825) {
            dataNum = 3;
            $("#pages").css('height', '390px');
        }
    } else if (width < 810 && width > 640) {
        dataNum = 4;
        if (height < 825) {
            dataNum = 2;
            $("#pages").css('height', '390px');
        }
    }

    //设置640以下屏幕内容高度
    if ($(window).width() < 640) {
        $('.content').css('height', $(window).height() - 41 + 'px');
        $("#clock").css("display", "none");
        //$(".check").css('top', '35%');
        platform = 'mobile';
    } else {
        $('.content').css('height', $(window).height());
    }

    var index = 0; //设置当前页索引
    var first = true; //设置句子模块第一次加载 

    //导航点击翻页
    var navs = $('#nav li');
    var navsCount = navs.length;
    for (var i = 0; i < navsCount; i++) {
        $(navs[i]).click(function(e) {
            for (var j = navsCount - 1; j >= 0; j--) {
                $(navs[j]).removeClass('highlight');
            }
            $(this).addClass("highlight");
            index = $("#nav li").index(this);
            if (platform == "pc") {
                $("#wrapper").css("transform", "translateY(-" + 100 * index + "%)");
            } else {
                $("#wrapper").css('transform', "translateX(-" + 25 * index + "%)");
            }
            //去掉花花页面验证码焦点
            if (index != 3) {
                $("#form input:eq(0)").blur();
            }
        });
    }


    //导航滚轮翻页
    var couldRun = true;

    function changeNavState(direction) {
        if (couldRun) {
            couldRun = false;
            for (var k = 0; k < navsCount; k++) {
                if ($(navs[k]).hasClass("highlight")) {
                    $(navs[k]).removeClass('highlight');
                    break;
                }
            }

            if (direction < 0) {
                k = (k + 1) > 3 ? 3 : k + 1;
            } else {
                k = (k - 1) < 0 ? 0 : k - 1;
            }
            index = k;
            $(navs[k]).addClass("highlight");
            if (platform == 'pc') {
                $("#wrapper").css('transform', 'translateY(-' + 100 * k + '%)');
            } else {
                $("#wrapper").css("transform", "translateX(-" + 25 * k + "%)");
            }
            setTimeout(function() {
                couldRun = true;
            }, 500);
        }
    }

    window.onmousewheel = function(event) {
            changeNavState(event.wheelDelta);
            //去掉花花页面验证码焦点
            if (index != 3) {
                $("#form input:eq(0)").blur();
            }
        }
        //兼容火狐滚轮事件
    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        document.body.addEventListener("DOMMouseScroll", function(event) {
            changeNavState(-event.detail);
            //去掉花花页面验证码焦点
            if (index != 3) {
                $("#form input:eq(0)").blur();
            }
        }, false);
    }

    //移动端触摸滑动
    if ($(window).width() < 640) {
        var startX = 0,
            startY = 0,
            startY1 = 0,
            x = 0,
            y = 0,
            y1 = 0,
            aboveY = 0,
            isScorlling = 0,
            startTime = 0,
            page = 0,
            topFlag = true,
            bottomFlag = true,
            btip = false,
            totalPage = 0;
        var pagesHeight = 0;
        var wrapHeight = $("#stncon").height();
        var inner = document.getElementById("pages");

        document.addEventListener('touchstart', touchStart, false);
        document.addEventListener('touchmove', touchMove, false);
        document.addEventListener('touchend', touchEnd, false);
        document.getElementById('pages').addEventListener('touchstart', touchStart1, false);
        document.getElementById('pages').addEventListener('touchmove', touchMove1, false);
        document.getElementById('pages').addEventListener('touchend', touchEnd1, false);
    }
    //触摸开始
    function touchStart(e) {
        var touch = e.touches[0];
        startX = touch.pageX;
        startY = touch.pageY;
        startTime = new Date();
    }

    function touchStart1(e) {
        var touch = e.touches[0];
        startY1 = touch.pageY;
    }
    //触摸过程
    function touchMove(e) {
        e.preventDefault();
        var touch = e.touches[0];
        x = touch.pageX - startX;
        y = touch.pageY - startY;
        isScorlling = Math.abs(x) < Math.abs(y) ? 1 : 0;
    }

    function touchMove1(e) {
        e.preventDefault();
        var touch = e.touches[0];
        y1 = touch.pageY - startY1;
        var calcY = aboveY + y1;
        if (calcY > 5 && topFlag == true) {
            topFlag = false;
            $("#stncon").prepend('<p id="movetip" style="margin-top:15px;">到顶了</p>');
        }
        if ((calcY < -($('#pages').height() - wrapHeight)) && bottomFlag == true && btip == true) {
            bottomFlag = false;
            $("#stncon").append('<p id="movetip" style="position:absolute; bottom:15px; left:0;">我是有底限的</p>');
        }
        inner.style.top = calcY + 'px';
    }
    //触摸结束
    function touchEnd(e) {
        //滑动切换页面
        var duration = new Date() - startTime;
        if (isScorlling == 0) {
            if (duration > 100) {
                if (x > 0) {
                    index--;
                    if (index < 0) {
                        index = 0;
                    }
                } else if (x < 0) {
                    index++;
                    if (index > 3) {
                        index = 3;
                    }
                }
                for (var n = 0; n < navsCount; n++) {
                    if ($(navs[n]).hasClass("highlight")) {
                        $(navs[n]).removeClass('highlight');
                        break;
                    }
                }
                $(navs[index]).addClass("highlight");
                $("#wrapper").css('transform', "translateX(-" + 25 * index + "%)");
            }
        }
    }

    function touchEnd1(e) {
        var pagesHeight = $("#pages").height();
        aboveY = parseInt(inner.style.top);
        var distance = pagesHeight - wrapHeight;
        $("#movetip").remove();
        //阻止页面上下超过边界
        if (y1 > 0 && aboveY > 0) {
            topFlag = true;
            $("#pages").animate({
                top: 0
            }, 200);
            aboveY = 0;
        }
        if (y1 < 0 && (aboveY < -distance)) {
            $("#pages").animate({
                top: -distance - 5
            }, 200);
            aboveY = -distance;
            //滑动加载句子内容
            $.ajax({
                url: 'index.php/Index/sentence',
                type:'GET',
                data:{'current_page':page,'step':'next','size':dataNum,'type':1},
                success:function(data){
                    page++;
                    if(page < data['count']){
                        $("#sentence .pages").append(data['content']);
                    }
                    if(data['page'] == data['count']){
                        btip = true;
                        bootomFlag = true;
                    }
                }
            });
        }
    }

    //花花页面
    var checkStr = '';
    var charCount = 0;
    var patt = "0123456789";
    $('#form').click(function() {
        $("#form i").addClass("show").css("left", 15 + checkStr.length * 51 + "px");
        $("#form input:eq(0)").focus();
    });

    var codeTotal = 0; //发送次数,防止恶意验证
    $("#form input:eq(0)").keydown(function(event) {
        //兼容QQ自带浏览器返回unidentified
        if ((!event.key || event.key.toLowerCase() == 'unidentified') && event.which) {
            var key = String.fromCharCode(event.which);
        } else if (event.key) {
            var key = event.key;
        } else {
            var key = String.fromCharCode(event.keyCode);
        }
        if (patt.indexOf(key) > -1) {
            if (checkStr.length < 3) {
                $("#form span:eq(" + checkStr.length + ")").text(key);
                checkStr += key.toString();
                $("#form i").addClass("show").css("left", 15 + checkStr.length * 51 + "px");
                if (checkStr.length == 3 && codeTotal < 3) {
                    codeTotal++;
                    if(checkStr==666){
                        window.location.href="https://www.w4ctech.com/book.html"
                    }else if(checkStr != 666){
                        $('#info').text('输入错误，请不要蒙混过关哟 *_* ');
                        var residue = 3 - codeTotal;
                        if (residue <= 0) {
                            var huaTip = '哈哈，密码是666！';
                        } else {
                            var huaTip = "还剩 " + residue + " 次机会";
                        }
                        $('#tip').text(huaTip);
                    }
                } else if (codeTotal >= 2) {
                    $('#info').text('正确的密码是666');
                    $('#tip').text('请刷新页面后再来试试吧');
                }
            } else {
                return false;
            }
        } else if (event.which == 8) {
            checkStr = checkStr.substr(0, checkStr.length - 1);
            $("#form span:eq(" + checkStr.length + ")").text("");
            $("#form i").addClass("show").css("left", 15 + checkStr.length * 51 + "px");
            $("#tip").text('');
            return false;
        }
    });

    //摇摆动画暂停和恢复线的摇摆
    $("#flower").mouseover(function() {
        $("#paused").css("animation-play-state", "paused");
    });
    $("#flower").mouseout(function() {
        $("#paused").css("animation-play-state", "running");
    });



    //句子模块首次载入内容
    function getStnContent(page, btn, num) {
        $.get('index.php/Index/sentence', {
            'current_page': page,
            'step': btn,
            "size": num,
            'type': 1
        }, function(data) {alert(data);
            var dataArray = data.split("|||||");
            $('#sentence .pages').html(dataArray[0]);
            $("#countpage").text(dataArray[1] + "/" + dataArray[2]).attr('data-page', dataArray[1]);
        });
    }

    //getStnContent(0, 'home', dataNum);
    //句子导航设置
    $("#pagenav .btn").click(function(event) {
        var page = $('#countpage').attr('data-page') - 1;
        var btn = $(this).attr('data-btn');
        $.ajax({
            type:"GET",
            url:'index.php/Index/sentence',
            data:{'current_page':page,'step':btn,'size':dataNum,'type':1},
            success:function(data){
                $('#sentence .pages').html(data['content']);
                $("#countpage").text(data['page'] + "/" + data['count']).attr('data-page', data['page']);
            }
        });
    });



    //下雪
    if (width <= 640) {
        var pos = [];
        var snows = document.getElementById('snow').getElementsByTagName('span');
        var snowCount = snows.length;
        var timer = null;
        for (var i = 0; i < snowCount; i++) {
            var ipos = {
                'y': -(Math.floor(Math.random() * height) + 30),
                'x': (i + 1) * width / (snowCount + 1)
            };
            pos.push(ipos);
            snows[i].style.top = pos[i].y + 'px';
            snows[i].style.left = pos[i].x + 'px';
        }

        function changePos() {
            clearTimeout(timer);
            for (var j = 0; j < snowCount; j++) {
                pos[j].y += Math.floor(Math.random() * 5) + 1;
                if (pos[j].y > height + 30) {
                    pos[j].y = -(Math.floor(Math.random() * 65) + 30);
                }

                //pos[j].x = pos[j].x + Math.sin(5 * pos[j].y);
                renderPos(j, pos[j].x, pos[j].y);
            }
            timer = setTimeout(changePos, 100);
        }

        function renderPos(index, x, y) {
            snows[index].style.top = y + 'px';
            //snows[index].style.left = x + 'px';
        }

        changePos();
    }



    //canvas时钟
    var c = document.getElementById('clock');
    var cxt = c.getContext("2d");
    c.width = $(window).width();
    c.height = $(window).height() - $(window).height() * 0.08 - 114;
    var r = Math.round(c.width * 18 / 25 / 108) - 1;
    var marginX = Math.round(c.width * 7 / 50);
    var marginY = Math.round(c.height * 17 / 100);
    var padding = 1;
    var rp = r + padding;
    //绘制
    function draw(index, x, y) {
        for (var i = 0; i < digit[index].length; i++) {
            for (var j = 0; j < digit[index][i].length; j++) {
                if (digit[index][i][j] == 1) {
                    cxt.fillStyle = "#83c75d";
                    cxt.beginPath();
                    cxt.arc(x + (2 * j + 1) * rp, y + (2 * i + 1) * rp, r, 0, 2 * Math.PI, true);
                    cxt.closePath();
                    cxt.fill();
                }
            }
        }
    }
    var prev = new Date();
    var prevSec = prev.getSeconds();
    var prevMin = prev.getMinutes();
    var prevHour = prev.getHours();
    //更新时间
    function update() {
        cxt.clearRect(0, 0, c.width, c.height);
        var now = new Date();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        draw(parseInt(hour / 10), marginX, marginY);
        draw(hour % 10, 15 * rp + marginX, marginY);
        draw(10, 30 * rp + marginX, marginY);
        draw(parseInt(minute / 10), 39 * rp + marginX, marginY);
        draw(minute % 10, 54 * rp + marginX, marginY);
        draw(10, 69 * rp + marginX, marginY);
        draw(parseInt(second / 10), 78 * rp + marginX, marginY);
        draw(second % 10, 93 * rp + marginX, marginY);
        if (prevSec != second) {
            if (parseInt(hour / 10) != parseInt(prevHour / 10)) {
                addBall(parseInt(prevHour / 10), 0);
            }
            if (hour % 10 != prevHour % 10) {
                addBall(prevHour % 10, 15 * rp);
            }
            if (parseInt(minute / 10) != parseInt(prevMin / 10)) {
                addBall(parseInt(prevMin / 10), 39 * rp);
            }
            if (minute % 10 != prevMin % 10) {
                addBall(prevMin % 10, 54 * rp);
            }
            if (parseInt(second / 10) != parseInt(prevSec / 10)) {
                addBall(parseInt(prevSec / 10), 78 * rp);
            }
            if (second % 10 != prevSec % 10) {
                addBall(prevSec % 10, 93 * rp);
            }
            prevSec = second;
            prevMin = minute;
            prevHour = hour;
        }
        updateBall();
        for (var i = 0; i < balls.length; i++) {
            cxt.fillStyle = balls[i].color;
            cxt.beginPath();
            cxt.arc(balls[i].x, balls[i].y, r, 0, 2 * Math.PI);
            cxt.closePath();
            cxt.fill();
        }
    }
    //添加小球
    var balls = [];
    var colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"];

    function addBall(index, x) {
        for (var i = 0; i < digit[index].length; i++) {
            for (var j = 0; j < digit[index][i].length; j++) {
                if (digit[index][i][j] == 1) {
                    var aBall = {
                        x: x + marginX + rp * (2 * j + 1),
                        y: marginY + rp * (2 * i + 1),
                        vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
                        vy: -10,
                        g: 0.5 + Math.random(),
                        color: colors[Math.floor(Math.random() * colors.length)],
                    }
                    balls.push(aBall);
                }
            }
        }
    }
    //更新存储小球的数组
    function updateBall() {
        for (var i = 0; i < balls.length; i++) {
            balls[i].x += balls[i].vx;
            balls[i].y += balls[i].vy;
            balls[i].vy += balls[i].g;
            if (balls[i].y >= c.height - r) {
                balls[i].y = c.height - r;
                balls[i].vy = -0.72 * balls[i].vy;
            }
        }
        var count = 0;
        for (var i = 0; i < balls.length; i++) {
            if (balls[i].x > 0 && balls[i].x < c.width) {
                balls[count++] = balls[i];
            }
        }
        while (balls.length > Math.min(360, count)) {
            balls.pop();
        }
    }
    var timer = setInterval(update, 50);

});