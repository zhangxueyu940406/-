(function () {
    // 点击跳转事件函数
    function incident(id, url) {
        document.querySelector(id).onclick = function () {
            window.location.href = url;
        };
    }
    // 执行跳转
    incident('#indexUrl', './index.html');
    incident('#aboutUrl', './about.html');
    // 获取url参数
    var query = window.location.search.substring(1);
    var vars = query.split("=");
    var code = vars[1];
    // ajax获取数据处理函数
    function ajaxData(rest) { // 成功拿到结果放到这个函数 data就是拿到的结果
        let headlineTite = document.querySelector('#headlineTite');
        let main = document.querySelector('#main');

        headlineTite.innerHTML = `<span>${rest.data.title}</span>`
        main.innerHTML = rest.data.text;
    }
    $.ajax({
        type: "GET",// get或者post
        url: `https://www.fastmock.site/mock/d8c33ca26a546a3c9be78ee13f714990/t1-0fficial/api/news/${code}`,// 请求的url地址
        // dataType:"json",//json写了jq会帮我们转换成数组或者对象 他已经用JSON.parse弄好了 
        timeout: 3000,//3秒后提示错误
        beforeSend: function () {
            // 发送之前就会进入这个函数
            // return false 这个ajax就停止了不会发 如果没有return false 就会继续
        },
        success: ajaxData,
        error: function () {//失败的函数
        },
        complete: function () {//不管成功还是失败 都会进这个函数
        }
    });
})()