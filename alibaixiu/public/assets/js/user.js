//用户添加
$('#userForm').on('submit', function() {
    var formData = $(this).serialize();

    $.ajax({
        type: "post",
        url: "/users",
        data: formData,
        success: function() {
            location.reload();
        },
        error: function() {
            alert('用户添加失败');
        }
    });
    return false;
});

//用户选择文件  用户头像上传
$('#modifyBox').on('change', '#avatar', function() {
    var formData = new FormData();
    formData.append('avatar', this.files[0]);

    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            $('#preview').attr('src', response[0].avatar);
            $('#hiddenAvatar').val(response[0].avatar)
        }
    });
})

//用户信息修改
$('#userBox').on('click', '.edit', function() {
    var id = $(this).attr('data-id');

    $.ajax({
        type: "get",
        url: "/users/" + id,
        success: function(response) {
            console.log(response);

            var html = template('modifyTpl', response);
            $("#modifyBox").html(html);
        }
    });
})

//修改表单添加提交事件
$('#modifyBox').on('submit', "#modifyForm", function() {
        var formData = $(this).serialize();
        var id = $(this).attr('data-id');

        $.ajax({
            type: "put",
            url: "/users/" + id,
            data: formData,
            success: function(response) {
                location.reload();
            },
            error: function() {
                alert('用户添加失败');
            }
        });
        return false;

    })
    //删除用户
$('#userBox').on('click', '.delete', function() {
    if (confirm('是否删除')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: "delete",
            url: "/users/" + id,
            success: function(response) {
                location.reload();
            }
        });
    }
});

$.ajax({
    type: "get",
    url: "/users",
    success: function(response) {
        var html = template('userTpl', { data: response });
        $('#userBox').html(html)
    }
});
//获取全选按钮
var selectAll = $('#selectAll');

var deleteMany = $('#deleteMany');

//全选按钮绑定事件
selectAll.on('change', function() {
    var status = $(this).prop('checked');

    if (status) {
        // 显示批量删除按钮
        deleteMany.show();
    } else {
        // 隐藏批量删除按钮
        deleteMany.hide();
    }

    $('#userBox').find('input').prop('checked', status);

});
//复选框按钮影响全选按钮
$('#userBox').on('change', '.userStatus', function() {
    var length = $('#userBox').find('input').length;
    var checkedLength = $('#userBox').find('input:checked').length;
    if (length == checkedLength) {
        $('#selectAll').prop('checked', true);
    } else {
        $('#selectAll').prop('checked', false);
    }
    checkedLength > 0 ? deleteMany.show() : deleteMany.hide();

})

//批量删除
deleteMany.on('click', function() {
    var ids = [];
    var checkedUser = $('#userBox').find('input').filter(':checked');
    checkedUser.each(function(index, ele) {
        ids.push($(ele).attr('data-id'));
    });

    if (confirm('是否删除')) {
        $.ajax({
            type: "delete",
            url: "/users/" + ids.join('-'),
            success: function(response) {
                location.reload();
            }
        });
    }

})