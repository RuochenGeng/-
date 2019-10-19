//添加分类表单时的提交行为
$('#addCategory').on('submit', function() {
    var formData = $(this).serialize();

    $.ajax({
        type: "post",
        url: "/categories",
        data: formData,
        success: function(response) {
            location.reload();
        }
    });
    return false;
});
//向服务器请求所有分类数据
$.get('/categories', function(response) {
        let html = template('categoryListTpl', { data: response });
        $('#categoryBox').html(html);
    })
    //为编辑按钮添加绑定
$('#categoryBox').on('click', '.edit', function() {
    var id = $(this).attr('data-id');

    $.ajax({
        type: "get",
        url: "/categories/" + id,
        success: function(response) {
            var html = template('modifyCategoryTpl', response);
            $('#formBox').html(html);
        }
    });
})

$('#formBox').on('submit', '#modifyCategory', function() {
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');
    $.ajax({
        type: "put",
        url: "/categories/" + id,
        data: formData,
        success: function(response) {
            location.reload();
        }
    });
    return false;
})

$('#categoryBox').on('click', '.delete', function() {
    if (confirm('是否删除')) {
        var id = $(this).attr('data-id');

        $.ajax({
            type: "delete",
            url: "/categories/" + id,
            success: function(response) {
                location.reload();
            }
        });
    }
})