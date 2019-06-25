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
            $("#links").html(html);
            //判断一级分类是否有数据
            if (response.rows.length) {
                $('#links').find('a').eq(0).addClass('active');
                // 获取第一个一级分类的id
                var id = response.rows[0].id;
                getSecondCategory(id);
            }
        }
    });
    //-----------------------------------------------------------
    // 获取二级分类
    function getSecondCategory(id) {
        $.ajax({
            type: "get",
            url: '/category/querySecondCategory',
            data: { id: id },
            success: function(response) {
                var html = template('category-second', response);
                $('.brand-list').html(html);
            }
        });
    }
    //----------------------------------------------------------------
    // 对一级分类设置点击事件，获取二级分类的数据
    $('#links').on('click', 'a', function() {
        // 获取当前点击的一级分类的id
        var id = $(this).attr('data-id');
        // 给当前点击的一级分类添加选中状态
        $(this).addClass('active').siblings().removeClass('active');
        getSecondCategory(id);
    })
})