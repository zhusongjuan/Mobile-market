$(function() {
    // 搜索点击事件
    $("#search-btn").on("click", function() {
            var keyword = $('#keyword').val();
            if (!keyword) {
                alert("请输入要搜索的商品关键字");
                return;
            }
            keyArr.push(keyword);
            // 将关键字数组存储在本地
            localStorage.setItem("keyArr", JSON.stringify(keyArr));
            // 1.实现业务逻辑，把输入值拼接到地址栏
            location.href = "searchResult.html?keyword=" + keyword;
        })
        //-------------------------------------------------------------
        // 存关键字的数组
    var keyArr = [];
    if (localStorage.getItem("keyArr")) {
        keyArr = JSON.parse(localStorage.getItem('keyArr'));
        var html = template('historyTpl', { result: keyArr })
        $('#history-box').html(html);
    }
    //---------------------------------------------------------------
    //清空搜索历史
    // 1.给元素添加点击事件
    // 2.清空页面中的数据，清空本地存储中的数据
    $('#clearBtn').on('click', function() {
        $("#history-box").html("");
        localStorage.removeItem("keyArr");
    })

})