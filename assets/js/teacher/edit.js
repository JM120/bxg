require(['/bxg/assets/js/config.js'],function(){
    require(['jquery',
    '/bxg/assets/js/getarg.js',
    'datepicker',
    'validate',
    'form',
    '/bxg/assets/js/common.js',
    'zh'],function($,obj){
        console.log(obj)
        //功能1 请求数据 渲染到页面
        var options = {
            url :'/api/v1/teacher/edit',
            type :'get',
            data :{
                tc_id:obj.tc_id
            },
            success:function(info){
                console.log(info);
                if (info.code===200){

                    //dom操作
                    var $tcName = $('input[name="tc_name"]');
                    var $tcJoinData=$('input[name="tc_join_date"]');
                    var $tcType=$('input[name="tc_type"]');
                    var $tcGender = $('input[name="tc_gender"]');
                    var itme=info.result;
                    
                    $tcName.val(itme.tc_name);
                    $tcJoinData.val(itme.tc_join_date);
                    $tcType.val(itme.tc_type);
                    $tcGender.eq(itme.tc_gender).attr('checked',true);


                }
            }
        }
        $.ajax(options);

        //表单验证
        $('form').validate({
            rules:{
                //规则
                tc_name: {
                    required: true,
                    rangelength: [2, 10]
                },
                tc_join_date: {
                    required: true,
                    date: true // 192/12/22
                }

            },
            messages:{
                //规则对应的提示
                 tc_name: {
                    required: '不能为空',
                    rangelength: '长度不正确!'
                },
                tc_join_date: {
                    required: '日期不能为空',
                    date: '格式不对' // 192/12/22
                }
            },
            submitHandler:function(){//表单验证成功执行该函数
                
                $('form').ajaxSubmit({
                    url:'/api/v1/teacher/update',
                    type:'post',
                    data:{
                        tc_id:obj.tc_id
                    },
                    success:function(info){
                        if(info.code==200){
                            window.alert(info.msg)
                        }
                    }
                })
            }
        })  
        
        //日期插件
        $('input[name="tc_join_date"]').datepicker({
            format:'yyyy/mm/dd',
            language:'zh-CN'
        })
    })
})