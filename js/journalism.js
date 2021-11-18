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

    var page = 1;
    var page_size = 10;
    var total = null;
    // 初始化
    ajaxData(page, dataDom);
    // 分页器
    function paging(total) {
        layui.use('laypage', function () {
            var laypage = layui.laypage;

            //执行一个laypage实例
            laypage.render({
                elem: 'test',
                count: total, //数据总数，从服务端得到
                jump: function (obj, first) {
                    //obj包含了当前分页的所有参数，比如：
                    //   console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                    //   console.log(obj.limit); //得到每页显示的条数
                    ajaxData(obj.curr, dataDom);
                }
            });
        });
    }
    // 递归获取根节点相邻祖先节点
    function parent(data) {
        // 获取id那个节点
        if (data.parentNode.id) {
            return data.parentNode
        }
        return parent(data.parentNode);
    }
    // 获取ajax数据处理
    function dataDom(rest) { // 成功拿到结果放到这个函数 data就是拿到的结果
        // 动态获取分页值
        if (String(total) === 'null') {
            let meta = rest.meta;
            page_size = meta.per_page;
            page = meta.current_page;
            total = meta.total;
            paging(total);
        }
        let dataStr = '';
        rest.data.map(item => {
            let str = `<div class="col-md-6 col-sm-6 col-12 tableTop">
            <div id=${item.code} class="tableBox d-none d-sm-block">
                <div class="tableImg">
                    <img class="lazy" data-original=${item.img} alt="">
                </div>
                <div class="tableText">
                    <div class="tableTextBox">
                        <div class="tableBoxText">${item.title}</div>
                        <div class="tableBoxLabel">${item.keyword}</div>
                    </div>
                </div>
            </div>

            <div id=${item.code} class="tableBox d-block d-sm-none">
                <div class="tableImgPhone">
                    <img class="lazy" data-original=${item.img} alt="">
                </div>
                <div class="tableTextPhone">
                    <div class="tableTextBoxPhone">
                        <div class="tableBoxText">${item.title}</div>
                        <div class="tableBoxLabel">${item.keyword}</div>
                    </div>
                </div>
            </div>
        </div>`
            dataStr = dataStr + str;
        });
        let journalismId = document.querySelector('#journalismLisId'); // 事件节点
        journalismId.innerHTML = dataStr;
        // 跳转url
        clickUrl();
        // 图片懒加载
        $("img.lazy").lazyload();
    }
     // 事件获取
     function clickUrl(){
        let journalismId = document.querySelector('#journalismLisId'); // 事件节点
        journalismId.addEventListener('click', function (e) {
            let target = e.target;
            //判断层级获取递归获取方法
            let parentData = parent(target);
            window.location.href = `./particular.html?id=${parentData.id}`;
        });
     }
    // 列表详情
    function ajaxData(page, dataDom) {
        $.ajax({
            type: "GET",// get或者post
            url: "https://www.fastmock.site/mock/d8c33ca26a546a3c9be78ee13f714990/t1-0fficial/api/news",// 请求的url地址
            data: {
                'page': page,
                'page_size': page_size
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
})()