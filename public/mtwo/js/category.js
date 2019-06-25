$(function() {
    // 初始化区域滚动组件
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    // 获取一级分类数据
    $.ajax({
        type: "get",
        url: '/category/queryTopCategory',
        success: function(response) {
            // console.log(response);

            var html = template("category-first", response);
            $(".links").html(html);
            if (response.rows.length) {
                $("#links").find("a").eq(0).addClass('active')
            }
            var id = response.rows[0].id
            getCategory(id);
        }
    });
    //----------------------------------------------------------
    // 获取二级分类数据
    function getCategory(id) {
        $.ajax({
            type: "get",
            url: '/category/querySecondCategory',
            data: { id: id },
            success: function(response) {


                var html = template("category-second", response);
                $(".brand-list").html(html);
            }
        });
    }
    //-----------------------------------------------------------------
    //给一级分类数据添加点击数据
    $("#links").on("click", "a", function() {
        var id = $(this).attr("data-id");
        $(this).addClass("active").siblings().removeClass("active");
        getCategory(id);
    })
})