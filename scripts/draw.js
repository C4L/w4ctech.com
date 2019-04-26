$(function(){

    var index = 0; //当前页索引
    var pages = document.getElementsByClassName('page'); //所有页面元素
    var count = pages.length; //总页数
    var x = 0; //鼠标坐标

    //初始化
    for(var i=0; i<count; i++){
        $(pages[i]).addClass('n'+i).css('z-index',count-i);
    }
    $('#pagination').text('1/'+count);

    //打开相册
    $(".album").mouseover(function(){
        $('.tip').hide();
        $(".cover").addClass('active').css('z-index',0);
    });

    //下一页
    $(".next").click(function(){
        // $('.n'+index).addClass('truning').css('z-index',index+1);
        // index++;
        // if(index>count){
        // 	index = count;
        // }
        // $('#pagination').text(index+1+'/'+count);
        next();
    });

    //上一页
    $(".prev").click(function(){
        // index--;
        // if(index<0){
        // 	index = 0;
        // }
        // $('.n'+index).removeClass('truning').css('z-index',count-index);
        // $('#pagination').text(index+1+'/'+count);
        prev();
    });

    //关闭相册
    $(".wrap").mouseleave(function(){
        $(".page").removeClass('truning');
        $(".cover").removeClass('active').css('z-index',999);
        index = 0;
        for(var i=0; i<count; i++){
            $(pages[i]).css('z-index',count-i);
        }
        $('#pagination').text('1/'+count);
    });

    //滑动翻页
    $('#snow').mousedown(function(e){
        x = e.clientX;
    });

    $('#snow').mouseup(function(e){
        x = e.clientX - x;
        if(x<-50){
            next();
        }else if(x>50){
            prev();
        }
    });


    //功能函数
    function next(){
        $('.n'+index).addClass('truning').css('z-index',index+1);
        index++;
        if(index>count){
            index = count;
        }
        $('#pagination').text(index+1+'/'+count);
    }

    function prev(){
        index--;
        if(index<0){
            index = 0;
        }
        $('.n'+index).removeClass('truning').css('z-index',count-index);
        $('#pagination').text(index+1+'/'+count);
    }


    //下雪
    var width = 380;
    var height = 600;
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

});