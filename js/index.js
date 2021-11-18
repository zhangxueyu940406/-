(function () {
    // 点击跳转事件函数
    function incident(id, url) {
        document.querySelector(id).onclick = function () {
            window.location.href = url;
        };
    }
    // 执行跳转
    incident('#journalismUrl','./journalism.html');
    incident('#aboutUrl','./about.html');
    //拿到ajax数据处理
    function dataDom(rest) { // 成功拿到结果放到这个函数 data就是拿到的结果
        let journalismId = document.querySelector('#journalismId');
        let dataStr = '';
        rest.data.map(item => {
            let str = `<div class="col-md-3 col-sm-3 col-12">
                <div class="journalism">
                    <div class="journalismImg"><img src=${item.img} alt=""></div>
                    <div class="journalismText">${item.title}</div>
                </div>
            </div>`
            dataStr = dataStr + str;
        });
        journalismId.innerHTML = dataStr;
    }
    // ajax基础函数
    function ajaxData(dataDom){
        $.ajax({
            type: "GET",// get或者post
            url: "https://www.fastmock.site/mock/d8c33ca26a546a3c9be78ee13f714990/t1-0fficial/api/news",// 请求的url地址
            data: {
                'page': 1,
                'page_size': 4
            },//请求的参数
            // dataType:"json",//json写了jq会帮我们转换成数组或者对象 他已经用JSON.parse弄好了 
            timeout: 3000,//3秒后提示错误
            beforeSend: function () {
                // 发送之前就会进入这个函数
                // return false 这个ajax就停止了不会发 如果没有return false 就会继续
            },
            success: dataDom,
            error: function () {//失败的函数
            },
            complete: function () {//不管成功还是失败 都会进这个函数
            }
        });
    }
    // 初始化
    ajaxData(dataDom);
})()