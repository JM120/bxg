//公共要使用的功能
define(['jquery', 'nprogress', 'cookie'], function ($,NProgress) {
   NProgress.start();//页面加载 进度条开始
    validSignIn(); // 功能1 验证是否登录
    getinfo();//功能2 从cookie中获取用户资料，并渲染
    navToggle();//功能3 导航菜单下拉框
    signOut();//功能4 退出登录
    globalAjaxEvent()//功能5 全局的ajax事件，进度条




    //功能1
    function validSignIn(){
        //判断依据 cookie中的是否有PHPSESSID这个cookie，只要有这个cookie值，就说明登录了。
        var sessionID=$.cookie('PHPSESSID')
        console.log(sessionID);
        if(!sessionID){
            location.href='/bxg/views/index/login.html';
        }
    }

    //功能2
    function getinfo(){
        //转为对象
        var userinfo=JSON.parse($.cookie('userinfo'));
        //设置头像
        $('.avatar img').attr('src',userinfo.tc_avatar);
        //设置用户名
        $('.avatar').next('h4').text(userinfo.tc_name);
    }

    //功能3 
    function navToggle(){   
        $('.list-unstyled li a').on('click',function(){
            $(this).next('ul').slideToggle();
        })
    }

    //功能4
    function signOut(){
        $('.fa-sign-out').parent('a').on('click',function(){
            $.ajax({
                type:'post',
                url:'/api/v1/logout',
                success:function(info){
                    console.log(info);
                    if(info.code==200){
                        location.href='/bxg/views/index/login.html';
                    }
                }
            })
        })
    }

    //功能5
    function globalAjaxEvent(){
        $(document).ajaxStart(function(){
            NProgress.start();//进度条开始
        })
        $(document).ajaxStop(function(){
            NProgress.done()//结束
        })
    }

    NProgress.done()//页面加载完 进度条结束
})