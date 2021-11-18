(function(){
     // 点击跳转事件函数
     function incident(id, url) {
        document.querySelector(id).onclick = function () {
            window.location.href = url;
        };
    }
    // 执行跳转
    incident('#indexUrl', './index.html');
    incident('#journalismUrl','./journalism.html');
})();