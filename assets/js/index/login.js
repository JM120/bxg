define(['jquery','cookie'],function($){
    //点击登录按钮
    $('#sub').on('click',function(e){
        //禁用默认事件
        e.preventDefault();
        
        //获取账号密码
        var isname=$('#name').val();
        var pass=$('#pass').val();
        
        //验证账号密码  trim（）去俩边空格
        if(!isname.trim() || !pass.trim()){
            return alert('账号密码不能为空')
        }
        //发送请求
        $.ajax({
            url:'/api/v1/login',
            type:'post',
            data:{
                tc_name:isname,
                tc_pass:pass
            },
            success:function(info){
                console.log(info);
                if(info.code==200){
                    // alert(info.msg);
                    //用cookie记录用户的信息 是个对象转成json字符串
                    $.cookie('userinfo',JSON.stringify(info.result),{expires:15,path:'/'});
                    //登入成功，跳转页面
                    window.location.href='/bxg/views/index/dashboard.html'
                }
            },
            error:function(){
                alert('账号密码错误，请重新输入')
            }
        })
    })
})