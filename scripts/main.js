// 一言
function show_hitokoto(){
    window.setTimeout("show_hitokoto()", 5000);
    // fetch('https://wincer-hito.herokuapp.com/api/json/')
    //     .then(function (res){
    //         console.log(res)
    //         return res.json();
    //     })
    //     .then(function (data) {
    //         // var msg = document.getElementById('w4ctech-text');
    //         // msg.innerText = data.msg;
    //         // var  author = document.getElementById('author');
    //         // author.innerText = data.author;
    //     })
    //     .catch(function (err) {
    //         console.error(err);
    //     })
    $.ajax({
        url: "https://api.itswincer.com/hitokoto/v2/",
        type: 'GET',
        dataType: 'jsonp',
        success: function (result) {
            var msg = document.getElementById('w4ctech-text');
            msg.innerText = result.hitokoto;
            var  author = document.getElementById('author');
            author.innerText = result.source;
        }
    });
}
// 时间
function show_date_time(){
    window.setTimeout("show_date_time()", 1000);
    var now = new Date();
    var nowYear=now.getFullYear();
    var nowMonth=now.getMonth()+1;
    var nowDate=now.getDate();

    var weekday=new Array(7)
    weekday[0]="天"
    weekday[1]="一"
    weekday[2]="二"
    weekday[3]="三"
    weekday[4]="四"
    weekday[5]="五"
    weekday[6]="六"
    var nowWeek = weekday[now.getDay()];
    w4ctech_time.innerHTML=nowYear+"年"+nowMonth+"月"+nowDate+"日"+"   "+"星期"+nowWeek;
}
show_date_time();