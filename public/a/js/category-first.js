$(function() {
    // 获取一级分类数据并展示

    var page = 1;
    var pageSize = 10;
    var totalPage = 0;

    getData();

    function getData() {
        $.ajax({
            type: "get",
            url: '/category/queryTopCategoryPaging',
            data: {
                page: page,
                totalPage: totalPage
            },

            success: function(response) {
                console.log(response);
                totalPage = Math.ceil(response.total / pageSize);
                var html = template("categoryFirstTpl", response);
                // console.log(html);

                $("#categoryFirstBox").html(html);

            }
        });

    }

    // 下一页
    $("#next").on("click", function() {

            page--;
            if (page > totalPage) {
                page = totalPage;
                alert("已经是最后一页了");
                return;
            }
            getData();
        })
        // 上一页
    $("#prev").on("click", function() {
            page++;
            if (page < 1) {
                page = 1;
                alert("已经是最后一页了");
                return;
            }
            getData();
        })
        //添加分类
        // 添加一级分类
        // 1. 获取一级分类保存按钮 并添加点击事件
        // 2. 获取用户输入的分类名称 并且校验
        // 3. 调用添加一级分类接口 实现功能
        // 4. 刷新页面
    $("#save").on("click", function() {
        var categoryFirstName = $.trim($("[name= 'categoryFirstName']").val());
        if (!categoryFirstName) {
            alert("请输入一级分类名称");
            return;
        }
        $.ajax({
            type: "post",
            url: '/category/addTopCategory',
            data: {
                categoryName: categoryFirstName
            },
            success: function(response) {
                if (response.success) {
                    location.reload();
                }
            }
        });
    })




})